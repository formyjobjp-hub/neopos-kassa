import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

import i18n from '@/i18n/config'; // Direct access to the singleton

export const LanguageSwitcher = () => {
    const { t } = useTranslation(); // Just for re-render
    const [isOpen, setIsOpen] = React.useState(false);
    const [, forceUpdate] = React.useReducer(x => x + 1, 0); // Force re-render trick

    const languages = [
        { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
    ];

    const currentLang = languages.find(lang => i18n.language.startsWith(lang.code)) || languages[0];

    const changeLanguage = async (langCode: string) => {
        console.log('🌍 Changing language to:', langCode);
        await i18n.changeLanguage(langCode);
        localStorage.setItem('i18nextLng', langCode);
        console.log('✅ Language changed successfully');
        setIsOpen(false);
        forceUpdate(); // Force component tree to re-render
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="text-body font-semibold text-gray-700">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-[100]"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown - MUST be above backdrop */}
                    <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[101]">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('🖱️ Button clicked:', lang.code);
                                    changeLanguage(lang.code);
                                }}
                                className={`
                                    w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3
                                    ${i18n.language === lang.code ? 'bg-brand/5 text-brand font-bold' : 'text-gray-700'}
                                `}
                            >
                                <span className="text-heading-sm">{lang.flag}</span>
                                <span className="text-body">{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
