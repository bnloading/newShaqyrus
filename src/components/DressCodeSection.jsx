import { useLanguage } from "../context/LanguageContext";
import { IMAGES } from "../data/config";

export default function DressCodeSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 px-6 overflow-hidden">
      <div className="relative max-w-2xl mx-auto text-center">
        <img
          src={IMAGES.bouquet}
          alt=""
          className="absolute top-8 -left-10 md:-left-16 w-44 md:w-52 h-auto pointer-events-none select-none z-10"
        />
        <img
          src={IMAGES.flowerStand}
          alt=""
          className="absolute -right-12 md:-right-20 top-[45%] w-28 md:w-36 h-auto pointer-events-none select-none z-10"
        />
        <img
          src={IMAGES.cypressTrees}
          alt=""
          className="absolute -bottom-16 -left-8 md:-left-16 w-36 md:w-48 h-auto pointer-events-none select-none z-10"
        />

        <h2 className="font-display text-5xl md:text-7xl text-foreground mb-10">
          {t.dressCode}
        </h2>

        <div className="space-y-8">
          {/* Cruise */}
          <div className="bg-foreground/[0.03] border border-foreground/10 rounded-2xl px-6 py-10 md:px-10 md:py-14">
            <h3 className="font-display text-4xl md:text-5xl text-foreground mb-1 leading-tight">
              {t.welcomeCruiseEvent}
            </h3>
            <p className="font-body text-sm tracking-[0.25em] uppercase text-foreground/50 mb-4">
              {t.july22nd}
            </p>
            <p className="font-body text-lg tracking-[0.1em] text-foreground">
              {t.whiteCocktail}
            </p>
          </div>

          {/* Wedding */}
          <div className="bg-foreground/[0.03] border border-foreground/10 rounded-2xl px-6 py-10 md:px-10 md:py-14">
            <h3 className="font-display text-4xl md:text-5xl text-foreground mb-1 leading-tight">
              {t.weddingEvent}
            </h3>
            <p className="font-body text-sm tracking-[0.25em] uppercase text-foreground/50 mb-4">
              {t.july23rd}
            </p>
            <p className="font-body text-lg tracking-[0.1em] text-foreground">
              {t.blackTie}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
