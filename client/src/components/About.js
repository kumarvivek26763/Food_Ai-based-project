import React from "react";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Side - Text */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-emerald-600 mb-4">
            About AI Food Waste Manager
          </h1>

          <p className="text-slate-600 mb-4">
            AI Food Waste Manager is a smart platform designed to help reduce food waste
            using artificial intelligence.
          </p>

          <p className="text-slate-600 mb-4">
            It analyzes food data and provides insights to users, helping them manage,
            track, and minimize waste efficiently.
          </p>

          <ul className="list-disc pl-5 text-slate-700 space-y-2">
            <li>Reduce food wastage</li>
            <li>AI-based suggestions</li>
            <li>Smart tracking system</li>
            <li>Donation & redistribution support</li>
          </ul>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 rounded-full animate-pulse"></div>

            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="AI Food Waste"
              className="relative z-10 w-80 h-80 object-cover rounded-2xl shadow-xl animate-floaty"
            />

          </div>
        </div>

      </div>
    </div>
  );
};

//export default About;