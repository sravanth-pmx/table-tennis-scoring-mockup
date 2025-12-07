import React, { useState } from 'react';
import { matches, news } from '../data/mockData';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Video, ArrowRight } from 'lucide-react';

const HomePage = () => {
    // Filter Matches
    const liveMatches = matches.filter(m => m.status === 'live');
    const upcomingMatches = matches.filter(m => m.status === 'upcoming');

    // Rich News Data (Mock - expanded for display)
    const featuredNews = {
        id: 1,
        title: "National Championship 2025: Vikram Malhotra Defends Title Against Rising Star Arjun Das",
        summary: "The stage is set for an epic showdown in Pune as the veteran Vikram Malhotra faces the 19-year-old prodigy Arjun Das in the finals.",
        image: "https://images.unsplash.com/photo-1599586120429-48285b6a8a81?q=80&w=1600&auto=format&fit=crop", // High quality match shot
        category: "Tournament Focus",
        time: "2h ago"
    };

    const sideNews = [
        { id: 2, title: "STTA Announces New Youth Development Squad for 2026", time: "5h ago", category: "Development" },
        { id: 3, title: "Equipment Check: The Rise of Carbon Blades in Pro Circuit", time: "1d ago", category: "Gear" },
        { id: 4, title: "Regional Qualifiers: Bengaluru Zone Results", time: "1d ago", category: "Results" }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: Hero Content (8 cols) */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Hero Section */}
                    <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm aspect-video">
                        <img
                            src={featuredNews.image}
                            alt="Featured"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                                {featuredNews.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight max-w-2xl">
                                {featuredNews.title}
                            </h1>
                            <p className="text-slate-200 line-clamp-2 max-w-xl text-sm md:text-base">
                                {featuredNews.summary}
                            </p>
                        </div>
                    </div>

                    {/* Latest News Grid */}
                    <div>
                        <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight flex items-center gap-2">
                                <span className="w-2 h-6 bg-blue-600 rounded-sm"></span>
                                Latest News
                            </h2>
                            <Link to="/news" className="text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1">
                                View All <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sideNews.map(item => (
                                <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors shadow-sm group cursor-pointer">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider border border-slate-200 px-2 py-0.5 rounded">{item.category}</span>
                                        <span className="text-[10px] text-slate-400">{item.time}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: Sidebar (4 cols) */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Live Scoring Widget */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <h3 className="text-white font-bold uppercase tracking-wider text-sm">Live Scores</h3>
                            </div>
                            <span className="text-xs text-slate-400 font-mono">Today</span>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {liveMatches.map(match => (
                                <Link key={match.id} to={`/match/${match.id}`} className="block p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] uppercase font-bold text-slate-500">{match.category} • {match.stage}</span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 rounded">{match.status === 'live' ? 'LIVE' : ''}</span>
                                        </div>
                                    </div>

                                    {/* Score Row */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                                                    <img src={match.playerA.photo} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <span className={`font-bold text-sm ${match.currentScore.a > match.currentScore.b ? 'text-slate-900' : 'text-slate-600'}`}>
                                                    {match.playerA.name}
                                                </span>
                                            </div>
                                            <span className="font-mono text-lg font-bold text-slate-900">{match.currentScore.a}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                                                    <img src={match.playerB.photo} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <span className={`font-bold text-sm ${match.currentScore.b > match.currentScore.a ? 'text-slate-900' : 'text-slate-600'}`}>
                                                    {match.playerB.name}
                                                </span>
                                            </div>
                                            <span className="font-mono text-lg font-bold text-slate-900">{match.currentScore.b}</span>
                                        </div>
                                    </div>

                                    <div className="mt-3 pt-2 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
                                        <span>Table {match.table}</span>
                                        <span>Click to Watch</span>
                                    </div>
                                </Link>
                            ))}
                            {upcomingMatches.length > 0 && (
                                <div className="p-3 bg-slate-50 text-center text-xs font-medium text-slate-500">
                                    Upcoming: {upcomingMatches[0].playerA.name} vs {upcomingMatches[0].playerB.name}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Links / Ads */}
                    <div className="bg-blue-700 rounded-xl p-6 text-white text-center">
                        <Calendar className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                        <h3 className="font-bold text-lg mb-1">Upcoming Events</h3>
                        <p className="text-blue-100 text-sm mb-4">Register for the Summer Open 2026</p>
                        <button className="bg-white text-blue-700 font-bold px-4 py-2 rounded-lg text-sm w-full hover:bg-blue-50 transition-colors">
                            View Calendar
                        </button>
                    </div>

                    {/* Top Rankings Mini */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                            Top Rankings
                        </h3>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map(rank => (
                                <div key={rank} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <span className={`font-mono font-bold w-4 ${rank === 1 ? 'text-yellow-500' : 'text-slate-400'}`}>{rank}</span>
                                        <span className="text-slate-700 font-medium">Player Name</span>
                                    </div>
                                    <span className="text-xs text-slate-400 font-mono">2450 pts</span>
                                </div>
                            ))}
                        </div>
                        <Link to="/rankings" className="block text-center text-xs font-bold text-blue-700 mt-4 hover:underline">
                            Full Rankings
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomePage;
