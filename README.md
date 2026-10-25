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
index.html      markup
styles.css      theme tokens (light/dark) and layout
src/data.js     country table, aliases, daily answer pool
src/game.js     game state, comparison logic, rendering, share text
```

- **Daily answer:** deterministic shuffle of `POOL` keyed by days since 2026-10-25, so everyone gets the same country.
- **Stats:** saved in `localStorage` under `landfall:v1`.

## Data

Country figures (capital coordinates, area, population, languages) are approximate and hand-entered. Replacing them with a sourced dataset is on the list.
