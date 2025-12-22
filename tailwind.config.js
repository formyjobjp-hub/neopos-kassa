/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    light: '#22D3EE', // Cyan 400
                    DEFAULT: '#06B6D4', // Cyan 500
                    dark: '#0891B2', // Cyan 600
                },
                success: {
                    DEFAULT: '#10B981', // Emerald 500
                },
                danger: {
                    DEFAULT: '#EF4444', // Red 500
                },
                // Switching to STONE (Warm Gray) to remove blue tint
                background: '#FAFAF9', // Stone 50
                surface: {
                    light: '#FFFFFF', // White
                    DEFAULT: '#FAFAF9', // Stone 50 (Warm background)
                    dark: '#000000', // Black
                    gray: '#000000', // Black (Previously Stone 500)
                    'gray-bg': '#F5F5F4' // Stone 100
                },
                gray: {
                    50: '#FAFAF9',
                    100: '#F5F5F4',
                    200: '#E7E5E4',
                    300: '#57534E', // Darker (Stone 600)
                    400: '#292524', // Darker (Stone 800)
                    500: '#1C1917', // Darker (Stone 900)
                    600: '#000000', // Black
                    700: '#000000', // Black
                    800: '#000000', // Black
                    900: '#000000', // Black
                }
            },
            spacing: {
                // Component-specific spacing
                'card-sm': '16px',      // Kichik kartalar
                'card': '24px',         // Standart kartalar
                'card-lg': '32px',      // Katta kartalar
                'section': '40px',      // Bo'limlar orasidagi bo'shliq
                'page': '48px',         // Sahifa padding'i
                'touch': '44px',        // Minimal touch target (Apple HIG)
            },
            fontSize: {
                // Role-based typography - KATTAROQ VA QALINROQ
                'label': ['11px', { lineHeight: '1.4', fontWeight: '800', letterSpacing: '0.05em' }],      // 10px → 11px, 700 → 800
                'caption': ['14px', { lineHeight: '1.4', fontWeight: '700' }],                             // 12px → 14px, 600 → 700
                'body-sm': ['15px', { lineHeight: '1.5', fontWeight: '500' }],                             // 13px → 15px, 400 → 500
                'body': ['16px', { lineHeight: '1.5', fontWeight: '600' }],                                // 14px → 16px, 400 → 600
                'body-lg': ['18px', { lineHeight: '1.5', fontWeight: '600' }],                             // 16px → 18px, 400 → 600
                'heading-sm': ['20px', { lineHeight: '1.3', fontWeight: '800' }],                          // 18px → 20px, 700 → 800
                'heading': ['28px', { lineHeight: '1.3', fontWeight: '900' }],                             // 24px → 28px, 800 → 900
                'heading-lg': ['36px', { lineHeight: '1.2', fontWeight: '900' }],                          // 32px → 36px, 900 → 900
                'display': ['48px', { lineHeight: '1.1', fontWeight: '900' }],                             // 40px → 48px
            },
            zIndex: {
                // Layering hierarchy
                'base': 0,
                'sidebar': 10,
                'header': 20,
                'dropdown': 30,
                'overlay': 40,
                'modal': 50,
                'toast': 60,
                'tooltip': 70,
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                manrope: ['Manrope', 'sans-serif'],
            },
            boxShadow: {
                'premium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'soft': '0 2px 4px 0 rgba(0, 0, 0, 0.02)',
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '16px',
                '3xl': '24px',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
        screens: {
            'sm': '640px',
            'md': '768px', // Added back missing md
            'lg': '1024px', // Added back missing lg
            'xl': '1280px', // Added back missing xl
            '2xl': '1536px',
            'tablet': '640px', // Legacy support
            'laptop': '1024px', // Legacy support
            'desktop': '1280px', // Legacy support
        },
    },
    plugins: [],
}
