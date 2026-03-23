import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  Download,
  Share2,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Carousel, ConfigProvider, message } from "antd";
import { useGetTicketDataQuery } from "../../services/attendeeApi";
import { toPng } from "html-to-image";

const TicketDownload = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const fullPageRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [cleanCoverUrl, setCleanCoverUrl] = useState(null);

  const eventId = searchParams.get("eventId");
  const tag = searchParams.get("tag");

  const { data: response, isLoading } = useGetTicketDataQuery(
    { eventId, tag },
    { skip: !eventId || !tag },
  );

  const event = response?.event;
  const attendees = response?.attendees || [];

  // CORS fix for the image download
  useEffect(() => {
    const processImage = async () => {
      if (event?.cover?.url) {
        try {
          const res = await fetch(event.cover.url, { mode: "cors" });
          const blob = await res.blob();
          const reader = new FileReader();
          reader.onloadend = () => setCleanCoverUrl(reader.result);
          reader.readAsDataURL(blob);
        } catch (err) {
          setCleanCoverUrl(event.cover.url);
        }
      }
    };
    processImage();
  }, [event]);

  const handleDownloadFullPage = async () => {
    if (!fullPageRef.current) return;
    try {
      setIsDownloading(true);
      await new Promise((r) => setTimeout(r, 400));
      const dataUrl = await toPng(fullPageRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#1a0b3b",
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `WavePass-${attendees[currentSlide].fullname}.png`;
      link.click();
    } catch (err) {
      message.error("Download failed");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = (attendee) => {
    // Basic share logic placeholder to keep the onClick happy
    message.info(`Sharing ticket for ${attendee.fullname}`);
  };

  if (isLoading)
    return (
      <div className="min-h-screen w-full bg-[#1a0b3b] flex items-center justify-center">
        <Loader2 className="text-white animate-spin" size={40} />
      </div>
    );

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#241B7A" } }}>
      <div
        ref={fullPageRef}
        className="min-h-screen w-full bg-[#1a0b3b] bg-opacity-95 flex flex-col items-center justify-start md:justify-center p-4 md:p-8 relative overflow-x-hidden overflow-y-auto"
      >
        {/* Background */}
        <div
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center blur-md"
          style={{ backgroundImage: `url('${event?.cover?.url}')` }}
        />

        {/* Top Nav - X REMOVED */}
        <div className="w-full max-w-5xl flex items-center justify-between z-20 mb-6 md:absolute md:top-8 md:px-8">
          <div className="bg-white rounded-xl px-3 py-2 flex items-center gap-2 shadow-2xl border border-white/20">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-[#241B7A] rounded-lg flex items-center justify-center text-white font-black text-[8px] md:text-[10px]">
              WP
            </div>
            <span className="text-[#241B7A] font-extrabold text-xs md:text-sm tracking-tight">
              Wave Pass
            </span>
          </div>
          <button
            onClick={() => handleShare(attendees[currentSlide])}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2.5 md:p-3 rounded-full text-white border border-white/10"
          >
            <Share2 size={18} />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative z-10 w-full max-w-5xl flex items-center justify-center gap-2 md:gap-6">
          {attendees.length > 1 && (
            <button
              onClick={() => carouselRef.current.prev()}
              className="hidden md:flex shrink-0 w-12 h-12 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-[#241B7A] transition-all shadow-xl backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="w-full">
            {attendees.length > 1 && (
              <div className="flex justify-center mb-4 md:mb-6">
                <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black tracking-[0.2em] border border-white/10 uppercase">
                  Ticket {currentSlide + 1} of {attendees.length}
                </span>
              </div>
            )}

            <Carousel
              ref={carouselRef}
              infinite={false}
              slidesToShow={1}
              afterChange={(current) => setCurrentSlide(current)}
              dots={{ className: "custom-visible-dots" }}
              className="ticket-carousel"
            >
              {attendees.map((attendee) => (
                <div
                  key={attendee._id}
                  className="outline-none py-2 px-1 md:px-4"
                >
                  <div className="relative w-full p-2 rounded-[30px] md:rounded-[40px] bg-linear-to-r from-red-500 via-purple-500 via-yellow-400 to-green-400 shadow-2xl">
                    <div className="bg-white rounded-[28px] md:rounded-[38px] overflow-hidden flex flex-col md:flex-row">
                      <div className="relative w-full md:w-[42%] h-57.5 md:h-100 shrink-0 border-b md:border-b-0 md:border-r border-gray-100">
                        <img
                          src={cleanCoverUrl || event?.cover?.url}
                          alt="Event"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-5 md:bottom-8 md:left-8 text-white pr-4">
                          <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                            <span className="text-[8px] md:text-[10px] font-bold uppercase opacity-60 tracking-widest">
                              Attendee
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          </div>
                          <h4 className="text-sm md:text-lg font-bold truncate uppercase">
                            {attendee.fullname}
                          </h4>
                          <p className="text-[9px] md:text-[11px] opacity-70 truncate">
                            {attendee.email}
                          </p>
                        </div>
                      </div>

                      {/* Content side */}
                      <div className="w-full md:w-[58%] p-6 md:p-10 flex flex-col justify-between bg-white">
                        <div>
                          <h1 className="text-lg md:text-2xl font-black text-gray-900 leading-tight mb-2 md:mb-3 uppercase line-clamp-2">
                            {event?.title}
                          </h1>
                          <p className="text-gray-400 text-[10px] md:text-sm italic mb-5">
                            "{event?.description}"
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3 text-gray-700">
                              <MapPin
                                size={16}
                                className="text-[#241B7A] shrink-0 mt-0.5"
                              />
                              <span className="text-[10px] md:text-xs font-bold uppercase">
                                {event?.location}
                              </span>
                            </div>
                            <div className="flex gap-4">
                              <div className="flex items-center gap-3 text-gray-700">
                                <Calendar
                                  size={16}
                                  className="text-[#241B7A]"
                                />
                                <span className="text-[10px] md:text-xs font-bold uppercase">
                                  {new Date(event?.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-gray-700">
                                <Clock size={16} className="text-[#241B7A]" />
                                <span className="text-[10px] md:text-xs font-bold uppercase">
                                  WAT
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                          <div>
                            <span className="text-[8px] font-black text-gray-400 uppercase">
                              Ticket ID
                            </span>
                            <p className="text-lg md:text-2xl font-black text-[#241B7A]">
                              {attendee.code}
                            </p>
                          </div>
                          <button
                            onClick={handleDownloadFullPage}
                            disabled={isDownloading}
                            className="bg-[#241B7A] text-white px-4 md:px-8 py-3 rounded-xl font-bold text-[10px] md:text-xs flex items-center gap-2 shadow-xl"
                          >
                            {isDownloading ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Download size={16} />
                            )}
                            <span>
                              {isDownloading ? "Saving..." : "Download"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {attendees.length > 1 && (
            <button
              onClick={() => carouselRef.current.next()}
              className="hidden md:flex shrink-0 w-12 h-12 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-[#241B7A] transition-all shadow-xl backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
          .custom-visible-dots { bottom: -35px !important; display: flex !important; justify-content: center; gap: 10px; }
          .custom-visible-dots li button { background: white !important; opacity: 0.2; height: 8px !important; width: 8px !important; border-radius: 50% !important; }
          .custom-visible-dots li.slick-active button { background: #4ade80 !important; opacity: 1 !important; width: 24px !important; border-radius: 10px !important; }
        `,
          }}
        />
      </div>
    </ConfigProvider>
  );
};

export default TicketDownload;
