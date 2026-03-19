import React from "react";
import { MapPin, Calendar, Clock, X, Download } from "lucide-react";

const TicketDownload = () => {
  // Mock data - in a real app, you'd get this from location.state or an API
  const ticketData = {
    title: "SHAPING AFRICA's DIGITAL FUTURE",
    subtitle: "Inspiring the next generation of tech talent",
    location: "Abayomi Hall, Orege, Olodi Apapa, Lagos",
    date: "July 2nd, 2026",
    time: "10:00 am WAT",
    ticketId: "TCA472",
    attendeeName: "Cynthia Chidera",
    attendeeEmail: "cynthiadymphna04@gmail.com",
    coverImage:
      "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop", // Replace with your event image
  };

  return (
    <div className="min-h-screen w-full bg-[#1a0b3b] bg-opacity-95 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Overlay (Optional: blurred concert background) */}
      <div
        className="absolute inset-0 z-0 opacity-30 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070')`,
        }}
      />

      {/* Header/Close Elements */}
      <div className="absolute top-6 left-6 z-10">
        <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
          <div className="w-8 h-8 bg-[#241B7A] rounded flex items-center justify-center text-white font-bold text-xs">
            WP
          </div>
          <span className="text-[#241B7A] font-bold text-sm">Wave Pass</span>
        </div>
      </div>

      <button className="absolute top-6 right-6 z-10 bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
        <X className="text-gray-600" size={20} />
      </button>

      {/* MAIN TICKET CONTAINER */}
      <div className="relative z-10 w-full max-w-4xl p-[2px] rounded-[30px] bg-gradient-to-r from-red-500 via-purple-500 to-green-400 shadow-[0_0_40px_rgba(139,92,246,0.3)]">
        <div className="bg-white rounded-[28px] overflow-hidden flex flex-col md:flex-row min-h-[380px]">
          {/* Left Side: Image & Attendee Overlay */}
          <div className="relative w-full md:w-[45%] h-64 md:h-auto">
            <img
              src={ticketData.coverImage}
              alt="Event"
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase opacity-70 tracking-widest">
                  Attendee
                </span>
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm font-bold">
                  {ticketData.attendeeName}
                </span>
              </div>
              <p className="text-[11px] opacity-80 ml-[68px]">
                {ticketData.attendeeEmail}
              </p>
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="w-full md:w-[55%] p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-black text-gray-900 leading-tight mb-2 tracking-tight">
                {ticketData.title}
              </h1>
              <p className="text-gray-500 text-sm font-medium mb-8">
                {ticketData.subtitle}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin
                    size={18}
                    className="text-[#241B7A] shrink-0 mt-0.5"
                  />
                  <span className="text-xs font-semibold leading-relaxed">
                    {ticketData.location}
                  </span>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar size={18} className="text-[#241B7A]" />
                    <span className="text-xs font-semibold">
                      {ticketData.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock size={18} className="text-[#241B7A]" />
                    <span className="text-xs font-semibold">
                      {ticketData.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-10 flex items-end justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Ticket ID
                </span>
                <p className="text-2xl font-black text-[#241B7A]">
                  {ticketData.ticketId}
                </p>
              </div>

              <button className="bg-[#241B7A] hover:bg-[#1a135d] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-blue-900/20">
                <Download size={16} />
                Download Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDownload;
