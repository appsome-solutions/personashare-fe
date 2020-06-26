import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import plTranslations from './pl';
import enTranslations from './en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ...plTranslations,
      ...enTranslations,
    },
    lng: window.navigator.language.slice(0, 2),
    fallbackLng: 'en',
    debug: true,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
    },
  });

export default i18n;
