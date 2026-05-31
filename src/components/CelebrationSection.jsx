import { useLanguage } from "../context/LanguageContext";
import { EVENTS, IMAGES } from "../data/config";

export default function CelebrationSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="font-display text-5xl md:text-7xl text-foreground">
            {t.celebrations}
          </h2>
        </div>

        <div className="space-y-8">
          {/* Wedding card */}
          <div>
            <div className="text-center bg-foreground/[0.03] border border-foreground/10 rounded-2xl px-6 py-10 md:px-10 md:py-14">
              <p className="font-body text-sm tracking-[0.25em] uppercase text-foreground/50 mb-3">
                {t.weddingLabel}
              </p>
              <h3 className="font-display text-5xl md:text-6xl text-foreground mb-2 leading-tight">
                {EVENTS.wedding.venue}
              </h3>
              <div className="w-10 h-px bg-foreground/15 mx-auto my-5" />
              <div className="space-y-2">
                <p className="font-body text-base text-foreground/60 italic tracking-wide">
                  {EVENTS.wedding.displayDate}
                </p>
                <p className="font-display text-3xl md:text-4xl text-foreground">
                  {EVENTS.wedding.time}
                </p>
              </div>
              <a
                href={EVENTS.wedding.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 mb-6 font-body text-sm tracking-[0.15em] uppercase text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/20 hover:border-foreground/50 pb-1"
              >
                {t.viewOnMap}
              </a>
              {/* Embedded map */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ height: "220px" }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=48.9660524,89.9239171&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Sky Palace тойханасы"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
