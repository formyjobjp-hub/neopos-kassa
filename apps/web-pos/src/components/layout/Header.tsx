import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import { Plus, UtensilsCrossed, ClipboardList, Wallet, Settings, Menu, X, LogOut, ConciergeBell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../common';
import { Drawer, Button } from 'antd';

const Header = () => {
    const { user, logout } = useAuthStore();
    const { t } = useTranslation(['common', 'auth']);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: t('navigation.order'), path: '/menu', icon: ConciergeBell },
        { name: t('navigation.hall'), path: '/hall', icon: Plus },
        { name: t('navigation.waiting'), path: '/waiting', icon: ClipboardList },
        { name: t('navigation.checkout'), path: '/checkout', icon: Wallet }
    ];

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="h-[70px] md:h-[80px] bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-header">
            <div className="flex items-center gap-4 md:gap-12">
                {/* Mobile Menu Toggler */}
                <button
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>

                <h1 className="text-heading-sm md:text-heading font-black tracking-tighter text-brand">
                    NEO<span className="text-gray-800">POS</span>
                </h1>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex flex-col items-center justify-center px-6 py-2 rounded-2xl transition-all duration-200
                                ${isActive ? 'bg-brand text-white shadow-lg hover:text-white' : 'text-gray-400 hover:bg-gray-50 hover:text-brand'}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    {item.icon === Plus ? (
                                        <div className={`
                                            w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-colors
                                            ${isActive ? 'bg-white text-brand' : 'bg-brand text-white'}
                                        `}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                    ) : (
                                        <item.icon className="w-6 h-6 mb-1" />
                                    )}
                                    <span className="text-caption uppercase tracking-wider">{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
                <LanguageSwitcher />

                <div className="text-right">
                    <p className="text-body font-bold text-gray-800">{user?.first_name || 'Waiter'}</p>
                    <p className="text-label text-gray-400 uppercase tracking-widest">{user?.role || 'Kassir'}</p>
                </div>

                <div className="relative group cursor-pointer">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <Settings className="w-6 h-6 text-gray-600" />
                    </div>

                    <div className="absolute right-0 top-14 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 translate-y-2 group-hover:translate-y-0 z-dropdown">
                        <button
                            onClick={logout}
                            className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition-colors font-bold text-body flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            {t('buttons.logout')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Actions Summary (Optional or hidden) */}
            <div className="lg:hidden flex items-center gap-3">
                <div className="text-right">
                    <p className="text-sm font-bold text-gray-800 leading-tight">{user?.first_name || 'Waiter'}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{user?.role || 'Kassir'}</p>
                </div>
            </div>

            {/* Mobile Drawer */}
            <Drawer
                placement="left"
                onClose={closeMenu}
                open={isMenuOpen}
                width={280}
                className="lg:hidden"
                styles={{ body: { padding: 0 } }}
                closable={false}
                title={
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-heading-sm font-black tracking-tighter text-brand">
                            NEO<span className="text-gray-800">POS</span>
                        </h1>
                        <button
                            onClick={closeMenu}
                            className="p-2 -mr-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                }
            >
                <div className="flex flex-col h-full bg-white">
                    {/* Drawer Navigation */}
                    <div className="flex-1 py-6 px-4 space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={closeMenu}
                                className={({ isActive }) => `
                                    flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 font-bold
                                    ${isActive ? 'bg-brand text-white shadow-lg hover:text-white' : 'text-gray-600 hover:bg-gray-50'}
                            `}
                            >
                                {({ isActive }) => (
                                    <>
                                        {item.icon === Plus ? (
                                            <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center transition-colors
                                            ${isActive ? 'bg-white text-brand' : 'bg-brand text-white'}
                                        `}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                        ) : (
                                            <item.icon className="w-6 h-6" />
                                        )}
                                        <span className="uppercase tracking-widest text-sm">{item.name}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Drawer Bottom Actions */}
                    <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-6">
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">{t('common:common.language')}</span>
                            <LanguageSwitcher variant="inline" />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-800">{user?.first_name || 'Waiter'}</span>
                                <span className="text-xs text-gray-400 uppercase tracking-widest">{user?.role || 'Kassir'}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </Drawer>
        </header>
    );
};

export default Header;
