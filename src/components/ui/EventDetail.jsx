import React from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Share2,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventDetail = ({ event }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    if (!dateString) return "Date TBD";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "10:00 am WAT";
    return (
      new Date(timeString)
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase() + " WAT"
    );
  };
  const slugify = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };
  const formatDateToDMY = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!event) return null;

  return (
    <div className="max-w-[92%] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start h-full">
      <div className="flex flex-col gap-4">
        <div className="relative p-1 bg-linear-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl">
          <div className="bg-white rounded-[13px] overflow-hidden aspect-video lg:aspect-5/3">
            <img
              src={event.cover?.url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <button
          onClick={() =>
            navigate(`/event-ticket/${slugify(event.title)}`, {
              state: { id: event._id },
            })
          }
          className="w-full bg-[#241B7A] hover:bg-[#1a135d] text-white font-bold py-6 rounded-xl transition-all active:scale-[0.98] text-sm cursor-pointer"
        >
          {event.price === 0
            ? "Get a Ticket"
            : `Get Ticket - ₦${event.price.toLocaleString()}`}
        </button>

        <div className="mt-2 px-1">
          <h3 className="font-bold text-gray-900 text-[11px] mb-3 uppercase tracking-tight">
            Follow us on our socials
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-gray-400">
              <a
                href={event.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#241B7A] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={event.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#241B7A] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={event.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#241B7A] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={event.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#241B7A] transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <span className="font-bold text-lg leading-none cursor-pointer hover:text-[#241B7A]">
                𝕏
              </span>
            </div>

            <div
              className="flex flex-col items-center gap-0.5 text-gray-400 cursor-pointer hover:text-[#241B7A]"
              onClick={() =>
                navigator.share?.({
                  title: event.title,
                  url: window.location.href,
                })
              }
            >
              <Share2 className="w-5 h-5" />
              <span className="text-[9px] font-bold uppercase">Share</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-1">
        <header className="mb-4">
          <h1 className="text-base lg:text-3xl font-bold text-[#241B7A] leading-tight uppercase tracking-tight mb-1">
            {event.title}
          </h1>
          <p className="text-[14px] lg:text-lg font-bold text-gray-800">
            {event.category || "Inspiring the next generation"}
          </p>
        </header>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-gray-500">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="text-[14px] font-medium">{event.location}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="text-[14px] font-medium">
              {formatDate(event.date)}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <Clock className="w-4 h-4 shrink-0" />
            <span className="text-[14px] font-medium">
              {formatTime(event.start)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-bold text-gray-900 text-sm">About this event</h2>
          <div className="text-gray-500 text-[12px] md:text-[14px] leading-relaxed space-y-3 text-justify">
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
