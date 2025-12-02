import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTeamForm() {
  const { id } = useParams();
  const [team, setTeam] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/teams/${id}`).then((res) => setTeam(res.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`/teams/${id}`, team).then(() => {
      alert("Team updated successfully!");
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-3">
      <h1 className="text-2xl font-bold mb-3">Edit Team</h1>

      {["name", "location", "coachName", "captain"].map((field) => (
        <input
          key={field}
          type="text"
          value={team[field] || ""}
          placeholder={field}
          className="w-full p-2 border rounded"
          onChange={(e) => setTeam({ ...team, [field]: e.target.value })}
          required
        />
      ))}

      <button className="px-4 py-2 bg-green-600 text-white rounded">
        Update Team
      </button>
    </form>
  );
}
