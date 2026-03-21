import { FaUtensils, FaMobileAlt, FaRobot } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
export default function ProgramCard() {
    return (
        <div className="bg-gray-100 pt-6 pb-6"> {/* 👈 gap control yahi hai */}

            <div className="max-w-6xl mx-auto px-4">

                {/* Card */}
                <div className="relative group bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 overflow-hidden">

                    {/* Hover green overlay */}
                    <div className="absolute top-0 left-0 w-full h-0 bg-green-200 opacity-30 transition-all duration-500 group-hover:h-full"></div>

                    {/* Left Content */}
                    <div className="relative z-10 flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                            AI Food Waste Management
                        </h2>

                        <p className="text-gray-600 mb-4">
                            We use AI to track, reduce, and redistribute excess food efficiently
                            to minimize waste and help those in need.
                        </p>

                        {/* Features */}
                        <div className="flex flex-col md:flex-row gap-4 text-center md:text-left">

                            <div className="flex flex-col items-center md:items-start">
                                <FaUtensils className="text-green-500 text-xl mb-1" />
                                <p className="text-gray-600 text-sm">
                                    Smart food tracking
                                </p>
                            </div>

                            <div className="flex flex-col items-center md:items-start">
                                <FaMobileAlt className="text-green-500 text-xl mb-1" />
                                <p className="text-gray-600 text-sm">
                                    Real-time alerts
                                </p>
                            </div>

                            <div className="flex flex-col items-center md:items-start">
                                <FaRobot className="text-green-500 text-xl mb-1" />
                                <p className="text-gray-600 text-xl mb-1" />
                                <p className="text-gray-600 text-sm">
                                    AI prediction system
                                </p>
                            </div>

                        </div>

                        {/* Link */}
                        <NavLink to='/about'>
                            <p className="text-green-600 mt-4 font-semibold cursor-pointer hover:underline">
                                View details →
                            </p>
                        </NavLink>
                    </div>

                    {/* Right Image */}
                    <div className="relative z-10 flex-1 amination-floaty">
                        <img
                            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                            alt="food"
                            className="rounded-xl w-full h-60 object-cover"
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}