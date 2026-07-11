import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ModSelectionInfoProps } from "../types/ModSelectionInfoProps";

const ModSelectionCard = ({ mod_id, heroName, moddedHeroSelectionImage, originalHeroMiniImage }: ModSelectionInfoProps) => {
  const nameRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  // The hero name is clipped with an ellipsis when it doesn't fit the card.
  // Track whether that's currently the case so we only show the full-text
  // tooltip when it's actually needed (re-checking on resize, since the card
  // and font sizes change across breakpoints).
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const check = () => setIsTruncated(el.scrollWidth > el.clientWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [heroName]);

  return (
    <Link to={`/mod/${mod_id}`}>
      <div className="clickable-container">
        <div className="image-container">
          <img src={moddedHeroSelectionImage} alt={heroName} className="main-image" />
          <img src={originalHeroMiniImage} alt={`${heroName} (original)`} className="overlay-image" />
        </div>
        <p className="hero-name" ref={nameRef} title={isTruncated ? heroName : undefined}>
          {heroName}
        </p>
      </div>
    </Link>
  );
};

export default ModSelectionCard;
