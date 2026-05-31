// Diana & Richard Wedding - RSVP Handler
// Integrates with Firebase Firestore for real-time guest registrations

// Dynamic Firebase Configuration (will be populated with actual keys upon deployment)
const firebaseConfig = {
  apiKey: "AIzaSyDRCWgMGFaZ5biANBzBL4qJ2prDOnQprcQ",
  authDomain: "diana-richard-inv-17482.firebaseapp.com",
  projectId: "diana-richard-inv-17482",
  storageBucket: "diana-richard-inv-17482.firebasestorage.app",
  messagingSenderId: "421878216841",
  appId: "1:421878216841:web:fbdab82820194ae5162e58"
};

// Initialize Firebase dynamically via modular CDN imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let db;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

// Translations for Dialogs and Toast Messages
const translations = {
  en: {
    validName: "Please enter your full name.",
    validEmail: "Please enter a valid email address.",
    validEvent: "Please select at least one event you will be attending.",
    submitting: "Submitting response...",
    successAcceptTitle: "With Gratitude",
    successAcceptDesc: "We are delighted that you will be celebrating with us.<br>Thank you for being part of our story.",
    successAcceptSub: "We look forward to welcoming you on the Bosphorus!",
    successDeclineTitle: "With Warmth",
    successDeclineDesc: "We are sorry to learn that you are unable to join us.<br>You will be in our thoughts on the day.",
    successDeclineSub: "Thank you for letting us know.",
    errorTitle: "Submission Error",
    errorDesc: "We were unable to record your response. Kindly try again or contact the couple directly.",
    close: "Close"
  },
  de: {
    validName: "Bitte geben Sie Ihren vollständigen Namen ein.",
    validEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    validEvent: "Bitte wählen Sie mindestens eine Veranstaltung aus, an der Sie teilnehmen werden.",
    submitting: "Antwort wird gesendet...",
    successAcceptTitle: "Mit Dankbarkeit",
    successAcceptDesc: "Wir freuen uns sehr, dass Sie mit uns feiern werden.<br>Danke, dass Sie Teil unserer Geschichte sind.",
    successAcceptSub: "Wir freuen uns darauf, Sie auf dem Bosporus zu begrüßen!",
    successDeclineTitle: "In Verbundenheit",
    successDeclineDesc: "Es tut uns leid zu erfahren, dass Sie nicht dabei sein können.<br>Wir werden am Tag der Hochzeit an Sie denken.",
    successDeclineSub: "Vielen Dank für Ihre Rückmeldung.",
    errorTitle: "Fehler beim Senden",
    errorDesc: "Ihre Antwort konnte leider nicht übermittelt werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.",
    close: "Schließen"
  }
};

// Helper: Determine the active language from the DOM toggle buttons
function getActiveLanguage() {
  const deButton = document.querySelector('button'); // First buttons are language buttons
  const buttons = Array.from(document.querySelectorAll('button'));
  const deToggle = buttons.find(b => b.textContent.trim() === 'DE');
  
  if (deToggle && deToggle.classList.contains('bg-foreground')) {
    return 'de';
  }
  return 'en';
}

