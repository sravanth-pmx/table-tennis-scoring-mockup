import React from 'react';
import { Calendar } from 'lucide-react';

const EventsPage = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">Tournament Calendar</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-blue-50 text-blue-700 p-2 rounded-lg">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dec 2025</span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                            National Ranking Tournament {i}
                        </h3>
                        <p className="text-sm text-slate-500 mb-4">Pune Sports Complex, Maharashtra</p>
                        <div className="flex items-center gap-2">
                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">Senior</span>
                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">Youth</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsPage;
