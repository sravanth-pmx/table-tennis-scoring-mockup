import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, UserCircle, Menu } from 'lucide-react';

import { useApp } from '../context/AppContext';

const Header = () => {
    const { user } = useApp();
    const location = useLocation();
    const isDark = location.pathname.includes('/live-scoring');

    if (isDark) return null;

    return (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
            {/* Top Bar: Branding */}
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    {/* Logo Icon */}
                    <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center rounded-lg font-bold text-xl tracking-tighter">
                        ST
                    </div>
                    {/* Text Logos */}
                    <div className="flex flex-col justify-center h-full">
                        <span className="font-bold text-xl tracking-tight text-slate-900 leading-none">STTA</span>
                        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-none mt-1">Table Tennis. For All. For Life.</span>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-3 pr-8 py-1.5 bg-slate-100 border-none rounded-full text-sm w-48 focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                        />
                        <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    {/* Login */}
                    <Link to="/login" className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-700 transition-colors bg-slate-100 px-4 py-2 rounded-full hover:bg-blue-50">
                        <UserCircle className="w-4 h-4" />
                        <span>Login</span>
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    <NavItem to="/" label="Home" active={location.pathname === '/'} />
                    <NavItem to="/matches" label="Live Scores" active={location.pathname.startsWith('/matches')} />
                    <NavItem to="/news" label="News" active={location.pathname.startsWith('/news')} />
                    <NavItem to="/events" label="Events" active={location.pathname.startsWith('/events')} />
                    <NavItem to="/rankings" label="Rankings" active={location.pathname.startsWith('/rankings')} />
                    <NavItem to="/players" label="Players" active={location.pathname.startsWith('/players')} />
                    <NavItem to="/academy" label="Academy & Training" active={location.pathname.startsWith('/academy')} />

                    {/* Umpire Specific Tab */}
                    {user?.role === 'umpire' && (
                        <Link
                            to="/umpire/schedule"
                            className="ml-4 px-4 py-3 text-sm font-bold bg-red-600 text-white rounded-t-lg hover:bg-red-700 transition-colors shadow-sm"
                        >
                            UMPIRE ZONE
                        </Link>
                    )}
                </nav>
            </div>
        </div>
    );
};

const NavItem = ({ to, label, active }) => (
    <Link
        to={to}
        className={`px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${active
            ? 'border-blue-700 text-blue-700'
            : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
    >
        {label}
    </Link>
);

export default Header;
