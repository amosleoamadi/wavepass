import React from "react";
import { useNavigate } from "react-router-dom";
import lineThrough from "../../assets/public/purple-line.png";
import {
  SearchX,
  ArrowRight,
  Loader2,
  MapPin,
  Calendar,
  Clock,
  Share2,
  Ticket,
} from "lucide-react";
import { useGetEventsQuery } from "../../services/attendeeApi";

const SimilarEventsSkeleton = () => (
  <div className="flex overflow-x-auto gap-6 no-scrollbar lg:grid lg:grid-cols-3 lg:overflow-x-visible animate-pulse">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="flex-none w-[85%] sm:w-[45%] lg:w-auto bg-gray-50 rounded-2xl border border-gray-100 p-4 flex flex-col"
      >
        <div className="relative aspect-[1.33/1] rounded-xl bg-gray-200 mb-4" />

        <div className="flex items-center gap-2 mb-3">
          <div className="bg-gray-200 h-3 w-24 rounded" />
          <div className="bg-gray-200 h-3 w-16 rounded" />
        </div>

        <div className="space-y-2 mb-4">
          <div className="bg-gray-200 h-4 w-full rounded" />
          <div className="bg-gray-200 h-4 w-2/3 rounded" />
        </div>

        <div className="bg-gray-100 h-3 w-1/2 rounded mb-6" />

        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
          <div className="bg-gray-200 h-6 w-16 rounded" />
          <div className="bg-gray-200 h-10 w-28 rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);

const SimilarEvents = ({ category, currentEventId }) => {
  const navigate = useNavigate();

  const { data: response, isLoading } = useGetEventsQuery({
    category: category,
    pageSize: 4,
  });

  const similarEvents =
    response?.data?.events
      ?.filter((event) => event._id !== currentEventId)
      .slice(0, 3) || [];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="w-full bg-[#FBFCFF] py-12 lg:py-20 border-t border-gray-50 mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="relative inline-block">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1E1E1E]">
              Similar Events
            </h2>
            <img
              src={lineThrough}
              alt=""
              className="absolute -bottom-4 left-0 w-full"
            />
          </div>
        </div>

        {isLoading ? (
          <SimilarEventsSkeleton />
        ) : similarEvents.length > 0 ? (
          <div className="flex overflow-x-auto gap-6 no-scrollbar lg:grid lg:grid-cols-3 lg:overflow-x-visible">
            {similarEvents.map((event) => (
              <div
                key={event._id}
                onClick={() => {
                  navigate(`/events/${event._id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex-none w-[85%] sm:w-[45%] lg:w-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="relative aspect-5/3 rounded-xl overflow-hidden mb-4">
                  <img
                    src={event.cover?.url}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt=""
                  />
                  <button className="absolute bottom-3 right-3 bg-white/90 p-2 rounded-full text-[#241B7A] shadow-md">
                    <Share2 size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[#4F46E5] mb-2 font-bold text-[10px] uppercase">
                  <Calendar size={13} /> <span>{formatDate(event.date)}</span>
                  <span className="text-gray-300">•</span>
                  <Clock size={13} /> <span>{event.time || "10:00 AM"}</span>
                </div>

                <h3 className="font-extrabold text-[15px] text-gray-900 mb-2 uppercase leading-tight line-clamp-2 min-h-9">
                  {event.title}
                </h3>

                <div className="flex items-start gap-1 text-gray-400 mb-5 text-[11px] font-medium">
                  <MapPin size={14} className="shrink-0 mt-0.5" />
                  <span className="truncate">{event.location}</span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="text-lg font-bold text-[#241B7A]">
                    {event.price === 0
                      ? "Free"
                      : `₦${event.price.toLocaleString()}`}
                  </span>
                  <button className="bg-[#241B7A] text-white px-5 py-2.5 rounded-lg text-xs font-bold active:scale-95 transition-transform">
                    <Ticket size={14} className="inline mr-1" /> Get Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <SearchX size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium mb-4">
              No other {category} events available right now.
            </p>
            <button
              onClick={() => navigate("/discover")}
              className="flex items-center gap-2 text-[#241B7A] text-sm font-bold hover:underline"
            >
              Discover other events <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarEvents;
