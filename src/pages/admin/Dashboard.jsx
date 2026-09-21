import { Link } from "react-router-dom";
import { 
  FaUsers, 
  FaClipboardList, 
  FaComments, 
  FaEye, 
  FaPlusCircle, 
  FaArrowUp, 
  FaArrowRight, 
  FaCheckCircle,
  FaClock
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Readers",
      value: "48,250",
      change: "+12.4%",
      changeType: "up",
      period: "vs last month",
      icon: FaUsers,
      color: "from-blue-600 to-indigo-600",
      shadow: "shadow-blue-600/20",
    },
    {
      title: "Published Stories",
      value: "142",
      change: "+8.1%",
      changeType: "up",
      period: "vs last month",
      icon: FaClipboardList,
      color: "from-purple-600 to-pink-600",
      shadow: "shadow-purple-600/20",
    },
    {
      title: "Total Discussions",
      value: "1,894",
      change: "+24.5%",
      changeType: "up",
      period: "vs last month",
      icon: FaComments,
      color: "from-emerald-600 to-teal-600",
      shadow: "shadow-emerald-600/20",
    },
    {
      title: "Article Pageviews",
      value: "329,400",
      change: "+18.2%",
      changeType: "up",
      period: "vs last month",
      icon: FaEye,
      color: "from-amber-600 to-rose-600",
      shadow: "shadow-amber-600/20",
    },
  ];

  const recentStories = [
    {
      id: "demo-1",
      title: "Architecting Ultra-Responsive React 19 Interfaces with Server Components",
      category: "Web Dev",
      views: "18.4k",
      status: "Published",
      date: "2 days ago",
    },
    {
      id: "demo-2",
      title: "Next-Gen AI Agents: Beyond Simple LLM Completion Chains",
      category: "Artificial Intelligence",
      views: "24.9k",
      status: "Published",
      date: "4 days ago",
    },
    {
      id: "demo-3",
      title: "The Subtle Art of Micro-Animations: Designing Emotion in Digital Products",
      category: "UI/UX Architecture",
      views: "9.2k",
      status: "Published",
      date: "6 days ago",
    },
    {
      id: "demo-4",
      title: "Zero-Downtime Database Migrations at Enterprise Scale",
      category: "Cloud & DevOps",
      views: "12.8k",
      status: "Published",
      date: "9 days ago",
    },
  ];

  const recentActivities = [
    { user: "Alex Rivera", action: "published a new article", time: "2 hours ago" },
    { user: "Sophia Martinez", action: "commented on React 19 Interfaces", time: "5 hours ago" },
    { user: "David Kim", action: "registered a new author account", time: "1 day ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
            <HiSparkles />
            <span>Platform Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Administrator Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time analytics, content performance, and community activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/addpost"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
          >
            <FaPlusCircle size={13} />
            <span>Write New Post</span>
          </Link>
          <Link
            to="/"
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition"
          >
            View Live Site
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="p-6 rounded-3xl glass-card border border-slate-800 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {s.title}
                </span>
                <div
                  className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${s.color} flex items-center justify-center text-white shadow-lg ${s.shadow}`}
                >
                  <Icon size={18} />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{s.value}</span>
                <span className="inline-flex items-center text-xs font-semibold text-emerald-400 gap-0.5">
                  <FaArrowUp size={9} />
                  {s.change}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{s.period}</p>
            </div>
          );
        })}
      </div>

      {/* Content Performance & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Posts Table (2 cols) */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Recent Publications</h3>
              <p className="text-xs text-slate-400">Review status and performance of recent posts</p>
            </div>
            <Link
              to="/dashboard/allposts"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>Manage all</span>
              <FaArrowRight size={10} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800/80 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="pb-3 font-semibold">Article Title</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Reads</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {recentStories.map((story) => (
                  <tr key={story.id} className="hover:bg-slate-900/50 transition">
                    <td className="py-3.5 pr-4 font-medium text-slate-200 line-clamp-1 max-w-xs">
                      {story.title}
                    </td>
                    <td className="py-3.5 pr-4 text-slate-400">{story.category}</td>
                    <td className="py-3.5 pr-4 text-slate-300 font-semibold">{story.views}</td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
                        <FaCheckCircle size={9} />
                        <span>{story.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Community Stream (1 col) */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Live Audit Feed</h3>
            <p className="text-xs text-slate-400 mb-6">Recent events across the ecosystem</p>

            <ul className="space-y-4">
              {recentActivities.map((act, index) => (
                <li key={index} className="flex items-start gap-3 pb-3 border-b border-slate-800/60 last:border-0">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FaClock size={11} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 leading-snug">
                      <span className="font-semibold text-white">{act.user}</span>{" "}
                      {act.action}
                    </p>
                    <span className="text-[10px] text-slate-500">{act.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-800 mt-6 text-center">
            <Link
              to="/dashboard/addpost"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white transition flex items-center justify-center gap-2"
            >
              <FaPlusCircle size={12} />
              <span>Draft New Publication</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
