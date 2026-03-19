import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import MapPage from "./pages/MapPage";

export default function App() {
  return (
    <div className="min-h-full bg-gradient-to-b from-emerald-50 via-slate-50 to-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

