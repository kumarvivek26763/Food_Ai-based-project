import { NavLink } from "react-router-dom"


export default function AboutDown() {
    return (
        <section class="bg-gradient-to-b from-[#f0faf4] to-white py-20 px-6 font-sans">
            <div class="max-w-5xl mx-auto">

                {/* <!-- Header --> */}
                <p class="text-center text-xs font-semibold uppercase tracking-widest text-[#2d6a4f] mb-3">
                    How It Works
                </p>
                <h2 class="text-center text-3xl md:text-4xl font-semibold text-[#1a3c2e] mb-3 leading-tight">
                    Reducing food waste made simple
                </h2>
                <p class="text-center text-base text-[#52796f] max-w-lg mx-auto mb-14 leading-relaxed">
                    Just 3 easy steps to track your food waste and redirect it to those who need it most.
                </p>

                {/* <!-- Steps Grid --> */}
                <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 relative connector-line">

                    {/* <!-- Step 1 --> */}
                    <div class="step-animate flex flex-col items-center text-center px-6 relative group">
                        {/* <!-- Icon Circle --> */}
                        <div class="relative w-[72px] h-[72px] rounded-full bg-white border-2 border-[#74c69d] flex items-center justify-center mb-6 z-10 shadow-[0_4px_20px_rgba(45,106,79,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_28px_rgba(45,106,79,0.2)]">
                            {/* <!-- Step Number Badge --> */}
                            <span class="absolute -top-2 -right-2 w-[22px] h-[22px] bg-[#2d6a4f] text-white text-[11px] font-semibold rounded-full flex items-center justify-center">
                                1
                            </span>
                            {/* <!-- Upload Icon --> */}
                            <svg class="w-[30px] h-[30px]" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="6" width="22" height="18" rx="3" stroke="#2d6a4f" stroke-width="1.8" />
                                <path d="M10 13l4-4 4 4" stroke="#2d6a4f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15 9v9" stroke="#2d6a4f" stroke-width="1.8" stroke-linecap="round" />
                                <path d="M10 21h10" stroke="#74c69d" stroke-width="1.8" stroke-linecap="round" />
                            </svg>
                        </div>
                        <h3 class="text-[17px] font-semibold text-[#1a3c2e] mb-2">Upload Food Data</h3>
                        <p class="text-sm text-[#52796f] leading-relaxed">
                            Add your surplus food from your kitchen, restaurant, or event by uploading a photo or entering details manually. Our AI instantly detects quantity and expiry information.
                        </p>
                    </div>

                    {/* <!-- Step 2 --> */}
                    <div class="step-animate flex flex-col items-center text-center px-6 relative group">
                        <div class="relative w-[72px] h-[72px] rounded-full bg-white border-2 border-[#74c69d] flex items-center justify-center mb-6 z-10 shadow-[0_4px_20px_rgba(45,106,79,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_28px_rgba(45,106,79,0.2)]">
                            <span class="absolute -top-2 -right-2 w-[22px] h-[22px] bg-[#2d6a4f] text-white text-[11px] font-semibold rounded-full flex items-center justify-center">
                                2
                            </span>
                            {/* <!-- AI Icon --> */}
                            <svg class="w-[30px] h-[30px]" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="15" cy="15" r="9" stroke="#2d6a4f" stroke-width="1.8" />
                                <circle cx="15" cy="15" r="3" fill="#74c69d" />
                                <path d="M15 6v3M15 21v3M6 15h3M21 15h3" stroke="#2d6a4f" stroke-width="1.8" stroke-linecap="round" />
                                <path d="M9.2 9.2l2.1 2.1M18.7 18.7l2.1 2.1M20.8 9.2l-2.1 2.1M11.3 18.7l-2.1 2.1" stroke="#74c69d" stroke-width="1.4" stroke-linecap="round" />
                            </svg>
                        </div>
                        <h3 class="text-[17px] font-semibold text-[#1a3c2e] mb-2">AI Analysis & Suggestions</h3>
                        <p class="text-sm text-[#52796f] leading-relaxed">
                            Our AI model analyzes food type, quantity, and location to suggest the best redistribution plan — connecting surplus food to NGOs, shelters, or families in need.
                        </p>
                    </div>

                    {/* <!-- Step 3 --> */}
                    <div class="step-animate flex flex-col items-center text-center px-6 relative group">
                        <div class="relative w-[72px] h-[72px] rounded-full bg-white border-2 border-[#74c69d] flex items-center justify-center mb-6 z-10 shadow-[0_4px_20px_rgba(45,106,79,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_28px_rgba(45,106,79,0.2)]">
                            <span class="absolute -top-2 -right-2 w-[22px] h-[22px] bg-[#2d6a4f] text-white text-[11px] font-semibold rounded-full flex items-center justify-center">
                                3
                            </span>
                            {/* <!-- Donate Icon --> */}
                            <svg class="w-[30px] h-[30px]" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 17l4-4 3 3 5-6 4 4 6-6" stroke="#2d6a4f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8 24h14" stroke="#74c69d" stroke-width="1.8" stroke-linecap="round" />
                                <circle cx="22" cy="10" r="2" fill="#d8f3dc" stroke="#2d6a4f" stroke-width="1.4" />
                            </svg>
                        </div>
                        <h3 class="text-[17px] font-semibold text-[#1a3c2e] mb-2">Donate & Track Impact</h3>
                        <p class="text-sm text-[#52796f] leading-relaxed">
                            Schedule a food donation in one click. Monitor your real-time dashboard to see how much food was saved, how many meals were distributed, and the impact you've made.
                        </p>
                    </div>

                </div>

                {/* <!-- CTA Button --> */}
                <div class="text-center mt-14">
                    {/* <a href="#dashboard"
                        class="inline-block bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-[15px] font-medium px-8 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 no-underline">
                        Get Started &rarr;
                    </a> */}
                    <NavLink to="/waste">
                        <button class="inline-block bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-[15px] font-medium px-8 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 no-underline">
                             Get Started
                        </button>
                    </NavLink>
                </div>

            </div>
        </section>
    )
}