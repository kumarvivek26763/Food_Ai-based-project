import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import MapPage from "./pages/MapPage";
import About from "./components/About";
import ScrollToTop from "./components/ScrollTotop";
import WastManagment from "./components/WastManagment";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

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
  <ScrollToTop />
  <main className="pb-10">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/waste" element={<WastManagment />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </main>
   
  <Footer />
</div>
  );
}

