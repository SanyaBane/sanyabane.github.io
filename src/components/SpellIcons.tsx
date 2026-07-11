import ImageGallery from "./ImageGallery";
import "./SpellIcons.css";

const SpellIcons = ({ spellIcons, heroName }: { spellIcons: string[]; heroName?: string }) => {
  return (
    <ImageGallery
      title="Spell icons:"
      images={spellIcons}
      className="spellicons"
      imageClassName="spellicon-image"
      alt={heroName ? `${heroName} ability` : "Ability icon"}
    />
  );
};

export default SpellIcons;
