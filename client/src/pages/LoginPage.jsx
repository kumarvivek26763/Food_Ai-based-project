// import { useState, useEffect, useRef } from "react";

/* ─── Floating food particles ─── */
// const PARTICLES = [
//   { emoji: "🥦", x: 8, y: 15, dur: 7, delay: 0 },
//   { emoji: "🍎", x: 85, y: 10, dur: 9, delay: 1.2 },
//   { emoji: "🥕", x: 20, y: 75, dur: 8, delay: 0.5 },
//   { emoji: "🌽", x: 75, y: 80, dur: 6, delay: 2 },
//   { emoji: "🍋", x: 50, y: 5, dur: 10, delay: 0.8 },
//   { emoji: "🥑", x: 92, y: 45, dur: 7.5, delay: 1.5 },
//   { emoji: "🍅", x: 5, y: 50, dur: 9, delay: 3 },
//   { emoji: "🌿", x: 40, y: 90, dur: 8.5, delay: 0.3 },
//   { emoji: "🫛", x: 65, y: 25, dur: 7, delay: 2.5 },
//   { emoji: "🍊", x: 30, y: 55, dur: 6.5, delay: 1 },
// ];

/* ─── SVG leaf icon ─── */
// function LeafIcon({ size = 20, color = "#22c55e" }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//       <path
//         d="M12 2C6 2 3 7 3 12c0 4 2.5 7.5 6 9l1-4c-1.5-1-2.5-3-2.5-5 0-3 2-5.5 4.5-6.5C13.5 8 15 10 15 12c0 2-1 3.5-2.5 4.5L14 20c3.5-1.5 6-5 6-9 0-5-3-9-8-9z"
//         fill={color}
//       />
//     </svg>
//   );
// }

/* ─── Animated leaf SVG background ─── */
// function LeafBg() {
//   return (
//     <svg
//       className="absolute inset-0 w-full h-full"
//       xmlns="http://www.w3.org/2000/svg"
//       style={{ opacity: 0.04, pointerEvents: "none" }}
//     >
//       <defs>
//         <pattern id="leafPat" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
//           <text x="10" y="40" fontSize="28" fill="#16a34a">🌿</text>
//           <text x="50" y="20" fontSize="18" fill="#16a34a">🍃</text>
//         </pattern>
//       </defs>
//       <rect width="100%" height="100%" fill="url(#leafPat)" />
//     </svg>
//   );
// }

/* ─── Animated circular progress ring ─── */
// function WasteRing() {
//   return (
//     <div className="relative inline-flex items-center justify-center" style={{ width: 64, height: 64 }}>
//       <svg width="64" height="64" style={{ transform: "rotate(-90deg)" }}>
//         <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(34,197,94,0.15)" strokeWidth="5" />
//         <circle
//           cx="32"
//           cy="32"
//           r="26"
//           fill="none"
//           stroke="#22c55e"
//           strokeWidth="5"
//           strokeLinecap="round"
//           strokeDasharray="163"
//           strokeDashoffset="40"
//           style={{
//             animation: "dashSpin 2.5s ease-in-out infinite alternate",
//           }}
//         />
//       </svg>
//       <span style={{ position: "absolute", fontSize: 22 }}>🌱</span>
//     </div>
//   );
// }

// export default function LoginPage() {
//   const [mode, setMode] = useState("register"); // "login" | "register"
//   const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
//   const [focused, setFocused] = useState(null);
//   const [showPass, setShowPass] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setTimeout(() => setMounted(true), 60);
//   }, []);

//   const validate = () => {
//     const e = {};
//     if (mode === "register" && !form.name.trim()) e.name = "Name required";
//     if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Valid email required";
//     if (form.password.length < 6) e.password = "Min 6 characters";
//     if (mode === "register" && !form.phone.match(/^\+?[\d\s\-]{8,}$/))
//       e.phone = "Valid phone required";
//     return e;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errs = validate();
//     if (Object.keys(errs).length) { setErrors(errs); return; }
//     setErrors({});
//     setSubmitted(true);
//     setTimeout(() => setSubmitted(false), 2800);
//   };

