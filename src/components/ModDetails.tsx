import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Download, ChevronLeft } from "lucide-react";
import { AllModsDetailedInfoData } from "../data/ModDetailedInfo";
import SpellIcons from "./SpellIcons";
import ImageGallery from "./ImageGallery";
import "./ModDetails.css";

const ModDetails = () => {
  const { mod_id } = useParams<{ mod_id: string }>();
  const modDetailedInfoData = AllModsDetailedInfoData.find((r) => r.mod_id === mod_id);

  if (!modDetailedInfoData) {
    return (
      <div className="not-found">
        <p className="not-found-title">Mod not found</p>
        <Link className="not-found-link" to="/">Back to all mods</Link>
      </div>
    );
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
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link className="breadcrumbs-up" to="/">
          <ChevronLeft size={16} aria-hidden="true" />
          Mods
        </Link>
        <span className="breadcrumbs-sep" aria-hidden="true">/</span>
        <span className="breadcrumbs-current" aria-current="page">{heroName}</span>
      </nav>
      <div className="title-container">
        <img className="title-image" src={modDetailedInfoData.titleImage} alt={heroName} />
        <p className="title-text">{heroName}</p>
      </div>
      {downloadLink}
      {spellIcons}
      <ImageGallery title="Loadout:" images={modDetailedInfoData.loadoutImages} className="loadoutImages" alt={`${heroName} loadout`} zoomable />
      <ImageGallery title="In game:" images={modDetailedInfoData.ingameImages} className="ingameImages" alt={`${heroName} in-game`} zoomable />
    </div>
  );
};

export default ModDetails;
