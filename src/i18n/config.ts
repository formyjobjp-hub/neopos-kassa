import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import uzCommon from './locales/uz/common.json';
import ruCommon from './locales/ru/common.json';
import enCommon from './locales/en/common.json';

// ----------------------------------------------------------------------
// I18N CONFIGURATION
// ----------------------------------------------------------------------

const resources = {
    uz: {
        common: uzCommon
    },
    ru: {
        common: ruCommon
    },
    en: {
        common: enCommon
    }
};

const savedLanguage = localStorage.getItem('i18nextLng') || 'uz';
console.log('🌍 Initializing i18n with language:', savedLanguage);

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLanguage,
        fallbackLng: 'uz',
        supportedLngs: ['uz', 'ru', 'en'],

        defaultNS: 'common',
        ns: ['common'],

        keySeparator: '.',
        nsSeparator: ':',

        debug: false,

        interpolation: {
            escapeValue: false,
        },

        react: {
            useSuspense: false,
            bindI18n: 'languageChanged',
        }
    });

export default i18n;
