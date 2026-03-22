import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  // Check if current route is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-full bg-gradient-to-b from-emerald-50 via-slate-50">
      <Navbar />
      <ScrollToTop />
      <main className="pb-10">
        <Routes>
          {/* Home page - accessible to everyone */}
          <Route path="/" element={<Home />} />

          {/* Protected routes - redirect to signup when NOT logged in */}
          <Route
            path="/dashboard"
            element={isLoggedIn ? <DashboardPage /> : <Navigate to="/signup" replace />}
          />
          <Route
            path="/map"
            element={isLoggedIn ? <MapPage /> : <Navigate to="/signup" replace />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/waste"
            element={isLoggedIn ? <WastManagment /> : <Navigate to="/signup" replace />}
          />

          {/* Auth pages - accessible when NOT logged in */}
          <Route
            path="/login"
            element={!isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" replace />}
          />
          <Route
            path="/signup"
            element={!isLoggedIn ? <SignUpPage /> : <Navigate to="/dashboard" replace />}
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {/* Hide footer on login/signup pages */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
