import i18next, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

export const createI18n = (resources: Resource, fallbackLng = 'en') => {
  if (i18next.isInitialized) return i18next;

  i18next
    .use(initReactI18next)
    .init({
      resources,
      lng: Localization.getLocales()[0]?.languageCode ?? fallbackLng,
      fallbackLng,
      interpolation: { escapeValue: false },
    });

  return i18next;
};
