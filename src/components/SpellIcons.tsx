import { useState, useRef } from "react";
import LazyClickableVideo from "./LazyClickableVideo";
import { SpellIcon } from "../types/ModDetailedInfoProps";
import "./SpellIcons.css";

const SpellIcons = ({ spellIcons }: { spellIcons: SpellIcon[] }) => {
  const videos = (
    <div className="spells-video-main">
      <div className="spells-video-container">
        <LazyClickableVideo videoSrc="./mods_data/Pudge_Medusa/video/pudge_hook.mp4" thumbnailSrc="./mods_data/Pudge_Medusa/video/pudge_hook.jpg" />
        <LazyClickableVideo videoSrc="./mods_data/Pudge_Medusa/video/pudge_rot.mp4" thumbnailSrc="./mods_data/Pudge_Medusa/video/pudge_rot.jpg" />
        <LazyClickableVideo videoSrc="./mods_data/Pudge_Medusa/video/pudge_dismember.mp4" thumbnailSrc="./mods_data/Pudge_Medusa/video/pudge_dismember.jpg" />
      </div>
    </div>
  );

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