// Helper: Show a premium toast notification
function showToast(message, isError = false) {
  // Remove existing toast if any
  const existing = document.getElementById('wedding-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'wedding-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 10000;
    background: ${isError ? '#7f1d1d' : '#1e293b'};
    color: #f8fafc;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15), 0 0 1px rgba(255,255,255,0.2) inset;
    font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
    font-size: 14px;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  
  const icon = document.createElement('span');
  icon.innerHTML = isError ? '✕' : '✓';
  icon.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    font-weight: bold;
    font-size: 11px;
  `;
  
  const text = document.createElement('span');
  text.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(text);
  document.body.appendChild(toast);

  // Trigger smooth reveal animation
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 50);

  // Auto-dismiss after 4 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Helper: Render a beautiful premium Success Modal
function showSuccessModal(isAttending, lang) {
  const t = translations[lang];
  const title = isAttending ? t.successAcceptTitle : t.successDeclineTitle;
  const desc = isAttending ? t.successAcceptDesc : t.successDeclineDesc;
  const sub = isAttending ? t.successAcceptSub : t.successDeclineSub;

  const overlay = document.createElement('div');
  overlay.id = 'wedding-success-overlay';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 100000;
    background: rgba(10, 10, 10, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.5s ease;
    padding: 20px;
  `;

  const modal = document.createElement('div');
  modal.style.cssText = `
    background: #fdfbf7;
    color: #1a1a1a;
    border: 1px solid rgba(197, 160, 89, 0.3); /* Gold tint */
    border-radius: 24px;
    max-width: 480px;
    width: 100%;
    padding: 48px 32px;
    text-align: center;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transform: scale(0.9);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  `;

  // Golden accent column illustrations inside the success modal to echo original design aesthetics
  const leftDecoration = document.createElement('div');
  leftDecoration.style.cssText = `
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8px;
    background: linear-gradient(180deg, #c5a059 0%, #e0c890 50%, #c5a059 100%);
    opacity: 0.8;
  `;
  const rightDecoration = leftDecoration.cloneNode(true);
  rightDecoration.style.left = 'auto';
  rightDecoration.style.right = '0';

  modal.appendChild(leftDecoration);
  modal.appendChild(rightDecoration);

  // Monogram image to make it elegant
  const monogram = document.createElement('img');
  monogram.src = 'images/monogram-dd4gsvtc.png';
  monogram.alt = 'D&R';
  monogram.style.cssText = `
    width: 64px;
    height: auto;
    margin: 0 auto 24px auto;
    display: block;
    opacity: 0.9;
  `;
  modal.appendChild(monogram);

  // Title
  const heading = document.createElement('h2');
  heading.style.cssText = `
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 400;
    color: #1a1a1a;
    margin: 0 0 16px 0;
    letter-spacing: 0.05em;
  `;
  heading.textContent = title;
  modal.appendChild(heading);

  // Divider
  const divider = document.createElement('div');
  divider.style.cssText = `
    width: 40px;
    height: 1px;
    background: rgba(26,26,26,0.15);
    margin: 16px auto;
  `;
  modal.appendChild(divider);

  // Main Description
  const bodyText = document.createElement('p');
  bodyText.style.cssText = `
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: rgba(26,26,26,0.7);
    margin: 0 0 20px 0;
  `;
  bodyText.innerHTML = desc;
  modal.appendChild(bodyText);

  // Subtext
  const subText = document.createElement('p');
  subText.style.cssText = `
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 18px;
    color: #c5a059;
    margin: 0 0 32px 0;
  `;
  subText.textContent = sub;
  modal.appendChild(subText);

  // Close Button
  const closeBtn = document.createElement('button');
  closeBtn.style.cssText = `
    background: #1a1a1a;
    color: #fdfbf7;
    border: none;
    border-radius: 8px;
    padding: 12px 32px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.3s ease;
  `;
  closeBtn.textContent = t.close;
  closeBtn.addEventListener('mouseenter', () => closeBtn.style.background = '#333');
  closeBtn.addEventListener('mouseleave', () => closeBtn.style.background = '#1a1a1a');
  closeBtn.addEventListener('click', () => {
    overlay.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    setTimeout(() => {
      overlay.remove();
      // Scroll smoothly back to top after a short delay
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  });
  modal.appendChild(closeBtn);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Trigger animations
  setTimeout(() => {
    overlay.style.opacity = '1';
    modal.style.transform = 'scale(1)';
  }, 50);
}

// CAPTURING INTERCEPTION SYSTEM
// We listen to "click" in the capture phase on document to intercept before the React bundler handles it
document.addEventListener('click', async function(event) {
  const submitBtn = event.target.closest('button[type="submit"]');
  if (!submitBtn) return;

  // Verify this is the RSVP section submission
  const form = submitBtn.closest('form');
  if (!form || !form.closest('#rsvp')) return;

  // Stop React from seeing this click event entirely!
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  const lang = getActiveLanguage();
  const t = translations[lang];

  // 1. EXTRACT DATA DIRECTLY FROM THE DOM
  const nameInput = document.querySelector('input[placeholder="Full name"]');
  const emailInput = document.querySelector('input[placeholder="Email address"]');
  
  const fullName = nameInput ? nameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  
  // Attending choice (Radix button states)
  const acceptBtn = document.getElementById('yes');
  const isAttending = acceptBtn ? acceptBtn.getAttribute('data-state') === 'checked' : true;

  // Selected events
  const cruiseBtn = document.getElementById('event-cruise');
  const weddingBtn = document.getElementById('event-wedding');
  
  const attendsCruise = cruiseBtn ? cruiseBtn.getAttribute('aria-checked') === 'true' : false;
  const attendsWedding = weddingBtn ? weddingBtn.getAttribute('aria-checked') === 'true' : false;
  
  // Guest count
  const guestSpan = document.querySelector('span.w-10.text-center');
  const guestCount = parseInt(guestSpan ? guestSpan.textContent : "1", 10);
  
  // Children choice
  const childYesBtn = document.getElementById('children-yes');
  const hasChildren = childYesBtn ? childYesBtn.getAttribute('data-state') === 'checked' : false;

  // Message
  const msgTextarea = document.getElementById('message');
  const message = msgTextarea ? msgTextarea.value.trim() : "";

  // 2. RUN FRONTEND VALIDATION
  if (!fullName) {
    showToast(t.validName, true);
    if (nameInput) nameInput.focus();
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showToast(t.validEmail, true);
    if (emailInput) emailInput.focus();
    return;
  }

  if (isAttending && !attendsCruise && !attendsWedding) {
    showToast(t.validEvent, true);
    return;
  }

  // 3. SUBMIT TO FIRESTORE DATABASE
  submitBtn.disabled = true;
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = `<span class="flex items-center gap-2">${t.submitting}</span>`;

  try {
    if (!db) throw new Error("Firestore not initialized");

    const payload = {
      fullName,
      email,
      attending: isAttending ? "yes" : "no",
      guestCount: isAttending ? guestCount : 0,
      events: isAttending ? {
        cruise: attendsCruise,
        wedding: attendsWedding
      } : { cruise: false, wedding: false },
      children: isAttending ? (hasChildren ? "yes" : "no") : "no",
      message,
      submittedAt: serverTimestamp()
    };

    await addDoc(collection(db, "rsvps"), payload);

    // Reset Form Fields
    if (nameInput) nameInput.value = "";
    if (emailInput) emailInput.value = "";
    if (msgTextarea) msgTextarea.value = "";

    // Show Beautiful Success Overlay
    showSuccessModal(isAttending, lang);

  } catch (error) {
    console.error("Submission failed:", error);
    showToast(t.errorDesc, true);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}, true); // Important: execute in the capturing phase!
