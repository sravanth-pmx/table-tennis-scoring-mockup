import React from 'react';
import { useParams } from 'react-router-dom';
import { matches } from '../data/mockData';

const MatchDetailsPage = () => {
    const { matchId } = useParams();
    const match = matches.find(m => m.id === matchId) || matches[0]; // fallback to first match for demo

    // Mock stats
    const stats = [
        { label: 'Aces', a: 4, b: 2 },
        { label: 'Service Errors', a: 1, b: 3 },
        { label: 'Max Point Streak', a: 6, b: 4 },
        { label: 'Backhand Winners', a: 12, b: 8 },
        { label: 'Forehand Winners', a: 15, b: 18 },
    ];

    const timeline = [
        { id: 1, set: 4, score: '4-2', text: 'Vikram Malhotra wins point on serve', type: 'point' },
        { id: 2, set: 4, score: '3-2', text: 'Arjun Das unforced error', type: 'error' },
        { id: 3, set: 4, score: '2-2', text: 'Long rally (12 shots) won by Vikram', type: 'rally' },
    ];

    return (
        <div className="space-y-6">
            {/* 1. Broadcast Strip Header */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden shadow-lg">
                {/* Top Info Bar */}
                <div className="bg-slate-950 px-6 py-2 flex justify-between items-center text-xs font-bold tracking-widest uppercase text-slate-400">
                    <span>{match.category} • Quarter Final</span>
                    <span>Table {match.table}</span>
                </div>

                {/* Score Content */}
                <div className="p-8 flex items-center justify-between">
                    {/* Player A */}
                    <div className="flex items-center gap-6">
                        <img src={match.playerA.photo} className="w-24 h-24 rounded-full border-4 border-slate-800 object-cover" />
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{match.playerA.name}</h1>
                            <p className="text-slate-400 font-medium tracking-wide uppercase">{match.playerA.club}</p>
                        </div>
                    </div>

                    {/* Center Score */}
                    <div className="flex flex-col items-center px-12 border-x border-slate-800">
                        <div className="text-6xl font-mono-nums font-bold tracking-tighter flex gap-8">
                            <span className={match.currentScore.a > match.currentScore.b ? 'text-blue-400' : 'text-white'}>{match.setsWon?.playerA || 2}</span>
                            <span className="text-slate-700">-</span>
                            <span className={match.currentScore.b > match.currentScore.a ? 'text-red-400' : 'text-white'}>{match.setsWon?.playerB || 1}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">SETS</span>
                    </div>

                    {/* Player B */}
                    <div className="flex items-center gap-6 text-right">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{match.playerB.name}</h1>
                            <p className="text-slate-400 font-medium tracking-wide uppercase">{match.playerB.club}</p>
                        </div>
                        <img src={match.playerB.photo} className="w-24 h-24 rounded-full border-4 border-slate-800 object-cover" />
                    </div>
                </div>

                {/* Current Game Strip */}
                <div className="bg-slate-800 px-6 py-3 flex justify-center gap-12 font-mono-nums font-bold text-xl">
                    <span className="text-blue-300">11</span>
                    <span className="text-slate-500 text-sm py-1">SET 1</span>
                    <span className="text-red-300">8</span>

                    <div className="w-px bg-slate-700 mx-4" />

                    <span className="text-blue-300">9</span>
                    <span className="text-slate-500 text-sm py-1">SET 2</span>
                    <span className="text-red-300">11</span>

                    <div className="w-px bg-slate-700 mx-4" />

                    <span className="text-white text-2xl">4</span>
                    <span className="text-red-500 text-sm py-2 animate-pulse uppercase tracking-widest">Game {match.currentSet}</span>
                    <span className="text-white text-2xl">2</span>
                </div>
            </div>

            {/* 2. Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: Timeline (2 cols) */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Match Commentary</h3>
                    <div className="bento-card p-0">
                        {timeline.map((event, i) => (
                            <div key={event.id} className="p-4 border-b border-slate-100 flex gap-4 items-start">
                                <div className="flex flex-col items-center">
                                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">SET {event.set}</span>
                                    <span className="block font-mono-nums font-bold text-slate-900">{event.score}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-700">{event.text}</p>
                                </div>
                            </div>
                        ))}
                        <div className="p-4 bg-slate-50 text-center text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-slate-600">
                            Load More
                        </div>
                    </div>
                </div>

                {/* Right: Stats (1 col) */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Match Statistics</h3>
                    <div className="bento-card p-6">
                        <div className="space-y-6">
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                        <span>{stat.a}</span>
                                        <span>{stat.label}</span>
                                        <span>{stat.b}</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full flex overflow-hidden">
                                        <div style={{ width: `${(stat.a / (stat.a + stat.b)) * 100}%` }} className="bg-blue-600" />
                                        <div className="flex-1 bg-red-600" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MatchDetailsPage;
