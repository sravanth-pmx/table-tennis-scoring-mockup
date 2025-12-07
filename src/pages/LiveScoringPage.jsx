import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { matches } from '../data/mockData';
import { ArrowLeft, RotateCcw, Shield, Trophy, Settings, ChevronDown } from 'lucide-react';

const LiveScoringPage = () => {
    const { matchId } = useParams();
    const navigate = useNavigate();

    // -- INIT --
    const [match] = useState(() => matches.find(m => m.id === matchId) || matches[0]);

    // -- CONFIG STATE --
    const [bestOf, setBestOf] = useState(5); // Default Best of 5

    // -- GAME STATE --
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [setsA, setSetsA] = useState(0);
    const [setsB, setSetsB] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);

    // -- LOGIC STATE --
    const [gameState, setGameState] = useState('TOSS'); // TOSS, PLAYING, SET_WON, MATCH_WON
    const [firstServerOfMatch, setFirstServerOfMatch] = useState(null); // Who won toss
    const [currentServer, setCurrentServer] = useState(null);
    const [setWinner, setSetWinner] = useState(null);
    const [matchWinner, setMatchWinner] = useState(null);

    // -- END MATCH MODAL --
    const [showEndModal, setShowEndModal] = useState(false);
    const [endReason, setEndReason] = useState(null); // 'result', 'walkover_a', 'walkover_b', 'abandon'

    // -- UNDO HISTORY --
    const [history, setHistory] = useState([]);

    // -- CALCULATED SERVICE LOGIC --
    useEffect(() => {
        if (gameState !== 'PLAYING' || !firstServerOfMatch) return;

        const isOddSet = (currentSet % 2) !== 0;
        const firstServerOfSet = isOddSet ? firstServerOfMatch : (firstServerOfMatch === 'A' ? 'B' : 'A');

        const totalPoints = scoreA + scoreB;
        let activeServer = firstServerOfSet;

        if (scoreA >= 10 && scoreB >= 10) {
            // Deuce Logic
            const deucePoints = totalPoints - 20;
            const swaps = Math.floor(deucePoints / 1);
            if (swaps % 2 === 1) {
                activeServer = firstServerOfSet === 'A' ? 'B' : 'A';
            }
        } else {
            // Standard Logic: Swap every 2 points
            const swaps = Math.floor(totalPoints / 2);
            if (swaps % 2 === 1) {
                activeServer = firstServerOfSet === 'A' ? 'B' : 'A';
            }
        }
        setCurrentServer(activeServer);

    }, [scoreA, scoreB, currentSet, firstServerOfMatch, gameState]);


    // -- ACTIONS --

    const handleToss = (winner) => {
        setFirstServerOfMatch(winner);
        setCurrentServer(winner);
        setGameState('PLAYING');
    };

    const addPoint = (player) => {
        if (gameState !== 'PLAYING') return;

        setHistory(prev => [...prev.slice(-4), {
            scoreA, scoreB, setsA, setsB, currentSet, gameState, activeServer: currentServer, setWinner, matchWinner
        }]);

        let newA = scoreA;
        let newB = scoreB;

        if (player === 'A') newA++;
        else newB++;

        setScoreA(newA);
        setScoreB(newB);

        checkWinCondition(newA, newB);
    };

    const checkWinCondition = (sA, sB) => {
        if ((sA >= 11 || sB >= 11) && Math.abs(sA - sB) >= 2) {
            const winner = sA > sB ? 'A' : 'B';
            setSetWinner(winner);
            setGameState('SET_WON');
        }
    };

    const confirmSetWin = () => {
        let newSetsA = setsA;
        let newSetsB = setsB;
        if (setWinner === 'A') newSetsA++;
        else newSetsB++;

        setSetsA(newSetsA);
        setSetsB(newSetsB);

        const setsToWin = Math.ceil(bestOf / 2);
        if (newSetsA === setsToWin || newSetsB === setsToWin) {
            setMatchWinner(newSetsA > newSetsB ? 'A' : 'B');
            setGameState('MATCH_WON');
        } else {
            setScoreA(0);
            setScoreB(0);
            setCurrentSet(prev => prev + 1);
            setSetWinner(null);
            setGameState('PLAYING');
        }
    };

    const handleUndo = () => {
        if (history.length === 0) return;
        const prev = history[history.length - 1];
        setScoreA(prev.scoreA);
        setScoreB(prev.scoreB);
        setSetsA(prev.setsA);
        setSetsB(prev.setsB);
        setCurrentSet(prev.currentSet);
        setGameState(prev.gameState);
        setCurrentServer(prev.activeServer);
        setSetWinner(prev.setWinner);
        setMatchWinner(prev.matchWinner);
        setHistory(prev => prev.slice(0, -1));
    };

    // -- RESPONSIVE CARD COMPONENT --
    const PlayerCard = ({ id, player, score, isServing, onClick, disabled }) => (
        <div
            className={`
                relative flex flex-col items-center justify-between p-2 rounded-3xl transition-all w-full h-full
                ${isServing ? 'bg-white border-4 border-blue-500 shadow-xl z-10' : 'bg-slate-50 border border-slate-200'}
            `}
        >
            {/* Service Indication - Compact */}
            <div className={`h-4 md:h-6 mb-1 flex items-center justify-center transition-opacity ${isServing ? 'opacity-100' : 'opacity-0'}`}>
                <span className="bg-blue-600 text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">Serving</span>
            </div>

            {/* Avatar & Info */}
            <div className="text-center mb-1 flex flex-col items-center shrink-0">
                {/* Avatar: 
                    - Portrait: Normal flow, w-12 h-12
                    - Mobile Landscape: Absolute Top-Left, Small (w-8 h-8)
                    - Desktop: Normal flow, Large (w-24 h-24)
                */}
                <div className={`
                    rounded-full overflow-hidden border-2 
                    ${isServing ? 'border-blue-200' : 'border-slate-200'}
                    
                    /* PORTRAIT (Default) */
                    w-12 h-12 mb-1 relative

                    /* MOBILE LANDSCAPE */
                    landscape:absolute landscape:top-3 landscape:left-3 landscape:w-10 landscape:h-10 landscape:mb-0 landscape:border-2

                    /* DESKTOP (Reset to normal) */
                    md:w-24 md:h-24 md:mb-2 md:static
                    lg:landscape:static lg:landscape:w-24 lg:landscape:h-24 lg:landscape:mb-2
                `}>
                    <img src={player.photo} className="w-full h-full object-cover" alt="" />
                </div>
                {/* Name: Compact in Landscape */}
                <h2 className="text-sm md:text-2xl font-bold text-slate-900 leading-tight truncate px-2 w-full landscape:text-xs lg:landscape:text-2xl landscape:mt-1 lg:landscape:mt-0">
                    {player.name}
                </h2>
            </div>

            {/* Score Display - Responsive Text Size */}
            <div className="flex-1 flex items-center justify-center w-full min-h-0">
                <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-bold text-slate-900 font-mono-nums tracking-tighter leading-none select-none landscape:text-[4rem] lg:landscape:text-[8rem]">
                    {score}
                </span>
            </div>

            {/* Tap Target - Always Visible & large enough to tap, but compact padding */}
            <button
                onClick={onClick}
                disabled={disabled}
                className={`
                    w-full py-2 md:py-6 rounded-xl text-base md:text-2xl font-bold shadow-lg transition-transform active:scale-95 touch-manipulation shrink-0
                    ${id === 'A' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-800 text-white hover:bg-slate-900'}
                    disabled:opacity-50 disabled:cursor-not-allowed
                    landscape:py-2 lg:landscape:py-6
                `}
            >
                + Point
            </button>
        </div>
    );

    return (
        <div className="h-screen bg-slate-100 font-sans flex flex-col overflow-hidden">
            {/* 1. Header (Compact) */}
            <header className="flex-none bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between z-30 shadow-sm h-14 md:h-16">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/umpire/schedule')} className="p-2 -ml-2 hover:bg-slate-50 rounded-full text-slate-500">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Match #{match.id.slice(1)}</h1>

                        {/* Config Dropdown - UNLOCKED */}
                        <div className="relative inline-block">
                            <select
                                value={bestOf}
                                onChange={(e) => setBestOf(Number(e.target.value))}
                                className="appearance-none bg-slate-100 border-none font-bold text-slate-900 text-sm py-1 pl-3 pr-8 rounded-lg focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            >
                                <option value="3">Best of 3</option>
                                <option value="5">Best of 5</option>
                                <option value="7">Best of 7</option>
                            </select>
                            <ChevronDown className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Score Badge */}
                <div className="bg-slate-900 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg flex items-center gap-3 md:gap-4 shadow-sm">
                    <span className="text-lg md:text-xl font-bold font-mono">{setsA}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sets ({currentSet})</span>
                    <span className="text-lg md:text-xl font-bold font-mono">{setsB}</span>
                </div>

                {/* End Button - Integrated */}
                <button
                    onClick={() => setShowEndModal(true)}
                    className="text-[10px] md:text-xs font-bold bg-red-600 text-white hover:bg-red-700 px-2 py-1 md:px-3 md:py-1.5 rounded-lg transition-colors shadow-sm shrink-0"
                >
                    End Match
                </button>
            </header>

            {/* 2. Main Arena Used Grid for better responsiveness */}
            <main className="flex-1 p-2 md:p-6 grid grid-cols-1 landscape:grid-cols-2 md:grid-cols-2 gap-2 md:gap-8 min-h-0">
                <PlayerCard
                    id="A"
                    player={match.playerA}
                    score={scoreA}
                    isServing={currentServer === 'A'}
                    onClick={() => addPoint('A')}
                    disabled={gameState !== 'PLAYING'}
                />
                <PlayerCard
                    id="B"
                    player={match.playerB}
                    score={scoreB}
                    isServing={currentServer === 'B'}
                    onClick={() => addPoint('B')}
                    disabled={gameState !== 'PLAYING'}
                />
            </main>

            {/* 3. Floating Undo Action Bar (Bottom Overlay, unobtrusive) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
                <button
                    onClick={handleUndo}
                    disabled={history.length === 0}
                    className="flex items-center gap-2 bg-slate-900/90 text-white px-4 py-2 rounded-full shadow-xl font-bold text-xs backdrop-blur-md hover:bg-slate-800 active:scale-95 disabled:opacity-0 disabled:pointer-events-none transition-all"
                >
                    <RotateCcw className="w-3 h-3" /> Undo Last Point
                </button>
            </div>

            {/* END MATCH MODAL */}
            {showEndModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-start md:items-center justify-center p-2 overflow-y-auto">
                    <div className="bg-white rounded-2xl p-4 md:p-6 max-w-md w-full shadow-2xl relative my-4 max-h-[95vh] overflow-y-auto">
                        {/* Close */}
                        <button
                            onClick={() => setShowEndModal(false)}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">End Match</h2>

                        {/* Current Score Summary */}
                        <div className="bg-slate-50 rounded-xl p-3 mb-4">
                            <div className="flex items-center justify-between">
                                <div className="text-center flex-1">
                                    <p className="text-[10px] text-slate-500 mb-1 truncate">{match.playerA.name}</p>
                                    <p className="text-xl font-bold text-slate-900">{setsA}</p>
                                </div>
                                <span className="text-xs text-slate-400 font-bold px-2">SETS</span>
                                <div className="text-center flex-1">
                                    <p className="text-[10px] text-slate-500 mb-1 truncate">{match.playerB.name}</p>
                                    <p className="text-xl font-bold text-slate-900">{setsB}</p>
                                </div>
                            </div>
                        </div>

                        {/* Options - Compact for mobile */}
                        <div className="space-y-2">
                            {/* Submit Current Result */}
                            <button
                                onClick={() => { setEndReason('result'); }}
                                className={`w-full p-3 rounded-xl border-2 text-left transition-all ${endReason === 'result' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                                    }`}
                            >
                                <p className="font-bold text-slate-900 text-sm">Submit Result</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">
                                    {setsA > setsB ? `${match.playerA.name} wins ${setsA}-${setsB}` :
                                        setsB > setsA ? `${match.playerB.name} wins ${setsB}-${setsA}` :
                                            'Match is currently tied'}
                                </p>
                            </button>

                            {/* Walkover A */}
                            <button
                                onClick={() => setEndReason('walkover_a')}
                                className={`w-full p-3 rounded-xl border-2 text-left transition-all ${endReason === 'walkover_a' ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-green-300'
                                    }`}
                            >
                                <p className="font-bold text-slate-900 text-sm">Walkover - {match.playerA.name.split(' ')[0]}</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">{match.playerB.name.split(' ')[0]} concedes</p>
                            </button>

                            {/* Walkover B */}
                            <button
                                onClick={() => setEndReason('walkover_b')}
                                className={`w-full p-3 rounded-xl border-2 text-left transition-all ${endReason === 'walkover_b' ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-green-300'
                                    }`}
                            >
                                <p className="font-bold text-slate-900 text-sm">Walkover - {match.playerB.name.split(' ')[0]}</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">{match.playerA.name.split(' ')[0]} concedes</p>
                            </button>

                            {/* Abandon */}
                            <button
                                onClick={() => setEndReason('abandon')}
                                className={`w-full p-3 rounded-xl border-2 text-left transition-all ${endReason === 'abandon' ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-orange-300'
                                    }`}
                            >
                                <p className="font-bold text-slate-900 text-sm">Abandon Match</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">No result recorded</p>
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={() => navigate('/umpire/schedule')}
                            disabled={!endReason}
                            className="w-full mt-4 bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}


            {/* -- MODALS -- */}

            {/* TOSS */}
            {gameState === 'TOSS' && (
                <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full text-center animate-in zoom-in-95 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => navigate('/umpire/schedule')}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Service Toss</h2>
                        <p className="text-slate-500 mb-6">Who serves first in the match?</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => handleToss('A')} className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-500 transition-all flex flex-col items-center">
                                <span className="font-bold text-slate-900 text-lg">{match.playerA.name}</span>
                                <span className="text-xs text-slate-500 mt-1">Select</span>
                            </button>
                            <button onClick={() => handleToss('B')} className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-500 transition-all flex flex-col items-center">
                                <span className="font-bold text-slate-900 text-lg">{match.playerB.name}</span>
                                <span className="text-xs text-slate-500 mt-1">Select</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* SET COMPLETE */}
            {gameState === 'SET_WON' && (
                <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center animate-in zoom-in-95 border-b-8 border-green-500">
                        <Trophy className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-slate-900">Set {currentSet} Won</h2>
                        <p className="text-lg font-medium text-slate-600 mb-6 mt-2">
                            by <span className="text-slate-900 font-bold">{setWinner === 'A' ? match.playerA.name : match.playerB.name}</span>
                        </p>
                        <button onClick={confirmSetWin} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 shadow-md">
                            Continue to Set {currentSet + 1}
                        </button>
                    </div>
                </div>
            )}

            {/* MATCH COMPLETE */}
            {gameState === 'MATCH_WON' && (
                <div className="fixed inset-0 z-50 bg-blue-900/95 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-pink-500" />
                        <h2 className="text-4xl font-bold text-slate-900 mb-2 mt-4">WINNER!</h2>
                        <div className="my-8">
                            <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-yellow-400 p-1">
                                <img src={matchWinner === 'A' ? match.playerA.photo : match.playerB.photo} className="w-full h-full rounded-full object-cover" alt="" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">{matchWinner === 'A' ? match.playerA.name : match.playerB.name}</h3>
                            <p className="text-slate-500 font-bold mt-1">wins {setsA} - {setsB}</p>
                        </div>
                        <button onClick={() => navigate('/umpire/schedule')} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-xl hover:bg-blue-700">
                            Submit Result
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveScoringPage;
