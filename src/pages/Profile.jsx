import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hook/useUser";
import { 
  FaUser, 
  FaEnvelope, 
  FaShieldAlt, 
  FaBookmark, 
  FaRegBookmark, 
  FaCalendarAlt, 
  FaPenFancy, 
  FaArrowRight,
  FaHeart
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookmarks"); // 'bookmarks' | 'overview'
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("inkpulse_bookmarks") || "[]");
      setSavedIds(stored);
    } catch {
      setSavedIds([]);
    }
  }, []);

  const handleRemoveBookmark = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = savedIds.filter((item) => item !== id);
    setSavedIds(updated);
    localStorage.setItem("inkpulse_bookmarks", JSON.stringify(updated));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-slate-800 p-8 sm:p-10 mb-8">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Avatar with glow ring */}
          <div className="relative">
            <img
              src={
                user?.profile ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              }
              alt={user?.name || "User Avatar"}
              className="w-24 h-24 sm:w-28 sm:sm-28 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-xl"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {user?.name || "Member"}
              </h1>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold self-center sm:self-auto capitalize">
                {user?.role === "admin" && <FaShieldAlt size={11} />}
                <span>{user?.role || "Reader"} Account</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-2">
              <FaEnvelope size={12} className="text-slate-500" />
              <span>{user?.email || "user@inkpulse.com"}</span>
            </p>

            <p className="text-xs text-slate-400 pt-1 max-w-lg">
              Passionate reader exploring progressive web patterns, software resilience, and generative AI interfaces.
            </p>
          </div>

          {/* Admin shortcut button if applicable */}
          {user?.role === "admin" && (
            <Link
              to="/dashboard"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2 self-center sm:self-start shrink-0"
            >
              <FaShieldAlt size={12} />
              <span>Admin Console</span>
            </Link>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-slate-800/80 text-center">
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-xl sm:text-2xl font-bold text-white">{savedIds.length}</span>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">Bookmarks</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-xl sm:text-2xl font-bold text-indigo-400">
              {user?.role === "admin" ? "12" : "3"}
            </span>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">Discussions</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-xl sm:text-2xl font-bold text-purple-400">100%</span>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">Profile Score</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 mb-8">
        <button
          onClick={() => setActiveTab("bookmarks")}
          className={`pb-3 px-3 text-sm font-semibold transition border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === "bookmarks"
              ? "border-indigo-500 text-white"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <FaBookmark size={12} />
          <span>Saved Articles ({savedIds.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 px-3 text-sm font-semibold transition border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === "overview"
              ? "border-indigo-500 text-white"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <HiSparkles size={14} />
          <span>Preferences & Security</span>
        </button>
      </div>

      {/* Tab: Saved Bookmarks */}
      {activeTab === "bookmarks" && (
        <div>
          {savedIds.length === 0 ? (
            <div className="text-center py-16 glass-card rounded-3xl border border-slate-800 p-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-4">
                <FaRegBookmark size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Your reading list is empty</h3>
              <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
                Explore the latest publications and tap the bookmark icon on any article to save it for later.
              </p>
              <Link
                to="/"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition"
              >
                Browse Articles
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {savedIds.map((id, index) => (
                <div
                  key={id}
                  onClick={() => navigate(`/post/${id}`)}
                  className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center justify-between gap-4 cursor-pointer hover:border-indigo-500/40 transition group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition">
                        Story Reference #{id}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Tap to resume reading this preserved publication
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleRemoveBookmark(id, e)}
                      className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                      title="Remove bookmark"
                    >
                      Remove
                    </button>
                    <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">
                      <FaArrowRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Preferences */}
      {activeTab === "overview" && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Account & Notifications</h3>
            <p className="text-xs text-slate-400">Manage your subscription preferences and security.</p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div>
                <p className="text-sm font-semibold text-white">Email Digest</p>
                <p className="text-xs text-slate-400">Receive weekly summaries of trending engineering essays</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                Enabled
              </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div>
                <p className="text-sm font-semibold text-white">Discussion Replies</p>
                <p className="text-xs text-slate-400">Notify me when someone replies to my comments</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                Instant
              </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div>
                <p className="text-sm font-semibold text-white">Theme Mode</p>
                <p className="text-xs text-slate-400">Modern Slate & Cyber Violet</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold">
                Dark Elite
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
