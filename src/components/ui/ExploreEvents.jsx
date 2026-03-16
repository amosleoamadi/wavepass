import React, { useState, useMemo, useEffect } from "react";
import lineThrough from "../../assets/public/purple-line.png";
import {
  MapPin,
  Calendar,
  Share2,
  Filter,
  ChevronLeft,
  ChevronRight,
  SearchX,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExploreEvents = () => {
  const [activeCategory, setActiveCategory] = useState("Trending Events");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  const CARD_WIDTH_DESKTOP = 300;
  const GAP = 24;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    "Trending Events",
    "Events in Lagos",
    "Online Events",
    "Music Event",
    "Tech Event",
  ];

  const eventData = [
    {
      id: 1,
      category: "Trending Events",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80",
      date: "February 14th, 2026",
      title: "AJEMA AWARDS: CONVERGENCE...",
      location: "Eko Hotel and Suites, Lagos, Nigeria",
      price: "₦20,000",
    },
    {
      id: 2,
      category: "Events in Lagos",
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=500&q=80",
      date: "October 24th, 2026",
      title: "ACYM: Ajegunle City Youth Marath...",
      location: "Maracana stadium, Lagos, Nigeria",
      price: "₦3,000",
    },
    {
      id: 3,
      category: "Trending Events",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
      date: "October 24th, 2026",
      title: "LLF 8th Edition: Festival of Love U...",
      location: "Sail Habour Resort, Badagry, Nigeria",
      price: "₦270,000",
    },
    {
      id: 4,
      category: "Trending Events",
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=500&q=80",
      date: "February 14th, 2026",
      title: "AJEMA AWARDS...",
      location: "Eko Hotel and S...",
      price: "Free",
    },
    {
      id: 5,
      category: "Trending Events",
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=500&q=80",
      date: "March 12th, 2026",
      title: "Sample Event 5",
      location: "Lagos, Nigeria",
      price: "₦5,000",
    },
    {
      id: 6,
      category: "Trending Events",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
      date: "April 10th, 2026",
      title: "Sample Event 6",
      location: "Lagos, Nigeria",
      price: "₦15,000",
    },
  ];

  const filteredEvents = useMemo(() => {
    if (activeCategory === "Trending Events") return eventData;
    return eventData.filter((event) => event.category === activeCategory);
  }, [activeCategory]);

  const isMobile = windowWidth < 768;
  const visibleItems = isMobile ? 1 : 4;
  const maxIndex = Math.max(0, filteredEvents.length - visibleItems);

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [filteredEvents, maxIndex]);

  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="w-full bg-[#FBFCFF] py-8 md:py-12 px-4 md:px-16 font-sans overflow-hidden">
      <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
        <div className="relative inline-block">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E]">
            Explore Events
          </h2>
          <img
            src={lineThrough}
            alt=""
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[110%] object-contain"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-8 border-b border-gray-100">
        <div className="flex flex-nowrap gap-6 md:gap-10 overflow-x-auto w-full no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
              className={`whitespace-nowrap pb-4 text-sm font-semibold relative shrink-0 transition-colors ${
                activeCategory === cat ? "text-[#241B7A]" : "text-gray-400"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#241B7A]"></span>
              )}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 pb-3 shrink-0">
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
            <Filter size={18} />
          </button>
          <button
            onClick={() => navigate("/discover")}
            className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold hover:shadow-md transition-all"
          >
            View All
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative mb-12">
        {filteredEvents.length > 0 ? (
          <div className="overflow-visible">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                gap: `${isMobile ? 16 : GAP}px`,
                transform: `translateX(calc(-${currentIndex} * (${isMobile ? "85%" : `${CARD_WIDTH_DESKTOP}px`} + ${isMobile ? 16 : GAP}px)))`,
              }}
            >
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  style={{
                    width: isMobile ? "85%" : `${CARD_WIDTH_DESKTOP}px`,
                  }}
                  className="shrink-0 bg-white rounded-2xl p-2.5 md:p-3 border border-gray-100 shadow-sm group"
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-xl mb-3">
                    <img
                      src={event.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <button className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm">
                      <Share2 size={14} className="text-[#241B7A]" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#241B7A]">
                      <Calendar size={12} strokeWidth={2.5} />
                      <span className="text-[9px] md:text-[11px] font-bold uppercase">
                        {event.date}
                      </span>
                    </div>
                    <h3 className="font-bold text-[13px] md:text-[13px] text-gray-900 h-9 md:h-10 line-clamp-2 leading-tight">
                      {event.title}
                    </h3>
                    <div className="flex items-start gap-1 text-gray-500 pb-2">
                      <MapPin size={12} className="shrink-0 mt-0.5" />
                      <p className="text-[10px] md:text-[12px] truncate">
                        {event.location}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <span className="text-sm md:text-lg font-bold text-[#241B7A]">
                        {event.price}
                      </span>
                      <button className="bg-[#241B7A] text-white px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[9px] md:text-xs font-bold active:scale-95 transition-all">
                        Get Ticket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center bg-white border border-gray-100 rounded-[2.5rem] text-center px-4">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
              <SearchX size={32} className="text-[#241B7A] opacity-40" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No events found</h3>
            <p className="text-gray-400 text-sm mt-2 mb-6 max-w-62.5">
              We couldn't find any events in "{activeCategory}" at the moment.
            </p>
            <button
              onClick={() => {
                setActiveCategory("Trending Events");
                setCurrentIndex(0);
              }}
              className="flex items-center gap-2 bg-[#241B7A] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#1a145e] transition-all active:scale-95 shadow-md shadow-indigo-100"
            >
              <ChevronLeft size={18} />
              Go Back to Trending
            </button>
          </div>
        )}
      </div>

      {filteredEvents.length > visibleItems && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2.5 md:p-3 bg-white border rounded-full transition-all ${currentIndex === 0 ? "opacity-20" : "hover:border-[#241B7A] text-[#241B7A]"}`}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-1.5">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-6 bg-[#241B7A]" : "w-1.5 bg-gray-200"}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`p-2.5 md:p-3 bg-white border rounded-full transition-all ${currentIndex >= maxIndex ? "opacity-20" : "hover:border-[#241B7A] text-[#241B7A]"}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreEvents;
