import { useState, useRef, useEffect } from "react";
import { MEDIA } from "./data/config";
import { LanguageProvider } from "./context/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import IntroOverlay from "./components/IntroOverlay";
import HeroSection from "./components/HeroSection";
import CountdownSection from "./components/CountdownSection";
import CalendarSection from "./components/CalendarSection";
import WeddingHostsSection from "./components/WeddingHostsSection";
import CelebrationSection from "./components/CelebrationSection";
import GuestCommentsSection from "./components/GuestCommentsSection";
import ItinerarySection from "./components/ItinerarySection";
import RSVPSection from "./components/RSVPSection";
import Footer from "./components/Footer";

const Divider = () => <div className="w-10 h-px bg-foreground/15 mx-auto" />;

export default function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  const handleIntroClose = () => {
    setIntroVisible(false);
    audioRef.current?.play().catch(() => {});
  };

  const playMusic = () => {
    audioRef.current?.play().catch(() => {});
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
        setMuted(false);
      } else {
        audioRef.current.pause();
        setMuted(true);
      }
    }
  };

  useEffect(() => {
    playMusic();
  }, []);

  useEffect(() => {
    if (introVisible) {
      audioRef.current?.pause();
    }
  }, [introVisible]);

  return (
    <LanguageProvider>
      <audio ref={audioRef} src={MEDIA.backgroundMusic} loop preload="auto" />
      {introVisible && <IntroOverlay onClose={handleIntroClose} />}
      {!introVisible && (
        <button
          onClick={toggleMute}
          aria-label={muted ? "Ән қос" : "Әнді өшір"}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 40,
            width: "2.75rem",
            height: "2.75rem",
            borderRadius: "50%",
            background: "rgba(var(--foreground-rgb, 45 65 45), 0.08)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(var(--foreground-rgb, 45 65 45), 0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "1.1rem",
            transition: "background 0.2s",
          }}
        >
          {muted ? "🔇" : "🎵"}
        </button>
      )}
      {!introVisible && <LanguageToggle />}
      <main
        className="bg-background text-foreground overflow-x-hidden"
        style={{ display: introVisible ? "none" : "block" }}
      >
        <HeroSection />
        <CountdownSection />
        <Divider />
        <CalendarSection />
        <Divider />
        <WeddingHostsSection />
        <Divider />
        <CelebrationSection />
        <ItinerarySection />
        <Divider />
        <GuestCommentsSection />
        <RSVPSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
