import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useUser from "../hook/useUser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { axiosInstance } from "../api/axiosInstance";
import { 
  FaRegCommentDots, 
  FaArrowLeft, 
  FaHeart, 
  FaRegHeart, 
  FaBookmark, 
  FaRegBookmark, 
  FaShareAlt, 
  FaTwitter, 
  FaLinkedin, 
  FaLink, 
  FaCheck, 
  FaCalendarAlt, 
  FaClock, 
  FaReply,
  FaPaperPlane
} from "react-icons/fa";
import { toast } from "react-toastify";

// Fallback content in case of demo articles or API offline
const DEMO_ARTICLES = {
  "demo-1": {
    _id: "demo-1",
    title: "Architecting Ultra-Responsive React 19 Interfaces with Server Components",
    desc: `Modern web development has arrived at a pivotal turning point with React 19. By bringing first-class asynchronous actions, server actions, dynamic asset preloading, and compiler-driven memoization to the standard toolkit, front-end architecture is transitioning from heavy client-side state managers toward streamlined, edge-rendered compositions.

In this deep dive, we explore how React Server Components (RSC) fundamentally redefine the network waterfall. Instead of shipping multi-megabyte bundles containing complex state libraries, developers can now render component graphs directly on server runtimes, hydrating only the interactive islands required for user input.

Key Takeaways:
1. Native Form Actions: Say goodbye to boilerplate onSubmit event preventions and manual loading flags. React 19 useActionState and useFormStatus simplify asynchronous mutations dramatically.
2. The React Compiler: Automatic memoization eliminates the cognitive overhead of manual useMemo and useCallback hooks, avoiding unnecessary re-renders without brittle dependency arrays.
3. Fluid UX: By combining Suspense boundaries with optimistic UI updates (useOptimistic), transitions feel instantaneous even on constrained network conditions.

The future of web applications is not just faster code; it is less code delivered with superior intentionality.`,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80",
    category: "Web Dev",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    author: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      role: "Staff Engineer"
    },
    comments: [
      {
        _id: "c-1",
        comment: "The breakdown of useOptimistic is brilliant. It simplified our payment checkout flow tremendously!",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        userId: {
          name: "Sophia Martinez",
          profile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
        },
        replies: [
          {
            _id: "r-1",
            comment: "Completely agree! Paired with the new React Compiler, it feels like writing vanilla JavaScript again.",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            userId: {
              name: "David Kim",
              profile: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
            }
          }
        ]
      }
    ]
  },
  "demo-2": {
    _id: "demo-2",
    title: "Next-Gen AI Agents: Beyond Simple LLM Completion Chains",
    desc: `The paradigm of Artificial Intelligence is rapidly pivoting from conversational chat windows toward autonomous, agentic task completion. Early generative AI tools were passive responders; modern agent architectures are active planners capable of multi-step tool execution, recursive verification, and collaborative reasoning.

What makes an autonomous agent robust?
- Deterministic Tool Sandboxing: Equipping models with strictly validated execution tools, schema guards, and rate-limited API gateways.
- Reflective Memory Systems: Storing past trajectory successes and failures in vector and graph databases for zero-shot self-correction.
- Human-In-The-Loop Checkpoints: Establishing safety bounds where sensitive financial or production actions pause for explicit authorization.

As these systems evolve, software engineering shifts from writing step-by-step algorithms to designing the orchestration environments, evaluation benchmarks, and boundaries within which AI agents flourish.`,
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80",
    category: "Artificial Intelligence",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    author: {
      name: "Dr. Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      role: "AI Researcher"
    },
    comments: []
  }
};

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Local likes & bookmarks
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(128);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Track Reading Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format Date
  const formatTime = (date) => {
    if (!date) return "Recently";
    try {
      return new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Recently";
    }
  };

  // Fetch Post with Demo Fallback
  const getSinglePost = async () => {
    setLoading(true);
    // Check if it's one of the demo articles
    if (DEMO_ARTICLES[id]) {
      setPost(DEMO_ARTICLES[id]);
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get(`/public/singlepost/${id}`);
      if (res.data?.post) {
        setPost(res.data.post);
      } else {
        setPost(DEMO_ARTICLES["demo-1"]);
      }
    } catch (err) {
      console.log("Error fetching post from backend, loading fallback article:", err?.message);
      // If demo ID exists or fallback
      setPost(DEMO_ARTICLES[id] || DEMO_ARTICLES["demo-1"]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSinglePost();
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Check if bookmarked in localStorage
    try {
      const saved = JSON.parse(localStorage.getItem("inkpulse_bookmarks") || "[]");
      setIsBookmarked(saved.includes(id));
    } catch {
      // ignore
    }
  }, [id]);

  // Handle Comment Submission
  const handleSubmit = async (e, parentCommentId = null) => {
    e.preventDefault();

    if (!user) {
      toast.info("Please log in to participate in the conversation");
      navigate("/login");
      return;
    }

    const text = parentCommentId ? reply[parentCommentId] : comment;
    if (!text?.trim()) return;

    try {
      // If backend is active
      await axiosInstance.post("/comment/add-comment", {
        postId: id,
        comment: text,
        parentComment: parentCommentId,
      });

      setComment("");
      setReply((prev) => ({ ...prev, [parentCommentId]: "" }));
      setActiveReplyId(null);
      toast.success("Comment posted successfully!");
      getSinglePost();
    } catch (err) {
      console.log("Backend offline, updating locally:", err?.message);
      // Add comment locally for instant UX demonstration
      const newCommentObj = {
        _id: `c-local-${Date.now()}`,
        comment: text,
        createdAt: new Date().toISOString(),
        userId: {
          name: user.name || "Reader",
          profile: user.profile || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
        },
        replies: []
      };

      if (parentCommentId) {
        setPost((prev) => ({
          ...prev,
          comments: prev.comments.map((c) => {
            if (c._id === parentCommentId) {
              return { ...c, replies: [...(c.replies || []), newCommentObj] };
            }
            return c;
          })
        }));
      } else {
        setPost((prev) => ({
          ...prev,
          comments: [newCommentObj, ...(prev.comments || [])]
        }));
      }

      setComment("");
      setReply((prev) => ({ ...prev, [parentCommentId]: "" }));
      setActiveReplyId(null);
      toast.success("Comment shared!");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleToggleBookmark = () => {
    let updated;
    const current = JSON.parse(localStorage.getItem("inkpulse_bookmarks") || "[]");
    if (isBookmarked) {
      updated = current.filter((item) => item !== id);
      toast.info("Removed from saved stories");
    } else {
      updated = [...current, id];
      toast.success("Saved to reading list!");
    }
    setIsBookmarked(!isBookmarked);
    localStorage.setItem("inkpulse_bookmarks", JSON.stringify(updated));
  };

  // Render Nested Threaded Replies
  const renderReplies = (replies) => {
    if (!replies?.length) return null;

    return (
      <ul className="mt-4 space-y-4 pl-4 sm:pl-6 border-l-2 border-indigo-500/30">
        {replies.map((r) => (
          <li key={r._id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={r.userId?.profile || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-700"
                alt={r.userId?.name || "User"}
              />
              <div>
                <p className="text-xs font-semibold text-slate-200">{r.userId?.name || "Contributor"}</p>
                <p className="text-[10px] text-slate-400">{formatTime(r.createdAt)}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-10 mb-2">{r.comment}</p>

            {/* Reply toggle */}
            <div className="pl-10">
              <button
                onClick={() => setActiveReplyId(activeReplyId === r._id ? null : r._id)}
                className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition cursor-pointer"
              >
                <FaReply size={10} />
                <span>Reply</span>
              </button>

              {activeReplyId === r._id && (
                <form onSubmit={(e) => handleSubmit(e, r._id)} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a constructive reply..."
                    className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    value={reply[r._id] || ""}
                    onChange={(e) => setReply((prev) => ({ ...prev, [r._id]: e.target.value }))}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition shadow-md shadow-indigo-600/30 shrink-0"
                  >
                    Reply
                  </button>
                </form>
              )}
            </div>

            {renderReplies(r.replies)}
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Skeleton height={40} width="70%" baseColor="#111827" highlightColor="#1f2937" className="mb-4" />
        <Skeleton height={20} width="40%" baseColor="#111827" highlightColor="#1f2937" className="mb-8" />
        <Skeleton height={400} baseColor="#111827" highlightColor="#1f2937" borderRadius="1.5rem" className="mb-8" />
        <Skeleton count={8} height={18} baseColor="#111827" highlightColor="#1f2937" className="mb-2" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Story not found</h2>
        <p className="text-slate-400 mb-6 text-sm">The article you requested could not be retrieved.</p>
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md">
          Return to Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="relative pb-24">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-900">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation & Category */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 transition"
          >
            <FaArrowLeft size={10} />
            <span>Back to Stories</span>
          </Link>

          <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {post.category || "Featured Story"}
          </span>
        </div>

        {/* Article Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.2] mb-6">
          {post.title}
        </h1>

        {/* Author Metadata Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-y border-slate-800/80 mb-8">
          <div className="flex items-center gap-3.5">
            <img
              src={
                post.author?.avatar ||
                post.userId?.profile ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              }
              alt="Author"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/40"
            />
            <div>
              <p className="text-sm font-bold text-white">
                {post.author?.name || post.userId?.name || "Contributing Author"}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                <span className="flex items-center gap-1.5">
                  <FaCalendarAlt size={11} className="text-indigo-400" />
                  {formatTime(post.createdAt)}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="flex items-center gap-1.5">
                  <FaClock size={11} className="text-purple-400" />
                  {post.readTime || "5 min read"}
                </span>
              </div>
            </div>
          </div>

          {/* Social Share & Reaction Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                isLiked
                  ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
              title="Applaud story"
            >
              {isLiked ? <FaHeart className="text-rose-500 animate-bounce" /> : <FaRegHeart />}
              <span>{likeCount}</span>
            </button>

            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-xl border text-xs transition cursor-pointer ${
                isBookmarked
                  ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
              title="Bookmark story"
            >
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs transition cursor-pointer"
              title="Copy URL"
            >
              {copied ? <FaCheck className="text-emerald-400" /> : <FaLink />}
            </button>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs transition"
              title="Share on Twitter"
            >
              <FaTwitter />
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs transition"
              title="Share on LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Feature Banner Image */}
        <div className="relative rounded-3xl overflow-hidden mb-10 border border-slate-800 shadow-2xl">
          <img
            src={post.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80"}
            alt={post.title}
            className="w-full max-h-[500px] object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert prose-indigo max-w-none text-slate-300 text-base sm:text-lg leading-relaxed font-light space-y-6">
          {post.desc.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Article Signoff & Claps Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-slate-800">
          <div>
            <h4 className="text-base font-bold text-white">Did you enjoy this perspective?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Share with fellow engineers or leave your thoughts below.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleLike}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition"
            >
              <FaHeart className={isLiked ? "text-rose-300 animate-pulse" : ""} />
              <span>{isLiked ? "Loved it!" : "Clap Story"} ({likeCount})</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium hover:text-white transition flex items-center gap-2"
            >
              <FaShareAlt size={11} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Discussion & Comments Section */}
        <section className="mt-16 pt-12 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <FaRegCommentDots size={18} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Discussion</h3>
                <p className="text-xs text-slate-400">
                  {post.comments?.length || 0} thoughtful remarks
                </p>
              </div>
            </div>
          </div>

          {/* Add Comment Form */}
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="p-5 sm:p-6 rounded-3xl glass-card border border-slate-800 mb-10 space-y-4"
          >
            <div className="flex items-start gap-3">
              <img
                src={
                  user?.profile ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                }
                alt={user?.name || "Your Avatar"}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30 shrink-0"
              />
              <div className="flex-1">
                <textarea
                  rows={3}
                  placeholder={
                    user
                      ? `Join the discussion as ${user.name}...`
                      : "Write your insights... (Sign in to comment)"
                  }
                  className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
              <span className="text-xs text-slate-500">
                Markdown styling & respectful dialogue encouraged.
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition active:scale-95 cursor-pointer"
              >
                <FaPaperPlane size={11} />
                <span>Post Comment</span>
              </button>
            </div>
          </form>

          {/* Comment Threads List */}
          {(!post.comments || post.comments.length === 0) ? (
            <div className="text-center py-12 glass-card rounded-2xl border border-slate-800 p-6">
              <p className="text-slate-400 text-sm">No comments yet. Start the conversation!</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {post.comments.map((c) => (
                <li key={c._id} className="p-5 rounded-3xl glass-card border border-slate-800">
                  {/* Top: User info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          c.userId?.profile ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                        }
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-700"
                        alt={c.userId?.name || "Commenter"}
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">{c.userId?.name || "Thoughtful Reader"}</p>
                        <p className="text-xs text-slate-400">{formatTime(c.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Comment Body */}
                  <p className="text-sm text-slate-300 leading-relaxed pl-12 mb-3">{c.comment}</p>

                  {/* Actions & Reply trigger */}
                  <div className="pl-12 flex items-center gap-4">
                    <button
                      onClick={() => setActiveReplyId(activeReplyId === c._id ? null : c._id)}
                      className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition cursor-pointer"
                    >
                      <FaReply size={10} />
                      <span>Reply</span>
                    </button>
                  </div>

                  {/* Inline Reply Input */}
                  {activeReplyId === c._id && (
                    <form onSubmit={(e) => handleSubmit(e, c._id)} className="mt-4 pl-12 flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a response..."
                        className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        value={reply[c._id] || ""}
                        onChange={(e) => setReply((prev) => ({ ...prev, [c._id]: e.target.value }))}
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition shadow-md shadow-indigo-600/30 shrink-0"
                      >
                        Reply
                      </button>
                    </form>
                  )}

                  {/* Nested replies */}
                  <div className="pl-8">{renderReplies(c.replies)}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </article>
    </div>
  );
};

export default Post;
