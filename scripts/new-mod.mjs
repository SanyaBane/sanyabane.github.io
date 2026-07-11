import { mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { parseModDefinitions, derivedAssetPaths, PUBLIC_DIR } from "./mods-lib.mjs";

// Scaffold the asset folders for one mod. Reads the mod's entry from mods.ts
// (the single source of truth), creates the empty directory skeleton at the
// exact derived paths, and prints a checklist of the files to drop in.
// Usage: npm run new-mod -- <mod_id>

const modId = process.argv[2];
if (!modId) {
  console.error("Usage: npm run new-mod -- <mod_id>");
  console.error("Add the ModDefinition entry to src/data/mods.ts first, then run this.");
  process.exit(1);
}

const def = parseModDefinitions().find((d) => d.mod_id === modId);

if (!def) {
  console.error(`Mod "${modId}" isn't in src/data/mods.ts yet.\n`);
  console.error("Add an entry like this to ModDefinitions, then re-run this command:\n");
  console.error(`  {
    mod_id: "${modId}",
    heroName: "<Hero display name>",
    heroInternalName: "<npc_dota_hero_ name, e.g. sniper>",
    abilities: ["<ability_codename_1>", "<ability_codename_2>", "<ability_codename_3>", "<ability_codename_4>"],
    downloadLink: "<url>",
    // loadoutCount / ingameCount — only if not 1 / 2
  },`);
  process.exit(1);
}

const paths = derivedAssetPaths(def);

const dirs = [...new Set(paths.map((rel) => dirname(join(PUBLIC_DIR, rel))))];
for (const dir of dirs) mkdirSync(dir, { recursive: true });

console.log(`Folder skeleton ready under public/mods_data/${modId}/.`);
console.log("Drop these files in (✓ present, ○ still missing):\n");
for (const rel of paths) {
  const mark = existsSync(join(PUBLIC_DIR, rel)) ? "✓" : "○";
  console.log(`  ${mark} public/${rel}`);
}
console.log("\nThen run `npm run check-mods` to verify.");
