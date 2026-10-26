#!/usr/bin/env node
// Builds src/data.js from pinned, sourced datasets plus the hand-maintained data/curated.json.
//
//   npm run build:data            use cached downloads in .cache/ when present
//   npm run build:data -- --fresh re-download the remote sources
//
// Sources
//   world-countries (npm, mledoze/countries, ODbL 1.0)   names, ISO codes, subregion, capital name, area, UN membership, alt spellings
//   countries-list  (npm, MIT)                             continent, languages (main language first)
//   datasets/population (World Bank SP.POP.TOTL, CC BY 4.0) population, latest year per country
//   Natural Earth ne_10m_populated_places_simple (public domain) capital coordinates

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, '.cache');
const FRESH = process.argv.includes('--fresh');

const REMOTE = {
  population: {
    url: 'https://raw.githubusercontent.com/datasets/population/d4b1a4a9a17e2123baf0ef119de05bceced1ab1b/data/population.csv',
    file: 'population.csv',
  },
  places: {
    url: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/ca96624a56bd078437bca8184e78163e5039ad19/geojson/ne_10m_populated_places_simple.geojson',
    file: 'ne_10m_populated_places_simple.geojson',
  },
};

const CONTINENTS = { AF: 'Africa', AS: 'Asia', EU: 'Europe', NA: 'North America', SA: 'South America', OC: 'Oceania' };

