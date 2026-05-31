import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { EVENTS, IMAGES } from "../data/config";

function TimelineItem({ time, text, isLast }) {
  return (
    <div className="relative">
      {!isLast && (
        <div
          className="absolute -left-[23.5px] top-[0.5rem] w-px bg-foreground/15"
          style={{ height: "calc(100% + 1.5rem)" }}
        />
      )}
      <div className="absolute -left-[27px] top-1 w-2 h-2 rounded-full bg-foreground/30" />
      {time && (
        <p className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-foreground/70 mb-1">
          {time}
        </p>
      )}
      <p className="font-body text-base tracking-[0.05em] text-foreground/60 italic">
        {text}
      </p>
    </div>
  );
}

export default function ItinerarySection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cruiseSchedule = [
    { time: EVENTS.cruise.time, text: t.cruiseDeparture },
    {
      time: `${EVENTS.cruise.time} – ${EVENTS.cruise.endTime}`,
      text: t.cruiseCocktails,
    },
    { time: EVENTS.cruise.returnTime, text: t.cruiseReturn },
  ];

  const weddingSchedule = [
    { time: EVENTS.wedding.time, text: t.weddingArrival },
    { time: "", text: t.ceremony },
    { time: "", text: t.banquet },
    { time: "", text: t.party },
    { time: "", text: t.afterParty },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 px-6 overflow-hidden"
    >
      {/* Curtains */}
      <img
        src={IMAGES.curtainLeft}
        alt=""
        className="absolute w-[50%] md:w-[32%] max-w-none pointer-events-none select-none z-0"
        style={{
          top: "2%",
          left: "-1.5rem",
          transformOrigin: "left top",
          opacity: inView ? 1 : 0,
          transform: inView
            ? "translateX(0) scaleX(1)"
            : "translateX(-8%) scaleX(0.95)",
          transition:
            "opacity 1.4s cubic-bezier(.25,.46,.45,.94), transform 1.4s cubic-bezier(.25,.46,.45,.94)",
        }}
      />
      <img
        src={IMAGES.curtainRight}
        alt=""
        className="absolute w-[50%] md:w-[32%] max-w-none pointer-events-none select-none z-0"
        style={{
          top: "2%",
          right: "-1.5rem",
          transformOrigin: "right top",
          opacity: inView ? 1 : 0,
          transform: inView
            ? "translateX(0) scaleX(1)"
            : "translateX(8%) scaleX(0.95)",
          transition:
            "opacity 1.4s cubic-bezier(.25,.46,.45,.94) 0.15s, transform 1.4s cubic-bezier(.25,.46,.45,.94) 0.15s",
        }}
      />

      <div className="relative z-20 max-w-[260px] mx-auto pt-32 md:pt-44">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-2">
            {t.weddingWeekend}
          </h2>
          <p className="font-body text-sm tracking-[0.25em] uppercase text-foreground/50 mb-1">
            {t.itinerary}
          </p>
          <p className="text-foreground/60 font-body text-base tracking-wide">
            {t.weekendDates}
          </p>
        </div>

        <div className="space-y-16">
          {/* Wedding day */}
          <div className="relative">
            <div className="text-center mb-8">
              <h3 className="font-display text-5xl md:text-6xl text-foreground mb-1 leading-tight">
                {t.weddingLabel}
              </h3>
              <p className="font-body text-base text-foreground/50 tracking-wide mb-4">
                {t.weddingDate}
              </p>
            </div>
            <div className="relative max-w-[280px] mx-auto pl-6">
              <div className="space-y-6">
                {weddingSchedule.map((item, i) => (
                  <TimelineItem
                    key={i}
                    time={item.time}
                    text={item.text}
                    isLast={i === weddingSchedule.length - 1}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -right-12 -bottom-4">
              <img
                src={IMAGES.flowerVase}
                alt=""
                className="w-36 h-auto pointer-events-none select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
