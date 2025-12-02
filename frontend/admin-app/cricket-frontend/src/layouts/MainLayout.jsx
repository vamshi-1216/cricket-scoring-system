import { useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function MainLayout({ children }) {
  const { pathname } = useLocation();

  // REMOVE padding for homepage only
  const noPadding = pathname === "/Home" || pathname === "/";

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className={noPadding ? "" : "pt-14"}>
        {children}
      </div>
    </div>
  );
}
