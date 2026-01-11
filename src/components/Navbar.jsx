import { useState } from "react";
import useUser from "../hook/useUser";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUser();
  const handleAuthClick = async () => {
    if (user) {
      try {
        // Call logout API
        await axiosInstance.post("/auth/logout");
        // Clear user state and localStorage
        setUser(null);
        localStorage.removeItem("user");
        // Redirect to login page after logout
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    } else {
      // If no user, just go to login page
      navigate("/login");
    }
  };

  return (
    <nav className="h-16 bg-slate-900 text-white flex items-center justify-between px-6">
      {/* Left: Company Name */}
      <div>
        <h1 className="text-xl font-bold">Blog</h1>
      </div>

      {/* Right: Auth Links / Profile */}
      <div className="flex items-center space-x-4">
        {/* If user is not logged in, show Register/Login links */}
        {!user && (
          <>
            <Link
              to="/register"
              className="px-3 py-1 rounded-md hover:bg-slate-700 transition"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="px-3 py-1 rounded-md hover:bg-slate-700 transition"
            >
              Login
            </Link>
          </>
        )}

        {/* If user is logged in, show profile dropdown */}
        {user && (
          <div className="relative">
            <img
              src={user.profile}
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-slate-600"
              onClick={() => setOpen(!open)}
            />

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-40 bg-white text-gray-800 rounded-md shadow-lg overflow-hidden">
                {/* Admin Only */}
                {user?.role === "admin" && (
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to={`/profile/${user?._id}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleAuthClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
