import { useLanguage } from "../context/LanguageContext";

// June 2026 starts on Monday
const JUNE_DAYS = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  null,
  null,
  null,
  null,
  null,
];

export default function CalendarSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 px-6">
      <div style={{ maxWidth: "420px", margin: "0 auto", textAlign: "center" }}>
        <p className="font-display text-5xl md:text-6xl text-foreground mb-10 italic tracking-wide">
          {t.calendarMonth}
        </p>

        {/* Day headers */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}
          className="mb-2"
        >
          {t.calendarDays.map((d) => (
            <div
              key={d}
              className="font-body tracking-[0.12em] uppercase text-foreground/40 text-center py-2"
              style={{ fontSize: "13px" }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            rowGap: "0.25rem",
          }}
        >
          {JUNE_DAYS.map((day, i) => {
            if (!day)
              return <div key={`e-${i}`} style={{ aspectRatio: "1" }} />;

            const isEvent = day === 24;

            return (
              <div
                key={day}
                className={`flex items-center justify-center font-display transition-colors ${
                  isEvent
                    ? "rounded-full bg-foreground text-background"
                    : "text-foreground/60"
                }`}
                style={{ aspectRatio: "1", fontSize: "1.2rem" }}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-10 space-y-2">
          <p
            className="font-body tracking-[0.15em] uppercase text-foreground/50"
            style={{ fontSize: "13px" }}
          >
            24 – {t.weddingLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
