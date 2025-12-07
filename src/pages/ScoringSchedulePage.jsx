import React, { useState } from 'react';
import { matches } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const ScoringSchedulePage = () => {
    const navigate = useNavigate();

    // Filter State
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedGender, setSelectedGender] = useState('All');

    // Category and Gender Options
    const categories = ['All', 'Under-9', 'Under-11', 'Under-13', 'Under-15', 'Under-17', 'Senior', 'Veteran'];
    const genders = ['All', 'Male', 'Female'];

    // Filter matches
    const filteredMatches = matches.filter(m => {
        const catMatch = selectedCategory === 'All' || m.category === selectedCategory;
        const genMatch = selectedGender === 'All' || m.gender === selectedGender;
        return catMatch && genMatch;
    });

    // Group by stage
    const roundOf16 = filteredMatches.filter(m => m.stage === 'Round of 16');
    const quarterFinals = filteredMatches.filter(m => m.stage === 'Quarter-Final');
    const semiFinals = filteredMatches.filter(m => m.stage === 'Semi-Final');
    const finals = filteredMatches.filter(m => m.stage === 'Final');

    // Player Slot Component
    const PlayerSlot = ({ player, score, isTop }) => (
        <div className={`
            flex items-center justify-between px-2 md:px-3 py-1.5 md:py-2 bg-white
            ${isTop ? 'rounded-t border-b border-slate-100' : 'rounded-b'}
        `}>
            <div className="flex items-center gap-1.5 md:gap-2 min-w-0 flex-1">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full overflow-hidden bg-slate-200 shrink-0">
                    <img src={player.photo} className="w-full h-full object-cover" alt="" />
                </div>
                <span className="text-xs md:text-sm font-medium text-slate-800 truncate">{player.name}</span>
            </div>
            <span className="text-xs md:text-sm font-mono font-bold text-slate-600 ml-1">{score}</span>
        </div>
    );

    // Match Box Component
    const MatchBox = ({ match, showConnector = false, connectorHeight = 60, isLast = false }) => (
        <div className="relative">
            <div
                onClick={() => navigate(`/live-scoring/${match.id}`)}
                className="border border-slate-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer overflow-hidden"
                style={{ width: '160px' }}
            >
                <PlayerSlot
                    player={match.playerA}
                    score={match.sets?.filter(s => s.a > s.b).length || 0}
                    isTop={true}
                />
                <PlayerSlot
                    player={match.playerB}
                    score={match.sets?.filter(s => s.b > s.a).length || 0}
                    isTop={false}
                />
            </div>

            {/* Connector */}
            {showConnector && (
                <>
                    <div className="absolute top-1/2 -right-3 w-3 h-px bg-slate-300"></div>
                    {!isLast && (
                        <div
                            className="absolute -right-3 bg-slate-300"
                            style={{ top: '50%', height: connectorHeight, width: '1px' }}
                        ></div>
                    )}
                </>
            )}
        </div>
    );

    // Calculate heights
    const boxHeight = 56;
    const gap = 8;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header with Filters */}
            <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 md:py-4 sticky top-0 z-10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <span className="bg-blue-600 w-1.5 h-6 rounded"></span>
                                Tournament Bracket
                            </h1>
                            <p className="text-slate-500 text-xs md:text-sm mt-1">Select category and gender to view matches</p>
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="flex flex-wrap gap-2 md:gap-3">
                            {/* Category Dropdown */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm font-semibold text-slate-700 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
                            >
                                {categories.map(c => (
                                    <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
                                ))}
                            </select>

                            {/* Gender Dropdown */}
                            <select
                                value={selectedGender}
                                onChange={(e) => setSelectedGender(e.target.value)}
                                className="bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm font-semibold text-slate-700 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
                            >
                                {genders.map(g => (
                                    <option key={g} value={g}>{g === 'All' ? 'All Genders' : g}</option>
                                ))}
                            </select>

                            {/* Live Badge */}
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> LIVE
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Bracket Container */}
            <div className="p-4 md:p-6 overflow-x-auto">
                {filteredMatches.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-500 text-lg">No matches found for selected filters.</p>
                        <p className="text-slate-400 text-sm mt-2">Try selecting a different category or gender.</p>
                    </div>
                ) : (
                    <div className="flex items-start gap-6 md:gap-8 min-w-max">

                        {/* ROUND OF 16 */}
                        {roundOf16.length > 0 && (
                            <div className="flex flex-col shrink-0">
                                <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Round of 16</h3>
                                <div className="flex flex-col" style={{ gap: `${gap}px` }}>
                                    {roundOf16.map((match, idx) => (
                                        <MatchBox
                                            key={match.id}
                                            match={match}
                                            showConnector={true}
                                            connectorHeight={boxHeight + gap}
                                            isLast={idx % 2 === 1}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Spacer */}
                        {roundOf16.length > 0 && quarterFinals.length > 0 && <div className="w-4 md:w-6"></div>}

                        {/* QUARTER FINALS */}
                        {quarterFinals.length > 0 && (
                            <div className="flex flex-col shrink-0" style={{ marginTop: roundOf16.length > 0 ? `${(boxHeight + gap) / 2}px` : 0 }}>
                                <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Quarter Finals</h3>
                                <div className="flex flex-col" style={{ gap: `${boxHeight + gap * 3}px` }}>
                                    {quarterFinals.map((match, idx) => (
                                        <MatchBox
                                            key={match.id}
                                            match={match}
                                            showConnector={true}
                                            connectorHeight={(boxHeight * 2) + (gap * 4)}
                                            isLast={idx % 2 === 1}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Spacer */}
                        {quarterFinals.length > 0 && semiFinals.length > 0 && <div className="w-4 md:w-6"></div>}

                        {/* SEMI FINALS */}
                        {semiFinals.length > 0 && (
                            <div className="flex flex-col shrink-0" style={{ marginTop: quarterFinals.length > 0 ? `${(boxHeight * 1.5) + (gap * 2.5)}px` : 0 }}>
                                <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Semi Finals</h3>
                                <div className="flex flex-col" style={{ gap: `${(boxHeight * 4) + (gap * 8)}px` }}>
                                    {semiFinals.map((match, idx) => (
                                        <MatchBox
                                            key={match.id}
                                            match={match}
                                            showConnector={true}
                                            connectorHeight={(boxHeight * 4) + (gap * 9)}
                                            isLast={idx === 0}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Spacer */}
                        {semiFinals.length > 0 && finals.length > 0 && <div className="w-4 md:w-6"></div>}

                        {/* FINAL */}
                        {finals.length > 0 && (
                            <div className="flex flex-col shrink-0" style={{ marginTop: semiFinals.length > 0 ? `${(boxHeight * 3.5) + (gap * 6.5)}px` : 0 }}>
                                <h3 className="text-[10px] md:text-xs font-bold text-yellow-600 uppercase tracking-wider mb-3 text-center flex items-center justify-center gap-1">
                                    🏆 Final
                                </h3>
                                {finals.map(match => (
                                    <div key={match.id} className="relative">
                                        <div className="absolute -inset-2 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-xl blur opacity-40"></div>
                                        <div
                                            onClick={() => navigate(`/live-scoring/${match.id}`)}
                                            className="relative bg-white border-2 border-yellow-400 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all overflow-hidden"
                                            style={{ width: '180px' }}
                                        >
                                            <div className="bg-yellow-50 px-2 py-1.5 flex justify-between items-center border-b border-yellow-200">
                                                <span className="text-[10px] font-bold text-yellow-700 uppercase">Championship</span>
                                                <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">LIVE</span>
                                            </div>
                                            <div className="p-2">
                                                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full overflow-hidden border border-yellow-200">
                                                            <img src={match.playerA.photo} className="w-full h-full object-cover" alt="" />
                                                        </div>
                                                        <span className="text-xs font-bold text-slate-900 truncate max-w-[80px]">{match.playerA.name}</span>
                                                    </div>
                                                    <span className="text-lg font-mono font-bold text-slate-900">
                                                        {match.sets?.filter(s => s.a > s.b).length || 0}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between py-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full overflow-hidden border border-yellow-200">
                                                            <img src={match.playerB.photo} className="w-full h-full object-cover" alt="" />
                                                        </div>
                                                        <span className="text-xs font-bold text-slate-900 truncate max-w-[80px]">{match.playerB.name}</span>
                                                    </div>
                                                    <span className="text-lg font-mono font-bold text-slate-900">
                                                        {match.sets?.filter(s => s.b > s.a).length || 0}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScoringSchedulePage;
