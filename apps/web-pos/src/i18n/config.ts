import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// UZ
import uzCommon from './locales/uz/common.json';
import uzAuth from './locales/uz/auth.json';
import uzMenu from './locales/uz/menu.json';
import uzCart from './locales/uz/cart.json';
import uzHall from './locales/uz/hall.json';
import uzCheckout from './locales/uz/checkout.json';

// RU
import ruCommon from './locales/ru/common.json';
import ruAuth from './locales/ru/auth.json';
import ruMenu from './locales/ru/menu.json';
import ruCart from './locales/ru/cart.json';
import ruHall from './locales/ru/hall.json';
import ruCheckout from './locales/ru/checkout.json';

// EN
import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enMenu from './locales/en/menu.json';
import enCart from './locales/en/cart.json';
import enHall from './locales/en/hall.json';
import enCheckout from './locales/en/checkout.json';

// ----------------------------------------------------------------------
// I18N CONFIGURATION
// ----------------------------------------------------------------------

const resources = {
    uz: {
        common: uzCommon,
        auth: uzAuth,
        menu: uzMenu,
        cart: uzCart,
        hall: uzHall,
        checkout: uzCheckout
    },
    ru: {
        common: ruCommon,
        auth: ruAuth,
        menu: ruMenu,
        cart: ruCart,
        hall: ruHall,
        checkout: ruCheckout
    },
    en: {
        common: enCommon,
        auth: enAuth,
        menu: enMenu,
        cart: enCart,
        hall: enHall,
        checkout: enCheckout
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
        ns: ['common', 'auth', 'menu', 'cart', 'hall', 'checkout'],

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
