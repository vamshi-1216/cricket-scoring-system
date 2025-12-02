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
  if (players.length === 0) return <h3>No players added yet.</h3>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Players of Team #{teamId}</h1>

      <Link
        to={`/team/${teamId}/add-player`}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        ➕ Add Player
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {players.map((player) => (
          <div key={player.id} className="border p-4 rounded shadow bg-white text-center">
            
            {/* ⭐ Player Photo Display */}
            {player.photoUrl ? (
              <img
                src={player.photoUrl}
                alt={player.name}
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border"
              />
            ) : (
              <div className="w-24 h-24 rounded-full mx-auto mb-3 bg-gray-300 flex items-center justify-center">
                📷
              </div>
            )}

            <h3 className="text-xl font-bold">{player.name}</h3>
            <p>🏏 Role: {player.role}</p>
            <p>📝 Batting: {player.battingStyle}</p>
            <p>🎯 Bowling: {player.bowlingStyle}</p>

            <div className="mt-3 flex gap-2 justify-center">
              <Link
                to={`/player/edit/${player.id}`}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                ✏ Edit
              </Link>

              <button
                onClick={() => handleDelete(player.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
