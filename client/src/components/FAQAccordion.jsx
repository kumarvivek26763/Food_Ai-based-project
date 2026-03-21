import { useState } from "react";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is AI Food Waste Management System?",
      answer:
        "It is an AI-based system that predicts food demand, tracks waste, and helps reduce excess food efficiently.",
    },
    {
      question: "How does the AI model work?",
      answer:
        "We use a Random Forest Regressor to predict food quantity based on student data.",
    },
    {
      question: "How does the system reduce food waste?",
      answer:
        "It tracks prepared vs consumed food and alerts when extra food is available.",
    },
    {
      question: "Does the system provide alerts?",
      answer:
        "Yes, it gives real-time alerts before food expires.",
    },
    {
      question: "Can it connect with NGOs?",
      answer:
        "Yes, it helps connect with nearby NGOs using location services.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div  id="faq" className="bg-white py-12 px-4 rounded-lg mt-10">
      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl"
            >

              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-gray-800"
              >
                {faq.question}

                {/* Arrow icon */}
                <span
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-green-600" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-40 opacity-100 py-2" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 text-gray-600">
                  {faq.answer}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}