import { useLanguage } from "../context/LanguageContext";
import { HOTELS } from "../data/config";

export default function HotelsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-2">
            {t.whereToStay}
          </h2>
          <p className="font-body text-foreground/50 tracking-[0.25em] uppercase text-sm">
            {t.recommendedHotels}
          </p>
        </div>

        <div className="space-y-12">
          {HOTELS.map((hotel, i) => (
            <div key={hotel.name} className="relative text-center">
              <div
                className={`relative z-0 flex mb-4 ${
                  i === 1
                    ? "justify-center"
                    : i === 2
                      ? "justify-end pr-4"
                      : "justify-start -ml-8 md:-ml-16"
                }`}
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-56 md:w-72 h-auto drop-shadow-sm pointer-events-none select-none"
                />
              </div>
              <div className="relative z-10">
                <h3 className="font-display text-4xl md:text-5xl text-foreground mb-1 leading-tight">
                  {hotel.name}
                </h3>
                <p className="font-display text-4xl md:text-5xl text-foreground mb-1">
                  {hotel.price}
                </p>
                <p className="font-body text-sm text-foreground/50 tracking-wide mb-2">
                  {t.priceDetails}
                </p>
                {hotel.bookingUrl ? (
                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm tracking-[0.15em] uppercase text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/20 pb-1"
                  >
                    Book Now
                  </a>
                ) : (
                  <p className="font-body text-sm tracking-[0.15em] uppercase text-foreground/40 italic">
                    {t.bookingSoon}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
