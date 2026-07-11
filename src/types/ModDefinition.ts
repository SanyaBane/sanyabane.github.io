// Compact, hand-authored description of a single mod. Everything else
// (asset paths, selection/detailed props) is derived from these fields.
export interface ModDefinition {
  mod_id: string;
  heroName: string;
  /** Dota internal hero name, e.g. "phantom_assassin" — used to build
   *  npc_dota_hero_<heroInternalName> image paths. */
  heroInternalName: string;
  /** Full spellicon codenames, e.g. "axe_berserkers_call". */
  abilities: string[];
  downloadLink: string;
  /** Number of loadout screenshots (loadout/1.jpg ...). Defaults to 1. */
  loadoutCount?: number;
  /** Number of in-game screenshots (ingame/1.jpg ...). Defaults to 2. */
  ingameCount?: number;
}
