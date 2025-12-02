import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosConfig";

export default function MatchStatsPage() {
  const { matchId } = useParams();

  const [scoreInnings1, setScoreInnings1] = useState(null);
  const [scoreInnings2, setScoreInnings2] = useState(null);
  const [playerStats, setPlayerStats] = useState([]);
  const [teams, setTeams] = useState({});
  const [match, setMatch] = useState(null);

  const [loading, setLoading] = useState(true);

  // 🔄 Fetch all match stats
  useEffect(() => {
    async function loadStats() {
      try {
        const [matchRes, teamsRes, innings1, innings2] = await Promise.all([
          axios.get(`/matches/${matchId}`),
          axios.get("/teams/all"),
          axios.get(`/api/stats/matches/${matchId}/score?innings=1`),
          axios.get(`/api/stats/matches/${matchId}/score?innings=2`)
        ]);

        setMatch(matchRes.data);

        const teamMap = {};
        teamsRes.data.forEach((team) => (teamMap[team.id] = team));
        setTeams(teamMap);

        setScoreInnings1(innings1.data);
        if (innings2.status === 200) setScoreInnings2(innings2.data);

        const playersStatsRes = await axios.get(`/api/stats/players/all?matchId=${matchId}`);
        setPlayerStats(playersStatsRes.data);
        
      } catch (e) {
        console.error("Error loading stats", e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [matchId]);

  if (loading) return <p className="text-center mt-10">Loading Stats...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">📊 Match Statistics</h1>
      <p className="text-center text-lg">{match?.venue} | {match?.matchType} | {match?.overs} Overs</p>

      {/* 🔹 Innings Scorecards */}
      {scoreInnings1 && (
        <ScoreCard
          innings={1}
          score={scoreInnings1}
          team={teams[scoreInnings1.battingTeamId]}
        />
      )}

      {scoreInnings2 && (
        <ScoreCard
          innings={2}
          score={scoreInnings2}
          team={teams[scoreInnings2.battingTeamId]}
        />
      )}

      {/* 🔹 Player Stats */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">🏏 Player Statistics</h2>

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th>Player</th>
              <th>Runs</th>
              <th>Balls</th>
              <th>4s</th>
              <th>6s</th>
              <th>SR</th>
              <th>Overs</th>
              <th>Runs Conceded</th>
              <th>Wkts</th>
              <th>Eco</th>
            </tr>
          </thead>
          <tbody>
            {playerStats.map((ps) => {
              const sr = ps.ballsFaced > 0 ? ((ps.runsScored * 100) / ps.ballsFaced).toFixed(1) : "-";
              const eco = ps.oversBowled && parseFloat(ps.oversBowled) > 0
                ? (ps.runsConceded / parseFloat(ps.oversBowled)).toFixed(2)
                : "-";
              return (
                <tr key={ps.playerId} className="border-b">
                  <td>{ps.playerId}</td>
                  <td>{ps.runsScored}</td>
                  <td>{ps.ballsFaced}</td>
                  <td>{ps.fours}</td>
                  <td>{ps.sixes}</td>
                  <td>{sr}</td>
                  <td>{ps.oversBowled}</td>
                  <td>{ps.runsConceded}</td>
                  <td>{ps.wickets}</td>
                  <td>{eco}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 🔹 ScoreCard Component
function ScoreCard({ innings, score, team }) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">
        Innings {innings} – {team?.name}
      </h2>
      <p className="text-lg">
        <strong>{score.runs}/{score.wickets}</strong> in{" "}
        <strong>{score.overs} overs</strong> (Extras: {score.extras})
      </p>
    </div>
  );
}