//   const fields =
//     mode === "register"
//       ? [
//           { key: "name",     label: "Full Name",    type: "text",     icon: "👤", placeholder: "Aarav Singh" },
//           { key: "email",    label: "Email Address", type: "email",   icon: "✉️",  placeholder: "aarav@example.com" },
//           { key: "password", label: "Password",      type: showPass ? "text" : "password", icon: "🔒", placeholder: "••••••••" },
//           { key: "phone",    label: "Phone Number",  type: "tel",     icon: "📱", placeholder: "+91 98765 43210" },
//         ]
//       : [
//           { key: "email",    label: "Email Address", type: "email",   icon: "✉️",  placeholder: "aarav@example.com" },
//           { key: "password", label: "Password",      type: showPass ? "text" : "password", icon: "🔒", placeholder: "••••••••" },
//         ];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Nunito:wght@300;400;500;600&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         @keyframes floatUp {
//           0%   { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
//           50%  { transform: translateY(-28px) rotate(8deg); opacity: 1; }
//           100% { transform: translateY(0px) rotate(-4deg); opacity: 0.7; }
//         }
//         @keyframes dashSpin {
//           0%   { stroke-dashoffset: 140; }
//           100% { stroke-dashoffset: 20; }
//         }
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(32px) scale(0.97); }
//           to   { opacity: 1; transform: translateY(0)    scale(1); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; } to { opacity: 1; }
//         }
//         @keyframes ripple {
//           0%   { transform: scale(0.8); opacity: 1; }
//           100% { transform: scale(2.4); opacity: 0; }
//         }
//         @keyframes successPop {
//           0%   { transform: scale(0.5); opacity: 0; }
//           60%  { transform: scale(1.1); }
//           100% { transform: scale(1);   opacity: 1; }
//         }
//         @keyframes particleDrift {
//           0%,100% { transform: translateY(0) rotate(0deg); }
//           33%     { transform: translateY(-18px) rotate(12deg); }
//           66%     { transform: translateY(10px) rotate(-8deg); }
//         }
//         @keyframes shimmer {
//           0%   { background-position: -200% center; }
//           100% { background-position: 200% center; }
//         }
//         @keyframes borderGlow {
//           0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
//           50%     { box-shadow: 0 0 0 4px rgba(34,197,94,0.18); }
//         }
//         @keyframes scanLine {
//           0%   { top: 0%; }
//           100% { top: 100%; }
//         }

//         .page-bg {
//           min-height: 100vh;
//           background: linear-gradient(135deg, #0a1a0f 0%, #0d2818 40%, #071510 100%);
//           position: relative;
//           overflow: hidden;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-family: 'Nunito', sans-serif;
//         }

//         .particle {
//           position: absolute;
//           font-size: 1.6rem;
//           pointer-events: none;
//           animation: particleDrift var(--dur, 7s) ease-in-out infinite;
//           animation-delay: var(--delay, 0s);
//           opacity: 0.18;
//           user-select: none;
//         }

//         .card-wrap {
//           position: relative;
//           z-index: 10;
//           width: 100%;
//           max-width: 460px;
//           padding: 0 16px;
//           transition: opacity 0.5s ease, transform 0.5s ease;
//         }
//         .card-wrap.hidden-mount {
//           opacity: 0; transform: translateY(40px) scale(0.96);
//         }
//         .card-wrap.visible-mount {
//           opacity: 1; transform: translateY(0) scale(1);
//           transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1);
//         }

//         .glass-card {
//           background: rgba(10, 30, 15, 0.82);
//           border: 1px solid rgba(34,197,94,0.18);
//           border-radius: 28px;
//           padding: 40px 36px 36px;
//           backdrop-filter: blur(24px);
//           box-shadow:
//             0 0 0 1px rgba(34,197,94,0.08),
//             0 32px 80px rgba(0,0,0,0.5),
//             inset 0 1px 0 rgba(255,255,255,0.04);
//           position: relative;
//           overflow: hidden;
//         }

//         .scan-line {
//           position: absolute;
//           left: 0; right: 0;
//           height: 2px;
//           background: linear-gradient(90deg, transparent, rgba(34,197,94,0.35), transparent);
//           animation: scanLine 3.5s linear infinite;
//           pointer-events: none;
//         }

//         .brand-heading {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.75rem;
//           font-weight: 800;
//           background: linear-gradient(90deg, #4ade80, #86efac, #22c55e, #4ade80);
//           background-size: 200% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: shimmer 4s linear infinite;
//           line-height: 1.15;
//         }

