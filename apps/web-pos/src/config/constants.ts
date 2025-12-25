export const APP_CONFIG = {
    CURRENCY: {
        SYMBOL: 'UZS',
        LOCALE: 'uz-UZ',
        DIGITS: 0,
    },
    TAX: {
        RATE: 0.10, // 10% service charge
        ENABLED: true,
    },
    API: {
        BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
        SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'ws://localhost:8000',
        TIMEOUT: 15000,
    },
    UI: {
        TOUCH_TARGET_SIZE: 44, // px
        ANIMATION_DURATION: 300, // ms
    },
    TABLES: {
        ZONES: ['B', 'M', 'A', 'VIP'] as const,
    },
    FEATURES: {
        ENABLE_MOCK: import.meta.env.VITE_ENABLE_MOCK === 'true',
    }
} as const;
