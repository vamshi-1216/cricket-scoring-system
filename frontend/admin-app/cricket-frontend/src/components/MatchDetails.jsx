import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function MatchDetails() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [teams, setTeams] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([axios.get(`/matches/${id}`), axios.get("/teams/all")])
      .then(([matchRes, teamsRes]) => {
        setMatch(matchRes.data);
        const teamMap = {};
        teamsRes.data.forEach((team) => {
          teamMap[team.id] = team;
        });
        setTeams(teamMap);
      })
      .catch(() => setError("Failed to load match details"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center text-yellow-200">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!match) return <p className="text-center text-white">No match found.</p>;

  const teamA = teams[match.teamAId] || {};
  const teamB = teams[match.teamBId] || {};

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 font-['Cinzel'] text-[#e6c884]"
      style={{
        backgroundImage: "url('/stadium.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Card */}
      <div className="relative z-10 max-w-2xl w-full bg-black/40 border border-yellow-700 rounded-2xl p-10 shadow-2xl backdrop-blur-md">

        <h2 className="text-4xl text-center font-bold tracking-widest mb-6">
          MATCH DETAILS
        </h2>

        {/* Teams */}
        <div className="flex justify-around items-center mb-8">
          {/* Team A */}
          <div className="text-center">
            <img
              src={teamA.logoUrl}
              alt="Team A"
              className="h-24 w-24 object-contain mx-auto drop-shadow-xl"
            />
            <p className="mt-2 text-xl font-bold">{teamA.name}</p>
          </div>

          <p className="text-4xl font-extrabold tracking-widest text-yellow-400">
            VS
          </p>

          {/* Team B */}
          <div className="text-center">
            <img
              src={teamB.logoUrl}
              alt="Team B"
              className="h-24 w-24 object-contain mx-auto drop-shadow-xl"
            />
            <p className="mt-2 text-xl font-bold">{teamB.name}</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2 text-lg">
          <p><strong className="text-yellow-400">Venue:</strong> {match.venue}</p>
          <p><strong className="text-yellow-400">Date:</strong> {match.matchDate ? new Date(match.matchDate).toLocaleString() : "Not Scheduled"}</p>
          <p><strong className="text-yellow-400">Overs:</strong> {match.overs}</p>
          <p><strong className="text-yellow-400">Status:</strong> {match.status}</p>

          {match.tossWinnerTeamId && (
            <p>
              <strong className="text-yellow-400">Toss Winner:</strong> 
              {" "}
              {teams[match.tossWinnerTeamId]?.name} 
              {" "}
              ({match.tossDecision})
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">

          {/* Edit */}
          <Link
            to={`/matches/edit/${match.id}`}
            className="px-5 py-3 bg-yellow-700 text-black font-bold border border-yellow-500 rounded-xl hover:bg-yellow-600 transition shadow-lg"
          >
            ✏ EDIT MATCH
          </Link>

          {/* Conduct Toss */}
          {!match.tossWinnerTeamId && match.status === "NOT_STARTED" && (
            <Link
              to={`/matches/${match.id}/toss`}
              className="px-5 py-3 bg-green-700 text-white font-bold border border-green-500 rounded-xl hover:bg-green-600 transition shadow-lg"
            >
              🎲 CONDUCT TOSS
            </Link>
          )}

          {/* Start Scoring */}
          {match.tossWinnerTeamId && match.status !== "COMPLETED" && (
            <Link
              to={`/match/${match.id}/scoring`}
              className="px-5 py-3 bg-blue-700 text-white font-bold border border-blue-500 rounded-xl hover:bg-blue-600 transition shadow-lg"
            >
              🏏 START SCORING
            </Link>
          )}

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-3 bg-gray-700 text-white border border-gray-500 rounded-xl hover:bg-gray-600 transition shadow-lg"
          >
            🔙 BACK
          </button>

        </div>
      </div>
    </div>
  );
}
