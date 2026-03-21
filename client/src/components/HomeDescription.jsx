export default function HomeDescription() {
  return (
    // <div className="bg-gray-100 p-4 ">
    //   <div className="relative group bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 overflow-hidden">
    //      <section className="max-w-4xl mx-auto px-6 py-10 text-center ">
    //         <h1 className="text-4xl font-bold transition-all duration-500 hover:-translate-y-2 hover:text-emerald-600">
    //           About AI Food Waste Manager
    //         </h1>
    //         {/* Description */}
    //         <p className="mt-4 text-gray-600 text-lg">
    //           Our AI-powered system helps you track food usage, reduce waste, and make smarter decisions.
    //           Get alerts before food expires, manage leftovers efficiently, and contribute to a more
    //           sustainable and eco-friendly future.
    //         </p>
    //         <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">

    //           <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full hover:bg-green-200 transition">
    //             🤖 AI-Based Tracking
    //           </span>

    //           <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full hover:bg-green-200 transition">
    //             ♻️ Waste Reduction
    //           </span>

    //           <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full hover:bg-green-200 transition">
    //             🔔 Smart Alerts
    //           </span>

    //         </div>

    //       </section>
    //   </div>
    // </div>

   <div className="bg-gray-100 p-4">
  <div className="relative group bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 overflow-hidden">

    {/* ✅ Premium top → down gradient overlay */}
    <div className="absolute top-0 left-0 w-full h-0 
    bg-gradient-to-b from-green-200/60 to-transparent 
    transition-all duration-500 ease-out 
    group-hover:h-full"></div>

    <section className="relative z-10 max-w-4xl mx-auto px-6 py-10 text-center">

      <h1 className="text-4xl font-bold transition-all duration-500 group-hover:-translate-y-1 group-hover:text-emerald-600">
        About AI Food Waste Manager
      </h1>

      <p className="mt-4 text-gray-600 text-lg">
        Our AI-powered system helps you track food usage, reduce waste, and make smarter decisions.
        Get alerts before food expires, manage leftovers efficiently, and contribute to a more
        sustainable and eco-friendly future.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">

        <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full transition group-hover:bg-green-200">
          🤖 AI-Based Tracking
        </span>

        <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full transition group-hover:bg-green-200">
          ♻️ Waste Reduction
        </span>

        <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full transition group-hover:bg-green-200">
          🔔 Smart Alerts
        </span>

      </div>

    </section>
  </div>
</div>
    // <section className="max-w-4xl mx-auto px-6 py-10 text-center ">
    //   <h1 className="text-4xl font-bold transition-all duration-500 hover:-translate-y-2 hover:text-emerald-600">
    //     About AI Food Waste Manager
    //   </h1>
    //   {/* Description */}
    //   <p className="mt-4 text-gray-600 text-lg">
    //     Our AI-powered system helps you track food usage, reduce waste, and make smarter decisions.
    //     Get alerts before food expires, manage leftovers efficiently, and contribute to a more
    //     sustainable and eco-friendly future.
    //   </p>
    //   <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">

    //     <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full hover:bg-green-200 transition">
    //       🤖 AI-Based Tracking
    //     </span>

    //     <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full hover:bg-green-200 transition">
    //       ♻️ Waste Reduction
    //     </span>

    //     <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full hover:bg-green-200 transition">
    //       🔔 Smart Alerts
    //     </span>

    //   </div>

    // </section>
  );
}