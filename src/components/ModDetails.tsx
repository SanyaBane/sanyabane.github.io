import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AllModsDetailedInfoData } from "../data/ModDetailedInfo";
import SpellIcons from "./SpellIcons";
import "./ModDetails.css";

const ModDetails = () => {
  const { mod_id } = useParams<{ mod_id: string }>();
  const modDetailedInfoData = AllModsDetailedInfoData.find((r) => r.mod_id.toString() === mod_id);

  if (!modDetailedInfoData) {
    return <div>Mod not found</div>;
  }

  const downloadLink = (
    <div className="downloadlink-container">
      <p className="downloadlink-header">Download link:</p>
      <Link className="downloadlink-link" to={modDetailedInfoData.downloadLink}>
        <p className="downloadlink-text">{modDetailedInfoData.downloadLink}</p>
      </Link>
    </div>
  );

  const spellIcons = modDetailedInfoData.spellIcons && <SpellIcons spellIcons={modDetailedInfoData.spellIcons} />

  const loadoutImages = (
    <div className="loadoutImages-container">
      <p className="loadoutImages-text">Loadout:</p>
      <div className="loadoutImages-images">
        {modDetailedInfoData.loadoutImages.map((loadoutImage, index) => (
          <img className="loadoutImages-image" key={`loadoutImag_${index}`} src={loadoutImage.image} alt="image" />
        ))}
      </div>
    </div>
  );

  const ingameImages = (
    <div className="ingameImages-container">
      <p className="ingameImages-text">In game:</p>
      <div className="ingameImages-images">
        {modDetailedInfoData.ingameImages.map((ingameImage, index) => (
          <img className="ingameImages-image" key={`ingameImage_${index}`} src={ingameImage.image} alt="image" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="root-container">
      <div className="title-container">
        <Link className="back-button-container" to={`/`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 12H5"></path>
            <path d="M12 5l-7 7 7 7"></path>
          </svg>
        </Link>
        <img className="title-image" src={modDetailedInfoData.titleImage} alt="image" />
        <p className="title-text">{modDetailedInfoData.modSelectionInfoProps?.heroName}</p>
      </div>
      {downloadLink}
      {spellIcons}
      {loadoutImages}
      {ingameImages}
    </div>
  );
};

export default ModDetails;
