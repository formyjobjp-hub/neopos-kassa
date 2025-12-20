import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { LayoutGrid, UtensilsCrossed, ClipboardList, Wallet, Settings } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuthStore();

    const navItems = [
        { name: 'Hall', path: '/hall', icon: LayoutGrid },
        { name: 'Order', path: '/menu', icon: UtensilsCrossed },
        { name: 'Waiting', path: '/waiting', icon: ClipboardList },
        { name: 'Checkout', path: '/checkout', icon: Wallet }
    ];

    return (
        <header className="h-[80px] bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
            <div className="flex items-center gap-12">
                <h1 className="text-2xl font-black tracking-tighter text-brand">NEO<span className="text-gray-800">POS</span></h1>

                <nav className="flex items-center gap-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                flex flex-col items-center justify-center px-6 py-2 rounded-2xl transition-all duration-200
                ${isActive ? 'bg-brand text-white shadow-lg hover:text-white' : 'text-gray-400 hover:bg-gray-50 hover:text-brand'}
              `}
                        >
                            <item.icon className="w-6 h-6 mb-1" />
                            <span className="text-sm font-bold uppercase tracking-wider">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">{user?.first_name || 'Waiter'}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{user?.role || 'Kassir'}</p>
                </div>

                <div className="relative group cursor-pointer">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <Settings className="w-6 h-6 text-gray-600" />
                    </div>

                    <div className="absolute right-0 top-14 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 translate-y-2 group-hover:translate-y-0">
                        <button
                            onClick={logout}
                            className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition-colors font-bold text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
