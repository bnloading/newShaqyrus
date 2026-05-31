import { useLanguage } from "../context/LanguageContext";
import { TRANSLATIONS } from "../data/config";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-1 bg-background/80 backdrop-blur-sm rounded-full px-1 py-1 border border-foreground/10">
      {Object.entries(TRANSLATIONS).map(([key, val]) => (
        <button
          key={key}
          onClick={() => setLang(key)}
          className={`px-3 py-1 rounded-full text-xs font-body tracking-widest uppercase transition-colors ${
            lang === key
              ? "bg-foreground text-background"
              : "text-foreground/60 hover:text-foreground"
          }`}
        >
          {val.langLabel}
        </button>
      ))}
    </div>
  );
}
