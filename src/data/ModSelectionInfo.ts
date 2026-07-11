import { ModSelectionInfoProps } from "../types/ModSelectionInfoProps";
import { ModDefinitions } from "./mods";

// Grid-card data (card image + hero name), derived from each ModDefinition.
export const AllModsSelectionInfoData: ModSelectionInfoProps[] = ModDefinitions.map((mod) => {
  const base = `/mods_data/${mod.mod_id}`;
  return {
    mod_id: mod.mod_id,
    heroName: mod.heroName,
    moddedHeroSelectionImage: `${base}/panorama/images/heroes/selection/npc_dota_hero_${mod.heroInternalName}.png`,
    originalHeroMiniImage: `${base}/npc_dota_hero_${mod.heroInternalName}_png.png`,
  };
});
