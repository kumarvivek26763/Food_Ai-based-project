import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function SignUpPage() {
  const [role, setRole] = useState("Restaurant Owner");

  const roles = [
    "Restaurant Owner 🍽️",
    "Farm Manager 🌾",
    "Individual 👤",
    "NGO Worker 🤝",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50 px-4">

      {/* Card */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md 
      transition-all duration-500 hover:scale-105">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h2>

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

        {/* Name */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
          <FaEnvelope className="text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none"
          />
        </div>

        {/* Button */}
        <button className="w-full bg-green-500 text-white py-2 rounded-lg 
        hover:bg-green-600 transition transform hover:scale-105">
          Register as {role}
        </button>

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