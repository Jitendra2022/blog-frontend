import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";

const RecentPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const getPost = async () => {
    try {
      const response = await axiosInstance.get("/blog/posts");
      setPosts(response.data.posts);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  const handleReadPost = (id) => {
    navigate(`/post/${id}`);
  };
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Recent Posts</h2>
        {posts.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No posts available yet.
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.desc}</p>
                <button
                  onClick={() => handleReadPost(post._id)}
                  className="text-indigo-600 font-semibold hover:underline mt-auto"
                >
                  Read Articles →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPost;
