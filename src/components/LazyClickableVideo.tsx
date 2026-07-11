import { useState, useRef } from "react";
import LazyLoad from "react-lazyload";
import "./LazyClickableVideo.css";
import { Play } from "lucide-react";

const LazyClickableVideo = ({ videoSrc, thumbnailSrc }: { videoSrc: string; thumbnailSrc: string }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <LazyLoad>
      <div className="main-lazy-load">
        {playVideo ? (
          <video ref={videoRef} src={videoSrc} autoPlay loop muted playsInline className="lazy-load-video" onClick={handleTogglePlay} />
        ) : (
          <div className="lazy-load-image-container" onClick={() => setPlayVideo(true)}>
            <Play className="lazy-load-image-play-button" size={50} />
            <img src={thumbnailSrc} alt="thumbnail" className="lazy-load-image" />
          </div>
        )}
      </div>
    </LazyLoad>
  );
};

export default LazyClickableVideo;
