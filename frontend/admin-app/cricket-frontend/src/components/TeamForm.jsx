import { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function TeamForm() {
  const [team, setTeam] = useState({
    name: "",
    location: "",
    coachName: "",
    captain: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/teams", team);

      if (response.status >= 200 && response.status <= 201) {
        alert("Team created successfully!");
        navigate("/Team"); // Redirect back to teams page
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Failed to create team. Please try again.");
    } finally {
      setLoading(false);
    }
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
      {/* page dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Form box */}
      <div className="relative z-10 max-w-xl w-full bg-black/50 border border-yellow-700 p-10 rounded-2xl shadow-2xl backdrop-blur-md">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-6 tracking-widest border-b border-yellow-700 pb-2">
          CREATE TEAM
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Team Name", key: "name" },
            { label: "Location", key: "location" },
            { label: "Coach Name", key: "coachName" },
            { label: "Captain Name", key: "captain" },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="block mb-2 font-bold tracking-wider">
                {label}
              </label>

              <input
                type="text"
                value={team[key]}
                onChange={(e) => setTeam({ ...team, [key]: e.target.value })}
                placeholder={label}
                className="w-full px-4 py-3 bg-black/40 border border-yellow-600 rounded-xl text-[#e6c884]
                           focus:outline-none focus:ring focus:ring-yellow-500/40 shadow-lg"
                required
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-black font-bold tracking-wider transition
              ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-500 hover:scale-105"
              }`}
          >
            {loading ? "Saving..." : "Save Team"}
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/Team")}
            className="w-full py-2 mt-3 rounded-xl border border-yellow-600 bg-black/50 
                       hover:bg-black/60 text-[#e6c884] hover:scale-105 transition font-bold"
          >
            ← Back
          </button>
        </form>
      </div>
    </div>
  );
}
