import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./Lightbox.css";

type LightboxProps = {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

// Full-screen overlay showing one image from `images` enlarged. Closes on
// backdrop click, the close button, or Escape; navigates with the arrow
// buttons or the Left/Right keys when there is more than one image.
const Lightbox = ({ images, index, alt, onClose, onNavigate }: LightboxProps) => {
  const count = images.length;
  const hasMultiple = count > 1;
  const prev = () => onNavigate((index - 1 + count) % count);
  const next = () => onNavigate((index + 1) % count);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && hasMultiple) onNavigate((index + 1) % count);
      else if (e.key === "ArrowLeft" && hasMultiple) onNavigate((index - 1 + count) % count);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, count, hasMultiple, onClose, onNavigate]);

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={alt}>
      <button className="lightbox-button lightbox-close" onClick={onClose} aria-label="Close">
        <X size={26} aria-hidden="true" />
      </button>

      {hasMultiple && (
        <button
          className="lightbox-button lightbox-nav lightbox-nav-prev"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous image"
        >
          <ChevronLeft size={38} aria-hidden="true" />
        </button>
      )}

      <img
        className="lightbox-image"
        src={images[index]}
        alt={`${alt} ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
      />

      {hasMultiple && (
        <button
          className="lightbox-button lightbox-nav lightbox-nav-next"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next image"
        >
          <ChevronRight size={38} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default Lightbox;
