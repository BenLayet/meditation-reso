import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import frTranslation from "../locales/fr/translation.json";

const resources = {
  fr: { translation: frTranslation },
};

const detectLocale = () => {
  const stored =
    typeof window !== "undefined" && window.localStorage.getItem("locale");
  if (stored) return stored;
  const nav = typeof navigator !== "undefined" && navigator.language;
  if (nav) {
    const short = nav.split("-")[0];
    if (short === "fr") return "fr";
    if (short === "en") return "en";
  }
  return "fr";
};

i18n.use(initReactI18next).init({
  resources,
  lng: detectLocale(),
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export const setLocale = (lng: string) => {
  i18n.changeLanguage(lng);
  if (typeof window !== "undefined") window.localStorage.setItem("locale", lng);
};

export default i18n;
