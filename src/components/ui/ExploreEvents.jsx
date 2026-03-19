import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  MapPin,
  Share2,
  ChevronLeft,
  ChevronRight,
  SearchX,
  Calendar,
  ListFilter,
  Ticket,
  ChevronDown,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Dropdown, ConfigProvider } from "antd";
import { useGetEventsQuery } from "../../services/attendeeApi";
import lineThrough from "../../assets/public/purple-line.png";

const slugify = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const formatDateToDMY = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const handleCopyEventLink = async (event, setCopiedKey, navigate) => {
  const eventLink = `${window.location.origin}/event/${slugify(event.title)}`;
  try {
    await navigator.clipboard.writeText(eventLink);
    setCopiedKey(event._id);
    setTimeout(() => setCopiedKey(null), 2000);
  } catch (err) {
    console.error("Failed to copy event link:", err);
  }
};

const ExploreEvents = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchKeyword = searchParams.get("search") || "";
  const isDiscoverPage = pathname === "/discover";

  const [activeCategory, setActiveCategory] = useState("All Events");
  const [priceFilter, setPriceFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory, priceFilter, dateFilter, searchKeyword]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getQueryDate = () => {
    const today = new Date();
    if (dateFilter === "today") return formatDateToDMY(today);
    if (dateFilter === "tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      return formatDateToDMY(tomorrow);
    }
    return "";
  };

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetEventsQuery({
    category: activeCategory === "All Events" ? "" : activeCategory,
    price: priceFilter,
    date: getQueryDate(),
    keyword: searchKeyword,
    pageNumber: currentIndex + 1,
    pageSize: isDiscoverPage ? 6 : 20,
  });

  const eventData = response?.data?.events || [];
  const totalEvents = response?.data?.totalEvents || 0;

  const isMobile = windowWidth < 768;
  const visibleItems = isMobile ? 1 : 3;
  const totalPages = Math.ceil(totalEvents / 6);

  const maxPossibleIndex = isDiscoverPage
    ? totalPages - 1
    : Math.max(0, eventData.length - visibleItems);

  const handleNext = () => {
    if (currentIndex < maxPossibleIndex) setCurrentIndex((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const categoryItems = [
    { key: "All Events", label: "All Events" },
    { key: "Music", label: "Music" },
    { key: "Tech", label: "Tech" },
  ];
  const priceItems = [
    { key: "", label: "Any Price" },
    { key: "free", label: "Free" },
    { key: "paid", label: "Paid" },
  ];
  const dateItems = [
    { key: "", label: "Any Time" },
    { key: "today", label: "Today" },
    { key: "tomorrow", label: "Tomorrow" },
  ];

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#241B7A", borderRadius: 8 } }}
    >
      <div className="w-full bg-[#FBFCFF] py-10 md:py-16 px-4 md:px-8 lg:px-16 font-sans overflow-hidden">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="relative inline-block">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E]">
              Explore Events
            </h2>
            <img
              src={lineThrough}
              alt=""
              className="absolute -bottom-3 left-0 w-full"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Dropdown
              menu={{
                items: categoryItems,
                onClick: ({ key }) => setActiveCategory(key),
              }}
              trigger={["click"]}
            >
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:border-[#241B7A]">
                <ListFilter size={14} /> {activeCategory}{" "}
                <ChevronDown size={12} />
              </button>
            </Dropdown>

            <Dropdown
              menu={{
                items: priceItems,
                onClick: ({ key }) => setPriceFilter(key),
              }}
              trigger={["click"]}
            >
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:border-[#241B7A]">
                {priceFilter ? priceFilter.toUpperCase() : "Price"}{" "}
                <ChevronDown size={12} />
              </button>
            </Dropdown>

            <Dropdown
              menu={{
                items: dateItems,
                onClick: ({ key }) => setDateFilter(key),
              }}
              trigger={["click"]}
            >
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:border-[#241B7A]">
                <Calendar size={14} />{" "}
                {dateFilter ? dateFilter.toUpperCase() : "Date"}{" "}
                <ChevronDown size={12} />
              </button>
            </Dropdown>

            {(searchKeyword || activeCategory !== "All Events") && (
              <button
                onClick={() => {
                  setActiveCategory("All Events");
                  navigate(pathname);
                }}
                className="text-[10px] text-red-500 font-bold uppercase ml-2 hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {!isDiscoverPage && (
            <button
              onClick={() => navigate("/discover")}
              className="text-[#241B7A] font-bold text-xs uppercase flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              View More <ChevronRight size={14} />
            </button>
          )}
        </div>

        <div className="max-w-7xl mx-auto relative min-h-62.5">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#FBFCFF]/50 z-10">
              <Loader2 className="w-8 h-8 animate-spin text-[#241B7A]" />
            </div>
          )}

          {isError && (
            <div className="py-12 text-center flex flex-col items-center">
              <AlertCircle size={30} className="text-red-400 mb-2" />
              <p className="text-gray-500 text-sm">
                Failed to load events.{" "}
                <button
                  onClick={() => refetch()}
                  className="text-[#241B7A] font-bold underline"
                >
                  Retry
                </button>
              </p>
            </div>
          )}

          {!isLoading && !isError && eventData.length === 0 && (
            <div className="py-16 text-center px-4">
              <SearchX size={35} className="mx-auto mb-3 text-gray-200" />
              <h3 className="text-md font-bold text-gray-900 mb-1">
                No matches found
              </h3>
              <p className="text-gray-400 text-xs max-w-xs mx-auto">
                {searchKeyword
                  ? `We couldn't find anything for "${searchKeyword}".`
                  : "No events found matching your current filters."}
              </p>
            </div>
          )}

          {!isError && eventData.length > 0 && (
            <div
              className={
                isDiscoverPage
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  : "overflow-visible"
              }
            >
              <div
                className={
                  isDiscoverPage
                    ? "contents"
                    : "flex transition-transform duration-500 ease-out"
                }
                style={
                  !isDiscoverPage
                    ? {
                        gap: "20px",
                        transform: `translateX(calc(-${currentIndex} * (${
                          isMobile ? "85%" : "340px"
                        } + 20px)))`,
                      }
                    : {}
                }
              >
                {eventData.map((event) => (
                  <div
                    key={event._id}
                    onClick={() =>
                      navigate(`/event/${slugify(event.title)}`, {
                        state: { id: event._id },
                      })
                    }
                    style={
                      !isDiscoverPage
                        ? { width: isMobile ? "85%" : "340px" }
                        : {}
                    }
                    className="shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm p-2.5 flex flex-col hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-2.5">
                      <img
                        src={event?.cover?.url}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      {/* <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyEventLink(event, setCopiedKey, navigate);
                        }}
                        className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-full text-[#241B7A] shadow-sm hover:bg-white"
                      >
                        <Share2 size={12} />
                      </button> */}
                    </div>

                    <div className="flex items-center gap-1.5 text-[#4F46E5] mb-1 font-bold text-[10px] uppercase">
                      <Calendar size={10} />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-GB")}
                      </span>
                    </div>

                    <h3 className="font-bold text-[14px] text-gray-900 mb-0.5 line-clamp-1 truncate uppercase">
                      {event.title}
                    </h3>

                    <div className="flex items-center gap-1 text-gray-400 mb-3 text-[11px]">
                      <MapPin size={12} className="shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
                      <span className="text-sm font-bold text-[#241B7A]">
                        {event.price === 0
                          ? "Free"
                          : `₦${event.price?.toLocaleString()}`}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/event-ticket/${slugify(event.title)}`, {
                            state: { id: event._id },
                          });
                        }}
                        className="bg-[#241B7A] text-white px-3 py-1.5 rounded-md text-[11px] font-bold flex items-center gap-1.5 hover:bg-[#1a145a]"
                      >
                        <Ticket size={14} /> Get Ticket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {!isError &&
          (isDiscoverPage
            ? totalPages > 1
            : eventData.length > visibleItems) && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`p-1.5 rounded-full border transition-all ${
                  currentIndex === 0
                    ? "opacity-20 cursor-not-allowed"
                    : "text-[#241B7A] border-gray-200 hover:bg-gray-50"
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-1.5">
                {isDiscoverPage ? (
                  <span className="font-bold text-gray-400 text-[10px] uppercase tracking-widest">
                    {currentIndex + 1} / {totalPages}
                  </span>
                ) : (
                  Array.from({ length: Math.min(maxPossibleIndex + 1, 5) }).map(
                    (_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          currentIndex === idx
                            ? "w-6 bg-[#241B7A]"
                            : "w-1.5 bg-gray-200"
                        }`}
                      />
                    ),
                  )
                )}
              </div>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxPossibleIndex}
                className={`p-1.5 rounded-full border transition-all ${
                  currentIndex >= maxPossibleIndex
                    ? "opacity-20 cursor-not-allowed"
                    : "text-[#241B7A] border-gray-200 hover:bg-gray-50"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
      </div>
    </ConfigProvider>
  );
};

export default ExploreEvents;
