import { ModDetailedInfoProps } from "../types/ModDetailedInfoProps";
import { ModDefinitions } from "./mods";
import { AllModsSelectionInfoData } from "./ModSelectionInfo";

const range = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1);

// Detail-page data (download link, spell icons, screenshots), derived from
// each ModDefinition. Asset paths follow Dota's fixed Panorama layout.
export const AllModsDetailedInfoData: ModDetailedInfoProps[] = ModDefinitions.map((mod) => {
  const base = `/mods_data/${mod.mod_id}`;
  const modSelectionInfoProps = AllModsSelectionInfoData.find((s) => s.mod_id === mod.mod_id)!;
  return {
    mod_id: mod.mod_id,
    modSelectionInfoProps,
    titleImage: `${base}/panorama/images/heroes/npc_dota_hero_${mod.heroInternalName}.png`,
    downloadLink: mod.downloadLink,
    spellIcons: mod.abilities.map((ability) => `${base}/panorama/images/spellicons/${ability}.png`),
    loadoutImages: range(mod.loadoutCount ?? 1).map((n) => `${base}/loadout/${n}.jpg`),
    ingameImages: range(mod.ingameCount ?? 2).map((n) => `${base}/ingame/${n}.jpg`),
  };
});
