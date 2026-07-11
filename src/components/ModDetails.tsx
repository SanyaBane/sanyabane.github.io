import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Download, ArrowLeft } from "lucide-react";
import { AllModsDetailedInfoData } from "../data/ModDetailedInfo";
import SpellIcons from "./SpellIcons";
import ImageGallery from "./ImageGallery";
import "./ModDetails.css";

const ModDetails = () => {
  const { mod_id } = useParams<{ mod_id: string }>();
  const modDetailedInfoData = AllModsDetailedInfoData.find((r) => r.mod_id === mod_id);

  if (!modDetailedInfoData) {
    return <div>Mod not found</div>;
  }

  const heroName = modDetailedInfoData.modSelectionInfoProps?.heroName ?? "";

  const downloadLink = (
    <div className="downloadlink-container">
      <a className="downloadlink-button" href={modDetailedInfoData.downloadLink} target="_blank" rel="noreferrer">
        <Download className="downloadlink-icon" size={20} aria-hidden="true" />
        Download
      </a>
    </div>
  );

  const spellIcons = modDetailedInfoData.spellIcons && <SpellIcons spellIcons={modDetailedInfoData.spellIcons} heroName={heroName} />

  return (
    <div className="root-container">
      <div className="title-container">
        <Link className="back-button-container" to={`/`} aria-label="Back to all mods">
          <ArrowLeft size={40} strokeWidth={2.5} aria-hidden="true" />
        </Link>
        <img className="title-image" src={modDetailedInfoData.titleImage} alt={heroName} />
        <p className="title-text">{heroName}</p>
      </div>
      {downloadLink}
      {spellIcons}
      <ImageGallery title="Loadout:" images={modDetailedInfoData.loadoutImages} className="loadoutImages" alt={`${heroName} loadout`} />
      <ImageGallery title="In game:" images={modDetailedInfoData.ingameImages} className="ingameImages" alt={`${heroName} in-game`} />
    </div>
  );
};

export default ModDetails;
