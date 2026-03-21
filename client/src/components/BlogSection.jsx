export default function BlogSection() {
  const blogs = [
    {
      title: "Reducing Food Waste with AI",
      desc: "AI helps track excess food and redistributes it efficiently to minimize waste and hunger.",
      img: "https://img.freepik.com/premium-vector/reducing-food-waste-with-ecofriendly-practices-fresh-produce-disposal_384379-11514.jpg",
    },
    {
      title: "Smart Food Donation System",
      desc: "Connecting donors, NGOs, and volunteers using real-time tracking and smart alerts.",
      img: "https://media.istockphoto.com/id/1317357918/photo/happy-multi-ethnic-volunteers-at-food-bank-preparing-for-charitable-food-drive.webp?a=1&b=1&s=612x612&w=0&k=20&c=m1mwqzYPpETkCbV1RgngCWLy02CLXVDHVM3IxPb8-s4=",
    },
    {
      title: "Towards Hunger-Free India",
      desc: "Using technology and AI predictions to ensure no one sleeps hungry in our society.",
      img: "https://fi-blog-admin.zomans.com/wp-content/uploads/2024/06/DSC_9726-1-scaled.jpg",
    },
  ];

  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
            Explore Our <span className="text-green-600">AI Impact</span>
          </h2>

          <button className="border border-green-500 text-green-600 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition">
            View all insights
          </button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {blogs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-3 hover:shadow-xl"
            >
              {/* Image */}
              <img
                src={item.img}
                alt="blog"
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}