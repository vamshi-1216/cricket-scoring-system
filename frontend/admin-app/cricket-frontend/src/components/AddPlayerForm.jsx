import { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

export default function AddPlayerForm() {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [player, setPlayer] = useState({
    name: "",
    role: "",
    battingStyle: "",
    bowlingStyle: "",
    photoUrl: "",
    teamId: teamId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/players", player)
      .then(() => {
        alert("Player added successfully!");
        navigate(`/team/${teamId}/players`);
      })
      .catch((err) => {
        alert("Failed to add player");
        console.error(err);
      });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Player</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "role", "battingStyle", "bowlingStyle", "photoUrl"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            className="w-full p-2 border rounded"
            value={player[field]}
            onChange={(e) => setPlayer({ ...player, [field]: e.target.value })}
            required
          />
        ))}

        <button className="w-full py-2 bg-green-600 text-white rounded">
          Add Player
        </button>
      </form>
    </div>
  );
}
