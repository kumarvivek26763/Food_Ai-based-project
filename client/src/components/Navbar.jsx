import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const base =
  "px-3 py-2 rounded-xl text-sm font-semibold transition-colors hover:bg-slate-100";

export default function Navbar() {
  const { isLoggedIn, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50  bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">

          {/* Logo */}
          <div className="h-10 w-10 flex items-center justify-center overflow-hidden rounded-full">
            <img
              src="https://plus.unsplash.com/premium_photo-1758204526484-8aab4982f214?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="logo"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-tight text-slate-900">
              AI Food Waste
            </div>
            <div className="text-xs text-slate-500">
              Smart Food Waste Manager
            </div>
          </div>

        </div>
        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${base} ${isActive ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "text-slate-700"
              }`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${base} ${isActive ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "text-slate-700"
              }`
            }
          >
            About
          </NavLink>

          {/* Show these only when logged in */}
          {isLoggedIn && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${base} ${isActive ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "text-slate-700"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/map"
                className={({ isActive }) =>
                  `${base} ${isActive ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "text-slate-700"
                  }`
                }
              >
                Map
              </NavLink>
              <NavLink
                to="/waste"
                className={({ isActive }) =>
                  `${base} ${isActive ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "text-slate-700"
                  }`
                }
              >
                Waste tools
              </NavLink>
            </>
          )}

          {/* Show Sign Up when NOT logged in, Logout when logged in */}
          {!isLoggedIn ? (
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `${base} ${isActive ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "text-slate-700"
                }`
              }
            >
              Sign Up
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className={`${base} text-red-600 hover:bg-red-50`}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>

  );
}
