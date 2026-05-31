import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { EVENTS, IMAGES } from "../data/config";

function pad(n) {
  return String(n).padStart(2, "0");
}

function getTimeLeft(targetDateStr) {
  const now = new Date();
  const target = new Date(`${targetDateStr}T${EVENTS.wedding.time}:00`);
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes };
}

export default function CountdownSection() {
  const { t } = useLanguage();
  const [time, setTime] = useState(() => getTimeLeft(EVENTS.wedding.date));

  useEffect(() => {
    const id = setInterval(
      () => setTime(getTimeLeft(EVENTS.wedding.date)),
      60000,
    );
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: t.days, value: time.days },
    { label: t.hours, value: time.hours },
    { label: t.minutes, value: time.minutes },
  ];

  return (
    <section
      id="countdown"
      className="relative py-20 md:py-28 px-6 overflow-hidden"
    >
      <img
        src={IMAGES.columnLeft}
        alt=""
        className="absolute h-full w-auto max-w-none pointer-events-none select-none"
        style={{ left: "-8%", top: "-1%" }}
      />
      <img
        src={IMAGES.columnRight}
        alt=""
        className="absolute h-full w-auto max-w-none pointer-events-none select-none"
        style={{ right: "-8%", top: "-1%" }}
      />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <h2 className="font-display text-5xl md:text-7xl text-foreground mb-2">
          {t.countdown}
        </h2>
        <p className="text-foreground/50 text-sm font-body tracking-[0.25em] uppercase mb-12">
          {t.countdownUntil}
        </p>

        <div className="flex items-center justify-center">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-center">
              <div className="flex flex-col items-center px-5 md:px-8">
                <span className="font-display text-5xl md:text-7xl text-foreground leading-none">
                  {pad(u.value)}
                </span>
                <span className="mt-3 text-xs tracking-[0.25em] uppercase text-foreground/50 font-body">
                  {u.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="w-px h-8 bg-foreground/15" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
