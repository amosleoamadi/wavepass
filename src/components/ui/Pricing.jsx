import React from "react";
import lineThrough from "../../assets/public/purple-line.png";

const PricingComponent = () => {
  const plans = [
    {
      title: "Basic Plan",
      description: "Perfect for small events or those just getting started.",
      priceLabel: "Free Event",
      icon: (
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      features: [
        "Event Creation: 1 event at a time",
        "Unlimited events",
        "Basic Event Listing",
        "No fee on free events",
        "Social Sharing tools",
        "Check in analytics",
        "Ticket Inventory management",
      ],
      isPro: false,
    },
    {
      title: "Pro Plan",
      description: "Perfect for small events or those just getting started.",
      priceLabel: "Paid Event",
      icon: (
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
          />
        </svg>
      ),
      features: [
        "Event Creation: 1 event at a time",
        "Ticket Sales: Unlimited events",
        "Premium Event Listing",
        "4% + 100 per paid ticket",
        "Social Sharing tools",
        "Check in analytics",
        "Secure Payment processing",
        "Ticket Inventory management",
      ],
      isPro: true,
    },
  ];

  return (
    <div className="w-full bg-white py-12 md:py-14">
      <section className="max-w-7xl mx-auto px-6 font-['Inter',sans-serif]">
        <div className="text-center mb-20">
          <div className="inline-block relative">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              Wave Pass Simple Pricing
            </h2>
            <img
              src={lineThrough}
              alt=""
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[110%] object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 transition-all duration-300 border-2 ${
                plan.isPro
                  ? "border-[#27187E] bg-[#F5F4FC]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {plan.title}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm mb-4 leading-relaxed">
                {plan.description}
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-300 text-indigo-700 bg-white text-[11px] font-semibold mb-6 shadow-sm">
                {plan.icon}
                {plan.priceLabel}
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[#323232] font-semibold text-[13px] md:text-sm"
                  >
                    <span className="mt-2 w-1 h-1 rounded-full bg-gray-400 shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PricingComponent;
