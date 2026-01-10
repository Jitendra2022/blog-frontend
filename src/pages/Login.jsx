import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hook/useUser";
import { axiosInstance } from "../api/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      setUser({
        _id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        profile: response.data.user.profile,
        role: response.data.user.role,
        accessToken: response.data.accessToken,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: response.data.user._id,
          name: response.data.user.name,
          email: response.data.user.email,
          profile: response.data.user.profile,
          role: response.data.user.role,
          accessToken: response.data.accessToken,
        })
      );
      // directly from API
      const role = response.data.user.role;
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      // stop loading
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-md shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
