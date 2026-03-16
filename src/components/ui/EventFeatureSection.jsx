import React from "react";
import { Ticket, CalendarCheck, LayoutPanelLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventFeatureSection = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white py-12 px-4 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="bg-[#F8F9FB] rounded-4xl p-4.5 md:p-8 py-4 md:py-6 flex flex-col justify-between border border-gray-50">
          <div>
            <div className="rounded-3xl overflow-hidden mb-8">
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"
                alt="Concert Event"
                className="w-full h-70 object-cover"
              />
            </div>
            <h2 className="text-lg md:text-3xl font-bold text-[#1E1E1E] leading-tight mb-8">
              Everything You Need to Create, Manage, and Attend Events
            </h2>
          </div>

          <button
            onClick={() => navigate("/auth")}
            className="bg-[#241B7A] text-white px-8 py-3.5 rounded-xl font-semibold text-sm w-fit hover:bg-[#1a145e] transition-all"
          >
            Create event
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#F8F9FB] rounded-4xl p-8 flex flex-col justify-center flex-1 border border-gray-50">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-10 shadow-sm">
              <Ticket className="text-black" size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Simple Ticketing System
            </h3>
            <p className="text-gray-500 text-sm">
              Simple Ticketing System with Purchase Confirmation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            <div className="bg-[#F8F9FB] rounded-4xl p-8 flex flex-col border border-gray-50">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-10 shadow-sm">
                <CalendarCheck className="text-black" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Effortless Event Creation
              </h3>
              <p className="text-gray-400 text-[13px] leading-relaxed">
                Effortless event creation and management for event organizers
              </p>
            </div>

            <div className="bg-[#F8F9FB] rounded-4xl p-8 flex flex-col border border-gray-50">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-10 shadow-sm">
                <LayoutPanelLeft className="text-black" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Streamlined Event Listings
              </h3>
              <p className="text-gray-400 text-[13px] leading-relaxed">
                Streamline event listings for attendees / invitees
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFeatureSection;
