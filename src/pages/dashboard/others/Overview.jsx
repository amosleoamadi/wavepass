import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import empty from "../../../assets/Frame.png";
import { CircleDollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetOverviewDataQuery } from "../../../services/overview";

// Skeleton Components
const StatSkeleton = () => (
  <div className="border rounded-xl p-6 flex flex-col justify-between bg-gray-50 animate-pulse">
    <div className="flex items-start justify-between mb-3">
      <div className="w-8 h-8 bg-gray-200 rounded"></div>
    </div>
    <div>
      <div className="w-24 h-3 bg-gray-250 rounded mb-3"></div>
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

const Overview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
    search: searchQuery || undefined,
  });

  // Extract data from API response
  const overview = overviewData?.overview || {};
  const events = overviewData?.data?.filteredEvents || [];
  const pagination = overviewData?.data?.pagination || {};

  // Calculate stats from API data
  const stats = [
    {
      icon: <CircleDollarSign />,
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

  const getStatusColor = (status) => {
    const colors = {
      ONGOING: "bg-green-100 text-green-700",
      DRAFT: "bg-yellow-100 text-yellow-700",
      PUBLISHED: "bg-blue-100 text-blue-700",
      PAST: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  // Format date and time (you'll need to adjust this based on your API date format)
  const formatEventDateTime = (event) => {
    // This is a placeholder - adjust based on your actual API response structure
    return {
      date: event.date || "N/A",
      time: event.time || "N/A",
    };
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
    <div className="space-y-6">
      {/* Stats Grid with Skeleton Loading */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? [...Array(4)].map((_, index) => <StatSkeleton key={index} />)
          : stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-6 flex flex-col justify-between`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-gray-700 text-xs font-semibold uppercase tracking-wide mb-3">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-5">
          Upcoming Events
        </h2>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="search events by name, date or status"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full h-11 pl-12 pr-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="h-11 px-5 flex items-center justify-center gap-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
            <FiFilter size={16} />
            <span>Filter By Date</span>
          </button>
        </div>

        {/* Events Table or Empty State with Skeleton Loading */}
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
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            {/* Folder Illustration */}
            <div className="mb-4 w-50 h-40">
              <img
                src={empty}
                alt="empty"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Empty State Message */}
            <p className="text-gray-600 text-base font-medium mb-4">
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
            <div className="overflow-x-auto">
              {/* Table Header */}
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
                  {events.map((event) => {
                    const { date, time } = formatEventDateTime(event);
                    return (
                      <tr
                        key={event.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        {/* Event Details */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center text-xl">
                              {event.coverImage ? (
                                <img
                                  src={event.coverImage}
                                  alt={event.title}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <span>📅</span>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">
                                {event.title || event.name}
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
                            <p className="font-medium text-gray-900">{date}</p>
                            <p className="text-xs text-gray-500">{time}</p>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-3 py-1 w-auto rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}
                          >
                            {event.status}
                          </span>
                        </td>

                        {/* Tickets Sold */}
                        <td className="py-4 px-4">
                          <p className="text-sm font-medium text-gray-900">
                            {event.ticketsSold || 0}/{event.ticketsTotal || 0}
                          </p>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4">
                          <button
                            className="text-indigo-900 font-semibold text-sm cursor-pointer hover:underline"
                            onClick={() =>
                              navigate(`/dashboard/event-details/${event.id}`)
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

            {/* Pagination */}
            {pagination.totalPages > 0 && (
              <div className="flex items-center justify-center gap-4 mt-10 pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || isFetching}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <FiChevronLeft size={22} />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {pagination.totalPages <= 4 ? (
                    [...Array(pagination.totalPages)].map((_, i) => (
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
                      {currentPage > 2 &&
                        currentPage < pagination.totalPages - 1 && (
                          <button
                            onClick={() => setCurrentPage(currentPage)}
                            disabled={isFetching}
                            className="w-8 h-8 rounded text-sm font-medium bg-indigo-900 text-white"
                          >
                            {currentPage}
                          </button>
                        )}
                      {currentPage < pagination.totalPages - 2 && (
                        <span className="text-gray-500">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(pagination.totalPages)}
                        disabled={isFetching}
                        className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
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

                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= pagination.totalPages || isFetching}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
