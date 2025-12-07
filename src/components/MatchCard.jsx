import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const MatchCard = ({ match }) => {
    const { playerA, playerB, currentScore, sets, status, category, table, stage } = match;

    // Calculate generic sets if not detailed in mock
    const setsA = match.setsWon?.playerA || 0;
    const setsB = match.setsWon?.playerB || 0;

    // Format score for display logic
    // If live, show current game points big.
    // If upcoming, show time.

    const isLive = status === 'live';
    const isUpcoming = status === 'upcoming';

    // Parse time
    const timeString = new Date(match.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    return (
        <Link to={`/match/${match.id}`} className="bento-card group flex flex-col h-full relative">
            {/* Status Bar */}
            <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                    {isLive ? (
                        <span className="badge-live animate-pulse">LIVE</span>
                    ) : (
                        <span className="badge-upcoming">{timeString}</span>
                    )}
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{category}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TBL {table} • {stage}</span>
            </div>

            {/* Main Content */}
            <div className="p-4 flex-1 flex flex-col justify-center">
                {/* Player Rows */}
                <div className="space-y-3">
                    {/* Player A */}
                    <PlayerRow
                        player={playerA}
                        score={currentScore?.a}
                        sets={setsA}
                        isServing={match.serving === 'playerA' && isLive}
                        winner={setsA > setsB && status === 'completed'} // Simple logic
                    />

                    {/* Player B */}
                    <PlayerRow
                        player={playerB}
                        score={currentScore?.b}
                        sets={setsB}
                        isServing={match.serving === 'playerB' && isLive}
                        winner={setsB > setsA && status === 'completed'}
                    />
                </div>
            </div>

            {/* Hover Action */}
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>
        </Link>
    );
};

const PlayerRow = ({ player, score, sets, isServing, winner }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            {/* Rank Badge */}
            <span className="w-5 h-5 flex items-center justify-center bg-slate-100 text-[10px] font-bold text-slate-500 rounded text-center">
                {player.rank}
            </span>

            {/* Name */}
            <div className="flex items-center gap-2">
                <span className={`font-semibold text-sm tracking-tight ${winner ? 'text-slate-900' : 'text-slate-700'}`}>
                    {player.name}
                </span>
                {isServing && <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-sm" />}
            </div>
        </div>

        {/* Scores */}
        <div className="flex items-center gap-4">
            {/* Sets (Small) */}
            <span className={`text-sm font-medium ${winner ? 'text-blue-700' : 'text-slate-400'}`}>
                {sets}
            </span>

            {/* Game Points (Large) */}
            <span className="w-6 text-right font-mono-nums font-bold text-lg text-slate-900">
                {score ?? '-'}
            </span>
        </div>
    </div>
);

export default MatchCard;
