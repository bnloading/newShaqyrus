import { useLanguage } from "../context/LanguageContext";
import { IMAGES } from "../data/config";

export default function GiftSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 px-6 overflow-hidden">
      <div className="relative max-w-2xl mx-auto">
        <img
          src={IMAGES.rosesTopLeft}
          alt=""
          className="absolute -top-8 -left-12 md:-left-16 w-36 md:w-44 h-auto pointer-events-none select-none z-10"
        />
        <img
          src={IMAGES.rosesBottomRight}
          alt=""
          className="absolute -bottom-8 -right-12 md:-right-16 w-36 md:w-44 h-auto pointer-events-none select-none z-10"
        />

        <div className="bg-foreground/[0.03] border border-foreground/10 rounded-2xl px-6 py-10 md:px-10 md:py-14 text-center">
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-8">
            {t.giftTitle}
          </h2>
          <p className="text-foreground/70 font-body text-lg md:text-xl leading-relaxed italic mb-4">
            {t.giftQuote}
          </p>
          <p className="text-foreground/50 font-body text-base leading-relaxed">
            {t.giftDesc}
          </p>
        </div>
      </div>
    </section>
  );
}
