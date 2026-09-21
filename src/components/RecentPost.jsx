import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { 
  FaRegBookmark, 
  FaBookmark, 
  FaHeart, 
  FaRegHeart, 
  FaClock, 
  FaCalendarAlt, 
  FaThLarge, 
  FaList, 
  FaArrowRight, 
  FaFire,
  FaShareAlt,
  FaCheck
} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

// High-quality curated showcase posts for instant interactivity if backend is empty or loading
const FALLBACK_POSTS = [
  {
    _id: "demo-1",
    title: "Architecting Ultra-Responsive React 19 Interfaces with Server Components",
    desc: "A comprehensive deep dive into React 19 concurrent features, action hooks, compiler optimizations, and building next-level user experiences with minimal client payload.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
    category: "Web Dev",
    readTime: "6 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    author: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      role: "Staff Engineer"
    },
    likes: 142
  },
  {
    _id: "demo-2",
    title: "Next-Gen AI Agents: Beyond Simple LLM Completion Chains",
    desc: "How autonomous reasoning agents coordinate tool calls, state memory, multi-agent debates, and deterministic sandboxes to solve complex real-world workflows.",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    category: "Artificial Intelligence",
    readTime: "8 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    author: {
      name: "Dr. Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      role: "AI Researcher"
    },
    likes: 289
  },
  {
    _id: "demo-3",
    title: "The Subtle Art of Micro-Animations: Designing Emotion in Digital Products",
    desc: "Why micro-interactions separate memorable applications from forgettable ones. Practical principles of spring physics, perceived performance, and haptic feedback.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    category: "UI/UX Architecture",
    readTime: "5 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    author: {
      name: "Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
      role: "Design Lead"
    },
    likes: 95
  },
  {
    _id: "demo-4",
    title: "Zero-Downtime Database Migrations at Enterprise Scale",
    desc: "Patterns and battle-tested strategies for mutating large schemas in high-throughput PostgreSQL and distributed MongoDB clusters without breaking transactions.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    category: "Cloud & DevOps",
    readTime: "10 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Infrastructure Lead"
    },
    likes: 178
  },
  {
    _id: "demo-5",
    title: "Engineering Leadership: From Senior Contributor to Staff Plus",
    desc: "Navigating technical influence without authority, cultivating high psychological safety, and driving cross-organizational architectural consensus.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    category: "Career & Culture",
    readTime: "7 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    author: {
      name: "Sarah Sterling",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "VP of Engineering"
    },
    likes: 312
  },
  {
    _id: "demo-6",
    title: "Building Resilient Event-Driven Microservices with Kafka & Go",
    desc: "How to implement idempotent consumers, dead-letter queues, and outbox transactional patterns to eliminate data drift across distributed boundaries.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    category: "Web Dev",
    readTime: "9 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    author: {
      name: "Julian Vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      role: "Distributed Systems Architect"
    },
    likes: 215
  }
];

