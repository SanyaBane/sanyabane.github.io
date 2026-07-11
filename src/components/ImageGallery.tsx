import { useState } from "react";
import Lightbox from "./Lightbox";

// A titled row of images. The concrete look is driven entirely by the class
// names the consumer passes in, so the same primitive backs the spell-icon,
// loadout and in-game sections without duplicating their markup. When
// `zoomable` is set, clicking an image opens it in a full-screen lightbox.
type ImageGalleryProps = {
  title: string;
  images: string[];
  className: string;
  imageClassName?: string;
  /** Descriptive base for each image's alt text; falls back to the title. */
  alt?: string;
  /** Enable click-to-enlarge via the lightbox. */
  zoomable?: boolean;
};

const ImageGallery = ({ title, images, className, imageClassName, alt, zoomable }: ImageGalleryProps) => {
  const altBase = alt ?? title;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className={`${className}-container`}>
      <p className={`${className}-text`}>{title}</p>
      <div className={`${className}-images`}>
        {images.map((image, index) => (
          <img
            className={`${imageClassName ?? `${className}-image`}${zoomable ? " zoomable" : ""}`}
            key={`${className}_${index}`}
            src={image}
            alt={`${altBase} ${index + 1}`}
            onClick={zoomable ? () => setLightboxIndex(index) : undefined}
            onKeyDown={
              zoomable
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxIndex(index);
                    }
                  }
                : undefined
            }
            role={zoomable ? "button" : undefined}
            tabIndex={zoomable ? 0 : undefined}
          />
        ))}
      </div>
      {zoomable && lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          alt={altBase}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
};

export default ImageGallery;
