import React, { useState } from 'react';
import { players } from '../data/mockData';
import { Search, Filter, Trophy, TrendingUp, Activity, X } from 'lucide-react';

const PlayersPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedGender, setSelectedGender] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    // Filtering Logic
    const filteredPlayers = players.filter(player => {
        const matchesCategory = selectedCategory === 'All' || player.category === selectedCategory;
        const matchesGender = selectedGender === 'All' || player.gender === selectedGender;
        const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesGender && matchesSearch;
    });

    const categories = ['All', 'Senior', 'U-19', 'U-15', 'U-13', 'U-11', 'U-9', 'Veteran'];
    const genders = ['All', 'Male', 'Female'];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Sidebar Filters */}
                <div className="w-full lg:w-64 space-y-8">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Filters
                        </h3>

                        <div className="space-y-6">
                            {/* Category Filter */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Category</label>
                                <div className="space-y-1">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedCategory === cat
                                                    ? 'bg-blue-700 text-white shadow-sm'
                                                    : 'text-slate-600 hover:bg-slate-100'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Gender Filter */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Gender</label>
                                <div className="space-y-1">
                                    {genders.map(gen => (
                                        <button
                                            key={gen}
                                            onClick={() => setSelectedGender(gen)}
                                            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedGender === gen
                                                    ? 'bg-blue-700 text-white shadow-sm'
                                                    : 'text-slate-600 hover:bg-slate-100'
                                                }`}
                                        >
                                            {gen}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Players Database</h1>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Find a player..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-700 focus:border-transparent shadow-sm w-64"
                            />
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                    </div>

                    {/* Players Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredPlayers.map(player => (
                            <div
                                key={player.id}
                                onClick={() => setSelectedPlayer(player)}
                                className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden ring-2 ring-slate-50 group-hover:ring-blue-100 transition-all">
                                    <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{player.name}</h3>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">{player.club}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{player.category}</span>
                                        <span className="text-[10px] text-slate-400">Rank #{player.rank}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPlayers.length === 0 && (
                        <div className="text-center py-12 text-slate-500">
                            No players found matching your criteria.
                        </div>
                    )}
                </div>
            </div>

            {/* Detailed Player Modal */}
            {selectedPlayer && (
                <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedPlayer(null)}>
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div className="relative h-48 bg-slate-900 overflow-hidden">
                            <div className="absolute inset-0 bg-blue-900/20" />
                            <img src={selectedPlayer.photo} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm" alt="" />
                            <button
                                onClick={() => setSelectedPlayer(null)}
                                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors backdrop-blur-md"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-0 left-0 p-8 flex items-end gap-6">
                                <div className="w-32 h-32 rounded-xl bg-white p-1 shadow-lg -mb-12 relative z-10">
                                    <img src={selectedPlayer.photo} className="w-full h-full object-cover rounded-lg" alt="" />
                                </div>
                                <div className="mb-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">{selectedPlayer.category}</span>
                                        <span className="text-white/80 text-xs font-bold uppercase tracking-wider">{selectedPlayer.gender}</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight">{selectedPlayer.name}</h2>
                                    <p className="text-blue-200 font-medium">{selectedPlayer.club}</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="pt-16 px-8 pb-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                                {/* Key Stats */}
                                <div className="space-y-6">
                                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Season Stats</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-2xl font-bold text-slate-900 font-mono-nums">{selectedPlayer.stats?.winRate}%</p>
                                                <p className="text-xs font-medium text-slate-500">Win Rate</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-slate-900 font-mono-nums">#{selectedPlayer.rank}</p>
                                                <p className="text-xs font-medium text-slate-500">National Rank</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-slate-900 font-mono-nums">{selectedPlayer.stats?.matches}</p>
                                                <p className="text-xs font-medium text-slate-500">Matches Played</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-slate-900 font-mono-nums">{selectedPlayer.stats?.pointsWon}</p>
                                                <p className="text-xs font-medium text-slate-500">Points Won</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Equipment</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Blade</p>
                                                <p className="text-sm font-bold text-slate-900">{selectedPlayer.equipment?.blade || 'Standard'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Rubbers</p>
                                                <p className="text-sm font-bold text-slate-900">{selectedPlayer.equipment?.rubber || 'Standard'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Guide & History */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <TrendingUp className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Recent Form</h4>
                                            <div className="flex items-center gap-1 mt-1">
                                                {['W', 'W', 'L', 'W', 'W'].map((res, i) => (
                                                    <span key={i} className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${res === 'W' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {res}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-4">Recent Matches</h4>
                                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                                            {[1, 2, 3].map((match) => (
                                                <div key={match} className="p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-mono text-slate-400">12 Dec</span>
                                                        <span className="font-medium text-sm text-slate-700">vs. Rohan Mehta</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-bold text-sm text-green-600">Won</span>
                                                        <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-1 rounded">3 - 1</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayersPage;
