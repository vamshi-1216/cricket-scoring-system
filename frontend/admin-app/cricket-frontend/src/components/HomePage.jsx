import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen text-[#e6c884] font-['Cinzel'] relative"
      style={{
        backgroundImage: "url('/stadium.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Page Content */}
      <div className="relative z-10">

        {/* Navigation Bar */}
        <nav className="w-full bg-black/40 backdrop-blur-md border-b border-yellow-700 py-4 px-8 flex justify-between items-center fixed top-0 z-50">
          <h1
            onClick={() => navigate("/Home")}
            className="text-3xl font-extrabold tracking-widest cursor-pointer"
          >
            GAME OF CRICKET
          </h1>

          <ul className="flex gap-10 text-lg">
            <li onClick={() => navigate("/Home")} className="hover:text-white cursor-pointer">Homere</li>
            <li onClick={() => navigate("/add")} className="hover:text-white cursor-pointer">Teams</li>
            <li onClick={() => navigate("/matches")} className="hover:text-white cursor-pointer">Matches</li>
            <li onClick={() => navigate("/players/stats")} className="hover:text-white cursor-pointer">Stats</li>
            <li onClick={() => navigate("/profile")} className="hover:text-white cursor-pointer">Profile</li>
          </ul>
        </nav>

        {/* Hero Banner */}
        <section className="h-[70vh] flex items-center justify-center">
          <div className="text-center mt-20">
            <h2 className="text-6xl font-extrabold tracking-widest mb-4">
              THE GAME BEGINS
            </h2>
            <p className="text-xl opacity-90 tracking-wide">
              Where Cricket Meets the Seven Kingdoms
            </p>
          </div>
        </section>

        {/* Sections */}
        <div className="max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Recent Matches */}
          <div
            onClick={() => navigate("/matches")}
            className="border border-yellow-800 bg-black/40 p-8 rounded-2xl shadow-lg hover:scale-105 transition cursor-pointer"
          >
            <h3 className="text-3xl mb-4 font-bold">Recent Matches</h3>
            <p className="text-[#e6c884c0]">View battles fought on the pitch.</p>
          </div>

          {/* Create Match */}
          <div
            onClick={() => navigate("/matches/add")}
            className="border border-yellow-500 bg-yellow-700/30 p-8 rounded-2xl shadow-lg hover:scale-105 transition cursor-pointer"
          >
            <h3 className="text-3xl mb-4 font-bold">Create Match</h3>
            <p className="text-[#e6c884c0]">Forge a new cricket battle.</p>
          </div>

          {/* Player Stats */}
          <div
            onClick={() => navigate("/players/stats")}
            className="border border-yellow-800 bg-black/40 p-8 rounded-2xl shadow-lg hover:scale-105 transition cursor-pointer"
          >
            <h3 className="text-3xl mb-4 font-bold">Player Stats</h3>
            <p className="text-[#e6c884c0]">Know the strengths of your warriors.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
