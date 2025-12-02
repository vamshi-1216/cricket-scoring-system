import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { Link } from "react-router-dom";

export default function AllPlayerStatsPage() {
  const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("/players/all")
      .then((res) => {
        setPlayers(res.data);
        res.data.forEach((player) => fetchPlayerCareer(player.id));
      })
      .catch((err) => console.error("Failed to load players", err));
  }, []);

  const fetchPlayerCareer = async (playerId) => {
    try {
      const res = await axios.get(`/api/stats/players/${playerId}`);
      const data = res.data;

      let totalRuns = 0,
        ballsFaced = 0,
        totalWickets = 0,
        ballsBowled = 0,
        runsConceded = 0;

      data.forEach((m) => {
        totalRuns += m.runsScored;
        ballsFaced += m.ballsFaced;
        totalWickets += m.wickets;
        ballsBowled += m.ballsBowled;
        runsConceded += m.runsConceded;
      });

      setStats((prev) => ({
        ...prev,
        [playerId]: {
          matches: data.length,
          runs: totalRuns,
          strikeRate:
            ballsFaced > 0
              ? ((totalRuns / ballsFaced) * 100).toFixed(1)
              : "-",
          wickets: totalWickets,
          economy:
            ballsBowled > 0
              ? (runsConceded / (ballsBowled / 6)).toFixed(2)
              : "-",
        },
      }));
    } catch (err) {
      console.error("Error fetching stats", playerId);
    }
  };

  return (
    <div
      className="min-h-screen px-6 py-10 font-['Cinzel'] text-[#e6c884]"
      style={{
        backgroundImage: "url('/stadium.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* PAGE TITLE */}
        <h2 className="text-5xl font-bold text-center tracking-widest mb-8">
          🏏 All Players - Career Stats
        </h2>

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search player..."
          className="w-full p-3 rounded-lg border border-yellow-700 bg-black/40 
                     text-yellow-300 placeholder-yellow-500 shadow-lg mb-6 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-yellow-700 bg-black/40 backdrop-blur-md shadow-xl">

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black/60 border-b border-yellow-700 text-yellow-300">
                <th className="p-3 text-left">Player Name</th>
                <th>Matches</th>
                <th>Runs</th>
                <th>Strike Rate</th>
                <th>Wickets</th>
                <th>Economy</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {players
                .filter((p) => p.name.toLowerCase().includes(search))
                .map((player) => {
                  const s = stats[player.id] || {
                    matches: "-",
                    runs: "-",
                    strikeRate: "-",
                    wickets: "-",
                    economy: "-",
                  };

                  return (
                    <tr
                      key={player.id}
                      className="border-b border-yellow-800 hover:bg-yellow-700/20 
                                 text-center transition"
                    >
                      <td className="p-3 text-left font-semibold">
                        {player.name}
                      </td>
                      <td>{s.matches}</td>
                      <td>{s.runs}</td>
                      <td>{s.strikeRate}</td>
                      <td>{s.wickets}</td>
                      <td>{s.economy}</td>

                      <td className="py-2">
                        <Link
                          to={`/player/${player.id}/stats`}
                          className="px-4 py-2 bg-yellow-700 text-black font-bold 
                                     rounded-lg border border-yellow-500 shadow 
                                     hover:bg-yellow-600 transition"
                        >
                          📊 Full Stats
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