async function fetchCached({ url, file }) {
  const dest = path.join(CACHE, file);
  if (!FRESH && existsSync(dest)) return readFile(dest, 'utf8');
  console.log(`  downloading ${file}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  const text = await res.text();
  await mkdir(CACHE, { recursive: true });
  await writeFile(dest, text);
  return text;
}

const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]/g, '');

function parsePopulation(csv) {
  // Country Name,Country Code,Year,Value  (names can contain quoted commas, so read from the right)
  const latest = new Map();
  for (const line of csv.trim().split(/\r?\n/).slice(1)) {
    const m = line.match(/,([A-Z]{3}),(\d{4}),([\d.]+)\s*$/);
    if (!m) continue;
    const [, code, year, value] = m;
    const prev = latest.get(code);
    if (!prev || +year > prev.year) latest.set(code, { year: +year, value: Math.round(+value) });
  }
  return latest;
}

function capitalsByCountry(geojson) {
  const map = new Map();
  for (const f of JSON.parse(geojson).features) {
    const p = f.properties;
    if (p.adm0cap !== 1) continue;
    const list = map.get(p.adm0_a3) ?? [];
    list.push({ name: p.name, ascii: p.nameascii, lat: p.latitude, lng: p.longitude, pop: p.pop_max ?? 0 });
    map.set(p.adm0_a3, list);
  }
  return map;
}

function pickCapital(country, caps, warn, okSpelling = []) {
  const wanted = country.capital?.[0];
  if (!caps?.length) return null;
  const hit = caps.find(c => norm(c.name) === norm(wanted) || norm(c.ascii) === norm(wanted));
  if (hit) return hit;
  const biggest = [...caps].sort((a, b) => b.pop - a.pop)[0];
  if (caps.length === 1) { if (!okSpelling.includes(country.cca2)) warn(`${country.cca2}: capital "${wanted}" but Natural Earth marks ${biggest.name}; add a capital override if they differ`); return biggest; }
  warn(`${country.cca2}: capital "${wanted}" not among Natural Earth capitals (${caps.map(c => c.name).join(', ')}); using ${biggest.name}`);
  return biggest;
}

const round = (x, d) => Math.round(x * 10 ** d) / 10 ** d;

async function main() {
  console.log('Building src/data.js');
  const curated = JSON.parse(await readFile(path.join(ROOT, 'data/curated.json'), 'utf8'));
  const world = require('world-countries');
  const pkgVersion = async name => JSON.parse(await readFile(path.join(ROOT, 'node_modules', name, 'package.json'), 'utf8')).version;
  const versions = { wc: await pkgVersion('world-countries'), cl: await pkgVersion('countries-list') };
  const { countries: clist, languages: langNames } = require('countries-list');
  const population = parsePopulation(await fetchCached(REMOTE.population));
  const capitals = capitalsByCountry(await fetchCached(REMOTE.places));

  const warnings = [], errors = [];
  const warn = m => warnings.push(m), fail = m => errors.push(m);

  const selected = world
    .filter(c => c.unMember || curated.include_non_un.includes(c.cca2))
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  const out = [];
  for (const c of selected) {
    const iso = c.cca2, o = curated.overrides?.[iso] ?? {}, cl = clist[iso];
    if (!cl) { fail(`${iso}: missing from countries-list`); continue; }

    const cont = o.continent ?? CONTINENTS[cl.continent];
    if (!cont) fail(`${iso}: unknown continent ${cl.continent}`);

    const pop = o.population ?? population.get(c.cca3)?.value;
    if (!pop) fail(`${iso}: no population (add an override in data/curated.json)`);

    let cap = o.capital ?? pickCapital(c, capitals.get(c.cca3), warn, curated.capital_spelling_ok);
    if (!cap) { warn(`${iso}: no Natural Earth capital; falling back to country centroid`); cap = { lat: c.latlng[0], lng: c.latlng[1] }; }

    const langs = cl.languages.map(l => langNames[l]?.name ?? l);
    if (!langs.length) fail(`${iso}: no languages`);

    // Alt spellings help matching, but skip short codes ("KE") and long official forms nobody types.
    const alt = (c.altSpellings ?? []).filter(s => s.length > 3 && s.length <= 32 && norm(s).length >= 3 && norm(s) !== norm(c.name.common));
    const aliases = [...new Set([...(curated.aliases[iso] ?? []), ...alt, c.name.official].map(s => s.toLowerCase()))]
      .filter(s => norm(s).length >= 2 && norm(s) !== norm(c.name.common));

    out.push({
      name: o.name ?? c.name.common,
      iso, iso3: c.cca3,
      cont, sub: o.subregion ?? c.subregion,
      cap: o.capitalName ?? c.capital?.[0] ?? cap.name,
      lat: round(cap.lat, 3), lng: round(cap.lng, 3),
      area: c.area,
      pop,
      langs: langs.slice(0, 4),
      langCodes: cl.languages,
      landlocked: c.landlocked,
      aliases,
    });
  }

  // Validation
  const byIso = new Map(out.map(c => [c.iso, c]));
  for (const iso of curated.answer_pool) if (!byIso.has(iso)) fail(`answer_pool: ${iso} is not in the country list`);
  for (const iso of Object.keys(curated.aliases)) if (!byIso.has(iso)) fail(`aliases: ${iso} is not in the country list`);
  const seen = new Map();
  for (const c of out) for (const key of [c.name, ...c.aliases].map(norm)) {
    if (seen.has(key) && seen.get(key) !== c.iso) warn(`alias "${key}" matches both ${seen.get(key)} and ${c.iso}; keeping ${seen.get(key)}`);
    else seen.set(key, c.iso);
  }
  for (const c of out) {
    if (Math.abs(c.lat) > 90 || Math.abs(c.lng) > 180) fail(`${c.iso}: bad coordinates`);
    if (!(c.area > 0)) fail(`${c.iso}: bad area`);
  }

  const popYears = [...new Set(out.map(c => population.get(c.iso3)?.year).filter(Boolean))].sort();
  const header = `// GENERATED by scripts/build-data.mjs — do not edit by hand.
// Edit data/curated.json for the answer pool, aliases and overrides, then run \`npm run build:data\`.
//
// Sources: mledoze/countries via world-countries ${versions.wc} (ODbL 1.0);
// countries-list ${versions.cl} (MIT); World Bank population via datasets/population,
// year ${popYears.join('/')} (CC BY 4.0); Natural Earth populated places (public domain).
// ${out.length} countries.
`;
  const body = `export const C = ${JSON.stringify(out)};\n\nexport const POOL = ${JSON.stringify(curated.answer_pool)};\n`;
  await writeFile(path.join(ROOT, 'src/data.js'), header + '\n' + body);

  for (const w of warnings) console.warn('  warn:', w);
  if (errors.length) { for (const e of errors) console.error('  error:', e); process.exit(1); }
  console.log(`  wrote ${out.length} countries, ${curated.answer_pool.length} in the answer pool, ${warnings.length} warnings`);
}

main().catch(e => { console.error(e); process.exit(1); });
