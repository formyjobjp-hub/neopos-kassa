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
                    dark: '#1C1917', // Stone 900 (Warm Black)
                    gray: '#78716C', // Stone 500 (Warm Gray Text)
                    'gray-bg': '#F5F5F4' // Stone 100
                },
                gray: {
                    50: '#FAFAF9',
                    100: '#F5F5F4',
                    200: '#E7E5E4',
                    300: '#D6D3D1',
                    400: '#A8A29E',
                    500: '#78716C',
                    600: '#57534E',
                    700: '#44403C',
                    800: '#292524',
                    900: '#1C1917',
                }
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
            'tablet': '640px',
            'laptop': '1024px',
            'desktop': '1280px',
            'fhd': '1920px',
        },
    },
    plugins: [],
}
