import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useUser from "../hook/useUser";
import { axiosInstance } from "../api/axiosInstance";
import { 
  FaUser, 
  FaSignOutAlt, 
  FaShieldAlt, 
  FaBars, 
  FaTimes, 
  FaCompass, 
  FaFire, 
  FaPenNib 
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, setUser } = useUser();
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track scroll for enhanced shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const navLinks = [
    { name: "Feed", path: "/", icon: FaCompass },
    { name: "Trending", path: "/#featured", icon: FaFire },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 shadow-xl shadow-black/20"
          : "bg-slate-950/70 backdrop-blur-md border-b border-slate-800/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 group-hover:shadow-indigo-500/50 transition duration-300">
                <HiSparkles className="text-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-pink-300 transition duration-300">
                  InkPulse
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase -mt-1">
                  Insights & Stories
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                      isActive
                        ? "text-white bg-slate-800/80 shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <Icon className="text-indigo-400 text-xs" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Section: Write action & User Auth */}
          <div className="hidden md:flex items-center gap-4">
            {/* Quick Action Button for authenticated users or admins */}
            {user?.role === "admin" && (
              <Link
                to="/dashboard/addpost"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 hover:border-indigo-500/50 transition"
              >
                <FaPenNib className="text-indigo-400" />
                <span>Write Story</span>
              </Link>
            )}

            {/* Guest State: Login / Register */}
            {!user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl transition-all duration-300 group-hover:opacity-100" />
                  <span className="relative flex items-center gap-2 px-4 py-2 rounded-[11px] bg-slate-950 transition-all duration-300 group-hover:bg-opacity-0 text-white text-sm font-semibold">
                    Get Started
                  </span>
                </Link>
              </div>
            ) : (
              /* Authenticated User Menu */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 p-1.5 rounded-full hover:bg-slate-800/60 transition border border-slate-800 hover:border-slate-700"
                  aria-expanded={dropdownOpen}
                >
                  <div className="relative">
                    <img
                      src={user.profile || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                      alt={user.name || "User Avatar"}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/40"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                  </div>
                  <div className="hidden lg:flex flex-col text-left pr-2">
                    <span className="text-xs font-semibold text-slate-200 line-clamp-1 max-w-[120px]">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-indigo-400 capitalize">
                      {user.role}
                    </span>
                  </div>
                </button>

                {/* Animated Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 glass-dropdown rounded-2xl p-2 z-50 text-slate-200 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-3 border-b border-slate-800 mb-1">
                      <p className="text-sm font-semibold text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {user.email}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-[11px] font-medium border border-indigo-500/20 capitalize">
                        {user.role === "admin" && <FaShieldAlt size={10} />}
                        <span>{user.role} Member</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {user?.role === "admin" && (
                        <Link
                          to="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm rounded-xl hover:bg-slate-800/70 text-slate-300 hover:text-white transition"
                        >
                          <FaShieldAlt className="text-indigo-400" />
                          <span>Admin Console</span>
                        </Link>
                      )}
                      <Link
                        to={`/profile/${user?._id}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm rounded-xl hover:bg-slate-800/70 text-slate-300 hover:text-white transition"
                      >
                        <FaUser className="text-purple-400" />
                        <span>My Profile</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-800 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-xl text-rose-400 hover:bg-rose-500/10 transition"
                      >
                        <FaSignOutAlt />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition"
                >
                  <Icon className="text-indigo-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {user ? (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex items-center gap-3 px-3 py-2">
                <img
                  src={user.profile || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-indigo-400 capitalize">{user.role}</p>
                </div>
              </div>

              {user.role === "admin" && (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm text-slate-300 hover:bg-slate-900 transition"
                >
                  <FaShieldAlt className="text-indigo-400" />
                  <span>Admin Dashboard</span>
                </Link>
              )}

              <Link
                to={`/profile/${user._id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm text-slate-300 hover:bg-slate-900 transition"
              >
                <FaUser className="text-purple-400" />
                <span>My Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3.5 py-2 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition"
              >
                <FaSignOutAlt />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 transition"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
