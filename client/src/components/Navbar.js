import React from "react";
import { NavLink } from "react-router-dom";

const base =
  "px-3 py-2 rounded-xl text-sm font-semibold transition-colors hover:bg-slate-100";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
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
              `${base} ${
                isActive ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "text-slate-700"
              }`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${base} ${
                isActive ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "text-slate-700"
              }`
            }
          >
            About
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
 