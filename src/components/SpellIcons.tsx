import ImageGallery from "./ImageGallery";
import { SpellIcon } from "../types/ModDetailedInfoProps";
import "./SpellIcons.css";

const SpellIcons = ({ spellIcons }: { spellIcons: SpellIcon[] }) => {
  return (
    <ImageGallery
      title="Spell icons:"
      images={spellIcons.map((spellIcon) => spellIcon.image)}
      className="spellicons"
      imageClassName="spellicon-image"
    />
  );
};

export default SpellIcons;
