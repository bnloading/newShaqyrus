import { useState, useRef, useEffect } from "react";
import { MEDIA } from "../data/config";

export default function IntroOverlay({ onClose }) {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, [showVideo]);

  const handleClick = () => {
    if (!showVideo) {
      setShowVideo(true);
    }
    // clicking while video plays does nothing — video end triggers onClose
  };

  return (
    <div className="fixed inset-0 z-50 cursor-pointer" onClick={handleClick}>
      <img
        src={MEDIA.introPoster}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${showVideo ? "opacity-0" : "opacity-100"}`}
        draggable="false"
      />
      <video
        ref={videoRef}
        src={MEDIA.introVideo}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${showVideo ? "opacity-100" : "opacity-0"}`}
        playsInline
        preload="auto"
        muted
        onEnded={() => onClose?.()}
      />
    </div>
  );
}
