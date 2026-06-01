import { useLanguage } from "../context/LanguageContext";
import { TRANSLATIONS } from "../data/config";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-1 rounded-full border border-foreground/30 bg-background/95 px-1 py-1 shadow-[0_10px_30px_rgba(33,42,33,0.18)] backdrop-blur-md">
      {Object.entries(TRANSLATIONS).map(([key, val]) => (
        <button
          key={key}
          onClick={() => setLang(key)}
          className={`px-3 py-1 rounded-full text-xs font-body tracking-widest uppercase transition-colors ${
            lang === key
              ? "bg-foreground text-background shadow-sm"
              : "bg-transparent text-foreground/85 hover:bg-foreground/8 hover:text-foreground"
          }`}
        >
          {val.langLabel}
        </button>
      ))}
    </div>
  );
}
