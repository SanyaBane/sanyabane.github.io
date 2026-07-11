import { Link } from "react-router-dom";
import { ModSelectionInfoProps } from "../types/ModSelectionInfoProps";

const ModSelectionCard = ({ mod_id, heroName, moddedHeroSelectionImage, originalHeroMiniImage }: ModSelectionInfoProps) => {
  return (
    <Link to={`/mod/${mod_id}`}>
      <div className="clickable-container">
        <div className="image-container">
          <img src={moddedHeroSelectionImage} alt={heroName} className="main-image" />
          <img src={originalHeroMiniImage} alt={`${heroName} (original)`} className="overlay-image" />
        </div>
        <p className="hero-name">{heroName}</p>
      </div>
    </Link>
  );
};

export default ModSelectionCard;
