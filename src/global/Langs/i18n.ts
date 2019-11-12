import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import plTranslations from './pl';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ...plTranslations,
    },
    lng: 'pl',
    fallbackLng: 'pl',
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
