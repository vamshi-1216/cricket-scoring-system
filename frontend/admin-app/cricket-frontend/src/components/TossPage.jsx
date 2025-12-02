import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

export default function TossPage() {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [teams, setTeams] = useState({});
  const [coinCall, setCoinCall] = useState("");
  const [tossResult, setTossResult] = useState("");
  const [tossWinner, setTossWinner] = useState("");
  const [tossDecision, setTossDecision] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      axios.get(`/matches/${matchId}`),
      axios.get("/teams/all"),
    ])
      .then(([matchRes, teamsRes]) => {
        setMatch(matchRes.data);

        const map = {};
        teamsRes.data.forEach((team) => {
          map[team.id] = team;
        });
        setTeams(map);
      })
      .catch(() => alert("Failed to load toss details"));
  }, [matchId]);

  if (!match) return <p className="text-center text-white">Loading...</p>;

  const teamA = teams[match.teamAId];
  const teamB = teams[match.teamBId];

  const handleToss = () => {
    if (!coinCall) {
      alert("Select Heads or Tails first!");
      return;
    }

    const result = Math.random() < 0.5 ? "HEADS" : "TAILS";
    setTossResult(result);

    setTossWinner(result === coinCall ? teamA?.id : teamB?.id);
  };

  const saveTossResult = () => {
    if (!tossWinner || !tossDecision) {
      alert("Select decision first!");
      return;
    }

    axios
      .put(`/matches/${matchId}/toss`, null, {
        params: { tossWinnerTeamId: tossWinner, tossDecision },
      })
      .then(() => {
        alert("Toss saved!");
        navigate(`/matches/${matchId}`);
      })
      .catch(() => alert("Failed to save toss!"));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center font-['Cinzel'] text-[#e6c884]"
      style={{
        backgroundImage: "url('/stadium.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Card */}
      <div className="relative z-10 max-w-xl w-full bg-black/40 border border-yellow-700 rounded-2xl p-10 text-center shadow-2xl backdrop-blur-md">

        <h2 className="text-4xl font-bold tracking-widest mb-6">
          Toss: {teamA?.name} vs {teamB?.name}
        </h2>

        {/* Coin call */}
        {!tossWinner && (
          <>
            <p className="text-xl mb-3 font-semibold">{teamA?.name} calls:</p>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => setCoinCall("HEADS")}
                className={`px-6 py-3 rounded-lg border ${
                  coinCall === "HEADS"
                    ? "bg-yellow-700 border-yellow-500 text-black"
                    : "bg-black/50 border-yellow-800"
                } hover:scale-105 transition`}
              >
                🪙 HEADS
              </button>

              <button
                onClick={() => setCoinCall("TAILS")}
                className={`px-6 py-3 rounded-lg border ${
                  coinCall === "TAILS"
                    ? "bg-yellow-700 border-yellow-500 text-black"
                    : "bg-black/50 border-yellow-800"
                } hover:scale-105 transition`}
              >
                🪙 TAILS
              </button>
            </div>

            <button
              onClick={handleToss}
              className="mt-6 px-8 py-3 bg-green-700 border border-green-400 text-white rounded-lg hover:bg-green-600 hover:scale-105 transition font-bold tracking-widest"
            >
              🎲 TOSS COIN
            </button>
          </>
        )}

        {/* Toss Result */}
        {tossResult && (
          <p className="mt-6 text-2xl font-bold">
            Coin shows:{" "}
            <span className="text-yellow-400">{tossResult}</span>
          </p>
        )}

        {/* Winner & Decision */}
        {tossWinner && (
          <div className="mt-8">
            <h3 className="text-2xl font-extrabold text-green-500 mb-4">
              🎉 {teams[tossWinner]?.name} won the toss!
            </h3>

            <p className="text-lg font-semibold mb-3">
              They choose to:
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => setTossDecision("BAT")}
                className={`px-6 py-3 rounded-lg border ${
                  tossDecision === "BAT"
                    ? "bg-yellow-600 border-yellow-500 text-black"
                    : "bg-black/50 border-yellow-800"
                } hover:scale-105 transition`}
              >
                🏏 BAT
              </button>

              <button
                onClick={() => setTossDecision("BOWL")}
                className={`px-6 py-3 rounded-lg border ${
                  tossDecision === "BOWL"
                    ? "bg-yellow-600 border-yellow-500 text-black"
                    : "bg-black/50 border-yellow-800"
                } hover:scale-105 transition`}
              >
                🎯 BOWL
              </button>
            </div>

            <button
              onClick={saveTossResult}
              className="mt-6 px-8 py-3 bg-blue-700 border border-blue-400 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition font-bold tracking-widest"
            >
              💾 SAVE TOSS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
