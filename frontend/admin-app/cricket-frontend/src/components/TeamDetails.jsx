import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function TeamDetails() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    axios.get(`/teams/${id}`).then((res) => setTeam(res.data));
  }, [id]);

  if (!team) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold">{team.name}</h1>
      <p>📍 Location: {team.location}</p>
      <p>🧑‍🏫 Coach: {team.coachName}</p>
      <p>🧢 Captain: {team.captain}</p>
      <Link to="/" className="mt-4 inline-block bg-gray-600 px-4 py-2 text-white rounded">
        ⬅ Back to Teams
      </Link>
    </div>
  );
}
