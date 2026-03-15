import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Overview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  // Mock event data - can be replaced with API call or Redux state
  const allEvents = [
    {
      id: 1,
      name: "Global Tech Summit 2026",
      location: "Lagos, Nigeria",
      date: "July 02, 2026",
      time: "09:00 AM WAT",
      status: "ONGOING",
      ticketsSold: 400,
      ticketsTotal: 410,
      image: "🌍",
    },
    {
      id: 2,
      name: "Wellness Weekend",
      location: "Austin, TX",
      date: "July 02, 2026",
      time: "09:00 AM WAT",
      status: "DRAFT",
      ticketsSold: 0,
      ticketsTotal: 500,
      image: "🌿",
    },
    {
      id: 3,
      name: "Wellness Weekend",
      location: "Austin, TX",
      date: "July 02, 2026",
      time: "09:00 AM WAT",
      status: "PUBLISHED",
      ticketsSold: 0,
      ticketsTotal: 100,
      image: "🎨",
    },
    {
      id: 4,
      name: "Art & Design Expo",
      location: "New York City, NY",
      date: "Nov 12, 2026",
      time: "11:00 AM EST",
      status: "PUBLISHED",
      ticketsSold: 100,
      ticketsTotal: 200,
      image: "🎭",
    },
    {
      id: 5,
      name: "Art & Design Expo",
      location: "New York City, NY",
      date: "Nov 12, 2026",
      time: "11:00 AM EST",
      status: "ONGOING",
      ticketsSold: 40,
      ticketsTotal: 100,
      image: "🖼️",
    },
    {
      id: 6,
      name: "Wellness Weekend",
      location: "Austin, TX",
      date: "Dec 05, 2026",
      time: "08:00 AM WAT",
      status: "DRAFT",
      ticketsSold: 0,
      ticketsTotal: 70,
      image: "💆",
    },
    {
      id: 7,
      name: "Art & Design Expo",
      location: "New York City, NY",
      date: "Nov 12, 2024",
      time: "11:00 AM EST",
      status: "PAST",
      ticketsSold: 40,
      ticketsTotal: 100,
      image: "📦",
    },
  ];

  // Calculate dynamic stats based on events
  const calculateStats = () => {
    const ongoingCount = allEvents.filter((e) => e.status === "ONGOING").length;
    const publishedCount = allEvents.filter(
      (e) => e.status === "PUBLISHED",
    ).length;
    const totalTicketsSold = allEvents.reduce(
      (sum, e) => sum + e.ticketsSold,
      0,
    );
    const totalRevenue = totalTicketsSold * 5000; // Assume 5000 per ticket

    return [
      {
        icon: "💰",
        label: "TOTAL REVENUE",
        value: `₦${totalRevenue.toLocaleString()}`,
        bgColor: "bg-pink-100",
        borderColor: "border-pink-200",
      },
      {
        icon: "🎫",
        label: "TOTAL TICKETS SOLD",
        value: totalTicketsSold.toLocaleString(),
        bgColor: "bg-purple-100",
        borderColor: "border-purple-200",
      },
      {
        icon: "📁",
        label: "ONGOING EVENTS",
        value: ongoingCount,
        bgColor: "bg-green-100",
        borderColor: "border-green-200",
      },
      {
        icon: "📋",
        label: "PUBLISHED EVENTS",
        value: publishedCount,
        bgColor: "bg-blue-100",
        borderColor: "border-blue-200",
      },
    ];
  };

  const stats = calculateStats();

  // Filter events based on search query
  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        event.name.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.status.toLowerCase().includes(searchLower) ||
        event.date.toLowerCase().includes(searchLower)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
      ONGOING: "bg-green-100 text-green-700",
      DRAFT: "bg-yellow-100 text-yellow-700",
      PUBLISHED: "bg-blue-100 text-blue-700",
      PAST: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
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
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
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

        {/* Events Table or Empty State */}
        {allEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            {/* Folder Illustration */}
            <div className="mb-8">
              <svg
                className="w-40 h-40 mx-auto"
                viewBox="0 0 120 120"
                fill="none"
              >
                {/* Folder */}
                <rect
                  x="20"
                  y="40"
                  width="80"
                  height="60"
                  rx="5"
                  fill="#b8b8b8"
                  stroke="#888"
                  strokeWidth="2"
                />
                {/* Folder tab */}
                <rect
                  x="20"
                  y="25"
                  width="35"
                  height="15"
                  rx="3"
                  fill="#b8b8b8"
                  stroke="#888"
                  strokeWidth="2"
                />
                {/* Papers inside */}
                <rect
                  x="35"
                  y="48"
                  width="24"
                  height="32"
                  rx="2"
                  fill="#d4d4d4"
                  stroke="#999"
                  strokeWidth="1.5"
                  transform="rotate(-12 47 64)"
                />
                <rect
                  x="42"
                  y="50"
                  width="24"
                  height="32"
                  rx="2"
                  fill="#e0e0e0"
                  stroke="#999"
                  strokeWidth="1.5"
                  transform="rotate(-4 54 66)"
                />
                <rect
                  x="50"
                  y="48"
                  width="24"
                  height="32"
                  rx="2"
                  fill="#d0d0d0"
                  stroke="#999"
                  strokeWidth="1.5"
                  transform="rotate(6 62 64)"
                />
              </svg>
            </div>

            {/* Empty State Message */}
            <p className="text-gray-600 text-base font-medium mb-8">
              You are yet to create an event
            </p>

            {/* Create Event Button */}
            <button className="inline-flex items-center gap-2 px-7 py-3 bg-indigo-900 hover:bg-indigo-950 text-white font-medium rounded-lg transition-colors">
              <span className="text-xl font-light">+</span>
              <span>Create Event</span>
            </button>
          </div>
        ) : paginatedEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No events found matching your search.
            </p>
          </div>
        ) : (
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
                {paginatedEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {/* Event Details */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-linear-to-br from-purple-400 to-blue-400 flex items-center justify-center text-xl">
                          {event.image}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {event.name}
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
                          {event.date}
                        </p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}
                      >
                        {event.status}
                      </span>
                    </td>

                    {/* Tickets Sold */}
                    <td className="py-4 px-4">
                      <p className="text-sm font-medium text-gray-900">
                        {event.ticketsSold}/{event.ticketsTotal}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4">
                      <button className="text-indigo-900 font-semibold text-sm hover:underline">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {allEvents.length > 0 && (
          <div className="flex items-center justify-center gap-4 mt-10 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronLeft size={22} />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {totalPages <= 4 ? (
                // Show all pages if 4 or fewer
                [...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
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
                // Show abbreviated pages if more than 4
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
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

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronRight size={22} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
