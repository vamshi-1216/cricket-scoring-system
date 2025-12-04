import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-black/40 backdrop-blur-md border-b border-yellow-700 py-4 px-8 flex justify-between items-center fixed top-0 z-50 font-['Cinzel'] text-[#e6c884]">
      <h1
        onClick={() => navigate("/Home")}
        className="text-3xl font-extrabold tracking-widest cursor-pointer"
      >
        GAME OF CRICKET
      </h1>

      <ul className="flex gap-10 text-lg">
  <li onClick={() => navigate("/Home")} className="hover:text-white cursor-pointer">Home</li>

  <li onClick={() => navigate("/add")} className="hover:text-white cursor-pointer">Teams</li>

  <li onClick={() => navigate("/matches")} className="hover:text-white cursor-pointer">Matches</li>

  <li onClick={() => navigate("/players/stats")} className="hover:text-white cursor-pointer">Stats</li>

  <li onClick={() => navigate("/profile")} className="hover:text-white cursor-pointer">Profile</li>
</ul>

    </nav>
  );
}
