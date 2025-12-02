import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosConfig";

export default function CareerStatsPage() {
  const { playerId } = useParams();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [career, setCareer] = useState({
    matches: 0,
    totalRuns: 0,
    ballsFaced: 0,
    totalFours: 0,
    totalSixes: 0,
    fifties: 0,
    hundreds: 0,
    runsConceded: 0,
    ballsBowled: 0,
    totalWickets: 0,
  });

  useEffect(() => {
    axios
      .get(`/api/stats/players/${playerId}`)
      .then((res) => {
        setStats(res.data);
        calculateCareer(res.data);
      })
      .catch((err) => console.error("Failed to load stats", err))
      .finally(() => setLoading(false));
  }, [playerId]);

  const calculateCareer = (data) => {
    let totalRuns = 0,
      ballsFaced = 0,
      totalFours = 0,
      totalSixes = 0;
    let runsConceded = 0,
      ballsBowled = 0,
      totalWickets = 0;
    let fifties = 0,
      hundreds = 0;

    data.forEach((m) => {
      totalRuns += m.runsScored;
      ballsFaced += m.ballsFaced;
      totalFours += m.fours;
      totalSixes += m.sixes;

      if (m.runsScored >= 50 && m.runsScored < 100) fifties++;
      if (m.runsScored >= 100) hundreds++;

      runsConceded += m.runsConceded;
      ballsBowled += m.ballsBowled;
      totalWickets += m.wickets;
    });

    setCareer({
      matches: data.length,
      totalRuns,
      ballsFaced,
      totalFours,
      totalSixes,
      fifties,
      hundreds,
      runsConceded,
      ballsBowled,
      totalWickets,
    });
  };

  const battingAverage =
    career.matches > 0
      ? (career.totalRuns / career.matches).toFixed(1)
      : "-";

  const strikeRate =
    career.ballsFaced > 0
      ? ((career.totalRuns / career.ballsFaced) * 100).toFixed(1)
      : "-";

  const oversBowled = `${Math.floor(career.ballsBowled / 6)}.${
    career.ballsBowled % 6
  }`;

  const economy =
    career.ballsBowled > 0
      ? (career.runsConceded / (career.ballsBowled / 6)).toFixed(2)
      : "-";

  if (loading)
    return (
      <p className="text-center text-yellow-400 text-2xl font-['Cinzel']">
        Loading career stats...
      </p>
    );

  return (
    <div
      className="min-h-screen px-6 py-10 font-['Cinzel'] text-[#e6c884]"
      style={{
        backgroundImage: "url('/stadium.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/75"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-5xl font-bold tracking-widest text-center mb-10">
          🏏 Career Stats
        </h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Matches" value={career.matches} />
          <StatCard title="Total Runs" value={career.totalRuns} />
          <StatCard title="Batting Average" value={battingAverage} />
          <StatCard title="Strike Rate" value={strikeRate} />
          <StatCard title="Total Fours" value={career.totalFours} />
          <StatCard title="Total Sixes" value={career.totalSixes} />
          <StatCard title="50s" value={career.fifties} />
          <StatCard title="100s" value={career.hundreds} />
          <StatCard title="Overs Bowled" value={oversBowled} />
          <StatCard title="Wickets Taken" value={career.totalWickets} />
          <StatCard title="Runs Conceded" value={career.runsConceded} />
          <StatCard title="Economy Rate" value={economy} />
        </div>

        {/* Match Wise Stats */}
        <h3 className="text-3xl font-bold mt-10 mb-4 tracking-wider">
          Match-wise Stats
        </h3>

        <div className="overflow-x-auto rounded-xl border border-yellow-700 bg-black/40 backdrop-blur-md">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-yellow-700 bg-black/60 text-yellow-300">
                <th className="p-3">Match ID</th>
                <th>Runs</th>
                <th>Balls</th>
                <th>4s</th>
                <th>6s</th>
                <th>Overs</th>
                <th>Runs Conceded</th>
                <th>Wickets</th>
              </tr>
            </thead>

            <tbody>
              {stats.map((s, i) => (
                <tr
                  key={i}
                  className="text-center border-b border-yellow-800 hover:bg-yellow-700/20 transition"
                >
                  <td className="p-2">{s.matchId}</td>
                  <td>{s.runsScored}</td>
                  <td>{s.ballsFaced}</td>
                  <td>{s.fours}</td>
                  <td>{s.sixes}</td>
                  <td>{s.oversBowled}</td>
                  <td>{s.runsConceded}</td>
                  <td>{s.wickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------- STAT CARD ---------------- */

function StatCard({ title, value }) {
  return (
    <div className="bg-black/40 border border-yellow-700 rounded-xl p-5 shadow-xl backdrop-blur-md">
      <p className="text-yellow-300 text-sm tracking-wide">{title}</p>
      <h2 className="text-3xl font-bold mt-1">{value}</h2>
    </div>
  );
}
