import { SpellIcon } from "../types/ModDetailedInfoProps";
import "./SpellIcons.css";

const SpellIcons = ({ spellIcons }: { spellIcons: SpellIcon[] }) => {
  return (
    <div className="spellicons-container">
      <p className="spellicons-text">Spell icons:</p>
      <div className="spellicons-images">
        {spellIcons.map((spellIcon, index) => (
          <img className="spellicon-image" key={`spellIcon_${index}`} src={spellIcon.image} alt="image" />
        ))}
      </div>
    </div>
  );
};

export default SpellIcons;
