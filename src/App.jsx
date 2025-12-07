import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import MatchDetailsPage from './pages/MatchDetailsPage';
import PlayerProfilePage from './pages/PlayerProfilePage';
import LoginPage from './pages/LoginPage';
import LiveScoringPage from './pages/LiveScoringPage';
import PlayersPage from './pages/PlayersPage';
import RankingsPage from './pages/RankingsPage';
import EventsPage from './pages/EventsPage';
import NewsPage from './pages/NewsPage';
import ScoringSchedulePage from './pages/ScoringSchedulePage';
import AcademyPage from './pages/AcademyPage';
import { AppProvider } from './context/AppContext';

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Portal Layout */}
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/match/:matchId" element={<MatchDetailsPage />} />
                        <Route path="/player/:playerId" element={<PlayerProfilePage />} />
                        <Route path="/players" element={<PlayersPage />} />
                        <Route path="/rankings" element={<RankingsPage />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/academy" element={<AcademyPage />} />
                    </Route>

                    {/* Dedicated Fullscreen Pages */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/umpire/schedule" element={<ScoringSchedulePage />} />
                    <Route path="/live-scoring/:matchId" element={<LiveScoringPage />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;
