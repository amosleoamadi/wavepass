import React, { useState, useMemo } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import empty from "../../../assets/Frame.png";

const MyEvents = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  // Mock data for user's created events
  const userEvents = [
    // {
    //   id: 1,
    //   name: "Global Tech Summit 2026",
    //   location: "Lagos, Nigeria",
    //   date: "July 02, 2026",
    //   time: "09:00 AM WAT",
    //   status: "ONGOING",
    //   ticketsSold: 400,
    //   ticketsTotal: 410,
    //   image: "🌍",
    // },
    // {
    //   id: 2,
    //   name: "Wellness Weekend",
    //   location: "Austin, TX",
    //   date: "July 02, 2026",
    //   time: "09:00 AM WAT",
    //   status: "DRAFT",
    //   ticketsSold: 0,
    //   ticketsTotal: 500,
    //   image: "🌿",
    // },
    // {
    //   id: 3,
    //   name: "Art & Design Expo",
    //   location: "New York City, NY",
    //   date: "Nov 12, 2024",
    //   time: "11:00 AM EST",
    //   status: "PAST",
    //   ticketsSold: 40,
    //   ticketsTotal: 100,
    //   image: "📦",
    // },
    // {
    //   id: 3,
    //   name: "Art & Design Expo",
    //   location: "New York City, NY",
    //   date: "Nov 12, 2024",
    //   time: "11:00 AM EST",
    //   status: "PUBLISHED",
    //   ticketsSold: 40,
    //   ticketsTotal: 100,
    //   image: "📦",
    // },
  ];

  // Define tabs
  const tabs = [
    {
      id: "active",
      label: "Ongoing Events",
      count: userEvents.filter((e) => e.status === "ONGOING").length,
    },
    {
      id: "published",
      label: "Published Events",
      count: userEvents.filter((e) => e.status === "PUBLISHED").length,
    },
    {
      id: "past",
      label: "Past Events",
      count: userEvents.filter((e) => e.status === "PAST").length,
    },
    {
      id: "drafts",
      label: "Drafts",
      count: userEvents.filter((e) => e.status === "DRAFT").length,
    },
  ];

  // Filter events based on active tab
  const getFilteredEventsByTab = () => {
    let filtered = userEvents;

    if (activeTab === "active") {
      filtered = userEvents.filter((e) => e.status === "ONGOING");
    } else if (activeTab === "published") {
      filtered = userEvents.filter((e) => e.status === "PUBLISHED");
    } else if (activeTab === "past") {
      filtered = userEvents.filter((e) => e.status === "PAST");
    } else if (activeTab === "drafts") {
      filtered = userEvents.filter((e) => e.status === "DRAFT");
    }

    return filtered;
  };

  // Filter by search query
  const filteredEvents = useMemo(() => {
    const tabFiltered = getFilteredEventsByTab();
    return tabFiltered.filter((event) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        event.name.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.date.toLowerCase().includes(searchLower)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, searchQuery]);

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
      ONGOING: "bg-green-100 text-green-700",
      DRAFT: "bg-yellow-100 text-yellow-700",
      PUBLISHED: "bg-blue-100 text-blue-700",
      PAST: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
        <p className="text-gray-600 mt-2">
          Manage and track your hosted events and performance.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 px-6 pt-6 border-b border-gray-200">
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

        <div className="p-6 space-y-6">
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

          {/* Events Table or Empty State */}
          {filteredEvents.length === 0 ? (
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
                You are yet to create an event
              </p>

              {/* Create Event Button */}
              <button className="inline-flex items-center gap-2 px-7 py-3 bg-indigo-900 hover:bg-indigo-950 text-white font-medium rounded-lg transition-colors">
                <span className="text-xl font-light">+</span>
                <span>Create Event</span>
              </button>
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
          {filteredEvents.length > 0 && (
            <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-200">
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
    </div>
  );
};

export default MyEvents;
