import React, { useState } from "react";
import { RiDoubleQuotesL } from "react-icons/ri";

const testimonials = [
  {
    id: 1,
    name: "Raphael & Chioma",
    role: "Wedding Organisers",
    quote:
      "Wave Pass made organizing our wedding so easy! From setting up the event to managing ticket sales, everything was straightforward and seamless. Our guests loved the easy ticket purchase process and the event details right at their fingertips!",
    rating: 5,
    userCount: "500+",
    image:
      "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Corporate Event Planner",
    quote:
      "The real-time analytics provided by Wave Pass changed how we handle our tech conferences. Being able to track ticket check-ins instantly and manage guest lists on the fly has saved our team dozens of hours of manual work.",
    rating: 5,
    userCount: "1.2k+",
    image:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Music Festival Director",
    quote:
      "Scaling a festival to 5,000+ attendees used to be a nightmare for entry management. Wave Pass handled the volume effortlessly. The scanning system is incredibly fast, and we had zero issues with ticket fraud this year.",
    rating: 5,
    userCount: "5k+",
    image:
      "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 4,
    name: "Elena & David",
    role: "Gallery Curators",
    quote:
      "Our exhibition openings are usually quite hectic, but the ticketing flow through Wave Pass kept everything elegant and organized. The interface is beautiful, matching the aesthetic we strive for in our gallery.",
    rating: 5,
    userCount: "300+",
    image:
      "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const ClientTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const isOutOfData = false;

  const current = testimonials[activeIndex];

  return (
    <div className="w-full bg-linear-to-bl from-[#ECE9FF] via-white to-white py-16 md:py-24">
      <section className="max-w-7xl mx-auto px-6 font-sans">
        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-16">
          What Our Users Say About Us
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
          <div className="w-full md:w-1/2">
            <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden rounded-3xl shadow-xl bg-white transition-all duration-500">
              <img
                key={current.id}
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <RiDoubleQuotesL />
            <p className="text-black text-lg md:text-[18px] leading-relaxed min-h-35 font-['Inter'] sans-serif">
              {current.quote}
            </p>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-bold text-xl text-indigo-950">
                {current.name}
                <span className="text-gray-400 font-normal text-base ml-3 border-l pl-3 border-gray-200">
                  {current.role}
                </span>
              </h4>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-sm"
                    src={`https://i.pravatar.cc/100?img=${activeIndex * 2 + i + 10}`}
                    alt="user profile"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">
                  {current.userCount} Happy Users
                </span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              disabled={isOutOfData}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-10 bg-indigo-900 shadow-md shadow-indigo-200"
                  : "w-2 bg-gray-200 hover:bg-gray-300"
              } ${isOutOfData ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClientTestimonials;
