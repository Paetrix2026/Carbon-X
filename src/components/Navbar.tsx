import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-primary to-emerald-800 p-2.5 rounded-xl shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-6 w-6 text-secondary-fixed" />
              </div>
              <span className="text-2xl font-display font-black text-primary tracking-tighter group-hover:text-emerald-800 transition-colors">CarbonX</span>
            </Link>
          </div>
          <div className="flex items-center gap-10">
            {userRole ? (
              <>
                <Link
                  to={userRole === "farmer" ? "/farmer" : "/industry"}
                  className="text-slate-600 hover:text-emerald-700 font-bold text-xs uppercase tracking-widest transition-all relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-500 after:transition-all hover:after:w-full"
                >
                  Dashboard
                </Link>
                {userRole === "farmer" && (
                  <>
                    <Link
                      to="/training"
                      className="text-slate-600 hover:text-emerald-700 font-bold text-xs uppercase tracking-widest transition-all relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-500 after:transition-all hover:after:w-full"
                    >
                      Training
                    </Link>
                    <Link
                      to="/funding"
                      className="text-slate-600 hover:text-emerald-700 font-bold text-xs uppercase tracking-widest transition-all relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-500 after:transition-all hover:after:w-full"
                    >
                      Funding
                    </Link>
                  </>
                )}
                {userRole === "industry" && (
                  <Link
                    to="/marketplace"
                    className="text-slate-600 hover:text-emerald-700 font-bold text-xs uppercase tracking-widest transition-all relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-500 after:transition-all hover:after:w-full"
                  >
                    Marketplace
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-red-500 font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn-primary !py-2.5 !px-6 text-sm"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
