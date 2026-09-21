import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useUser from "../hook/useUser";
import { axiosInstance } from "../api/axiosInstance";
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaArrowRight, 
  FaShieldAlt,
  FaCheckCircle
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const userData = {
        _id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        profile: response.data.user.profile,
        role: response.data.user.role,
        accessToken: response.data.accessToken,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      if (response.data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Invalid credentials. Please verify your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow-indigo top-0 left-0 opacity-40" />
      <div className="ambient-glow-purple bottom-0 right-0 opacity-40" />

      {/* Left Branding Showcase Panel (hidden on small devices) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-950/70 via-slate-900 to-purple-950/70 p-12 flex-col justify-between border-r border-slate-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/40">
            <HiSparkles className="text-xl" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            InkPulse
          </span>
        </Link>

        <div className="max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <HiSparkles className="text-amber-400" />
            <span>Join 48,000+ Readers & Creators</span>
          </div>

          <blockquote className="text-3xl font-extrabold text-white leading-snug tracking-tight">
            "The greatest thoughts are not found in passive browsing, but in deep, intentional dialogue."
          </blockquote>

          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              <span>Personalized feeds curated around your favorite topics</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              <span>Participate in threaded discussions with engineers & designers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              <span>Save stories to your offline personal reading list</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} InkPulse Platform. Safe & secure authentication.
        </div>
      </div>

      {/* Right Login Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md">
          
          {/* Mobile brand header */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                <HiSparkles />
              </div>
              <span className="text-xl font-bold text-white">InkPulse</span>
            </Link>
          </div>

          {/* Card */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Welcome back
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Enter your credentials to access your account.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <span className="shrink-0 font-bold">Error:</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaEnvelope size={14} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaLock size={14} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 transition cursor-pointer"
              >
                <span>{loading ? "Signing in..." : "Sign In to InkPulse"}</span>
                {!loading && <FaArrowRight size={12} />}
              </button>
            </form>

            {/* Switch to Register */}
            <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-400">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 ml-1"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
