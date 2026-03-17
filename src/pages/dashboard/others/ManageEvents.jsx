import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import empty from "../../../assets/Frame.png";
import { useNavigate } from "react-router-dom";
import { useGetOverviewDataQuery } from "../../../services/overview";

// Skeleton Components
const StatSkeleton = () => (
  <div className="border rounded-xl p-6 flex flex-col justify-between bg-gray-50 animate-pulse">
    <div className="flex items-start justify-between mb-3">
      <div className="w-8 h-8 bg-gray-200 rounded"></div>
    </div>
    <div>
      <div className="w-24 h-3 bg-gray-200 rounded mb-3"></div>
      <div className="w-20 h-8 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const TableRowSkeleton = () => (
  <tr className="border-b border-gray-200 animate-pulse">
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gray-200"></div>
        <div>
          <div className="w-32 h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    </td>
    <td className="py-4 px-4">
      <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
      <div className="w-16 h-3 bg-gray-200 rounded"></div>
    </td>
    <td className="py-4 px-4">
      <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
    </td>
    <td className="py-4 px-4">
      <div className="w-16 h-4 bg-gray-200 rounded"></div>
    </td>
    <td className="py-4 px-4">
      <div className="w-16 h-4 bg-gray-200 rounded"></div>
    </td>
  </tr>
);

const MobileCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 animate-pulse">
    {/* Top section */}
    <div className="flex gap-3 mb-4">
      <div className="w-16 h-16 rounded-lg bg-gray-200 shrink-0"></div>
      <div className="flex-1">
        <div className="w-3/4 h-5 bg-gray-200 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-200 rounded mb-2"></div>
        <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
      </div>
    </div>

    {/* Bottom section - Icons grid */}
    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-4 h-4 bg-gray-200 rounded mb-1"></div>
          <div className="w-16 h-3 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>

    {/* Button */}
    <div className="mt-3 pt-2">
      <div className="w-full h-8 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

