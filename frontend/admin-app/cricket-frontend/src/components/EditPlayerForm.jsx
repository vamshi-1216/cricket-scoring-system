import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axiosConfig";

export default function EditPlayerForm() {
  const { id } = useParams();
  const [player, setPlayer] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/players/${id}`).then((res) => setPlayer(res.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`/players/${id}`, player).then(() => {
      alert("Player updated successfully!");
      navigate(`/team/${player.teamId}/players`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-3">
      <h1 className="text-2xl font-bold mb-3">Edit Player</h1>

      {["name", "role", "battingStyle", "bowlingStyle", "photoUrl"].map(
        (field) => (
          <input
            key={field}
            type="text"
            value={player[field] || ""}
            placeholder={field}
            className="w-full p-2 border rounded"
            onChange={(e) => setPlayer({ ...player, [field]: e.target.value })}
            required
          />
        )
      )}

      <button className="px-4 py-2 bg-green-600 text-white rounded">
        Update Player
      </button>
    </form>
  );
}
