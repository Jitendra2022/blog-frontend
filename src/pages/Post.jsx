import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../hook/useUser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { axiosInstance } from "../api/axiosInstance";
import { FaRegCommentDots } from "react-icons/fa";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== TIME FORMATTER =====
  const formatTime = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // ================= FETCH POST =================
  const getSinglePost = async () => {
    try {
      const res = await axiosInstance.get(`/public/singlepost/${id}`);
      setPost(res.data.post);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSinglePost();
  }, [id]);

  // ================= ADD COMMENT / REPLY =================
  const handleSubmit = async (e, parentCommentId = null) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const text = parentCommentId ? reply[parentCommentId] : comment;
    if (!text?.trim()) return;

    try {
      await axiosInstance.post("/comment/add-comment", {
        postId: id,
        comment: text,
        parentComment: parentCommentId,
      });

      setComment("");
      setReply((prev) => ({ ...prev, [parentCommentId]: "" }));
      setActiveReplyId(null);
      getSinglePost();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= RENDER NESTED REPLIES =================
  const renderReplies = (replies) => {
    if (!replies?.length) return null;

    return (
      <ul className="mt-4 space-y-4">
        {replies.map((r) => (
          <li key={r._id} className="pl-4 border-l-2 border-gray-300">
            <div className="bg-gray-50 p-3 rounded-lg">
              {/* User */}
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={`https://blog-backend-lake-eight.vercel.app/uploads/user-images/${r.userId?.profile}`}
                  className="w-7 h-7 rounded-full"
                  alt=""
                />
                <div>
                  <p className="text-sm font-semibold">{r.userId?.name}</p>
                  <p className="text-xs text-gray-400">
                    {r.createdAt && formatTime(r.createdAt)}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-2">{r.comment}</p>

              {/* Reply Icon */}
              <button
                onClick={() =>
                  setActiveReplyId(activeReplyId === r._id ? null : r._id)
                }
                className="flex items-center gap-1 text-xs text-gray-500"
              >
                <FaRegCommentDots />
                Reply
              </button>

              {/* Reply Input */}
              {activeReplyId === r._id && (
                <form
                  onSubmit={(e) => handleSubmit(e, r._id)}
                  className="mt-2 flex flex-col gap-2"
                >
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    className="p-2 text-sm border rounded-lg"
                    value={reply[r._id] || ""}
                    onChange={(e) =>
                      setReply((prev) => ({
                        ...prev,
                        [r._id]: e.target.value,
                      }))
                    }
                  />
                  <button className="self-start px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg">
                    Reply
                  </button>
                </form>
              )}

              {renderReplies(r.replies)}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <Skeleton height={250} />
        <Skeleton count={3} />
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Post */}
      <img
        src={post.image}
        className="w-full rounded-lg mb-4"
        alt=""
      />

      <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.desc}</p>

      {/* Add Comment */}
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-3 mb-6">
        <textarea
          rows={3}
          placeholder="Write your comment..."
          className="w-full p-3 border rounded-lg"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg">
          Comment
        </button>
      </form>

      {/* Comments */}
      <ul className="space-y-5">
        {post.comments.map((c) => (
          <li key={c._id} className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-3 mb-1">
              <img
                src={`https://blog-backend-lake-eight.vercel.app/uploads/user-images/${c.userId?.profile}`}
                className="w-9 h-9 rounded-full"
                alt=""
              />
              <div>
                <p className="font-semibold">{c.userId?.name}</p>
                <p className="text-xs text-gray-400">
                  {c.createdAt && formatTime(c.createdAt)}
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-2">{c.comment}</p>

            {/* Reply Icon */}
            <button
              onClick={() =>
                setActiveReplyId(activeReplyId === c._id ? null : c._id)
              }
              className="flex items-center gap-1 text-sm text-gray-500"
            >
              <FaRegCommentDots />
              Reply
            </button>

            {/* Reply Box */}
            {activeReplyId === c._id && (
              <form
                onSubmit={(e) => handleSubmit(e, c._id)}
                className="mt-2 flex flex-col gap-2"
              >
                <input
                  type="text"
                  placeholder="Write a reply..."
                  className="p-2 text-sm border rounded-lg"
                  value={reply[c._id] || ""}
                  onChange={(e) =>
                    setReply((prev) => ({
                      ...prev,
                      [c._id]: e.target.value,
                    }))
                  }
                />
                <button className="self-start px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg">
                  Reply
                </button>
              </form>
            )}

            {renderReplies(c.replies)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
