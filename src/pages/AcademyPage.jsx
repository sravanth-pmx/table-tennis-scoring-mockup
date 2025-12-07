import React from 'react';
import { Target, Medal, Users } from 'lucide-react';

const AcademyPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">High Performance Academy</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Nurturing the next generation of champions through word-class coaching, sports science, and competitive exposure.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                    { icon: Target, title: "Elite Coaching", desc: "Structured training programs designed by Olympic-level coaches." },
                    { icon: Medal, title: "Talent ID", desc: "National scouting programs to identify potential at U-9 and U-11 levels." },
                    { icon: Users, title: "Residential Camps", desc: "State-of-the-art facilities for focused, year-round development." }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <item.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 rounded-3xl p-12 text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-6">Join the Program</h2>
                    <button className="bg-white text-slate-900 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors">
                        Apply for Trials
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AcademyPage;
