import { useLanguage } from "../context/LanguageContext";
import { COUPLE, EVENTS } from "../data/config";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-20 text-center px-6">
      <img
        src={COUPLE.monogramImage}
        alt={`${COUPLE.person1} & ${COUPLE.person2} monogram`}
        className="w-24 md:w-28 h-auto mx-auto mb-8 pointer-events-none select-none"
      />
      <p className="font-display text-5xl md:text-6xl text-foreground mb-4 leading-tight">
        {COUPLE.person1}{" "}
        <span className="text-3xl md:text-4xl text-foreground/50 italic">
          &amp;
        </span>{" "}
        {COUPLE.person2}
      </p>
      <p className="text-base text-foreground/50 font-body tracking-wide">
        {EVENTS.wedding.displayDate}
      </p>
    </footer>
  );
}
