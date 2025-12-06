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

      console.log("API Response:", response);

      // SUCCESS if status is 200 (OK) or 201 (Created)
      if (response.status >= 200 && response.status <= 201) {
        alert("Team created successfully!");
        navigate("/"); 
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
    <div className="p-6 max-w-lg mx-auto shadow-lg rounded-lg bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Team</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Team Name", key: "name" },
          { label: "Location", key: "location" },
          { label: "Coach Name", key: "coachName" },
          { label: "Captain Name", key: "captain" },
        ].map(({ label, key }) => (
          <div key={key}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              type="text"
              value={team[key]}
              onChange={(e) => setTeam({ ...team, [key]: e.target.value })}
              placeholder={label}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white ${
            loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
