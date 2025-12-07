// Generic Avatar SVGs (Data URIs)
const maleAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%234F46E5'/%3E%3Ccircle cx='50' cy='40' r='18' fill='%23E0E7FF'/%3E%3Cellipse cx='50' cy='85' rx='30' ry='25' fill='%23E0E7FF'/%3E%3C/svg%3E";
const femaleAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23DB2777'/%3E%3Ccircle cx='50' cy='40' r='18' fill='%23FCE7F3'/%3E%3Cellipse cx='50' cy='85' rx='30' ry='25' fill='%23FCE7F3'/%3E%3Cpath d='M32 30 Q50 10 68 30' stroke='%23FCE7F3' stroke-width='8' fill='none'/%3E%3C/svg%3E";

// --- BRACKET PLAYERS (16 for Tournament Draw) ---
// Diverse Indian Names from all regions
const bracketPlayers = [
    { id: 'bp1', name: 'Arjun Nair', rank: 1, club: 'Kerala Smashers', hand: 'Right', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp2', name: 'Ravi Shankar', rank: 2, club: 'Tamil Nadu TTA', hand: 'Left', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp3', name: 'Saurabh Joshi', rank: 3, club: 'Maharashtra Elite', hand: 'Right', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp4', name: 'Deepak Yadav', rank: 4, club: 'UP Champions', hand: 'Right', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp5', name: 'Abhishek Das', rank: 5, club: 'West Bengal Club', hand: 'Left', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp6', name: 'Karthik Iyer', rank: 6, club: 'Karnataka Kings', hand: 'Right', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp7', name: 'Manpreet Singh', rank: 7, club: 'Punjab Warriors', hand: 'Right', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp8', name: 'Rajat Thakur', rank: 8, club: 'Himachal Paddlers', hand: 'Left', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp9', name: 'Suresh Reddy', rank: 9, club: 'Telangana TT', hand: 'Right', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp10', name: 'Amit Patil', rank: 10, club: 'Goa Sports', hand: 'Right', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp11', name: 'Nikhil Bora', rank: 11, club: 'Assam Strikers', hand: 'Left', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp12', name: 'Venkat Raman', rank: 12, club: 'Andhra Aces', hand: 'Right', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp13', name: 'Gaurav Mishra', rank: 13, club: 'Bihar TTA', hand: 'Right', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp14', name: 'Harish Pillai', rank: 14, club: 'Kerala Smashers', hand: 'Left', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp15', name: 'Prakash Shetty', rank: 15, club: 'Karnataka Kings', hand: 'Right', category: 'Senior', gender: 'Male', photo: maleAvatar },
    { id: 'bp16', name: 'Dinesh Kumar', rank: 16, club: 'Rajasthan Royals', hand: 'Right', category: 'Senior', gender: 'Male', photo: maleAvatar }
];

