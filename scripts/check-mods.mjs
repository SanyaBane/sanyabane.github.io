import { existsSync } from "node:fs";
import { join } from "node:path";
import { parseModDefinitions, derivedAssetPaths, PUBLIC_DIR } from "./mods-lib.mjs";

// Validate every ModDefinition: required fields are present, mod_ids are unique,
// and every derived asset path actually exists under public/. Turns otherwise
// silent broken-image bugs into a hard failure. Wired into `predeploy`.

const defs = parseModDefinitions();
const problems = [];

const seen = new Map();
for (const def of defs) {
  const id = def.mod_id ?? "(unnamed)";

  for (const field of ["heroName", "heroInternalName", "downloadLink"]) {
    if (!def[field]) problems.push(`${id}: missing "${field}"`);
  }
  if (!def.abilities.length) problems.push(`${id}: "abilities" is empty`);

  if (seen.has(id)) problems.push(`${id}: duplicate mod_id`);
  seen.set(id, true);

  for (const rel of derivedAssetPaths(def)) {
    if (!existsSync(join(PUBLIC_DIR, rel))) problems.push(`${id}: missing file public/${rel}`);
  }
}

console.log(`Checked ${defs.length} mods.`);

if (problems.length === 0) {
  console.log("✓ All mods valid — every derived asset file exists.");
  process.exit(0);
}

console.error(`\n✗ ${problems.length} problem(s):\n`);
for (const p of problems) console.error(`  - ${p}`);
console.error("\nFix the file names/paths (or the mods.ts entry) and re-run `npm run check-mods`.");
process.exit(1);
