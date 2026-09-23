import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { Link, useParams } from "react-router-dom";

export default function PlayerList() {
  const { teamId } = useParams();
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/players/team/${teamId}`)
      .then((res) => setPlayers(res.data))
      .catch(() => setError("Failed to load players"));
  }, [teamId]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this player?")) {
      axios
        .delete(`/players/${id}`)
        .then(() => setPlayers(players.filter((p) => p.id !== id)))
        .catch(() => alert("Failed to delete player"));
    }
  };

  if (error) return <h3 className="text-red-600">{error}</h3>;

  return (
    <div className="min-h-screen text-[#e6c884] font-['Cinzel'] relative"
      style={{
        backgroundImage: "url('/stadium.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* dark bg overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* content */}
      <div className="relative z-10 p-10">
        <h1 className="text-4xl font-bold mb-6 tracking-widest">
          Players of Team #{teamId}
        </h1>

        {/* ALWAYS show Add Player */}
        <Link
          to={`/team/${teamId}/add-player`}
          className="px-6 py-3 bg-yellow-600 border border-yellow-400 rounded-xl 
                     hover:scale-105 transition inline-block mb-6"
        >
          ➕ Add Player
        </Link>

        {/* If no players yet */}
        {players.length === 0 ? (
          <h3 className="text-xl text-[#e6c884c0]">No players added yet.</h3>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player) => (
              <div
                key={player.id}
                className="border border-yellow-700 bg-black/40 p-6 rounded-2xl shadow-lg text-center"
              >

                {/* Photo */}
                {player.photoUrl ? (
                  <img
                    src={player.photoUrl}
                    alt={player.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-600 flex items-center justify-center border">
                    📷
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{player.name}</h3>
                <p>🗡 Role: {player.role}</p>
                <p>🏏 Batting: {player.battingStyle}</p>
                <p>🎯 Bowling: {player.bowlingStyle}</p>

                <div className="mt-4 flex gap-3 justify-center">
                  <Link
                    to={`/player/edit/${player.id}`}
                    className="px-4 py-2 bg-yellow-600 border border-yellow-400 rounded-xl hover:scale-105 transition"
                  >
                    ✏ Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(player.id)}
                    className="px-4 py-2 bg-red-600 border border-red-500 rounded-xl hover:scale-105 transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
