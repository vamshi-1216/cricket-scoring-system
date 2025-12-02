import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { Link } from "react-router-dom";

export default function MatchList() {
  const [matches, setMatches] = useState([]);
  const [teamsById, setTeamsById] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([axios.get("/matches/all"), axios.get("/teams/all")])
      .then(([matchesRes, teamsRes]) => {
        setMatches(matchesRes.data);

        const map = {};
        teamsRes.data.forEach((t) => (map[t.id] = t));
        setTeamsById(map);
      })
      .catch((err) => {
        console.error("Failed to load matches", err);
        alert("Failed to load matches");
      })
      .finally(() => setLoading(false));
  }, []);

  const deleteMatch = (id) => {
    if (!window.confirm("Delete this match?")) return;

    axios.delete(`/matches/${id}`).then(() => {
      setMatches((prev) => prev.filter((m) => m.id !== id));
    });
  };

  if (loading)
    return (
      <p className="text-center text-yellow-300 font-['Cinzel'] mt-10">
        Loading matches...
      </p>
    );

  return (
    <div
      className="min-h-screen p-6 font-['Cinzel'] text-[#e6c884]"
      style={{
        backgroundImage: "url('/stadium.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* PAGE TITLE */}
        <h2 className="text-5xl font-bold text-center mb-8 tracking-widest">
          🏏 All Matches
        </h2>

        {/* ADD MATCH BUTTON */}
        <Link
          to="/matches/add"
          className="px-6 py-3 bg-yellow-700 border border-yellow-500 text-black 
                     rounded-xl font-bold shadow-lg hover:bg-yellow-600 transition 
                     inline-block mb-8"
        >
          ➕ Schedule Match
        </Link>

        {/* MATCH GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((m) => {
            const teamA = teamsById[m.teamAId];
            const teamB = teamsById[m.teamBId];

            return (
              <div
                key={m.id}
                className="bg-black/40 border border-yellow-700 rounded-xl p-5 shadow-xl 
                           backdrop-blur-md hover:shadow-2xl transition"
              >
                {/* DATE */}
                <h3 className="text-lg font-bold mb-2">
                  📅{" "}
                  {m.matchDate
                    ? new Date(m.matchDate).toLocaleString()
                    : "Date not set"}
                </h3>

                {/* TEAMS */}
                <p className="text-xl font-bold tracking-wider mb-1">
                  🆚 {teamA?.name || "Team A"} vs {teamB?.name || "Team B"}
                </p>

                {/* VENUE */}
                <p className="text-md mb-1">📍 {m.venue}</p>

                {/* STATUS */}
                <p className="text-md">
                  🏆 Status:{" "}
                  <span className="font-bold text-yellow-300">
                    {m.status}
                  </span>
                </p>

                {/* BUTTONS */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {/* VIEW */}
                  <Link
                    to={`/matches/${m.id}`}
                    className="px-3 py-2 bg-green-700 text-white rounded-lg border border-green-500 
                               shadow hover:bg-green-600 transition"
                  >
                    👁 View
                  </Link>

                  {/* EDIT */}
                  <Link
                    to={`/matches/edit/${m.id}`}
                    className="px-3 py-2 bg-blue-700 text-white rounded-lg border border-blue-500 
                               shadow hover:bg-blue-600 transition"
                  >
                    ✏ Edit
                  </Link>

                  {/* TOSS */}
                  <Link
                    to={`/matches/${m.id}/toss`}
                    className="px-3 py-2 bg-purple-700 text-white rounded-lg border border-purple-500 
                               shadow hover:bg-purple-600 transition"
                  >
                    🎲 Toss
                  </Link>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteMatch(m.id)}
                    className="px-3 py-2 bg-red-700 text-white rounded-lg border border-red-500 
                               shadow hover:bg-red-600 transition"
                  >
                    ❌ Delete
                  </button>

                  {/* VIEW STATS (only after match completed) */}
                  {m.status === "COMPLETED" && (
                    <Link
                      to={`/match/${m.id}/stats`}
                      className="px-3 py-2 bg-yellow-600 text-black rounded-lg border border-yellow-400 
                                 shadow hover:bg-yellow-500 transition"
                    >
                      📊 Stats
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
