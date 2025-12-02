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
      .catch(() => setError("Failed to load teams from backend"))
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

  if (loading) return <h2>Loading teams...</h2>;
  if (error) return <h2 className="text-red-600">{error}</h2>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Teams List</h1>

      <Link to="/add" className="px-4 py-2 bg-blue-600 text-white rounded">
        ➕ Add Team
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {teams.map((team) => (
          <div key={team.id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-xl font-bold">{team.name}</h2>
            <p>📍 Location: {team.location}</p>
            <p>🧑‍🏫 Coach: {team.coachName}</p>
            <p>🧢 Captain: {team.captain}</p>

            <div className="mt-3 flex gap-2">
              <Link
                to={`/team/${team.id}/players`}
                className="px-3 py-1 bg-purple-600 text-white rounded"
              >
                👥 Players
              </Link>

              <Link
                to={`/edit/${team.id}`}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                ✏ Edit
              </Link>

              <button
                onClick={() => handleDelete(team.id)}
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
