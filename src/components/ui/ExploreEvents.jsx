import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  SearchX,
  Calendar,
  ListFilter,
  Ticket,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { Dropdown, ConfigProvider, Skeleton } from "antd";
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
    pageNumber: isDiscoverPage ? currentIndex + 1 : 1,
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
      <div className="w-full bg-[#FBFCFF] py-10 md:py-16 font-sans">
        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center px-4">
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

        {/* Filters Wrapper */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 px-6">
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
              className="text-[#241B7A] font-bold text-xs uppercase flex items-center gap-1"
            >
              View More <ChevronRight size={14} />
            </button>
          )}
        </div>

        {/* Content Mask (This prevents bleeding to the right edge) */}
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          {isLoading ? (
            <div
              className={
                isDiscoverPage
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  : "flex gap-5"
              }
            >
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-xl border border-gray-100 p-4 w-full md:w-[360px] shrink-0"
                >
                  <Skeleton.Button
                    active
                    block
                    className="!h-40 !rounded-lg mb-4"
                  />
                  <Skeleton active paragraph={{ rows: 2 }} />
                </div>
              ))}
            </div>
          ) : isError ? (
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
          ) : eventData.length === 0 ? (
            <div className="py-16 text-center">
              <SearchX size={35} className="mx-auto mb-3 text-gray-200" />
              <h3 className="text-md font-bold text-gray-900">
                No matches found
              </h3>
            </div>
          ) : (
            <div
              className={
                isDiscoverPage
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  : "flex transition-transform duration-500 ease-out"
              }
              style={
                !isDiscoverPage
                  ? {
                      gap: "20px",
                      transform: `translateX(calc(-${currentIndex} * (${isMobile ? "100%" : "calc((100% - 40px) / 3)"} + 20px)))`,
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
                      ? { width: isMobile ? "100%" : "calc((100% - 40px) / 3)" }
                      : {}
                  }
                  className="shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm p-2.5 flex flex-col hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-2.5">
                    <img
                      src={event?.cover?.url}
                      className="w-full h-full object-cover"
                      alt=""
                    />
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
                      className="bg-[#241B7A] text-white px-3 py-1.5 rounded-md text-[11px] font-bold flex items-center gap-1.5"
                    >
                      <Ticket size={14} /> Get Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        {!isLoading && !isError && eventData.length > visibleItems && (
          <div className="flex justify-center items-center gap-4 mt-12 px-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full border transition-all ${currentIndex === 0 ? "opacity-20 cursor-not-allowed" : "text-[#241B7A] border-gray-200 hover:bg-white shadow-sm"}`}
            >
              <ChevronLeft size={20} />
            </button>
            {isDiscoverPage && (
              <span className="font-bold text-gray-400 text-[10px] uppercase tracking-widest">
                {currentIndex + 1} / {totalPages}
              </span>
            )}
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxPossibleIndex}
              className={`p-2 rounded-full border transition-all ${currentIndex >= maxPossibleIndex ? "opacity-20 cursor-not-allowed" : "text-[#241B7A] border-gray-200 hover:bg-white shadow-sm"}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </ConfigProvider>
  );
};

export default ExploreEvents;
