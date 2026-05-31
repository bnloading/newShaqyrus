import { useLanguage } from "../context/LanguageContext";
import { HOSTS } from "../data/config";

export default function WeddingHostsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 px-6 text-center">
      <p className="font-body text-sm tracking-[0.3em] uppercase text-foreground/50 mb-6">
        {t.weddingHosts}
      </p>

      <div className="space-y-1">
        <h2 className="font-display text-5xl md:text-7xl text-foreground italic leading-tight">
          {HOSTS.person1}
        </h2>
        <p className="font-body text-xs tracking-[0.3em] uppercase text-foreground/35 py-3">
          {t.langLabel === "ҚАЗ" ? "және" : "болон"}
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-foreground italic leading-tight">
          {HOSTS.person2}
        </h2>
      </div>
    </section>
  );
}
