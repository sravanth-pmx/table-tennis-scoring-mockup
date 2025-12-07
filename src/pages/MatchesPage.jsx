import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Filter, ChevronDown } from 'lucide-react';

// Generic Avatar SVGs
const maleAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%234F46E5'/%3E%3Ccircle cx='50' cy='40' r='18' fill='%23E0E7FF'/%3E%3Cellipse cx='50' cy='85' rx='30' ry='25' fill='%23E0E7FF'/%3E%3C/svg%3E";
const femaleAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23DB2777'/%3E%3Ccircle cx='50' cy='40' r='18' fill='%23FCE7F3'/%3E%3Cellipse cx='50' cy='85' rx='30' ry='25' fill='%23FCE7F3'/%3E%3Cpath d='M32 30 Q50 10 68 30' stroke='%23FCE7F3' stroke-width='8' fill='none'/%3E%3C/svg%3E";

const MatchesPage = () => {
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterGender, setFilterGender] = useState('All');

    // Mock Live Matches
    const liveMatches = [
        // U-13 Girls (2 matches)
        { id: 'live1', playerA: { name: 'Ananya Sharma', photo: femaleAvatar }, playerB: { name: 'Priya Iyer', photo: femaleAvatar }, category: 'Under-13', gender: 'Girls', table: 1, scoreA: 11, scoreB: 8, setA: 1, setB: 0, currentScore: '7-5' },
        { id: 'live2', playerA: { name: 'Kavya Reddy', photo: femaleAvatar }, playerB: { name: 'Neha Patel', photo: femaleAvatar }, category: 'Under-13', gender: 'Girls', table: 2, scoreA: 9, scoreB: 11, setA: 0, setB: 1, currentScore: '4-6' },

        // U-13 Boys (2 matches)
        { id: 'live3', playerA: { name: 'Aarav Kumar', photo: maleAvatar }, playerB: { name: 'Vihan Nair', photo: maleAvatar }, category: 'Under-13', gender: 'Boys', table: 3, scoreA: 11, scoreB: 9, setA: 2, setB: 0, currentScore: '8-3' },
        { id: 'live4', playerA: { name: 'Rohan Menon', photo: maleAvatar }, playerB: { name: 'Arjun Das', photo: maleAvatar }, category: 'Under-13', gender: 'Boys', table: 4, scoreA: 5, scoreB: 11, setA: 1, setB: 1, currentScore: '9-7' },

        // U-11 Boys (1 match)
        { id: 'live5', playerA: { name: 'Dhruv Joshi', photo: maleAvatar }, playerB: { name: 'Ishaan Rao', photo: maleAvatar }, category: 'Under-11', gender: 'Boys', table: 5, scoreA: 11, scoreB: 6, setA: 1, setB: 0, currentScore: '5-3' },

        // U-11 Girls (1 match)
        { id: 'live6', playerA: { name: 'Aisha Khan', photo: femaleAvatar }, playerB: { name: 'Riya Bose', photo: femaleAvatar }, category: 'Under-11', gender: 'Girls', table: 6, scoreA: 8, scoreB: 11, setA: 0, setB: 1, currentScore: '6-8' },

        // U-15 Boys (2 matches)
        { id: 'live7', playerA: { name: 'Aditya Pillai', photo: maleAvatar }, playerB: { name: 'Siddharth Hegde', photo: maleAvatar }, category: 'Under-15', gender: 'Boys', table: 7, scoreA: 11, scoreB: 7, setA: 2, setB: 1, currentScore: '10-8' },
        { id: 'live8', playerA: { name: 'Karthik Sundaram', photo: maleAvatar }, playerB: { name: 'Nikhil Verma', photo: maleAvatar }, category: 'Under-15', gender: 'Boys', table: 8, scoreA: 9, scoreB: 11, setA: 1, setB: 2, currentScore: '3-7' },

        // U-15 Girls (2 matches)
        { id: 'live9', playerA: { name: 'Shreya Nambiar', photo: femaleAvatar }, playerB: { name: 'Pooja Kulkarni', photo: femaleAvatar }, category: 'Under-15', gender: 'Girls', table: 9, scoreA: 11, scoreB: 5, setA: 2, setB: 0, currentScore: '9-4' },
        { id: 'live10', playerA: { name: 'Tanvi Desai', photo: femaleAvatar }, playerB: { name: 'Meera Yadav', photo: femaleAvatar }, category: 'Under-15', gender: 'Girls', table: 10, scoreA: 6, scoreB: 11, setA: 1, setB: 1, currentScore: '5-5' },
    ];

    // Mock Scheduled Matches (1-2 hours from now)
    const now = new Date();
    const scheduledMatches = [
        { id: 'sch1', playerA: { name: 'Aditi Sharma', photo: femaleAvatar }, playerB: { name: 'Sanya Mishra', photo: femaleAvatar }, category: 'Under-13', gender: 'Girls', table: 1, time: new Date(now.getTime() + 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { id: 'sch2', playerA: { name: 'Rahul Thakur', photo: maleAvatar }, playerB: { name: 'Dev Patil', photo: maleAvatar }, category: 'Under-13', gender: 'Boys', table: 2, time: new Date(now.getTime() + 75 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { id: 'sch3', playerA: { name: 'Anvi Kapoor', photo: femaleAvatar }, playerB: { name: 'Diya Singh', photo: femaleAvatar }, category: 'Under-11', gender: 'Girls', table: 3, time: new Date(now.getTime() + 90 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { id: 'sch4', playerA: { name: 'Yash Choudhary', photo: maleAvatar }, playerB: { name: 'Kabir Malhotra', photo: maleAvatar }, category: 'Under-11', gender: 'Boys', table: 4, time: new Date(now.getTime() + 105 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { id: 'sch5', playerA: { name: 'Nandini Bhat', photo: femaleAvatar }, playerB: { name: 'Sakshi Jain', photo: femaleAvatar }, category: 'Under-15', gender: 'Girls', table: 5, time: new Date(now.getTime() + 120 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { id: 'sch6', playerA: { name: 'Vivaan Reddy', photo: maleAvatar }, playerB: { name: 'Arnav Shetty', photo: maleAvatar }, category: 'Under-15', gender: 'Boys', table: 6, time: new Date(now.getTime() + 130 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ];

    // Filter matches
    const filterMatches = (matches) => matches.filter(m => {
        const catMatch = filterCategory === 'All' || m.category === filterCategory;
        const genMatch = filterGender === 'All' || m.gender === filterGender;
        return catMatch && genMatch;
    });

    const filteredLive = filterMatches(liveMatches);
    const filteredScheduled = filterMatches(scheduledMatches);

    const categories = ['All', 'Under-11', 'Under-13', 'Under-15'];
    const genders = ['All', 'Boys', 'Girls'];

    // Match Card Component
    const LiveMatchCard = ({ match }) => (
        <Link to={`/match/${match.id}`} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-400 transition-all group">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{match.category}</span>
                    <span className="text-[10px] font-bold uppercase text-slate-500">{match.gender}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-red-600">LIVE</span>
                </div>
            </div>

            {/* Player A */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow">
                        <img src={match.playerA.photo} className="w-full h-full object-cover" alt="" />
                    </div>
                    <span className={`font-semibold text-sm ${match.setA > match.setB ? 'text-slate-900' : 'text-slate-600'}`}>
                        {match.playerA.name}
                    </span>
                </div>
                <span className="text-xl font-mono font-bold text-slate-900">{match.setA}</span>
            </div>

            {/* Player B */}
            <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow">
                        <img src={match.playerB.photo} className="w-full h-full object-cover" alt="" />
                    </div>
                    <span className={`font-semibold text-sm ${match.setB > match.setA ? 'text-slate-900' : 'text-slate-600'}`}>
                        {match.playerB.name}
                    </span>
                </div>
                <span className="text-xl font-mono font-bold text-slate-900">{match.setB}</span>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-slate-400">Table {match.table}</span>
                <span className="text-slate-500 font-mono">Current: {match.currentScore}</span>
                <span className="text-blue-600 font-bold group-hover:underline">Watch →</span>
            </div>
        </Link>
    );

    const ScheduledMatchCard = ({ match }) => (
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{match.category}</span>
                    <span className="text-[10px] font-bold uppercase text-slate-400">{match.gender}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs font-mono font-medium">{match.time}</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow">
                        <img src={match.playerA.photo} className="w-full h-full object-cover" alt="" />
                    </div>
                    <span className="font-medium text-sm text-slate-700">{match.playerA.name}</span>
                </div>
                <span className="text-xs font-bold text-slate-400 px-2">VS</span>
                <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-slate-700">{match.playerB.name}</span>
                    <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow">
                        <img src={match.playerB.photo} className="w-full h-full object-cover" alt="" />
                    </div>
                </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                <span className="text-[10px] text-slate-400">Table {match.table}</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 py-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <span className="w-2 h-8 bg-red-500 rounded"></span>
                            Live Scores
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">Real-time match updates from all courts</p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer shadow-sm"
                        >
                            {categories.map(c => (
                                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
                            ))}
                        </select>

                        <select
                            value={filterGender}
                            onChange={(e) => setFilterGender(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer shadow-sm"
                        >
                            {genders.map(g => (
                                <option key={g} value={g}>{g === 'All' ? 'All Genders' : g}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Live Matches Section */}
                <section className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <h2 className="text-lg font-bold text-slate-900">Live Now</h2>
                        <span className="text-xs font-mono bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{filteredLive.length} matches</span>
                    </div>

                    {filteredLive.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredLive.map(match => (
                                <LiveMatchCard key={match.id} match={match} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                            <p className="text-slate-500">No live matches for selected filters</p>
                        </div>
                    )}
                </section>

                {/* Upcoming Matches Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <h2 className="text-lg font-bold text-slate-900">Coming Up</h2>
                        <span className="text-xs font-mono bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{filteredScheduled.length} matches</span>
                    </div>

                    {filteredScheduled.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredScheduled.map(match => (
                                <ScheduledMatchCard key={match.id} match={match} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                            <p className="text-slate-500">No upcoming matches for selected filters</p>
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
};

export default MatchesPage;
