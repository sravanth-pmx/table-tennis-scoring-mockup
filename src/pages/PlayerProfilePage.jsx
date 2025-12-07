import React from 'react';
import { useParams } from 'react-router-dom';
import { players } from '../data/mockData';
import { Trophy, TrendingUp, Calendar } from 'lucide-react';

const PlayerProfilePage = () => {
    const { playerId } = useParams();
    const player = players.find(p => p.id === playerId) || players[0];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 1. Sidebar Profile (LinkedIn Style) */}
            <div className="space-y-6">
                <div className="bento-card p-6 text-center">
                    <div className="relative inline-block mb-4">
                        <img src={player.photo} alt={player.name} className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-sm" />
                        <div className="absolute bottom-0 right-0 bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white">
                            #{player.rank}
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">{player.name}</h1>
                    <p className="text-slate-500 font-medium uppercase tracking-wider text-sm mb-6">{player.club}</p>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hand</p>
                            <p className="font-semibold text-slate-900">{player.hand}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Points</p>
                            <p className="font-semibold text-slate-900">2,450</p>
                        </div>
                    </div>
                </div>

                <div className="bento-card p-0">
                    <div className="p-4 border-b border-slate-100 font-bold text-sm text-slate-900">Info</div>
                    <div className="p-4 text-sm space-y-3">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Nationality</span>
                            <span className="font-medium text-slate-900">IND</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Age</span>
                            <span className="font-medium text-slate-900">24</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Height</span>
                            <span className="font-medium text-slate-900">1.82m</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Tabs */}
            <div className="lg:col-span-2 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard label="Win Rate" value="68%" icon={<TrendingUp className="w-4 h-4 text-green-600" />} />
                    <StatCard label="Tournaments" value="14" icon={<Trophy className="w-4 h-4 text-yellow-600" />} />
                    <StatCard label="Matches" value="42" icon={<Calendar className="w-4 h-4 text-blue-600" />} />
                </div>

                {/* Match History Table */}
                <div className="bento-card overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-900">Recent Matches</h3>
                        <button className="text-xs font-bold text-blue-700 uppercase tracking-widest">Filtered by 2024</button>
                    </div>

                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Tournament</th>
                                <th className="px-6 py-3">Opponent</th>
                                <th className="px-6 py-3 text-right">Score</th>
                                <th className="px-6 py-3 text-center">Result</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <HistoryRow date="Dec 05" tourney="State Championship" opponent="Arjun Das" score="3-1" result="W" />
                            <HistoryRow date="Nov 22" tourney="Pune Open" opponent="Rohan Mehta" score="3-0" result="W" />
                            <HistoryRow date="Nov 20" tourney="Pune Open" opponent="Karan Singh" score="2-3" result="L" />
                            <HistoryRow date="Oct 15" tourney="Mumbai League" opponent="Siddharth Rao" score="3-1" result="W" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon }) => (
    <div className="bento-card p-4 flex items-center justify-between">
        <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-2xl font-bold text-slate-900 font-mono-nums tracking-tighter">{value}</p>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 md:opacity-100 opacity-50">
            {icon}
        </div>
    </div>
);

const HistoryRow = ({ date, tourney, opponent, score, result }) => (
    <tr className="hover:bg-slate-50/50 transition-colors">
        <td className="px-6 py-4 font-mono-nums text-slate-500">{date}</td>
        <td className="px-6 py-4 font-medium text-slate-900">{tourney}</td>
        <td className="px-6 py-4 text-slate-700">{opponent}</td>
        <td className="px-6 py-4 text-right font-mono-nums font-bold text-slate-900">{score}</td>
        <td className="px-6 py-4 text-center">
            <span className={`inline-block w-6 h-6 rounded text-xs font-bold leading-6 ${result === 'W' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {result}
            </span>
        </td>
    </tr>
);

export default PlayerProfilePage;
