import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(HERE, "..");
export const MODS_TS = join(ROOT, "src", "data", "mods.ts");
export const PUBLIC_DIR = join(ROOT, "public");

const DEFAULT_LOADOUT = 1;
const DEFAULT_INGAME = 2;

// Parse the ModDefinitions out of src/data/mods.ts by reading the source text.
// mods.ts is plain declarative data (no computed values), so a light regex
// parse avoids having to transpile/execute TypeScript here.
export function parseModDefinitions(source = readFileSync(MODS_TS, "utf8")) {
  const strVal = (block, key) => {
    const m = block.match(new RegExp(key + ':\\s*"([^"]*)"'));
    return m ? m[1] : undefined;
  };
  const intVal = (block, key) => {
    const m = block.match(new RegExp(key + ":\\s*(\\d+)"));
    return m ? Number(m[1]) : undefined;
  };

  const starts = [];
  const idRe = /mod_id:\s*"([^"]*)"/g;
  let m;
  while ((m = idRe.exec(source))) starts.push(m.index);

  return starts.map((start, i) => {
    const block = source.slice(start, starts[i + 1] ?? source.length);
    const abilitiesMatch = block.match(/abilities:\s*\[([\s\S]*?)\]/);
    const abilities = abilitiesMatch
      ? [...abilitiesMatch[1].matchAll(/"([^"]+)"/g)].map((x) => x[1])
      : [];
    return {
      mod_id: strVal(block, "mod_id"),
      heroName: strVal(block, "heroName"),
      heroInternalName: strVal(block, "heroInternalName"),
      abilities,
      downloadLink: strVal(block, "downloadLink"),
      loadoutCount: intVal(block, "loadoutCount") ?? DEFAULT_LOADOUT,
      ingameCount: intVal(block, "ingameCount") ?? DEFAULT_INGAME,
    };
  });
}

// Every asset path a mod needs, relative to public/. Mirrors the path formulas
// in ModSelectionInfo.ts / ModDetailedInfo.ts exactly — keep them in sync.
export function derivedAssetPaths(def) {
  const base = `mods_data/${def.mod_id}`;
  const paths = [
    `${base}/npc_dota_hero_${def.heroInternalName}_png.png`,
    `${base}/panorama/images/heroes/npc_dota_hero_${def.heroInternalName}.png`,
    `${base}/panorama/images/heroes/selection/npc_dota_hero_${def.heroInternalName}.png`,
    ...def.abilities.map((a) => `${base}/panorama/images/spellicons/${a}.png`),
  ];
  for (let n = 1; n <= def.loadoutCount; n++) paths.push(`${base}/loadout/${n}.jpg`);
  for (let n = 1; n <= def.ingameCount; n++) paths.push(`${base}/ingame/${n}.jpg`);
  return paths;
}
