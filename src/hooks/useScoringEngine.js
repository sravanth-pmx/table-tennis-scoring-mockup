import { useState, useCallback } from 'react';

export const useScoringEngine = (initialMatch, onUpdate) => {
    const [match, setMatch] = useState(initialMatch);

    // Constants
    const WIN_SCORE = 11;
    const WIN_BY = 2;
    const SETS_TO_WIN = 3; // Best of 5

    const updateMatch = useCallback((newMatchState) => {
        setMatch(newMatchState);
        if (onUpdate) onUpdate(newMatchState);
    }, [onUpdate]);

    const determineServer = (totalPoints, initialServer) => {
        // Normal serve switch every 2 points
        // Deuce serve switch every 1 point (after 10-10)

        // Check if deuce logic applies (both >= 10)
        // Actually, simple logic: 
        // If scores < 10-10, serve switches every 2 points: Math.floor(totalPoints / 2) % 2
        // If scores >= 10-10, serve switches every 1 point: (totalPoints - 20) % 2 ? 

        // Easier way:
        // If total points < 20: Math.floor(totalPoints / 2) determines rotation
        // If total points >= 20: (totalPoints - 20) determines rotation (every point)

        const rotation = totalPoints < 20
            ? Math.floor(totalPoints / 2)
            : (totalPoints - 20); // starts at 0 for 10-10

        // logical XOR to flip server
        const isOriginalServer = rotation % 2 === 0;

        return isOriginalServer ? initialServer : (initialServer === 'playerA' ? 'playerB' : 'playerA');
    };

    const addPoint = (player) => {
        if (match.status === 'completed') return;

        const otherPlayer = player === 'playerA' ? 'playerB' : 'playerA';
        const newScore = { ...match.currentScore };
        newScore[player === 'playerA' ? 'a' : 'b']++;

        const scoreA = newScore.a;
        const scoreB = newScore.b;
        let newSets = [...match.sets];
        let newStatus = match.status;
        let newCurrentSet = match.currentSet;
        let newCurrentScore = newScore;
        let initialServerForNextSet = match.serving === 'playerA' ? 'playerB' : 'playerA'; // Alternate starter each set - simplified logic for now

        // Check Set Win
        if ((scoreA >= WIN_SCORE || scoreB >= WIN_SCORE) && Math.abs(scoreA - scoreB) >= WIN_BY) {
            // Set Won
            newSets.push({ a: scoreA, b: scoreB });
            newCurrentScore = { a: 0, b: 0 };

            // Check Match Win (First to 3 sets)
            const setsWonA = newSets.filter(s => s.a > s.b).length;
            const setsWonB = newSets.filter(s => s.b > s.a).length;

            if (setsWonA >= SETS_TO_WIN || setsWonB >= SETS_TO_WIN) {
                newStatus = 'completed';
            } else {
                newCurrentSet++;
            }
        }

        // Determine Serving
        const totalPoints = newCurrentScore.a + newCurrentScore.b;
        // We need to know who started serving THIS set. 
        // For simplicity in this demo, let's assume it flips based on Total Match points relative to the set start.
        // Actually, proper logic requires tracking who started the current set.
        // Let's rely on a simplified 'current server' state that updates.

        let nextServer = match.serving;

        if (newCurrentScore.a === 0 && newCurrentScore.b === 0 && match.currentSet !== newCurrentSet) {
            // New Set: Switch initial server logic would go here. 
            // For prototype, let's just flip current server.
            nextServer = match.serving === 'playerA' ? 'playerB' : 'playerA';
        } else {
            nextServer = determineServer(totalPoints, match.serving);
            // BUT wait, determining from total points requires knowing who started.
            // The `determineServer` function assumes `initialServer` is who started the set.
            // We don't have `setStarter` in state. 

            // Improved logic: Just track the counter.
            // Standard: 2 serves. Deuce: 1 serve.

            const pointsInSet = scoreA + scoreB;
            const isDeuce = scoreA >= 10 && scoreB >= 10;

            if (isDeuce) {
                // Switch every 1 point
                nextServer = match.serving === 'playerA' ? 'playerB' : 'playerA';
            } else {
                // Switch every 2 points. 
                // If (pointsInSet % 2 === 0), it's time to switch.
                if (pointsInSet > 0 && pointsInSet % 2 === 0) {
                    nextServer = match.serving === 'playerA' ? 'playerB' : 'playerA';
                }
            }
        }

        const updatedMatch = {
            ...match,
            currentScore: newCurrentScore,
            sets: newSets,
            currentSet: newCurrentSet,
            status: newStatus,
            serving: nextServer
        };

        updateMatch(updatedMatch);
    };

    return {
        match,
        addPoint
    };
};
