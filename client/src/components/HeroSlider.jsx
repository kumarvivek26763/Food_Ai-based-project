import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const images = [
    {
        src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=400&fit=crop",
        alt: "Fresh vegetables",
        rotate: "-8deg",
    },
    {
        src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300&h=400&fit=crop",
        alt: "Healthy food",
        rotate: "5deg",
    },
    {
        src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=400&fit=crop",
        alt: "Food bowl",
        rotate: "-12deg",
    },
    {
        src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=400&fit=crop",
        alt: "Plated dish",
        rotate: "8deg",
    },
    {
        src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=400&fit=crop",
        alt: "Pizza",
        rotate: "-5deg",
    },
    {
        src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=400&fit=crop",
        alt: "Salad",
        rotate: "10deg",
    },
    {
        src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=400&fit=crop",
        alt: "Healthy bowl",
        rotate: "-7deg",
    },
    {
        src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=400&fit=crop",
        alt: "Grilled food",
        rotate: "4deg",
    },
];

// We duplicate to create seamless infinite loop
const allImages = [...images, ...images];

export default function HeroSlider() {
    const trackRef = useRef(null);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');
 
        @keyframes slide-loop {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
 
        .slider-track {
          animation: slide-loop 28s linear infinite;
          will-change: transform;
        }
 
        .slider-track:hover {
          animation-play-state: paused;
        }
 
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
 
        .card-float {
          animation: float-subtle 4s ease-in-out infinite;
        }
 
        .hero-card {
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease, filter 0.35s ease;
        }
 
        .hero-card:hover {
          transform: scale(1.08) translateY(-6px) !important;
          filter: blur(0px) !important;
          opacity: 1 !important;
          box-shadow: 0 32px 64px rgba(0,0,0,0.22) !important;
          z-index: 10;
        }
 
        .fade-left {
          background: linear-gradient(to right, #f3f4f6 0%, rgba(243,244,246,0) 100%);
          pointer-events: none;
          z-index: 5;
        }
 
        .fade-right {
          background: linear-gradient(to left, #f3f4f6 0%, rgba(243,244,246,0) 100%);
          pointer-events: none;
          z-index: 5;
        }
 
        .badge-pill {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          border: 1px solid #6ee7b7;
        }
 
        .heading-accent {
          background: linear-gradient(135deg, #064e3b 0%, #059669 50%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
 
        .stat-card {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(16, 185, 129, 0.15);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
 
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(16,185,129,0.12);
        }
 
        .cta-primary {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(16,185,129,0.4);
          filter: brightness(1.08);
        }
 
        .cta-secondary {
          border: 2px solid #10b981;
          color: #059669;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .cta-secondary:hover {
          background: #ecfdf5;
        }
 
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px;
        }
 
        @media (max-width: 640px) {
          .hero-heading {
            font-size: 2.25rem !important;
            line-height: 1.15 !important;
          }
        }
      `}</style>

            <section
                className="relative min-h-screen flex flex-col overflow-hidden"
                style={{ background: "#f3f4f6", fontFamily: "'DM Sans', sans-serif" }}
            >
                {/* Subtle noise texture overlay */}
                <div className="noise-overlay absolute inset-0 pointer-events-none" />

                {/* Decorative background blobs */}
                <div
                    className="absolute top-[-120px] left-[-80px] w-[520px] h-[520px] rounded-full pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(243,244,246,0) 70%)",
                    }}
                />
                <div
                    className="absolute bottom-[-100px] right-[-60px] w-[420px] h-[420px] rounded-full pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(5,150,105,0.07) 0%, rgba(243,244,246,0) 70%)",
                    }}
                />

                {/* ── CENTER CONTENT ── */}
                <div className="relative z-10 flex flex-col items-center justify-center pt-20 pb-6 px-6 text-center">
                    {/* Badge */}
                    <div className="badge-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span
                            className="text-emerald-800 text-xs font-semibold tracking-widest uppercase"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Sustainable Tech · 2026
                        </span>
                    </div>

                    {/* Heading */}
                    <h1
                        className="hero-heading font-black leading-tight mb-5"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                            color: "#111827",
                            maxWidth: "780px",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        AI-Powered{" "}
                        <span className="heading-accent">Food Waste</span>
                        <br />
                        Management
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-gray-500 mb-8 leading-relaxed"
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            maxWidth: "520px",
                            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                            fontWeight: 300,
                        }}
                    >
                        Intelligent systems that predict, track, and reduce food waste
                        across the entire supply chain — from farm to table.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-3 justify-center mb-10">
                        <NavLink to="/waste">
                            <button
                                className="cta-primary text-white font-semibold px-7 py-3.5 rounded-2xl text-sm shadow-lg"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Get Started Free
                            </button>
                        </NavLink>
                        <NavLink to="/dashboard">
                            <button
                                className="cta-secondary font-semibold px-7 py-3.5 rounded-2xl text-sm bg-white"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Dashboard →
                            </button>
                        </NavLink>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-4 justify-center mb-4">
                        {[
                            { value: "73%", label: "Waste Reduced" },
                            { value: "9M+", label: "Meals Saved" },
                            { value: "66+", label: "Partners" },
                        ].map((s) => (
                            <div
                                key={s.label}
                                className="stat-card rounded-2xl px-6 py-3 flex flex-col items-center min-w-[100px]"
                            >
                                <span
                                    className="text-2xl font-black heading-accent"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {s.value}
                                </span>
                                <span
                                    className="text-gray-400 text-xs mt-0.5 font-medium tracking-wide"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── CURVED IMAGE SLIDER ── */}
                <div className="relative w-full overflow-hidden" style={{ height: "320px" }}>
                    {/* Edge fade overlays */}
                    <div className="fade-left absolute left-0 top-0 h-full w-40 md:w-64" />
                    <div className="fade-right absolute right-0 top-0 h-full w-40 md:w-64" />

                    {/* Curved baseline — subtle arc */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                        style={{ opacity: 0.06 }}
                    >
                        <path
                            d="M0,200 Q360,100 720,200 Q1080,300 1440,200"
                            fill="none"
                            stroke="#059669"
                            strokeWidth="2"
                        />
                    </svg>

                    {/* Scrolling track */}
                    <div
                        ref={trackRef}
                        className="slider-track absolute top-0 left-0 flex items-end gap-6 px-6"
                        style={{ paddingBottom: "16px" }}
                    >
                        {allImages.map((img, i) => {
                            const posInSet = i % images.length;

                            // Curved vertical positioning — arc effect
                            // Map 0..7 to a sine curve: cards near center higher, edges lower
                            const t = (posInSet / (images.length - 1)) * Math.PI;
                            const arcY = Math.sin(t); // 0 → 1 → 0
                            const verticalShift = 60 - arcY * 80; // px from bottom

                            // Blur + opacity based on distance from center
                            const distFromCenter = Math.abs(posInSet - (images.length - 1) / 2);
                            const normalizedDist = distFromCenter / ((images.length - 1) / 2);
                            const blurAmt = normalizedDist * 2.5;
                            const opacityVal = 1 - normalizedDist * 0.55;

                            // Float animation delay stagger
                            const floatDelay = `${(posInSet * 0.6).toFixed(1)}s`;

                            // Card dimensions — center cards a bit taller
                            const heightPx = 170 + arcY * 40;
                            const widthPx = 130 + arcY * 20;

                            return (
                                <div
                                    key={i}
                                    className="hero-card card-float flex-shrink-0 relative overflow-hidden rounded-2xl shadow-xl cursor-pointer select-none"
                                    style={{
                                        width: `${widthPx}px`,
                                        height: `${heightPx}px`,
                                        transform: `rotate(${img.rotate}) translateY(-${verticalShift}px)`,
                                        filter: `blur(${blurAmt}px)`,
                                        opacity: opacityVal,
                                        boxShadow: `0 ${8 + arcY * 16}px ${24 + arcY * 24}px rgba(0,0,0,${0.1 + arcY * 0.08})`,
                                        animationDelay: floatDelay,
                                        animationDuration: `${3.5 + (posInSet % 3) * 0.7}s`,
                                        borderRadius: "16px",
                                    }}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        loading="lazy"
                                        draggable={false}
                                        className="w-full h-full object-cover"
                                        style={{ display: "block" }}
                                    />
                                    {/* Subtle inner glow on hover readiness */}
                                    <div
                                        className="absolute inset-0 rounded-2xl"
                                        style={{
                                            background:
                                                "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.12) 100%)",
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom tagline strip */}
                <div className="relative z-10 flex justify-center pb-10 pt-2">
                    <p
                        className="text-gray-400 text-xs tracking-widest uppercase"
                        style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.18em" }}
                    >
                        Trusted by restaurants · farms · supermarkets · NGOs
                    </p>
                </div>
            </section>
        </>
    );
}
