# Landfall

A daily country-guessing game. Find the mystery country in five guesses.

Every guess returns a row of comparison tiles against the answer:

| Tile | Meaning |
|---|---|
| Continent | Green if it matches |
| Hemi | Green if both capitals are in the same hemisphere (N/S) |
| Pop. | Arrow points toward the answer; yellow within 1.5× |
| Area | Arrow points toward the answer; yellow within 1.5× |
| Lang. | Green if the countries share an official or main language |
| Distance | Capital-to-capital km with a compass arrow toward the answer |

Each miss unlocks a clue: region → language → capital → flag and first letter.

## Run it

No build step. Serve the folder with any static server:

```sh
npx serve .
# or
python3 -m http.server
```

ES modules don't load from `file://`, so open it through the server.

## Layout

```
index.html              markup
styles.css              theme tokens (light/dark) and layout
src/game.js             game state, comparison logic, rendering, share text
src/data.js             GENERATED country table and answer pool (don't edit)
data/curated.json       hand-maintained: answer pool, aliases, overrides
scripts/build-data.mjs  builds src/data.js from the sources below
```

- **Daily answer:** deterministic shuffle of `POOL` keyed by days since 2026-10-25, so everyone gets the same country.
- **Stats:** saved in `localStorage` under `landfall:v1`.

## Data

`src/data.js` is generated. To change it, edit `data/curated.json` and rebuild:

```sh
npm install
npm run build:data            # uses cached downloads in .cache/
npm run build:data -- --fresh # re-download the remote sources
```

The build fails on missing fields or unknown ISO codes, and warns when a source disagrees with itself (for example, a capital name that doesn't match the coordinates).

| Field | Source | License |
|---|---|---|
| Names, ISO codes, subregion, capital name, area, alt spellings | [mledoze/countries](https://github.com/mledoze/countries) via `world-countries` 5.1.0 | ODbL 1.0 |
| Continent, languages (main language first) | [`countries-list`](https://github.com/annexare/Countries) 3.4.1 | MIT |
| Population (latest year, currently 2025) | World Bank `SP.POP.TOTL` via [datasets/population](https://github.com/datasets/population), pinned commit | CC BY 4.0 |
| Capital coordinates | [Natural Earth](https://www.naturalearthdata.com/) 10m populated places, pinned commit | Public domain |

The country list is the 193 UN members plus Vatican City and Taiwan (`include_non_un`). Every manual correction lives under `overrides` in `data/curated.json` with a `_source` note explaining it. Current overrides: population for Taiwan and Vatican City (not covered by the World Bank), capital coordinates for Tanzania, Burundi, Benin, South Sudan and Nauru, continent for Russia and Timor-Leste, and the spelling of Ulaanbaatar.

Distances are capital to capital, so for countries with more than one capital the game uses the official one listed in `cap`.
