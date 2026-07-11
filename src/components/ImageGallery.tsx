// A titled row of images. The concrete look is driven entirely by the class
// names the consumer passes in, so the same primitive backs the spell-icon,
// loadout and in-game sections without duplicating their markup.
type ImageGalleryProps = {
  title: string;
  images: string[];
  className: string;
  imageClassName?: string;
};

const ImageGallery = ({ title, images, className, imageClassName }: ImageGalleryProps) => {
  return (
    <div className={`${className}-container`}>
      <p className={`${className}-text`}>{title}</p>
      <div className={`${className}-images`}>
        {images.map((image, index) => (
          <img
            className={imageClassName ?? `${className}-image`}
            key={`${className}_${index}`}
            src={image}
            alt={title}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
