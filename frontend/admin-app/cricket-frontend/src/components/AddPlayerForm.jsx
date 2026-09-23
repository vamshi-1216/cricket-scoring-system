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
    <div
      className="min-h-screen text-[#e6c884] font-['Cinzel'] relative flex items-center justify-center"
      style={{
        backgroundImage: "url('/stadium.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Form Panel */}
      <div className="relative z-10 max-w-xl w-full p-10 bg-black/50 border border-yellow-700 rounded-2xl shadow-xl backdrop-blur-md">

        {/* Title */}
        <h1 className="text-4xl font-extrabold tracking-widest mb-6 text-center border-b border-yellow-700 pb-2">
          ADD PLAYER
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {[
            { key: "name", label: "Player Name" },
            { key: "role", label: "Playing Role" },
            { key: "battingStyle", label: "Batting Style" },
            { key: "bowlingStyle", label: "Bowling Style" },
            { key: "photoUrl", label: "Photo URL" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block font-bold tracking-wider mb-2">{label}</label>
              <input
                type="text"
                value={player[key]}
                onChange={(e) => setPlayer({ ...player, [key]: e.target.value })}
                placeholder={label}
                className="w-full px-4 py-3 bg-black/40 border border-yellow-600 rounded-xl 
                           text-[#e6c884] shadow-lg focus:outline-none focus:ring focus:ring-yellow-500/40"
                required
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-600 text-black font-bold tracking-wider
                       rounded-xl hover:bg-yellow-500 hover:scale-105 transition"
          >
            ➕ Add Player
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(`/team/${teamId}/players`)}
            className="w-full py-2 mt-3 border border-yellow-600 bg-black/50 text-[#e6c884]
                       rounded-xl font-bold hover:bg-black/60 hover:scale-105 transition"
          >
            ← Back to Players
          </button>
        </form>
      </div>
    </div>
  );
}
