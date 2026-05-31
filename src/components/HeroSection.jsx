import { useEffect, useRef } from "react";
import { MEDIA } from "../data/config";

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    const startVideo = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.load();
    startVideo();
    video.addEventListener("loadeddata", startVideo);
    video.addEventListener("canplay", startVideo);

    return () => {
      video.removeEventListener("loadeddata", startVideo);
      video.removeEventListener("canplay", startVideo);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-white">
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          src={MEDIA.heroVideo}
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex-1" />
      </div>
    </section>
  );
}
