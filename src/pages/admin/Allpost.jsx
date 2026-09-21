import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import { 
  FaSearch, 
  FaTrashAlt, 
  FaEye, 
  FaPlusCircle, 
  FaCalendarAlt, 
  FaCheckCircle 
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { toast } from "react-toastify";

const INITIAL_POSTS = [
  {
    _id: "demo-1",
    title: "Architecting Ultra-Responsive React 19 Interfaces with Server Components",
    category: "Web Dev",
    views: "18.4k",
    status: "Published",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&auto=format&fit=crop&q=80"
  },
  {
    _id: "demo-2",
    title: "Next-Gen AI Agents: Beyond Simple LLM Completion Chains",
    category: "Artificial Intelligence",
    views: "24.9k",
    status: "Published",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=200&auto=format&fit=crop&q=80"
  },
  {
    _id: "demo-3",
    title: "The Subtle Art of Micro-Animations: Designing Emotion in Digital Products",
    category: "UI/UX Architecture",
    views: "9.2k",
    status: "Published",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=80"
  },
  {
    _id: "demo-4",
    title: "Zero-Downtime Database Migrations at Enterprise Scale",
    category: "Cloud & DevOps",
    views: "12.8k",
    status: "Published",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&auto=format&fit=crop&q=80"
  },
  {
    _id: "demo-5",
    title: "Engineering Leadership: From Senior Contributor to Staff Plus",
    category: "Career & Culture",
    views: "31.2k",
    status: "Published",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80"
  }
];

const Allpost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/blog/posts");
      if (res.data?.posts && res.data.posts.length > 0) {
        setPosts(res.data.posts);
      } else {
        setPosts(INITIAL_POSTS);
      }
    } catch {
      setPosts(INITIAL_POSTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this publication?")) {
      try {
        await axiosInstance.delete(`/blog/delete/${id}`);
      } catch {
        // Fallback local deletion
      }
      setPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Publication removed successfully");
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
            <HiSparkles />
            <span>Content Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            All Publications ({posts.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search, preview, and manage all published stories.
          </p>
        </div>

        <Link
          to="/dashboard/addpost"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition self-start sm:self-auto"
        >
          <FaPlusCircle size={13} />
          <span>New Article</span>
        </Link>
      </div>

      {/* Search Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <FaSearch size={13} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by headline or topic..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Publications Table */}
      <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-4 px-6 font-semibold">Story Details</th>
                <th className="py-4 px-6 font-semibold">Category</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPosts.map((post) => (
                <tr key={post._id} className="hover:bg-slate-900/40 transition">
                  {/* Title & Thumbnail */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&auto=format&fit=crop&q=80"}
                        alt={post.title}
                        className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-700 shrink-0"
                      />
                      <div>
                        <h4 className="font-semibold text-slate-200 line-clamp-1 max-w-sm">
                          {post.title}
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          ID: #{post._id}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {post.category || "Web Dev"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
                      <FaCheckCircle size={9} />
                      <span>{post.status || "Published"}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/post/${post._id}`)}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-indigo-400 hover:border-indigo-500 transition"
                        title="View Live Post"
                      >
                        <FaEye size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-rose-400 hover:border-rose-500 transition"
                        title="Delete Story"
                      >
                        <FaTrashAlt size={12} />
                      </button>
                    </div>
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

export default Allpost;
