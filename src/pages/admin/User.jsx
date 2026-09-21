import { useState } from "react";
import { FaUsers, FaSearch, FaShieldAlt, FaUserCheck, FaEnvelope } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const SAMPLE_USERS = [
  {
    _id: "u-1",
    name: "Alex Rivera",
    email: "alex.rivera@inkpulse.com",
    role: "admin",
    joined: "Sep 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
  },
  {
    _id: "u-2",
    name: "Dr. Elena Rostova",
    email: "elena.rostova@ai-research.org",
    role: "author",
    joined: "Oct 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
  },
  {
    _id: "u-3",
    name: "Marcus Chen",
    email: "marcus.chen@designcraft.io",
    role: "author",
    joined: "Nov 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
  },
  {
    _id: "u-4",
    name: "Sophia Martinez",
    email: "sophia.m@cloudscale.net",
    role: "reader",
    joined: "Jan 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    _id: "u-5",
    name: "David Kim",
    email: "david.kim@systemsgo.dev",
    role: "reader",
    joined: "Feb 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
];

const User = () => {
  const [users] = useState(SAMPLE_USERS);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
          <HiSparkles />
          <span>Community Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Registered Members ({users.length})
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review user accounts, permission levels, and registration activity.
        </p>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <FaSearch size={13} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search member by name, email, or role..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-4 px-6 font-semibold">User Profile</th>
                <th className="py-4 px-6 font-semibold">Email</th>
                <th className="py-4 px-6 font-semibold">Role</th>
                <th className="py-4 px-6 font-semibold">Joined</th>
                <th className="py-4 px-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-slate-900/40 transition">
                  {/* Profile */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                      />
                      <div>
                        <p className="font-semibold text-white">{user.name}</p>
                        <span className="text-[10px] text-slate-400">ID: {user._id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-4 px-6 text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <FaEnvelope size={11} className="text-slate-500" />
                      <span>{user.email}</span>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                        user.role === "admin"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                          : user.role === "author"
                          ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {user.role === "admin" && <FaShieldAlt size={9} />}
                      <span>{user.role}</span>
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="py-4 px-6 text-slate-400">{user.joined}</td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
                      <FaUserCheck size={9} />
                      <span>{user.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