//         .tab-btn {
//           flex: 1;
//           padding: 9px 0;
//           border-radius: 12px;
//           font-family: 'Nunito', sans-serif;
//           font-weight: 600;
//           font-size: 0.88rem;
//           cursor: pointer;
//           border: none;
//           transition: all 0.25s ease;
//           letter-spacing: 0.03em;
//         }
//         .tab-btn.active {
//           background: linear-gradient(135deg, #16a34a, #22c55e);
//           color: #fff;
//           box-shadow: 0 4px 16px rgba(34,197,94,0.35);
//         }
//         .tab-btn.inactive {
//           background: rgba(255,255,255,0.04);
//           color: rgba(255,255,255,0.4);
//         }
//         .tab-btn.inactive:hover {
//           background: rgba(34,197,94,0.08);
//           color: rgba(255,255,255,0.7);
//         }

//         .field-wrap {
//           position: relative;
//           margin-bottom: 4px;
//           animation: fadeSlideUp 0.4s ease both;
//         }
//         .field-label {
//           display: block;
//           font-size: 0.78rem;
//           font-weight: 600;
//           color: rgba(134,239,172,0.7);
//           margin-bottom: 6px;
//           letter-spacing: 0.06em;
//           text-transform: uppercase;
//         }
//         .field-icon {
//           position: absolute;
//           left: 14px;
//           top: 50%;
//           transform: translateY(-50%);
//           font-size: 1rem;
//           pointer-events: none;
//         }
//         .field-input {
//           width: 100%;
//           background: rgba(255,255,255,0.04);
//           border: 1.5px solid rgba(34,197,94,0.15);
//           border-radius: 14px;
//           padding: 12px 44px 12px 42px;
//           color: #e8fdf0;
//           font-family: 'Nunito', sans-serif;
//           font-size: 0.92rem;
//           outline: none;
//           transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
//           caret-color: #22c55e;
//         }
//         .field-input::placeholder { color: rgba(255,255,255,0.2); }
//         .field-input:focus {
//           border-color: rgba(34,197,94,0.55);
//           background: rgba(34,197,94,0.06);
//           box-shadow: 0 0 0 3px rgba(34,197,94,0.12);
//         }
//         .field-input.has-error {
//           border-color: rgba(239,68,68,0.6);
//         }
//         .field-error {
//           font-size: 0.73rem;
//           color: #f87171;
//           margin-top: 4px;
//           padding-left: 4px;
//           animation: fadeIn 0.2s ease;
//         }

//         .eye-btn {
//           position: absolute;
//           right: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: rgba(134,239,172,0.5);
//           font-size: 1rem;
//           padding: 4px;
//           transition: color 0.2s;
//         }
//         .eye-btn:hover { color: #4ade80; }

//         .submit-btn {
//           width: 100%;
//           padding: 14px;
//           border-radius: 16px;
//           border: none;
//           cursor: pointer;
//           font-family: 'Syne', sans-serif;
//           font-size: 1rem;
//           font-weight: 700;
//           letter-spacing: 0.06em;
//           background: linear-gradient(135deg, #16a34a 0%, #22c55e 60%, #4ade80 100%);
//           color: #fff;
//           position: relative;
//           overflow: hidden;
//           transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
//           box-shadow: 0 6px 24px rgba(34,197,94,0.35);
//         }
//         .submit-btn::after {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15));
//           pointer-events: none;
//         }
//         .submit-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 12px 36px rgba(34,197,94,0.45);
//           filter: brightness(1.08);
//         }
//         .submit-btn:active { transform: scale(0.98); }

//         .success-overlay {
//           position: absolute;
//           inset: 0;
//           background: rgba(10,30,15,0.92);
//           border-radius: 28px;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           z-index: 20;
//           animation: fadeIn 0.3s ease;
//         }
//         .success-icon {
//           font-size: 3.5rem;
//           animation: successPop 0.5s cubic-bezier(.34,1.56,.64,1) both;
//         }
//         .success-text {
//           font-family: 'Syne', sans-serif;
//           color: #4ade80;
//           font-size: 1.1rem;
//           font-weight: 700;
//           margin-top: 14px;
//           animation: fadeSlideUp 0.4s ease 0.2s both;
//         }
//         .success-sub {
//           color: rgba(134,239,172,0.55);
//           font-size: 0.82rem;
//           margin-top: 6px;
//           animation: fadeSlideUp 0.4s ease 0.35s both;
//         }

//         .divider-line {
//           flex: 1;
//           height: 1px;
//           background: rgba(34,197,94,0.12);
//         }

//         .stat-chip {
//           display: inline-flex;
//           align-items: center;
//           gap: 5px;
//           background: rgba(34,197,94,0.08);
//           border: 1px solid rgba(34,197,94,0.15);
//           border-radius: 20px;
//           padding: 4px 10px;
//           font-size: 0.72rem;
//           color: rgba(134,239,172,0.7);
//           font-weight: 500;
//         }

