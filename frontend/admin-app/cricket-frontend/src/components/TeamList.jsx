import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

export default function TeamList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/teams/all")
      .then((res) => setTeams(res.data))
      .catch(() => setError("⚠ Failed to load teams from backend"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      axios
        .delete(`/teams/${id}`)
        .then(() => {
          alert("Team deleted successfully");
          setTeams((prev) => prev.filter((team) => team.id !== id));
        })
        .catch(() => alert("Failed to delete team"));
    }
  };

  if (loading)
    return (
      <div className="text-center text-2xl text-[#e6c884] p-10">
        Loading teams...
      </div>
    );

  if (error)
    return <h2 className="text-red-500 text-center text-xl p-6">{error}</h2>;

  return (
    <div
      className="min-h-screen text-[#e6c884] font-['Cinzel'] relative"
      style={{
        backgroundImage: "url('/stadium.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 px-8 pt-24 pb-10">

        {/* Top Section Title */}
        <h1 className="text-5xl font-extrabold tracking-widest mb-6 border-l-4 border-yellow-600 pl-3">
          TEAMS OF THE REALM
        </h1>

        {/* Add Team Button */}
        <Link
          to="/add"
          className="inline-block px-6 py-3 bg-yellow-700/40 border border-yellow-500 rounded-xl
                     hover:scale-105 hover:bg-yellow-600/50 transition font-bold"
        >
          ➕ Create New Team
        </Link>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {teams.map((team) => (
            <div
              key={team.id}
              className="border border-yellow-700 bg-black/40 p-6 rounded-2xl shadow-lg
                        hover:scale-105 hover:bg-black/50 transition"
            >
              <h2 className="text-3xl font-bold mb-2">{team.name}</h2>
              <p className="text-[#e6c884c0]">📍 Location: {team.location}</p>
              <p className="text-[#e6c884c0]">🧑‍🏫 Coach: {team.coachName}</p>
              <p className="text-[#e6c884c0]">🧢 Captain: {team.captain}</p>

              {/* Buttons */}
              <div className="mt-5 flex gap-3 flex-wrap">
                <Link
                  to={`/team/${team.id}/players`}
                  className="bg-purple-700/40 border border-purple-400 px-4 py-2 rounded-xl hover:bg-purple-600/50 transition"
                >
                  👥 View Players
                </Link>

                <Link
                  to={`/edit/${team.id}`}
                  className="bg-yellow-600/40 border border-yellow-400 px-4 py-2 rounded-xl hover:bg-yellow-600/60 transition"
                >
                  ✏ Edit
                </Link>

                <button
                  onClick={() => handleDelete(team.id)}
                  className="bg-red-700/40 border border-red-500 px-4 py-2 rounded-xl hover:bg-red-600/60 transition"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/Home")}
          className="mt-10 px-6 py-3 bg-black/60 border border-yellow-600 rounded-xl hover:scale-110 transition"
        >
          🔙 Back to Home
        </button>
      </div>
    </div>
  );
}
