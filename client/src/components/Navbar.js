import React from "react";
import { NavLink } from "react-router-dom";

const base =
  "px-3 py-2 rounded-xl text-sm font-semibold transition-colors hover:bg-slate-100";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-2xl bg-emerald-600">
            <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-white/20 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500" />
          </div>
          <div>
            <div className="text-sm font-extrabold tracking-tight text-slate-900">
              AI Food Waste
            </div>
            <div className="text-xs text-slate-500">Smart Food Waste Manager</div>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${base} ${
                isActive ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "text-slate-700"
              }`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${base} ${
                isActive ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "text-slate-700"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              `${base} ${
                isActive ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "text-slate-700"
              }`
            }
          >
            Map (optional)
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

