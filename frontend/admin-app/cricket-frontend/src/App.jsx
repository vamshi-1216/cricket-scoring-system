import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TeamList from "./components/TeamList";
import TeamForm from "./components/TeamForm";
import EditTeamForm from "./components/EditTeamForm";
import TeamDetails from "./components/TeamDetails";

import PlayerList from "./components/PlayerList";
import AddPlayerForm from "./components/AddPlayerForm";
import EditPlayerForm from "./components/EditPlayerForm";

import MatchList from "./components/MatchList";
import MatchForm from "./components/MatchForm";
import MatchDetails from "./components/MatchDetails";
import TossPage from "./components/TossPage";
import ScoringPage from "./components/ScoringPage";
import MatchStatusPage from "./components/MatchStatusPage";
import PlayerStats from "./components/PlayerStats";
import AllPlayerStatsPage from "./components/AllPlayerStats";
import HomePage from "./components/HomePage";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <Router>
    <MainLayout>
      <Routes>

        <Route path="/Home" element={<HomePage />} />


        {/* 🏠 Teams */}
        <Route path="/Team" element={<TeamList />} />
        <Route path="/add" element={<TeamForm />} />
        <Route path="/edit/:id" element={<EditTeamForm />} />
        <Route path="/team/:id" element={<TeamDetails />} />

        {/* Players */}
        <Route path="/team/:teamId/players" element={<PlayerList />} />
        <Route path="/team/:teamId/add-player" element={<AddPlayerForm />} />
        <Route path="/player/edit/:id" element={<EditPlayerForm />} />

        {/* Matches */}
        <Route path="/matches" element={<MatchList />} />
        <Route path="/matches/add" element={<MatchForm />} />
        <Route path="/matches/:id" element={<MatchDetails />} />
        <Route path="/matches/edit/:id" element={<MatchForm />} />

        {/* 🎲 Toss Page — Corrected URL */}
        <Route path="/matches/:matchId/toss" element={<TossPage />} />

        <Route path="/match/:matchId/scoring" element={<ScoringPage />} />


        <Route path="/match/:matchId/stats" element={<MatchStatusPage />} />

        <Route path="/player/:playerId/stats" element={<PlayerStats />} />

        <Route path="/players/stats" element={<AllPlayerStatsPage />} />


      </Routes>
      </MainLayout>
    </Router>
  );
}
