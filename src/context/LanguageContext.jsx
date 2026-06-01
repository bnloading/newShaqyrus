import { createContext, useContext, useEffect, useState } from "react";
import { TRANSLATIONS } from "../data/config";

const LanguageContext = createContext(null);

const DEFAULT_LANGUAGE = "kz";
const LANGUAGE_SLUGS = {
  kz: "/",
  mn: "/mn",
};

function getLanguageFromPath(pathname) {
  if (
    pathname === LANGUAGE_SLUGS.mn ||
    pathname.startsWith(`${LANGUAGE_SLUGS.mn}/`)
  ) {
    return "mn";
  }

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") {
      return DEFAULT_LANGUAGE;
    }

    return getLanguageFromPath(window.location.pathname);
  });

  useEffect(() => {
    const handlePopState = () => {
      setLang(getLanguageFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const nextPath = LANGUAGE_SLUGS[lang] ?? LANGUAGE_SLUGS[DEFAULT_LANGUAGE];
    const { pathname, search, hash } = window.location;

    if (pathname !== nextPath) {
      window.history.replaceState({}, "", `${nextPath}${search}${hash}`);
    }
  }, [lang]);

  const t = TRANSLATIONS[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