//         .glow-orb {
//           position: absolute;
//           border-radius: 50%;
//           pointer-events: none;
//           filter: blur(80px);
//         }

//         @media (max-width: 480px) {
//           .glass-card { padding: 28px 20px 24px; border-radius: 20px; }
//           .brand-heading { font-size: 1.4rem; }
//         }
//       `}</style>

//       <div className="page-bg">
//         {/* Leaf pattern */}
//         <LeafBg />

//         {/* Glow orbs */}
//         <div className="glow-orb" style={{ width: 400, height: 400, background: "rgba(22,163,74,0.12)", top: "-10%", left: "-10%" }} />
//         <div className="glow-orb" style={{ width: 300, height: 300, background: "rgba(34,197,94,0.09)", bottom: "-8%", right: "-5%" }} />

//         {/* Floating food particles */}
//         {PARTICLES.map((p, i) => (
//           <div
//             key={i}
//             className="particle"
//             style={{
//               left: `${p.x}%`,
//               top: `${p.y}%`,
//               "--dur": `${p.dur}s`,
//               "--delay": `${p.delay}s`,
//             }}
//           >
//             {p.emoji}
//           </div>
//         ))}

//         {/* Card */}
//         <div className={`card-wrap ${mounted ? "visible-mount" : "hidden-mount"}`}>
//           <div className="glass-card">
//             <div className="scan-line" />

//             {/* Brand header */}
//             <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
//               <WasteRing />
//               <div>
//                 <div className="brand-heading">FreshMind AI</div>
//                 <div style={{ fontSize: "0.72rem", color: "rgba(134,239,172,0.45)", fontWeight: 500, letterSpacing: "0.08em", marginTop: 2 }}>
//                   FOOD WASTE MANAGEMENT
//                 </div>
//               </div>
//             </div>

//             {/* Stats chips */}
//             <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22, marginTop: 10 }}>
//               <span className="stat-chip">🌍 73% Waste Cut</span>
//               <span className="stat-chip">🍽️ 12M Meals Saved</span>
//               <span className="stat-chip">🤖 AI Powered</span>
//             </div>

//             {/* Tab switcher */}
//             <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: 4, marginBottom: 24 }}>
//               <button
//                 className={`tab-btn ${mode === "register" ? "active" : "inactive"}`}
//                 onClick={() => { setMode("register"); setErrors({}); }}
//               >
//                 Register
//               </button>
//               <button
//                 className={`tab-btn ${mode === "login" ? "active" : "inactive"}`}
//                 onClick={() => { setMode("login"); setErrors({}); }}
//               >
//                 Sign In
//               </button>
//             </div>

//             {/* Greeting */}
//             <div style={{ marginBottom: 22 }}>
//               <h2 style={{ fontFamily: "'Syne', sans-serif", color: "#e8fdf0", fontSize: "1.18rem", fontWeight: 700 }}>
//                 {mode === "register" ? "Create your account" : "Welcome back 👋"}
//               </h2>
//               <p style={{ color: "rgba(134,239,172,0.45)", fontSize: "0.8rem", marginTop: 4 }}>
//                 {mode === "register"
//                   ? "Join the movement to reduce food waste with AI"
//                   : "Sign in to your FreshMind dashboard"}
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} noValidate>
//               <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//                 {fields.map((f, idx) => (
//                   <div
//                     key={f.key}
//                     className="field-wrap"
//                     style={{ animationDelay: `${idx * 0.07 + 0.1}s` }}
//                   >
//                     <label className="field-label" htmlFor={f.key}>
//                       {f.label}
//                     </label>
//                     <div style={{ position: "relative" }}>
//                       <span className="field-icon">{f.icon}</span>
//                       <input
//                         id={f.key}
//                         className={`field-input${errors[f.key] ? " has-error" : ""}`}
//                         type={f.type}
//                         placeholder={f.placeholder}
//                         value={form[f.key]}
//                         onChange={(e) =>
//                           setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
//                         }
//                         onFocus={() => setFocused(f.key)}
//                         onBlur={() => setFocused(null)}
//                         autoComplete={f.key === "password" ? "current-password" : f.key}
//                       />
//                       {f.key === "password" && (
//                         <button
//                           type="button"
//                           className="eye-btn"
//                           onClick={() => setShowPass((v) => !v)}
//                           tabIndex={-1}
//                           aria-label="Toggle password"
//                         >
//                           {showPass ? "🙈" : "👁️"}
//                         </button>
//                       )}
//                     </div>
//                     {errors[f.key] && (
//                       <div className="field-error">⚠ {errors[f.key]}</div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {mode === "login" && (
//                 <div style={{ textAlign: "right", marginTop: 8, marginBottom: 4 }}>
//                   <span style={{ color: "rgba(134,239,172,0.5)", fontSize: "0.78rem", cursor: "pointer" }}>
//                     Forgot password?
//                   </span>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 className="submit-btn"
//                 style={{ marginTop: 22 }}
//               >
//                 {mode === "register" ? "🌱 Create Account" : "🔑 Sign In"}
//               </button>
//             </form>

