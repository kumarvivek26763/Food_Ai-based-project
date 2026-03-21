export default function Ngocard() {
  const ngos = [
    {
      name: "Helping Hands NGO",
      desc: "Providing food and support to underprivileged communities daily.",
      img: "https://content.jdmagicbox.com/v2/comp/noida/v3/011pxx11.xx11.230215104510.u2v3/catalogue/aapke-saath-foundation-noida-sector-2-noida-ngos-89a85zdt33.jpg",
    },
    {
      name: "Food Care Foundation",
      desc: "Connecting donors with NGOs to reduce food waste effectively.",
      img: "https://content.jdmagicbox.com/comp/meerut/y9/9999px121.x121.190823115932.v2y9/catalogue/zariya-a-helping-hand-nauchandi-meerut-ngos-hrbvkt3zug.jpg",
    },
    {
      name: "Hope for Hunger",
      desc: "Ensuring no one sleeps hungry through smart food distribution.",
      img: "https://plus.unsplash.com/premium_photo-1769871776035-7e558c4bdf34?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="bg-gray-100 py-10 px-4 mt-5 rounded-2xl border border-slate-200 shadow-sm backdrop-blur">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Nearest NGOs
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {ngos.map((ngo, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden 
              transition-all duration-300 transform hover:-translate-y-3 hover:shadow-xl"
            >
              {/* Image */}
              <img
                src={ngo.img}
                alt={ngo.name}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {ngo.name}
                </h3>

                <p className="text-gray-600 text-sm">
                  {ngo.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}