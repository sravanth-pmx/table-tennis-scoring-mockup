import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useApp();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        // Mimic API
        setTimeout(() => {
            login();
            navigate('/'); // Redirect to Home
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Umpire Access</h1>
                    <p className="text-slate-500 text-sm mt-2">Please sign in to access the cockpit.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Umpire ID</label>
                        <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-700/20 outline-none transition-all" placeholder="UMP-2024" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Pin Code</label>
                        <input type="password" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-700/20 outline-none transition-all" placeholder="••••" />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white font-bold rounded-lg py-3 text-base justify-center flex items-center gap-2 hover:bg-corporate-blue transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : 'Login'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-400">Restricted Access • STTA Official Partners Only</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
