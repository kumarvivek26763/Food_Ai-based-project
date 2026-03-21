import React from "react";
import { NavLink } from "react-router-dom";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaFirefoxBrowser } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* Left Section */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="https://plus.unsplash.com/premium_photo-1758204526484-8aab4982f214?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <h2 className="text-lg font-bold text-green-600">
              AI Food Waste
            </h2>
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Built for smarter food waste management. Track, reduce, and
            redistribute food efficiently using AI.
          </p>
        </div>

        {/* Pages */}
        <div className="pl-8">
          <h3 className="font-semibold mb-3">Pages</h3>
          <ul className="space-y-2 text-gray-600">
            <NavLink to="/"> <li className="hover:text-green-600 cursor-pointer">Home</li></NavLink>
            <NavLink to="/about"><li className="hover:text-green-600 cursor-pointer">About</li></NavLink>
            <NavLink to="/map"><li className="hover:text-green-600 cursor-pointer">Map</li></NavLink>
            <NavLink to="/about#faq"><li className="hover:text-green-600 cursor-pointer">FAQ</li></NavLink>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="flex items-center gap-2 text-gray-600 text-sm">
            <FaFirefoxBrowser className="text-green-500" />support@ai.com
          </p>
          <p className="flex items-center gap-2 text-gray-600 text-sm mt-1">
        <MdPhone className="text-green-500" />
        +91 9876566666
      </p>

      <p className="flex items-center gap-2 text-xs text-gray-400 mt-2">
        <MdEmail className="text-green-400" />
        Email: aifoodwast@gmail.com
      </p>
        </div>

      </div>

      {/* Bottom */}
      {/* <div className="text-center text-sm text-gray-500 pb-4">
        © 2026 AI Food Waste. All rights reserved.
      </div> */}
      <div className="flex justify-between items-center text-sm text-gray-500 px-20 pb-4">
        {/* Left Side */}
        <p>© 2026 AI Food Waste. All rights reserved.</p>

        {/* Right Side */}
        <p className="font-medium text-gray-600 px-10">
          Team: Code Warriors
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
    >
      {children}
    </Link>
  );
}

