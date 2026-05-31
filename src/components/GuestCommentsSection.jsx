import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FIREBASE_CONFIG } from "../data/config";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

let db;
try {
  const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
  db = getFirestore(app);
} catch (e) {
  console.error("Firebase init failed:", e);
}

export default function GuestCommentsSection() {
  const { t } = useLanguage();
  const [comments, setComments] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (nextIndex) => {
    setActiveIndex((current) => {
      const total = comments.length;
      if (!total) return current;
      return (nextIndex + total) % total;
    });
  };

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(
      collection(db, "rsvps"),
      (snap) => {
        const docs = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((comment) => {
            const message =
              comment.message || comment.text || comment.wish || "";
            return String(message).trim().length > 0;
          })
          .sort((a, b) => {
            const ta =
              a.submittedAt?.toMillis?.() ??
              a.submittedAt ??
              a.createdAt?.toMillis?.() ??
              a.createdAt ??
              0;
            const tb =
              b.submittedAt?.toMillis?.() ??
              b.submittedAt ??
              b.createdAt?.toMillis?.() ??
              b.createdAt ??
              0;
            return tb - ta;
          });
        setComments(docs);
      },
      () => setComments([]),
    );
    return () => unsub();
  }, []);

  // Reset to first slide whenever the comment list changes
  useEffect(() => {
    setActiveIndex(0);
  }, [comments]);

  // Auto-advance carousel
  useEffect(() => {
    if (comments.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % comments.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [comments.length]);

  const activeComment = comments[activeIndex];
  const activeMessage =
    activeComment?.message || activeComment?.text || activeComment?.wish || "";
  const activeName = activeComment?.name || activeComment?.author || "";

  if (!comments.length) {
    return null;
  }

  return (
    <section className="overflow-hidden px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        {/* Title */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-5xl text-foreground md:text-7xl">
            {t.guestCommentsTitle}
          </h2>
          <p className="font-body text-sm uppercase tracking-[0.2em] text-foreground/45">
            {t.guestCommentsSubtitle}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-[2rem] border border-foreground/10 bg-foreground/[0.03] shadow-[0_18px_60px_rgba(40,34,24,0.08)]">
          {/* Slide area — no absolute buttons here */}
          <div className="px-8 py-12 text-center md:px-16 md:py-14">
            <div key={activeIndex} className="animate-fade-in">
              <span className="font-display text-6xl leading-none text-foreground/25 select-none">
                "
              </span>
              <p className="mt-3 font-body text-xl leading-relaxed text-foreground md:text-2xl">
                {activeMessage}
              </p>
            </div>
          </div>

          {/* Author + dots + prev/next */}
          <div className="border-t border-foreground/10 px-8 py-5">
            <p className="mb-4 text-center font-body text-sm font-medium uppercase tracking-[0.3em] text-foreground/60">
              — {activeName}
            </p>
            {comments.length > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => goToSlide(activeIndex - 1)}
                  className="h-8 w-8 rounded-full border border-foreground/20 bg-white/80 text-foreground/60 text-base transition hover:bg-white hover:text-foreground"
                  aria-label={t.previousComment}
                >
                  ‹
                </button>
                <div className="flex gap-2">
                  {comments.map((comment, index) => (
                    <button
                      key={comment.id ? `dot-${comment.id}` : `dot-${index}`}
                      type="button"
                      onClick={() => goToSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? "w-6 bg-foreground/50"
                          : "w-1.5 bg-foreground/20"
                      }`}
                      aria-label={`${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => goToSlide(activeIndex + 1)}
                  className="h-8 w-8 rounded-full border border-foreground/20 bg-white/80 text-foreground/60 text-base transition hover:bg-white hover:text-foreground"
                  aria-label={t.nextComment}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
