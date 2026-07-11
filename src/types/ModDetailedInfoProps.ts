import { ModSelectionInfoProps } from "./ModSelectionInfoProps"

export interface ModDetailedInfoProps {
  mod_id: string;
  modSelectionInfoProps: ModSelectionInfoProps;
  titleImage: string;
  downloadLink: string;
  spellIcons: string[];
  loadoutImages: string[];
  ingameImages: string[];
}
