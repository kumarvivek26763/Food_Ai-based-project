import React from "react";
import { Link } from "react-router-dom";

// export default function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="mt-10 border-t bg-white/70 backdrop-blur">
//       <div className="mx-auto max-w-6xl px-4 py-8">
//         <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
//           <div className="max-w-md">
//             <div className="flex items-center gap-3">
//               {/* <div className="h-9 w-9 rounded-2xl bg-emerald-600 relative overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500" />
//                 <div className="absolute -left-2 -top-2 h-10 w-10 rounded-full bg-white/15 blur-sm" />
//               </div> */}
//               <div className="h-10 w-10 flex items-center justify-center overflow-hidden rounded-2xl">
//                  <img 
//                    src="https://plus.unsplash.com/premium_photo-1758204526484-8aab4982f214?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
//                    alt="logo"
//                    className="h-full w-full object-cover"
//                  />
//              </div>
//               <div>
//                 <div className="text-sm font-extrabold text-slate-900">AI Food Waste</div>
//                 <div className="text-xs text-slate-600">Predict • Track • Redistribute</div>
//               </div>
//             </div>

//             <p className="mt-3 text-sm text-slate-600">
//               Built for smarter food waste management. When waste is high, the system helps connect
//               nearby NGOs (optional).
//             </p>
//           </div>

//           <div className="grid gap-6 sm:grid-cols-2">
//             <div>
//               <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
//                 Pages
//               </div>
//               <div className="mt-3 space-y-2 text-sm">
//                 <FooterLink to="/">Home</FooterLink>
//                 <FooterLink to="/dashboard">Dashboard</FooterLink>
//                 <FooterLink to="/map">Map</FooterLink>
//               </div>
//             </div>

//             <div>
//               <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
//                 Contact
//               </div>
//               <div className="mt-3 space-y-2 text-sm text-slate-600">
//                 <div>support@ai-food-waste.example</div>
//                 <div>+1 (000) 000-0000</div>
//                 <div className="text-xs text-slate-500">Optional integrations: Email/SMS</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
//           <div className="text-xs text-slate-500">© {year} AI Smart Food Waste Management System</div>
//           <div className="text-xs text-slate-500">
//             Privacy • Terms • Built with React + Express + Flask
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

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
        <div>
          <h3 className="font-semibold mb-3">Pages</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-green-600 cursor-pointer">Home</li>
            <li className="hover:text-green-600 cursor-pointer">Dashboard</li>
            <li className="hover:text-green-600 cursor-pointer">Map</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-gray-600 text-sm">support@ai-food-waste.com</p>
          <p className="text-gray-600 text-sm mt-1">+91 9876543210</p>
          <p className="text-xs text-gray-400 mt-2">
            Optional integrations: Email/SMS
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