const RecentPost = ({ searchQuery = "", activeCategory = "" }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [selectedTag, setSelectedTag] = useState("All");
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("inkpulse_bookmarks") || "[]");
    } catch {
      return [];
    }
  });
  const [likes, setLikes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("inkpulse_likes") || "{}");
    } catch {
      return {};
    }
  });

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/blog/posts");
      if (response.data?.posts && response.data.posts.length > 0) {
        setPosts(response.data.posts);
      } else {
        setPosts(FALLBACK_POSTS);
      }
    } catch (err) {
      console.log("Backend offline or empty, rendering curated showcase:", err?.message);
      setPosts(FALLBACK_POSTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleReadPost = (id) => {
    navigate(`/post/${id}`);
  };

  const toggleBookmark = (e, post) => {
    e.stopPropagation();
    let updated;
    const isBookmarked = bookmarks.includes(post._id);
    if (isBookmarked) {
      updated = bookmarks.filter((id) => id !== post._id);
      toast.info("Removed from your bookmarks");
    } else {
      updated = [...bookmarks, post._id];
      toast.success("Saved to your reading list!");
    }
    setBookmarks(updated);
    localStorage.setItem("inkpulse_bookmarks", JSON.stringify(updated));
  };

  const handleLike = (e, postId) => {
    e.stopPropagation();
    const currentLikes = likes[postId] || 0;
    const hasLiked = currentLikes > 0;
    const updated = {
      ...likes,
      [postId]: hasLiked ? 0 : currentLikes + 1
    };
    setLikes(updated);
    localStorage.setItem("inkpulse_likes", JSON.stringify(updated));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  const calculateReadTime = (desc) => {
    if (!desc) return "3 min read";
    const words = desc.split(/\s+/).length;
    return `${Math.max(2, Math.ceil(words / 35))} min read`;
  };

  const categories = ["All", "Web Dev", "Artificial Intelligence", "UI/UX Architecture", "Cloud & DevOps", "Career & Culture"];

  // Filter posts based on active search and selected category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const titleMatch = post.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = post.desc?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSearch = !searchQuery || titleMatch || descMatch;

      const currentCat = activeCategory || (selectedTag === "All" ? "" : selectedTag);
      const matchesCategory =
        !currentCat ||
        post.category?.toLowerCase() === currentCat.toLowerCase() ||
        post.title?.toLowerCase().includes(currentCat.toLowerCase()) ||
        post.desc?.toLowerCase().includes(currentCat.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, activeCategory, selectedTag]);

  return (
    <section id="recent-posts" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Interactive Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <FaFire className="text-amber-400" />
              <span>Explore Curated Articles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Latest Stories & Insights
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Handcrafted perspectives from engineers, creators, and leaders worldwide.
            </p>
          </div>

          {/* Controls: Category Pills & View Mode */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <FaThLarge size={14} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                  viewMode === "list"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
                title="List View"
                aria-label="List View"
              >
                <FaList size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tags Bar */}
        <div className="flex items-center gap-2 py-6 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedTag === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedTag(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-900/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-3xl glass-card overflow-hidden p-4 border border-slate-800">
                <Skeleton height={200} baseColor="#111827" highlightColor="#1f2937" borderRadius="1.25rem" />
                <div className="mt-4 space-y-3">
                  <Skeleton height={20} width="60%" baseColor="#111827" highlightColor="#1f2937" />
                  <Skeleton count={2} height={14} baseColor="#111827" highlightColor="#1f2937" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <div className="py-20 text-center glass-card rounded-3xl p-8 border border-slate-800 max-w-lg mx-auto mt-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No matching stories found</h3>
            <p className="text-slate-400 text-sm mb-6">
              Try adjusting your search query or selecting a different category filter.
            </p>
            <button
              onClick={() => {
                setSelectedTag("All");
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Posts Grid / List Rendering */}
        {!loading && filteredPosts.length > 0 && (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4"
                : "flex flex-col gap-6 mt-4"
            }
          >
            {filteredPosts.map((post) => {
              const isBookmarked = bookmarks.includes(post._id);
              const isLiked = (likes[post._id] || 0) > 0;
              const likeCount = (post.likes || 42) + (likes[post._id] || 0);
              const readTime = post.readTime || calculateReadTime(post.desc);

              return (
                <article
                  key={post._id}
                  onClick={() => handleReadPost(post._id)}
                  className={`group relative glass-card rounded-3xl overflow-hidden cursor-pointer flex ${
                    viewMode === "grid"
                      ? "flex-col"
                      : "flex-col md:flex-row md:items-center"
                  }`}
                >
                  {/* Article Thumbnail */}
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "grid" ? "h-56 w-full" : "h-60 md:w-80 shrink-0"
                    }`}
                  >
                    <img
                      src={post.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-slate-900/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30 shadow-md">
                        {post.category || "Technology"}
                      </span>
                    </div>

                    {/* Floating Bookmark Button */}
                    <button
                      onClick={(e) => toggleBookmark(e, post)}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-indigo-400 border border-slate-700/60 shadow-md transition-transform duration-200 active:scale-90"
                      title={isBookmarked ? "Remove Bookmark" : "Save Story"}
                      aria-label="Bookmark article"
                    >
                      {isBookmarked ? (
                        <FaBookmark className="text-indigo-400 text-xs" />
                      ) : (
                        <FaRegBookmark className="text-xs" />
                      )}
                    </button>
                  </div>

                  {/* Article Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta Information (Date & Read time) */}
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1.5">
                          <FaCalendarAlt className="text-indigo-400 text-[10px]" />
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="flex items-center gap-1.5">
                          <FaClock className="text-purple-400 text-[10px]" />
                          {readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-200 line-clamp-2 leading-snug mb-3">
                        {post.title}
                      </h3>

                      {/* Description snippet */}
                      <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed mb-6 font-light">
                        {post.desc}
                      </p>
                    </div>

                    {/* Card Footer: Author + Reaction & Read Action */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-auto">
                      {/* Author Card */}
                      <div className="flex items-center gap-2.5">
                        <img
                          src={
                            post.author?.avatar ||
                            post.userId?.profile ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                          }
                          alt={post.author?.name || post.userId?.name || "Author"}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-700"
                        />
                        <span className="text-xs font-medium text-slate-300">
                          {post.author?.name || post.userId?.name || "Editor Pick"}
                        </span>
                      </div>

                      {/* Right actions: Heart & Read link */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => handleLike(e, post._id)}
                          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-colors ${
                            isLiked
                              ? "text-rose-400 bg-rose-500/10"
                              : "text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                          }`}
                          title="Like this story"
                          aria-label="Like story"
                        >
                          {isLiked ? (
                            <FaHeart className="text-rose-500 text-xs animate-bounce" />
                          ) : (
                            <FaRegHeart className="text-xs" />
                          )}
                          <span>{likeCount}</span>
                        </button>

                        <span className="text-indigo-400 group-hover:translate-x-1 transition-transform duration-200">
                          <FaArrowRight size={12} />
                        </span>
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default RecentPost;
