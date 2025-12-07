import React from 'react';
import { players } from '../data/mockData';

const RankingsPage = () => {
    // Sort players by rank
    const sortedPlayers = [...players].sort((a, b) => a.rank - b.rank);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-6 flex items-center gap-2">
                <span className="bg-blue-700 w-2 h-8 rounded-sm" /> Official Rankings
            </h1>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                            <th className="p-4">Rank</th>
                            <th className="p-4">Player</th>
                            <th className="p-4">Club</th>
                            <th className="p-4 text-right">Points</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {sortedPlayers.map((player) => (
                            <tr key={player.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-mono font-bold text-slate-700">#{player.rank}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img src={player.photo} alt="" className="w-8 h-8 rounded-full bg-slate-200 object-cover" />
                                        <div>
                                            <p className="font-bold text-sm text-slate-900">{player.name}</p>
                                            <p className="text-[10px] text-slate-500 uppercase">{player.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-600">{player.club}</td>
                                <td className="p-4 text-right font-mono font-bold text-slate-900">{player.stats?.pointsWon || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RankingsPage;
