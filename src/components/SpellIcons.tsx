import ImageGallery from "./ImageGallery";
import "./SpellIcons.css";

const SpellIcons = ({ spellIcons }: { spellIcons: string[] }) => {
  return (
    <ImageGallery
      title="Spell icons:"
      images={spellIcons}
      className="spellicons"
      imageClassName="spellicon-image"
    />
  );
};

export default SpellIcons;
