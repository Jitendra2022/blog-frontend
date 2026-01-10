import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../hook/useUser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { axiosInstance } from "../api/axiosInstance";
const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const getSinglePost = async () => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:9090/public/singlepost/${id}`
      );
      setPost(response.data.post);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSinglePost();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await axiosInstance.post("/comment/add-comment", {
        postId: id,
        userId: user._id,
        comment,
      });
      setComment("");
      getSinglePost();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {loading ? (
        <div className="space-y-4">
          <Skeleton height={256} className="rounded-lg" /> {/* image */}
          <Skeleton width={`60%`} height={32} /> {/* title */}
          <Skeleton count={3} /> {/* description */}
        </div>
      ) : (
        <>
          <img
            src={`http://localhost:9090/uploads/blog-images/${post.image}`}
            alt="post"
            className="w-full rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {post.desc}
          </p>
        </>
      )}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Leave a Comment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
          />
          <button
            type="submit"
            className="self-start px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Submit Comment
          </button>
        </form>
      </div>
      {/* Display Comments */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        {post?.comments?.length === 0 ? (
          <p className="text-gray-500 mt-4">No comments yet.</p>
        ) : (
          <ul className="mt-6">
            {post?.comments?.map((c, index) => (
              <li
                key={c._id}
                className={`bg-white p-5 border border-gray-200 
          ${index !== post.comments.length - 1 ? "border-b-0" : ""}
        `}
              >
                {/* User Info */}
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={`http://localhost:9090/uploads/user-images/${c.userId?.profile}`}
                    alt={c.userId?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {c.userId?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {/* Comment Text */}
                <p className="text-gray-600 leading-relaxed">{c.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Post;
