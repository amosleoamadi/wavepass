import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiX,
} from "react-icons/fi";
import empty from "../../../assets/Frame.png";
import { CircleDollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetOverviewDataQuery } from "../../../services/overview";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Skeleton Components (keep as is)
const StatSkeleton = () => (
  <div className="border rounded-xl p-4 sm:p-6 flex flex-col justify-between bg-gray-50 animate-pulse">
    <div className="flex items-start justify-between mb-2 sm:mb-3">
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded"></div>
    </div>
    <div>
      <div className="w-16 sm:w-24 h-2 sm:h-3 bg-gray-200 rounded mb-2 sm:mb-3"></div>
      <div className="w-12 sm:w-20 h-4 sm:h-8 bg-gray-200 rounded"></div>
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

// Helper functions for date/time formatting
const formatEventDate = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    // If it's already in MM/DD/YYYY format, return as is
    if (typeof dateStr === "string" && dateStr.includes("/")) {
      const [month, day, year] = dateStr.split("/");
      const date = new Date(`${year}-${month}-${day}`);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }

    // Otherwise parse as date
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

const formatEventTime = (timeStr) => {
  if (!timeStr) return "N/A";
  try {
    // Extract the time part from the ISO string
    // "2026-03-20T10:00:00.000Z" -> "10:00"
    const timePart = timeStr.split("T")[1]?.substring(0, 5);

    if (timePart) {
      const [hours, minutes] = timePart.split(":");
      const hour = parseInt(hours);
      const minute = parseInt(minutes);

      // Convert to 12-hour format with AM/PM
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
      const displayMinute = minute.toString().padStart(2, "0");

      return `${displayHour}:${displayMinute} ${ampm}`;
    }
    return timeStr;
  } catch {
    return timeStr;
  }
};

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

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      {/* Top section - Image, Title, Location, Status */}
      <div className="flex gap-3 mb-4">
        {/* Image */}
        <div className="w-16 h-16 rounded-lg border border-gray-300 shrink-0 overflow-hidden">
          {event.cover?.url ? (
            <img
              src={event.cover.url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl bg-gray-100">
              📅
            </div>
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

      {/* Bottom section - Icons above content in a grid */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
        {/* Date */}
        <div className="flex flex-col items-center text-center">
          <FiCalendar className="w-4 h-4 text-gray-500 mb-1" />
          <span className="text-xs text-gray-700 font-medium">
            {formatEventDate(event.date)}
          </span>
        </div>

        {/* Time - Fixed: using event.start with formatEventTime */}
        <div className="flex flex-col items-center text-center">
          <FiClock className="w-4 h-4 text-gray-500 mb-1" />
          <span className="text-xs text-gray-700 font-medium">
            {formatEventTime(event.start)}
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

const Overview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Date filter states
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const ITEMS_PER_PAGE = 10;
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

  // Extract data from API response
  const overview = overviewData?.overview || {};
  const pagination = overviewData?.data?.pagination || {};

  const displayEvents = useMemo(() => {
    const events = overviewData?.data?.filteredEvents || [];
    if (!startDate && !endDate) return events;

    // Apply date filters
    return events.filter((event) => {
      const eventDate = new Date(event.date);

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        return eventDate >= start && eventDate <= end;
      }

      if (startDate) {
        const start = new Date(startDate);
        return eventDate >= start;
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        return eventDate <= end;
      }

      return true;
    });
  }, [overviewData, startDate, endDate]);

  // Calculate stats from API data
  const stats = [
    {
      icon: (
        <CircleDollarSign className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
      ),
      label: "TOTAL REVENUE",
      value: `₦${(overview.totalRevenue || 0).toLocaleString()}`,
      bgColor: "bg-gradient-to-b from-[#FFEAF31F] to-[#FF00B71F]",
      borderColor: "border-pink-200",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
        >
          <path
            d="M2.46433 9.34375C2.21579 9.34375 1.98899 9.14229 2.00041 8.87895C2.06733 7.33687 2.25481 6.33298 2.78008 5.53884C3.08228 5.08196 3.45765 4.68459 3.88923 4.36468C5.05575 3.5 6.70139 3.5 9.99266 3.5H14.0074C17.2986 3.5 18.9443 3.5 20.1108 4.36468C20.5424 4.68459 20.9177 5.08196 21.2199 5.53884C21.7452 6.33289 21.9327 7.33665 21.9996 8.87843C22.011 9.14208 21.7839 9.34375 21.5351 9.34375C20.1493 9.34375 19.0259 10.533 19.0259 12C19.0259 13.467 20.1493 14.6562 21.5351 14.6562C21.7839 14.6562 22.011 14.8579 21.9996 15.1216C21.9327 16.6634 21.7452 17.6671 21.2199 18.4612C20.9177 18.918 20.5424 19.3154 20.1108 19.6353C18.9443 20.5 17.2986 20.5 14.0074 20.5H9.99266C6.70139 20.5 5.05575 20.5 3.88923 19.6353C3.45765 19.3154 3.08228 18.918 2.78008 18.4612C2.25481 17.667 2.06733 16.6631 2.00041 15.1211C1.98899 14.8577 2.21579 14.6562 2.46433 14.6562C3.85012 14.6562 4.97352 13.467 4.97352 12C4.97352 10.533 3.85012 9.34375 2.46433 9.34375Z"
            stroke="#1E1E1E"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 3.5L9 20.5"
            stroke="#1E1E1E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "TOTAL TICKETS SOLD",
      value: (overview.ticketSold || 0).toLocaleString(),
      bgColor: "bg-gradient-to-b from-[#DEDBEE1F] to-[#4237F71F]",
      borderColor: "border-purple-200",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
        >
          <path
            d="M7 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C21.9796 9.05942 21.9992 10.0588 22 12M12 7L11.3666 5.73313C10.8418 4.68358 10.3622 3.62712 9.19926 3.19101C8.6899 3 8.10802 3 6.94427 3C5.1278 3 4.21956 3 3.53806 3.38032C3.05227 3.65142 2.65142 4.05227 2.38032 4.53806C2 5.21956 2 6.1278 2 7.94427V11C2 15.714 2 18.0711 3.46447 19.5355C4.7646 20.8357 6.7682 20.9816 10.5 20.9979"
            stroke="#141B34"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M13 19C13 19 14 19 15 21C15 21 18.1765 16 21 15"
            stroke="#141B34"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "ONGOING EVENTS",
      value: overview.ongoingEvent || 0,
      bgColor: "bg-gradient-to-b from-[#D9FCD70F] to-[#16EF061F]",
      borderColor: "border-green-200",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
        >
          <path
            d="M18 2V4M6 2V4"
            stroke="#1E1E1E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 17L9.99999 13.3472C9.99999 13.1555 9.86325 13 9.69458 13H9M13.6297 17L14.9842 13.3492C15.0475 13.1785 14.9128 13 14.7207 13H13"
            stroke="#1E1E1E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
            stroke="#1E1E1E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 8H18"
            stroke="#1E1E1E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "PUBLISHED EVENTS",
      value: overview.publishEvent || 0,
      bgColor: "bg-gradient-to-b from-[#FAF1CB1C] to-[#E8BB061F]",
      borderColor: "border-[#E8BB061F]",
    },
  ];

  // Handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePrevPage = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
  };

  const handleNextPage = () => {
    if (currentPage < (pagination.totalPages || 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Date filter handlers
  const handleApplyDateFilter = () => {
    setShowDateFilter(false);
    setCurrentPage(1);
  };

  const clearDateFilter = () => {
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
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

  // Format date for display in filter button
  const getDateFilterDisplay = () => {
    if (startDate && endDate) {
      return `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`;
    }
    if (startDate) {
      return `From ${new Date(startDate).toLocaleDateString()}`;
    }
    if (endDate) {
      return `Until ${new Date(endDate).toLocaleDateString()}`;
    }
    return "Filter By Date";
  };

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading overview data</p>
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
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Grid - 2x2 on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {isLoading
          ? [...Array(4)].map((_, index) => <StatSkeleton key={index} />)
          : stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-4 sm:p-5 lg:p-6 flex flex-col justify-between min-h-25 sm:min-h-30 lg:min-h-35`}
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl lg:text-3xl">
                    {stat.icon}
                  </span>
                </div>
                <div>
                  <p className="text-gray-700 text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">
                    {stat.label}
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-900 wrap-break-word">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-4 sm:mb-5">
          Upcoming Events
        </h2>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
            <input
              type="text"
              placeholder="search events by name or status"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full h-10 sm:h-11 pl-10 sm:pl-12 pr-4 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button with Date Range Display */}
          <div className="relative">
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className={`h-10 sm:h-11 px-4 cursor-pointer sm:px-5 flex items-center justify-center gap-2 border rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                startDate || endDate
                  ? "border-indigo-900 bg-indigo-50 text-indigo-900"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FiFilter size={14} />
              <span className="max-w-37.5 truncate">
                {getDateFilterDisplay()}
              </span>
              {(startDate || endDate) && (
                <FiX
                  size={14}
                  className="ml-1 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearDateFilter();
                  }}
                />
              )}
            </button>

            {/* Date Filter Dropdown */}
            {showDateFilter && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDateFilter(false)}
                />

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Filter by Date Range
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        min={startDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => {
                          clearDateFilter();
                          setShowDateFilter(false);
                        }}
                        className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Clear
                      </button>
                      <button
                        onClick={handleApplyDateFilter}
                        className="flex-1 px-3 py-2 text-sm font-medium text-white bg-indigo-900 rounded-lg hover:bg-indigo-950 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {(startDate || endDate) && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-500">Active filters:</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-900 text-xs rounded-md">
              <FiCalendar size={12} />
              {getDateFilterDisplay()}
            </span>
          </div>
        )}

        {/* Events Display - Mobile Cards / Desktop Table */}
        {isLoading ? (
          <div className="overflow-x-auto">
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
        ) : displayEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
            {/* Folder Illustration */}
            <div className="mb-4 w-32 sm:w-40 lg:w-50 h-24 sm:h-32 lg:h-40">
              <img
                src={empty}
                alt="empty"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Empty State Message */}
            <p className="text-sm sm:text-base text-gray-600 font-medium mb-4 sm:mb-6 text-center px-4">
              {searchQuery
                ? "No events found matching your search"
                : startDate || endDate
                  ? "No events found in the selected date range"
                  : "You are yet to create an event"}
            </p>

            {/* Create Event Button */}
            <button
              onClick={() => navigate("/dashboard/create-event")}
              className="inline-flex items-center gap-2 px-5 sm:px-7 py-2 sm:py-3 bg-indigo-900 hover:bg-indigo-950 text-white text-sm sm:text-base font-medium rounded-lg transition-colors"
            >
              <span className="text-lg sm:text-xl font-light">+</span>
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
                  {displayEvents.map((event) => {
                    return (
                      <tr
                        key={event._id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        {/* Event Details */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-gray-300 flex items-center justify-center text-lg sm:text-xl overflow-hidden">
                              {event.cover?.url ? (
                                <img
                                  src={event.cover.url}
                                  alt={event.title}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <span>📅</span>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                                {event.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {event.location}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Date & Time - Fixed */}
                        <td className="py-4 px-4">
                          <div className="text-xs sm:text-sm">
                            <p className="font-medium text-gray-900">
                              {formatEventDate(event.date)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatEventTime(event.start)}
                            </p>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}
                          >
                            {event.status === "publish"
                              ? "PUBLISHED"
                              : event.status?.toUpperCase()}
                          </span>
                        </td>

                        {/* Tickets Sold */}
                        <td className="py-4 px-4">
                          <p className="text-xs sm:text-sm font-medium text-gray-900">
                            {event.ticketSold || 0}/{event.quantity || 0}
                          </p>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4">
                          <button
                            className="text-indigo-900 font-semibold text-xs sm:text-sm cursor-pointer hover:underline"
                            onClick={() =>
                              navigate(`/dashboard/event-details/${event._id}`)
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
              {displayEvents.map((event) => (
                <MobileEventCard
                  key={event._id}
                  event={event}
                  onManage={(id) => navigate(`/dashboard/event-details/${id}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 0 && (
              <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 lg:mt-10 pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || isFetching}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <FiChevronLeft size={18} className="sm:w-5.5 sm:h-5.5" />
                </button>

                {/* Page Numbers - Hidden on mobile */}
                <div className="hidden sm:flex items-center gap-1 sm:gap-2">
                  {pagination.totalPages <= 4 ? (
                    [...Array(pagination.totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        disabled={isFetching}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs sm:text-sm font-medium transition-colors ${
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
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs sm:text-sm font-medium transition-colors ${
                          currentPage === 1
                            ? "bg-indigo-900 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        1
                      </button>
                      {currentPage > 3 && (
                        <span className="text-gray-500 text-xs sm:text-sm">
                          ...
                        </span>
                      )}
                      {currentPage > 2 &&
                        currentPage < pagination.totalPages - 1 && (
                          <button
                            onClick={() => setCurrentPage(currentPage)}
                            disabled={isFetching}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded text-xs sm:text-sm font-medium bg-indigo-900 text-white"
                          >
                            {currentPage}
                          </button>
                        )}
                      {currentPage < pagination.totalPages - 2 && (
                        <span className="text-gray-500 text-xs sm:text-sm">
                          ...
                        </span>
                      )}
                      <button
                        onClick={() => setCurrentPage(pagination.totalPages)}
                        disabled={isFetching}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs sm:text-sm font-medium transition-colors ${
                          currentPage === pagination.totalPages
                            ? "bg-indigo-900 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pagination.totalPages}
                      </button>
                    </>
                  )}
                </div>

                {/* Mobile Pagination Info */}
                <span className="sm:hidden text-xs text-gray-600">
                  Page {currentPage} of {pagination.totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= pagination.totalPages || isFetching}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <FiChevronRight size={18} className="sm:w-5.5 sm:h-5.5" />
                </button>
              </div>
            )}

            {/* Loading overlay for fetch states */}
            {isFetching && !isLoading && (
              <div className="flex justify-center mt-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
