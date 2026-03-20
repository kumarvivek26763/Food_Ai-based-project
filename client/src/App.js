import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import MapPage from "./pages/MapPage";
import About from "./components/About";

export default function App() {
  return (
    // <div className="min-h-full bg-gradient-to-b from-emerald-50 via-slate-50 to-slate-100">
    //   <Navbar />
    //   <main className="pb-10">
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/dashboard" element={<DashboardPage />} />
    //       <Route path="/map" element={<MapPage />} />
    //       <Route path="/about" element={<About />} />
    //       <Route path="*" element={<Navigate to="/" replace />} />
    //     </Routes>
    //   </main>
    //   <Footer />
    // </div>
    <div className="min-h-full bg-gradient-to-b from-emerald-50 via-slate-50">
  <Navbar />

  <main className="pb-10">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </main>

  <Footer />
</div>
  );
}

