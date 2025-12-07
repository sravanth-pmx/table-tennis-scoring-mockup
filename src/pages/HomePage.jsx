import React, { useState } from 'react';
import { matches, news, players } from '../data/mockData';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Trophy, Users, TrendingUp, Clock } from 'lucide-react';

const HomePage = () => {
    // Filter Matches
    const liveMatches = matches.filter(m => m.status === 'live');
    const upcomingMatches = matches.filter(m => m.status === 'scheduled').slice(0, 3);

    // Rankings State
    const [rankingTab, setRankingTab] = useState('men');

    // Mock Rankings Data
    const mensRankings = [
        { rank: 1, name: 'Vikram Menon', points: 2850, change: '+2' },
        { rank: 2, name: 'Arjun Nair', points: 2720, change: '0' },
        { rank: 3, name: 'Ravi Shankar', points: 2680, change: '-1' },
        { rank: 4, name: 'Saurabh Joshi', points: 2510, change: '+3' },
        { rank: 5, name: 'Deepak Yadav', points: 2490, change: '-1' },
    ];

    const womensRankings = [
        { rank: 1, name: 'Priya Nambiar', points: 2650, change: '0' },
        { rank: 2, name: 'Ananya Hegde', points: 2480, change: '+1' },
        { rank: 3, name: 'Meera Patel', points: 2320, change: '+2' },
        { rank: 4, name: 'Kavitha Reddy', points: 2180, change: '-2' },
        { rank: 5, name: 'Nisha Sharma', points: 2050, change: '0' },
    ];

    const currentRankings = rankingTab === 'men' ? mensRankings : womensRankings;

    // Rich News Data
    const featuredNews = {
        id: 1,
        title: "National Championship 2025: Vikram Menon Defends Title Against Rising Star Arjun Nair",
        summary: "The stage is set for an epic showdown in Pune as the veteran Vikram Menon faces the 22-year-old prodigy Arjun Nair in the finals.",
        image: "/table_tennis_hero.png",
        category: "Tournament Focus",
        time: "2h ago"
    };

    const sideNews = [
        { id: 2, title: "STTA Announces New Youth Development Squad for 2026", time: "5h ago", category: "Development" },
        { id: 3, title: "Equipment Check: The Rise of Carbon Blades in Pro Circuit", time: "1d ago", category: "Gear" },
        { id: 4, title: "Regional Qualifiers: Bengaluru Zone Results", time: "1d ago", category: "Results" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* LEFT COLUMN: Hero Content (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Hero Section */}
                        <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg aspect-video">
                            <img
                                src={featuredNews.image}
                                alt="Featured"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 md:p-8">
                                <span className="bg-blue-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block shadow-lg">
                                    {featuredNews.category}
                                </span>
                                <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight max-w-2xl drop-shadow-lg">
                                    {featuredNews.title}
                                </h1>
                                <p className="text-slate-200 line-clamp-2 max-w-xl text-sm md:text-base">
                                    {featuredNews.summary}
                                </p>
                            </div>
                        </div>

                        {/* Quick Stats Bar */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Trophy className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-lg md:text-xl font-bold text-slate-900">24</p>
                                    <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wide">Active Tournaments</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-lg md:text-xl font-bold text-slate-900">1,250+</p>
                                    <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wide">Registered Players</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-lg md:text-xl font-bold text-slate-900">8</p>
                                    <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wide">Live Matches</p>
                                </div>
                            </div>
                        </div>

                        {/* Latest News Grid */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-blue-600 rounded"></span>
                                    Latest News
                                </h2>
                                <Link to="/news" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                    View All <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {sideNews.map(item => (
                                    <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{item.category}</span>
                                            <span className="text-[10px] text-slate-400">{item.time}</span>
                                        </div>
                                        <h3 className="font-semibold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Sidebar (4 cols) */}
                    <div className="lg:col-span-4 space-y-5">

                        {/* Live Scoring Widget */}
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <h3 className="text-white font-bold uppercase tracking-wider text-sm">Live Scores</h3>
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono bg-slate-700 px-2 py-0.5 rounded">TODAY</span>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {liveMatches.length > 0 ? (
                                    liveMatches.slice(0, 2).map(match => (
                                        <Link key={match.id} to={`/match/${match.id}`} className="block p-4 hover:bg-blue-50 transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] uppercase font-bold text-slate-500">{match.category} • {match.stage}</span>
                                                <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded animate-pulse">LIVE</span>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow">
                                                            <img src={match.playerA.photo} className="w-full h-full object-cover" alt="" />
                                                        </div>
                                                        <span className={`font-bold text-sm ${match.currentScore.a > match.currentScore.b ? 'text-slate-900' : 'text-slate-500'}`}>
                                                            {match.playerA.name}
                                                        </span>
                                                    </div>
                                                    <span className="font-mono text-xl font-bold text-slate-900">{match.currentScore.a}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow">
                                                            <img src={match.playerB.photo} className="w-full h-full object-cover" alt="" />
                                                        </div>
                                                        <span className={`font-bold text-sm ${match.currentScore.b > match.currentScore.a ? 'text-slate-900' : 'text-slate-500'}`}>
                                                            {match.playerB.name}
                                                        </span>
                                                    </div>
                                                    <span className="font-mono text-xl font-bold text-slate-900">{match.currentScore.b}</span>
                                                </div>
                                            </div>

                                            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                                                <span>Table {match.table}</span>
                                                <span className="text-blue-600 font-bold">Watch →</span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="p-6 text-center">
                                        <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500 font-medium">No live matches</p>
                                        <p className="text-xs text-slate-400 mt-1">Check back during tournament hours</p>
                                    </div>
                                )}

                                {upcomingMatches.length > 0 && (
                                    <div className="p-3 bg-slate-50">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Coming Up</p>
                                        <p className="text-xs text-slate-600">
                                            {upcomingMatches[0].playerA.name} vs {upcomingMatches[0].playerB.name}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Top Rankings with Tabs */}
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-yellow-500" />
                                    Top Rankings
                                </h3>
                                <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg">
                                    <button
                                        onClick={() => setRankingTab('men')}
                                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${rankingTab === 'men' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Men
                                    </button>
                                    <button
                                        onClick={() => setRankingTab('women')}
                                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${rankingTab === 'women' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Women
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 space-y-3">
                                {currentRankings.map((player, idx) => (
                                    <div key={player.rank} className="flex items-center justify-between text-sm group hover:bg-slate-50 -mx-2 px-2 py-1.5 rounded-lg transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <span className={`font-mono font-bold w-5 text-center ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-slate-400' : idx === 2 ? 'text-orange-400' : 'text-slate-400'}`}>
                                                {player.rank}
                                            </span>
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
                                                {player.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="text-slate-800 font-medium group-hover:text-blue-700 transition-colors">{player.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-bold ${player.change.startsWith('+') ? 'text-green-600' : player.change.startsWith('-') ? 'text-red-500' : 'text-slate-400'}`}>
                                                {player.change}
                                            </span>
                                            <span className="text-xs text-slate-500 font-mono w-16 text-right">{player.points} pts</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="px-4 pb-4">
                                <Link to="/rankings" className="block text-center text-xs font-bold text-blue-600 hover:text-blue-700 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                    View Full Rankings
                                </Link>
                            </div>
                        </div>

                        {/* Events CTA */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-white text-center shadow-lg">
                            <Calendar className="w-10 h-10 mx-auto mb-3 text-blue-200" />
                            <h3 className="font-bold text-lg mb-1">Upcoming Events</h3>
                            <p className="text-blue-100 text-sm mb-4">Register for the Summer Open 2026</p>
                            <button className="bg-white text-blue-700 font-bold px-4 py-2.5 rounded-lg text-sm w-full hover:bg-blue-50 transition-colors shadow-md">
                                View Calendar →
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
