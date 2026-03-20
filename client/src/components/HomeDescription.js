export default function HomeDescription() {
    return (
      <section className="max-w-4xl mx-auto px-6 py-10 text-center">
        
        {/* Heading */}
        {/* <h1 className="text-2xl md:text-4xl font-bold text-gray-800 animate-sliderLR">
          Smart Food Waste Management with AI
        </h1> */}
        {/* <h1 className="text-3xl md:text-4xl font-bold text-gray-800 transition-all duration-300 hover:-translate-y-2 hover:scale-105">
  Smart Food Waste Management with AI
</h1> */}
 <h1 className="text-4xl font-bold transition-all duration-500 hover:-translate-y-2 hover:text-emerald-600">
  About AI Food Waste Manager
</h1>
  
        {/* Description */}
        <p className="mt-4 text-gray-600 text-lg">
          Our AI-powered system helps you track food usage, reduce waste, and make smarter decisions.
          Get alerts before food expires, manage leftovers efficiently, and contribute to a more
          sustainable and eco-friendly future.
        </p>
  
        {/* Highlight Points */}
        {/* <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
            AI Tracking
          </span>
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
            Waste Reduction
          </span>
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
            Smart Alerts
          </span>
        </div> */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">

<span className="bg-green-100 text-green-700 px-5 py-2 rounded-full hover:bg-green-200 transition">
  🤖 AI-Based Tracking
</span>

<span className="bg-green-100 text-green-700 px-5 py-2 rounded-full hover:bg-green-200 transition">
  ♻️ Waste Reduction
</span>

<span className="bg-green-100 text-green-700 px-5 py-2 rounded-full hover:bg-green-200 transition">
  🔔 Smart Alerts
</span>

</div>
  
      </section>
    );
  }