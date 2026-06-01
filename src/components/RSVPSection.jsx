import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { IMAGES, FIREBASE_CONFIG } from "../data/config";
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// Initialize Firebase once
let db;
try {
  const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
  db = getFirestore(app);
} catch (e) {
  console.error("Firebase init failed:", e);
}

function Dialog({ title, body, sub, onClose, closeLabel }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 px-4">
      <div className="bg-background border border-foreground/10 rounded-2xl px-8 py-10 max-w-sm w-full text-center shadow-xl">
        <h3 className="font-display text-3xl text-foreground mb-4">{title}</h3>
        <p
          className="font-body text-base text-foreground/70 leading-relaxed mb-2"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {sub && (
          <p className="font-body text-sm text-foreground/50 italic mt-2">
            {sub}
          </p>
        )}
        <button
          onClick={onClose}
          className="mt-6 font-body text-sm tracking-[0.15em] uppercase border-b border-foreground/30 pb-1 hover:text-foreground/80 transition-colors"
        >
          {closeLabel}
        </button>
      </div>
    </div>
  );
}

export default function RSVPSection() {
  const { t, lang } = useLanguage();

  const [attending, setAttending] = useState("yes");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [dialog, setDialog] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      return setDialog({
        type: "error",
        title: t.errorTitle,
        body: t.validName,
      });
    }

    const normalizedEmail = email.trim();

    if (
      !normalizedEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      return setDialog({
        type: "error",
        title: t.errorTitle,
        body: t.validEmail,
      });
    }

    setSubmitting(true);
    try {
      if (db) {
        await addDoc(collection(db, "rsvps"), {
          language: lang,
          attending,
          name: name.trim(),
          fullName: name.trim(),
          email: normalizedEmail,
          message: message.trim(),
          submittedAt: serverTimestamp(),
        });
      }
      if (attending === "yes") {
        setDialog({
          type: "success",
          title: t.successAcceptTitle,
          body: t.successAcceptDesc,
          sub: t.successAcceptSub,
        });
      } else {
        setDialog({
          type: "decline",
          title: t.successDeclineTitle,
          body: t.successDeclineDesc,
          sub: t.successDeclineSub,
        });
      }
      setName("");
      setEmail("");
      setMessage("");
      setAttending("yes");
    } catch (err) {
      console.error(err);
      setDialog({ type: "error", title: t.errorTitle, body: t.errorDesc });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {dialog && (
        <Dialog
          title={dialog.title}
          body={dialog.body}
          sub={dialog.sub}
          onClose={() => setDialog(null)}
          closeLabel={t.close}
        />
      )}

      <section id="rsvp" className="py-20 md:py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-5xl md:text-7xl text-foreground mb-2">
              {t.rsvp}
            </h2>
            <p className="font-body text-foreground/50 text-sm tracking-[0.25em] uppercase">
              {t.rsvpDeadlineText}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Honeypot */}
            <div
              className="absolute -left-[9999px] opacity-0"
              aria-hidden="true"
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Attending? */}
            <div>
              <label className="font-body text-base tracking-wide text-foreground font-medium block mb-3">
                {t.willYouJoin}
              </label>
              <div className="flex flex-col gap-3">
                {[
                  ["yes", t.yesAttend],
                  ["no", t.noAttend],
                ].map(([val, label]) => (
                  <label
                    key={val}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={attending === val}
                      onClick={() => setAttending(val)}
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        attending === val
                          ? "border-foreground"
                          : "border-foreground/30"
                      }`}
                    >
                      {attending === val && (
                        <span className="w-2 h-2 rounded-full bg-foreground block" />
                      )}
                    </button>
                    <span className="font-body text-base text-foreground">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="font-body text-base tracking-wide text-foreground font-medium block mb-2">
                {t.fullName}
              </label>
              <input
                className="flex h-10 w-full rounded-md border px-3 py-2 text-base bg-transparent border-foreground/20 text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none font-body"
                required
                placeholder={t.fullName}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="font-body text-base tracking-wide text-foreground font-medium block mb-2">
                {t.emailAddress}
              </label>
              <input
                type="email"
                className="flex h-10 w-full rounded-md border px-3 py-2 text-base bg-transparent border-foreground/20 text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none font-body"
                required
                placeholder={t.emailAddress}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Message / Wishes */}
            <div>
              <label className="font-body text-base tracking-wide text-foreground font-medium block mb-2">
                {t.messageForCouple}
              </label>
              <textarea
                className="flex w-full rounded-md border px-3 py-2 text-sm bg-transparent border-foreground/20 text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none min-h-[100px] font-body"
                placeholder={t.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="relative">
              <img
                src={IMAGES.vaseLeft}
                alt=""
                className="absolute -left-20 md:-left-32 -bottom-40 w-36 md:w-48 h-auto pointer-events-none select-none z-20"
              />
              <img
                src={IMAGES.vaseRight}
                alt=""
                className="absolute -right-20 md:-right-32 -bottom-40 w-36 md:w-48 h-auto pointer-events-none select-none z-20"
              />
              <button
                type="submit"
                disabled={submitting}
                className="relative z-10 w-full bg-foreground hover:bg-foreground/90 text-background font-body tracking-[0.15em] uppercase text-sm py-4 rounded-lg border border-foreground/20 flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                  <path d="m21.854 2.147-10.94 10.939" />
                </svg>
                {submitting ? t.submitting : t.submitResponse}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
