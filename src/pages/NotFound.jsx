import { Link } from "react-router-dom";
import { FaArrowLeft, FaCompass } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow-indigo top-1/4 left-1/4 opacity-40" />
      <div className="ambient-glow-purple bottom-1/4 right-1/4 opacity-40" />

      <div className="relative z-10 text-center max-w-lg glass-card p-10 sm:p-14 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-6">
          <HiSparkles className="text-amber-400" />
          <span>Lost in the Digital Ether</span>
        </div>

        <h1 className="text-8xl sm:text-9xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Story Not Found
        </h2>

        <p className="mt-3 text-slate-400 text-sm leading-relaxed">
          The publication or route you are attempting to reach has either migrated, dissolved, or never existed.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
          >
            <FaArrowLeft size={11} />
            <span>Return to Editorial Feed</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
