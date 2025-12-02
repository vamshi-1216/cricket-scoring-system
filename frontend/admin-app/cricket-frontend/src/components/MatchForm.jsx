import { useState, useEffect } from "react";
import axios from "../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

export default function MatchForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [match, setMatch] = useState({
    teamAId: "",
    teamBId: "",
    overs: "",
    matchDate: "",
    venue: "",
    status: "NOT_STARTED",
    matchType: "T20"
  });

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get("/teams/all").then((res) => setTeams(res.data));

    if (id) {
      axios.get(`/matches/${id}`).then((res) => setMatch(res.data));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const api = id 
      ? axios.put(`/matches/${id}`, match)
      : axios.post("/matches", match);

    api.then((res) => {
      alert(id ? "Match updated!" : "Match created!");

      // ⭐ NEW → redirect to toss page after creating match
      const matchId = id ? id : res.data.id;
      navigate(`/matches/${matchId}/toss`);
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 font-['Cinzel'] text-[#e6c884]"
      style={{
        backgroundImage: "url('/stadium.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl bg-black/40 border border-yellow-700 rounded-2xl p-10 shadow-xl backdrop-blur-md">

        <h2 className="text-4xl font-bold mb-6 text-center tracking-widest">
          {id ? "EDIT MATCH" : "CREATE MATCH"}
        </h2>

        {/* SELECT & OPTION STYLE */}
        <style>{`
          select, option {
            background-color: rgba(0,0,0,0.85);
            color: #e6c884;
            padding: 8px;
          }
          select:focus, input:focus {
            outline: none;
            box-shadow: 0 0 6px #d4af37;
          }
          option:hover {
            background: #d4af37 !important;
            color: black !important;
          }
        `}</style>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Team A */}
          <div>
            <label className="block mb-1 text-lg">Team A</label>
            <select
              required
              value={match.teamAId}
              onChange={(e) => setMatch({ ...match, teamAId: e.target.value })}
              className="w-full p-3 rounded border border-yellow-800 bg-black/60"
            >
              <option>Select Team A</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Team B */}
          <div>
            <label className="block mb-1 text-lg">Team B</label>
            <select
              required
              value={match.teamBId}
              onChange={(e) => setMatch({ ...match, teamBId: e.target.value })}
              className="w-full p-3 rounded border border-yellow-800 bg-black/60"
            >
              <option>Select Team B</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Overs */}
          <div>
            <label className="block mb-1 text-lg">Overs</label>
            <input
              type="number"
              required
              placeholder="Overs"
              value={match.overs}
              onChange={(e) => setMatch({ ...match, overs: e.target.value })}
              className="w-full p-3 bg-black/60 border border-yellow-800 rounded text-[#e6c884] placeholder-[#e6c88480]"
            />
          </div>

          {/* Match Date */}
          <div>
            <label className="block mb-1 text-lg">Match Date</label>
            <input
              type="datetime-local"
              required
              value={match.matchDate}
              onChange={(e) => setMatch({ ...match, matchDate: e.target.value })}
              className="w-full p-3 bg-black/60 border border-yellow-800 rounded text-[#e6c884]"
            />
          </div>

          {/* Venue */}
          <div>
            <label className="block mb-1 text-lg">Venue</label>
            <input
              type="text"
              required
              placeholder="Enter venue"
              value={match.venue}
              onChange={(e) => setMatch({ ...match, venue: e.target.value })}
              className="w-full p-3 bg-black/60 border border-yellow-800 rounded text-[#e6c884] placeholder-[#e6c88480]"
            />
          </div>

          {/* Match Type */}
          <div>
            <label className="block mb-1 text-lg">Match Type</label>
            <select
              value={match.matchType}
              onChange={(e) => setMatch({ ...match, matchType: e.target.value })}
              className="w-full p-3 rounded border border-yellow-800 bg-black/60"
            >
              <option value="T20">T20</option>
              <option value="ODI">ODI</option>
              <option value="TEST">TEST</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-700 border border-yellow-500 rounded-xl shadow-lg 
                       text-black font-bold tracking-widest hover:bg-yellow-600 transition"
          >
            {id ? "UPDATE MATCH" : "CREATE MATCH"}
          </button>

        </form>
      </div>
    </div>
  );
}