export const players = [
    // --- MENS SENIORS ---
    { id: 'ms1', name: 'Vikram Menon', rank: 1, club: 'Elite TTA', hand: 'Right', category: 'Senior', gender: 'Male', equipment: { blade: 'Butterfly Viscaria', rubber: 'Dignics 09c' }, stats: { winRate: 88, wins: 42, losses: 5 }, photo: maleAvatar },
    { id: 'ms2', name: 'Arun Krishnan', rank: 4, club: 'Mumbai City', hand: 'Left', category: 'Senior', gender: 'Male', equipment: { blade: 'Stiga Carbonado', rubber: 'Tenergy 05' }, stats: { winRate: 72, wins: 38, losses: 12 }, photo: maleAvatar },
    { id: 'ms3', name: 'Siddharth Rao', rank: 7, club: 'Bangalore Spinners', hand: 'Right', category: 'Senior', gender: 'Male', equipment: { blade: 'DHS Long 5', rubber: 'Hurricane 3' }, stats: { winRate: 65, wins: 35, losses: 15 }, photo: maleAvatar },

    // --- WOMENS SENIORS ---
    { id: 'ws1', name: 'Priya Nambiar', rank: 1, club: 'Delhi Smashers', hand: 'Right', category: 'Senior', gender: 'Female', equipment: { blade: 'Nittaku Acoustic', rubber: 'Fastarc G-1' }, stats: { winRate: 85, wins: 45, losses: 8 }, photo: femaleAvatar },
    { id: 'ws2', name: 'Ananya Hegde', rank: 3, club: 'Pune Warriors', hand: 'Right', category: 'Senior', gender: 'Female', equipment: { blade: 'Timo Boll ALC', rubber: 'Tenergy 05' }, stats: { winRate: 78, wins: 30, losses: 10 }, photo: femaleAvatar },

    // --- U-19 BOYS ---
    { id: 'b19_1', name: 'Karthik Sundaram', rank: 2, club: 'Chennai Champions', hand: 'Left', category: 'U-19', gender: 'Male', equipment: { blade: 'Zhang Jike SZLC', rubber: 'Tenergy 64' }, stats: { winRate: 75, wins: 25, losses: 5 }, photo: maleAvatar },
    { id: 'b19_2', name: 'Rohan Mehta', rank: 5, club: 'Lucknow Paddlers', hand: 'Right', category: 'U-19', gender: 'Male', equipment: { blade: 'Tibhar Stratus', rubber: 'MX-P' }, stats: { winRate: 60, wins: 18, losses: 12 }, photo: maleAvatar },

    // --- U-15 GIRLS ---
    { id: 'g15_1', name: 'Meera Patel', rank: 1, club: 'Hyderabad Hitters', hand: 'Right', category: 'U-15', gender: 'Female', equipment: { blade: 'Stiga Allround', rubber: 'Mantra' }, stats: { winRate: 80, wins: 20, losses: 5 }, photo: femaleAvatar },

    // --- U-11 BOYS ---
    { id: 'b11_1', name: 'Aarav Kulkarni', rank: 1, club: 'Top Spin Academy', hand: 'Right', category: 'U-11', gender: 'Male', equipment: { blade: 'Primorac', rubber: 'Sriver' }, stats: { winRate: 90, wins: 15, losses: 2 }, photo: maleAvatar },
    { id: 'b11_2', name: 'Vihaan Reddy', rank: 3, club: 'Top Spin Academy', hand: 'Left', category: 'U-11', gender: 'Male', equipment: { blade: 'Primorac', rubber: 'Sriver' }, stats: { winRate: 85, wins: 12, losses: 4 }, photo: maleAvatar },

    // --- VETERANS ---
    { id: 'vet1', name: 'Rajesh Chatterjee', rank: 10, club: 'Kolkata Kings', hand: 'Right', category: 'Veteran', gender: 'Male', equipment: { blade: 'Waldner Sensor', rubber: 'Coppa' }, stats: { winRate: 50, wins: 10, losses: 10 }, photo: maleAvatar },

    ...bracketPlayers
];

// Helper to Create Bracket Matches
const createBracketMatch = (id, p1, p2, stage, matchNo) => ({
    id, playerA: p1, playerB: p2, category: "Senior", gender: "Male", stage, table: matchNo, umpire: "TBD", status: 'scheduled', sets: [], currentScore: { a: 0, b: 0 }, serving: 'playerA', startTime: '2025-12-10T10:00:00'
});

export const matches = [
    // Final (1 Match)
    {
        id: 'm1', playerA: players[0], playerB: players[1], category: "Senior", gender: "Male", stage: "Final", table: 1, umpire: "David Miller", status: 'live', sets: [{ a: 11, b: 8 }, { a: 9, b: 11 }, { a: 11, b: 5 }], currentSet: 4, currentScore: { a: 4, b: 2 }, serving: 'playerA', startTime: '2025-12-07T10:00:00'
    },

    // --- BRACKET DATA ---
    // Round of 16 (8 Matches)
    ...Array.from({ length: 8 }, (_, i) => createBracketMatch(`r16_${i + 1}`, bracketPlayers[i * 2], bracketPlayers[i * 2 + 1], 'Round of 16', i + 1)),

    // Quarter Finals (4 Matches)
    ...Array.from({ length: 4 }, (_, i) => createBracketMatch(`qf_${i + 1}`, bracketPlayers[i], bracketPlayers[15 - i], 'Quarter-Final', i + 1)),

    // Semi Finals (2 Matches)
    ...Array.from({ length: 2 }, (_, i) => createBracketMatch(`sf_${i + 1}`, bracketPlayers[i], bracketPlayers[2 + i], 'Semi-Final', i + 1)),
];

export const news = [
    { id: 1, title: 'National Championship 2025 Kicks Off in Pune', category: 'Tournament', time: '2h ago' },
    { id: 2, title: 'Vikram Menon Eyes Top Spot in Rankings', category: 'Player Focus', time: '5h ago' },
    { id: 3, title: 'New Equipment Regulations Announced by STTA', category: 'Rules', time: '1d ago' }
];
