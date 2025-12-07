import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-8">
                <Outlet />
            </main>

            <footer className="border-t border-slate-200 bg-white py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm text-slate-400">© 2025 State Table Tennis Association. Official Data Partner.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
