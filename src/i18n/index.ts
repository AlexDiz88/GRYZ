import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import pl from './locales/pl.json'
import ru from './locales/ru.json'
import ua from './locales/ua.json'

export const supportedLngs = ['ua', 'pl', 'ru'] as const
export type AppLanguage = (typeof supportedLngs)[number]

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ua: { translation: ua },
      pl: { translation: pl },
      ru: { translation: ru },
    },
    supportedLngs: [...supportedLngs],
    fallbackLng: 'ua',
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'gryz_lang',
      convertDetectedLanguage: (lng: string) => {
        const base = lng.toLowerCase().split('-')[0]
        if (base === 'uk' || base === 'ua') return 'ua'
        if (base === 'pl') return 'pl'
        if (base === 'ru') return 'ru'
        return 'ua'
      },
    },
  })

export default i18n