//             {/* Divider */}
//             <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0 16px" }}>
//               <div className="divider-line" />
//               <span style={{ fontSize: "0.72rem", color: "rgba(134,239,172,0.3)", whiteSpace: "nowrap" }}>
//                 or continue with
//               </span>
//               <div className="divider-line" />
//             </div>

//             {/* Social buttons */}
//             <div style={{ display: "flex", gap: 10 }}>
//               {[
//                 { icon: "G", label: "Google", color: "#ea4335" },
//                 { icon: "f", label: "Facebook", color: "#1877f2" },
//               ].map((s) => (
//                 <button
//                   key={s.label}
//                   style={{
//                     flex: 1,
//                     padding: "10px",
//                     borderRadius: 12,
//                     border: "1px solid rgba(34,197,94,0.12)",
//                     background: "rgba(255,255,255,0.03)",
//                     color: "rgba(255,255,255,0.55)",
//                     fontFamily: "'Nunito', sans-serif",
//                     fontSize: "0.82rem",
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: 8,
//                     transition: "background 0.2s, border-color 0.2s",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "rgba(255,255,255,0.06)";
//                     e.currentTarget.style.borderColor = "rgba(34,197,94,0.25)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "rgba(255,255,255,0.03)";
//                     e.currentTarget.style.borderColor = "rgba(34,197,94,0.12)";
//                   }}
//                 >
//                   <span style={{ color: s.color, fontWeight: 800, fontSize: "0.95rem" }}>{s.icon}</span>
//                   {s.label}
//                 </button>
//               ))}
//             </div>

//             {/* Footer note */}
//             <p style={{ textAlign: "center", fontSize: "0.72rem", color: "rgba(134,239,172,0.28)", marginTop: 18, lineHeight: 1.5 }}>
//               By continuing, you agree to our{" "}
//               <span style={{ color: "rgba(74,222,128,0.55)", cursor: "pointer" }}>Terms</span>
//               {" & "}
//               <span style={{ color: "rgba(74,222,128,0.55)", cursor: "pointer" }}>Privacy Policy</span>
//             </p>

//             {/* ── Success overlay ── */}
//             {submitted && (
//               <div className="success-overlay">
//                 <div className="success-icon">✅</div>
//                 <div className="success-text">
//                   {mode === "register" ? "Account Created!" : "Welcome Back!"}
//                 </div>
//                 <div className="success-sub">Redirecting to your dashboard…</div>
//               </div>
//             )}
//           </div>

//           {/* Bottom attribution */}
//           <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.73rem", color: "rgba(134,239,172,0.22)", fontFamily: "'Nunito', sans-serif" }}>
//             🌎 Together reducing food waste · FreshMind AI 2026
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }


import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { NavLink } from "react-router-dom";


export default function LoginPage() {
  const [role, setRole] = useState("Restaurant Owner");

  const roles = [
    "Restaurant Owner",
    "Farm Manager",
    "Individual",
    "NGO Worker",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50 px-4">

      {/* Card */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md 
      transition-all duration-500 hover:scale-105">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {roles.map((item) => (
            <button
              key={item}
              onClick={() => setRole(item)}
              className={`text-sm px-3 py-2 rounded-lg border transition 
              ${role === item
                  ? "bg-green-500 text-white border-green-500 shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-green-100"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Email */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none"
          />
        </div>

        {/* Button */}
        <button className="w-full bg-green-500 text-white py-2 rounded-lg 
        hover:bg-green-600 transition transform hover:scale-105">
          Login as {role}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <NavLink to="/signup">
            <span className="text-green-600 cursor-pointer hover:underline">
              Sign Up
            </span>
          </NavLink>
        </p>

      </div>
    </div>
  );
}