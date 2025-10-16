import { useState } from "react";

const faqData = [
  {
    question: "How much does it cost?",
    answer:
      "As a startup focused on affordability, our pricing is 60-70% lower than traditional agencies! Websites start from ₹25,000-₹1,50,000 and mobile apps from ₹50,000-₹2,50,000. We believe quality development shouldn't break the bank, especially for students and fellow startups.",
  },
  {
    question: "Do you offer student discounts?",
    answer:
      "Yes, special student discounts are available. Please contact us with your student ID to get a customized quote.",
  },
  {
    question: "Can you meet tight deadlines?",
    answer:
      "We pride ourselves on delivering projects on schedule. Accelerated timelines can be discussed based on project scope.",
  },
  {
    question: "What payment options do you have?",
    answer:
      "We accept all major credit/debit cards, UPI payments, and bank transfers. Flexible payment plans are available.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main id="faq" className="min-h-0.5vh p-6">
      <h1 className="text-[50px] font-semibold text-gray-300 mb-8 text-center pt-8">
        Everything Explained
      </h1>
      
      <div className="flex items-center justify-center flex-1">
        <section className="max-w-6xl w-full rounded-xl drop-shadow-xl flex flex-col md:flex-row gap-6 md:items-center">
        {/* Left Accordion */}
        <div className="md:w-1/3 p-6 space-y-3 ">

          {faqData.map((item, i) => (
            <button
              key={item.question}
              className={`w-full text-left px-4 py-3 rounded-md focus:outline-none flex justify-between items-center transition-all ${
                activeIndex === i
                  ? "text-white shadow-[inset_-4px_-4px_16px_rgba(255,255,255,0.1)] bg-white/2 border border-white/10 border-1"
                  : "text-gray-400 shadow-[inset_-4px_-4px_16px_rgba(255,255,255,0.1)] bg-white/2 border border-white/10 border-1 hover: hover:text-white"
              }`}
              aria-expanded={activeIndex === i}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setActiveIndex(i)}
            >
              <span>{item.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  activeIndex === i ? "rotate-90" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {/* Right Answer Panel */}
        <div
          id={`faq-panel-${activeIndex}`}
          className="md:w-2/3 h-[240px] shadow-[inset_-4px_-4px_16px_rgba(255,255,255,0.1)] bg-white/2 border border-white/10 border-1 rounded-2xl p-8 text-gray-200 flex items-center justify-center"
          role="region"
          aria-live="polite"
        >
          <p className="text-lg leading-relaxed text-center">{faqData[activeIndex].answer}</p>
        </div>
      </section>
      </div>
    </main>
  );
}