// Mobile Event Card Component
const MobileEventCard = ({ event, onManage }) => {
  const getStatusColor = (status) => {
    const colors = {
      ongoing: "bg-green-100 text-green-700",
      draft: "bg-yellow-100 text-yellow-700",
      publish: "bg-blue-100 text-blue-700",
      past: "bg-red-100 text-red-700",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Format time
  const formatTime = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  // Get emoji based on event title or use default
  const getEventEmoji = (title) => {
    const emojiMap = {
      tech: "💻",
      summit: "🌍",
      wellness: "🌿",
      art: "🎨",
      design: "🎨",
      expo: "📦",
      conference: "💻",
      workshop: "🔧",
      seminar: "📚",
      networking: "🤝",
      social: "🎉",
      fundraiser: "💰",
      concert: "🎵",
      festival: "🎪",
      sports: "⚽",
      webinar: "🎥",
      exhibition: "🖼️",
    };

    const titleLower = title?.toLowerCase() || "";
    for (const [key, emoji] of Object.entries(emojiMap)) {
      if (titleLower.includes(key)) return emoji;
    }
    return "📅";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      {/* Top section - Image, Title, Location, Status */}
      <div className="flex gap-3 mb-4">
        {/* Image */}
        <div className="w-16 h-16 rounded-lg bg-linear-to-br from-purple-400 to-blue-400 shrink-0 flex items-center justify-center text-2xl overflow-hidden">
          {event.cover?.url ? (
            <img
              src={event.cover.url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{getEventEmoji(event.title)}</span>
          )}
        </div>

        {/* Title, Location, Status */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base mb-2">
            {event.title}
          </h3>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <FiMapPin className="w-3 h-3 mr-1 shrink-0" />
            <span className="truncate">{event.location || "No location"}</span>
          </div>
          <div>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}
            >
              {event.status === "publish"
                ? "PUBLISHED"
                : event.status?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom section - Icons above content in a row */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
        {/* Date */}
        <div className="flex flex-col items-center text-center">
          <FiCalendar className="w-4 h-4 text-gray-500 mb-1" />
          <span className="text-xs text-gray-700 font-medium">
            {formatDate(event.date)}
          </span>
        </div>

        {/* Time */}
        <div className="flex flex-col items-center text-center">
          <FiClock className="w-4 h-4 text-gray-500 mb-1" />
          <span className="text-xs text-gray-700 font-medium">
            {formatTime(event.start)}
          </span>
        </div>

        {/* Tickets Sold */}
        <div className="flex flex-col items-center text-center">
          <FiUsers className="w-4 h-4 text-gray-500 mb-1" />
          <span className="text-xs text-gray-700 font-medium">
            {event.ticketSold || 0}/{event.quantity || 0}
          </span>
        </div>
      </div>

      {/* Actions - Full width button */}
      <div className="mt-3 pt-2">
        <button
          className="w-full py-2 text-indigo-900 font-semibold text-sm hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-100"
          onClick={() => onManage(event._id)}
        >
          Manage Event
        </button>
      </div>
    </div>
  );
};

const MyEvents = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;
  const navigate = useNavigate();

  // Consume the API with params
  const {
    data: overviewData,
    error,
    isLoading,
    isFetching,
  } = useGetOverviewDataQuery({
    pageSize: ITEMS_PER_PAGE,
    pageNumber: currentPage,
    search: searchQuery,
  });

  // Memoize allEvents to prevent unnecessary recalculations
  const allEvents = useMemo(() => {
    return overviewData?.data?.filteredEvents || [];
  }, [overviewData]);

  // Calculate counts for each tab - memoized
  const tabCounts = useMemo(() => {
    if (!allEvents.length) {
      return {
        active: 0,
        published: 0,
        past: 0,
        drafts: 0,
      };
    }

    return {
      active: allEvents.filter((e) => e.status?.toLowerCase() === "ongoing")
        .length,
      published: allEvents.filter((e) => e.status === "publish").length,
      past: allEvents.filter((e) => e.status?.toLowerCase() === "past").length,
      drafts: allEvents.filter((e) => e.status?.toLowerCase() === "draft")
        .length,
    };
  }, [allEvents]);

  // Define tabs with counts
  const tabs = useMemo(
    () => [
      {
        id: "active",
        label: "Ongoing Events",
        count: tabCounts.active,
      },
      {
        id: "published",
        label: "Published Events",
        count: tabCounts.published,
      },
      {
        id: "past",
        label: "Past Events",
        count: tabCounts.past,
      },
      {
        id: "drafts",
        label: "Drafts",
        count: tabCounts.drafts,
      },
    ],
    [tabCounts],
  );

  // Filter events based on active tab from API data
  const getFilteredEventsByTab = useMemo(() => {
    if (!allEvents.length) return [];

    let filtered = allEvents;

    if (activeTab === "active") {
      filtered = allEvents.filter((e) => e.status?.toLowerCase() === "ongoing");
    } else if (activeTab === "published") {
      filtered = allEvents.filter((e) => e.status === "publish");
    } else if (activeTab === "past") {
      filtered = allEvents.filter((e) => e.status?.toLowerCase() === "past");
    } else if (activeTab === "drafts") {
      filtered = allEvents.filter((e) => e.status?.toLowerCase() === "draft");
    }

    return filtered;
  }, [allEvents, activeTab]);

  // Filter by search query
  const filteredEvents = useMemo(() => {
    if (!searchQuery) return getFilteredEventsByTab;

    return getFilteredEventsByTab.filter((event) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        (event.title?.toLowerCase() || "").includes(searchLower) ||
        (event.location?.toLowerCase() || "").includes(searchLower)
      );
    });
  }, [getFilteredEventsByTab, searchQuery]);

  // Calculate pagination
  const totalPages = useMemo(
    () => Math.ceil(filteredEvents.length / ITEMS_PER_PAGE),
    [filteredEvents.length],
  );

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage, ITEMS_PER_PAGE]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      ongoing: "bg-green-100 text-green-700",
      draft: "bg-yellow-100 text-yellow-700",
      publish: "bg-blue-100 text-blue-700",
      past: "bg-red-100 text-red-700",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  // Format date and time from the API response
  const formatEventDateTime = (event) => {
    let date = "N/A";
    let time = "N/A";

    if (event.date) {
      try {
        const dateObj = new Date(event.date);
        date = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      } catch {
        date = event.date;
      }
    }

    if (event.start) {
      try {
        const timeObj = new Date(event.start);
        time = timeObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch {
        time = event.start;
      }
    }

    return { date, time };
  };

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading events data</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-950"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My Events
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Manage and track your hosted events and performance.
        </p>
      </div>

      {/* Tab Navigation - Scrollable on mobile */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex flex-nowrap gap-4 sm:gap-8 px-6 pt-6 border-b border-gray-200 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`pb-4 font-semibold text-sm whitespace-nowrap transition-all relative ${
                  activeTab === tab.id
                    ? "text-indigo-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>
                  {tab.label} ({tab.count})
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-900 rounded-t"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <FiSearch
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="search events by name, date or status"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full h-11 pl-12 pr-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Events Display - Mobile Cards / Desktop Table */}
          {isLoading ? (
            <>
              {/* Desktop Skeleton */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                        Event Details
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                        Date & Time
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                        Status
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                        Tickets Sold
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, index) => (
                      <TableRowSkeleton key={index} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Skeleton */}
              <div className="md:hidden">
                {[...Array(5)].map((_, index) => (
                  <MobileCardSkeleton key={index} />
                ))}
              </div>
            </>
          ) : filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              {/* Folder Illustration */}
              <div className="mb-4 w-40 sm:w-50 h-32 sm:h-40">
                <img
                  src={empty}
                  alt="empty"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Empty State Message */}
              <p className="text-gray-600 text-base font-medium mb-4 text-center px-4">
                {searchQuery
                  ? "No events found matching your search"
                  : "You are yet to create an event"}
              </p>

              {/* Create Event Button */}
              <button
                onClick={() => navigate("/dashboard/create-event")}
                className="inline-flex items-center gap-2 px-7 py-3 bg-indigo-900 hover:bg-indigo-950 text-white font-medium rounded-lg transition-colors"
              >
                <span className="text-xl font-light">+</span>
                <span>Create Event</span>
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table View (hidden on mobile) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                        Event Details
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                        Date & Time
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                        Status
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                        Tickets Sold
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEvents.map((event) => {
                      const { date, time } = formatEventDateTime(event);
                      return (
                        <tr
                          key={event._id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          {/* Event Details */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-purple-400 to-blue-400 flex items-center justify-center text-xl overflow-hidden">
                                {event.cover?.url ? (
                                  <img
                                    src={event.cover.url}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span>📅</span>
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 text-sm">
                                  {event.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {event.location}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Date & Time */}
                          <td className="py-4 px-4">
                            <div className="text-sm">
                              <p className="font-medium text-gray-900">
                                {date}
                              </p>
                              <p className="text-xs text-gray-500">{time}</p>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-4 px-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}
                            >
                              {event.status === "publish"
                                ? "PUBLISHED"
                                : event.status?.toUpperCase()}
                            </span>
                          </td>

                          {/* Tickets Sold */}
                          <td className="py-4 px-4">
                            <p className="text-sm font-medium text-gray-900">
                              {event.ticketSold || 0}/{event.quantity || 0}
                            </p>
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-4">
                            <button
                              className="text-indigo-900 font-semibold text-sm hover:underline"
                              onClick={() =>
                                navigate(
                                  `/dashboard/event-details/${event._id}`,
                                )
                              }
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View (visible only on mobile) */}
              <div className="md:hidden">
                {paginatedEvents.map((event) => (
                  <MobileEventCard
                    key={event._id}
                    event={event}
                    onManage={(id) =>
                      navigate(`/dashboard/event-details/${id}`)
                    }
                  />
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {!isLoading && filteredEvents.length > 0 && (
            <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1 || isFetching}
                className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronLeft size={22} />
              </button>

              {/* Page Numbers - Hidden on mobile for simplicity */}
              <div className="hidden sm:flex items-center gap-2">
                {totalPages <= 4 ? (
                  [...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      disabled={isFetching}
                      className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                        currentPage === i + 1
                          ? "bg-indigo-900 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))
                ) : (
                  <>
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={isFetching}
                      className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                        currentPage === 1
                          ? "bg-indigo-900 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      1
                    </button>
                    {currentPage > 3 && (
                      <span className="text-gray-500">...</span>
                    )}
                    {currentPage > 2 && currentPage < totalPages - 1 && (
                      <button
                        onClick={() => setCurrentPage(currentPage)}
                        disabled={isFetching}
                        className="w-8 h-8 rounded text-sm font-medium bg-indigo-900 text-white"
                      >
                        {currentPage}
                      </button>
                    )}
                    {currentPage < totalPages - 2 && (
                      <span className="text-gray-500">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={isFetching}
                      className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                        currentPage === totalPages
                          ? "bg-indigo-900 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Pagination Info */}
              <span className="sm:hidden text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages || isFetching}
                className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronRight size={22} />
              </button>
            </div>
          )}

          {/* Loading overlay for fetch states */}
          {isFetching && !isLoading && (
            <div className="flex justify-center mt-4">
              <div className="w-6 h-6 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      {/* Add scrollbar hiding styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MyEvents;
