import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function SignUpPage() {
  const [role, setRole] = useState("Restaurant Owner");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const roles = [
    "Restaurant Owner 🍽️",
    "Farm Manager 🌾",
    "Individual 👤",
    "NGO Worker 🤝",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Extract role without emoji for backend
      const roleWithoutEmoji = role.replace(/[^a-zA-Z\s]/g, "").trim();

      const data = await registerUser({
        name,
        email,
        password,
        role: roleWithoutEmoji
      });

      // Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Refresh auth state
      checkAuth();

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50 px-4">

      {/* Card */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md 
      transition-all duration-500 hover:scale-105">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {roles.map((item) => (
            <button
              key={item}
              onClick={() => setRole(item)}
              className={`text-sm px-3 py-2 rounded-lg border transition 
              ${role === item
                  ? "bg-green-500 text-white border-green-500 shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-green-100"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none"
              required
              minLength={6}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-lg 
            hover:bg-green-600 transition transform hover:scale-105
            disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Registering..." : `Register as ${role}`}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <NavLink to="/login">
            <span className="text-green-600 cursor-pointer hover:underline">
              Sign In
            </span>
          </NavLink>
        </p>

      </div>
    </div>
  );
}
