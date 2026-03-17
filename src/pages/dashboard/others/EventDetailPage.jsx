import { CircleDollarSign } from "lucide-react";
import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiCopy,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import empty from "../../../assets/Frame.png";

const EventDetails = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  // Mock event details
  const eventData = {
    id: 1,
    title: "SHAPING AFRICA's DIGITAL FUTURE",
    subtitle: "Inspiring the next generation of tech talent",
    totalRevenue: "₦345,240.18",
    totalTickets: 500,
    checkedIn: 100,
    unchecked: 400,
    image: "🌍",
  };

  // Mock attendees data - set to empty array for empty state demo
  const allAttendees = [
    // {
    //   id: 1,
    //   name: "Cuntthia Chidera",
    //   email: "cunthiacodest@gmail.com",
    //   phone: "09014184551",
    //   purchaseDate: "12/10/2025",
    //   code: "TCA359",
    //   status: "Pending",
    // },
    // {
    //   id: 2,
    //   name: "Amadi Amos",
    //   email: "amadiamos146@gmail.com",
    //   phone: "08176543892",
    //   purchaseDate: "04/11/2025",
    //   code: "TCA002",
    //   status: "Checked In",
    // },
    // {
    //   id: 3,
    //   name: "Ichiogu Christopher",
    //   email: "ichioguchristopher98@gmail.com",
    //   phone: "09123456789",
    //   purchaseDate: "11/11/2025",
    //   code: "TCA500",
    //   status: "Pending",
    // },
    // {
    //   id: 4,
    //   name: "Collins Victor",
    //   email: "collinsvl406@gmail.com",
    //   phone: "07098654321",
    //   purchaseDate: "18/09/2025",
    //   code: "TCA172",
    //   status: "Checked In",
    // },
    // {
    //   id: 5,
    //   name: "Norah Ezeribe",
    //   email: "norahezeribe@gmail.com",
    //   phone: "08012563478",
    //   purchaseDate: "10/10/2025",
    //   code: "TCA029",
    //   status: "Pending",
    // },
    // {
    //   id: 6,
    //   name: "Micheal Chukwuemeka",
    //   email: "norahezeribe@gmail.com",
    //   phone: "08012563478",
    //   purchaseDate: "10/10/2025",
    //   code: "TCA029",
    //   status: "Pending",
    // },
    // {
    //   id: 7,
    //   name: "Micheal Chukwuemeka",
    //   email: "norahezeribe@gmail.com",
    //   phone: "08012563478",
    //   purchaseDate: "10/10/2025",
    //   code: "TCA029",
    //   status: "Checked In",
    // },
    // {
    //   id: 8,
    //   name: "Micheal Chukwuemeka",
    //   email: "norahezeribe@gmail.com",
    //   phone: "08012563478",
    //   purchaseDate: "10/10/2025",
    //   code: "TCA029",
    //   status: "Pending",
    // },
    // {
    //   id: 9,
    //   name: "Micheal Chukwuemeka",
    //   email: "norahezeribe@gmail.com",
    //   phone: "08012563478",
    //   purchaseDate: "10/10/2025",
    //   code: "TCA029",
    //   status: "Pending",
    // },
    // {
    //   id: 10,
    //   name: "Micheal Chukwuemeka",
    //   email: "norahezeribe@gmail.com",
    //   phone: "08012563478",
    //   purchaseDate: "10/10/2025",
    //   code: "TCA029",
    //   status: "Checked In",
    // },
  ];

  // Filter attendees based on search and status
  const filteredAttendees = useMemo(() => {
    return allAttendees.filter((attendee) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        attendee.name.toLowerCase().includes(searchLower) ||
        attendee.email.toLowerCase().includes(searchLower) ||
        attendee.code.toLowerCase().includes(searchLower);

      const matchesStatus =
        filterStatus === "All" ||
        attendee.status.toLowerCase() === filterStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredAttendees.length / ITEMS_PER_PAGE);
  const paginatedAttendees = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAttendees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAttendees, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
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
    return status.toLowerCase() === "checked in"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  const copyEventLink = () => {
    const link = `${window.location.origin}/event/${eventData.id}`;
    navigator.clipboard.writeText(link);
    alert("Event link copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiChevronLeft size={24} className="text-gray-700" />
        </button>
        <span className="text-gray-700 font-medium">Back</span>
      </div>

      {/* Event Title with Copy Button - Responsive Layout */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {eventData.title}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {eventData.subtitle}
          </p>
        </div>

        {/* Copy Button Only */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={copyEventLink}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            <FiCopy size={18} />
            <span className="hidden sm:inline">Copy link</span>
          </button>
        </div>
      </div>

      {/* Top Action Buttons */}
      <div className="flex items-center gap-3 justify-end">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
          Edit Event
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
          End Ticket Sale
        </button>
      </div>

      {/* Stats Cards - Increased size and flex-col layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-linear-to-b from-[#FFEAF31F] to-[#FF00B71F] border border-pink-50 rounded-xl p-8 min-h-45 flex flex-col justify-center">
          <div className="flex flex-col items-start gap-3">
            <span className="text-4xl">
              <CircleDollarSign />
            </span>
            <div className="text-start">
              <p className="text-gray-700 text-xs font-semibold uppercase tracking-wide mb-2">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {eventData.totalRevenue}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-linear-to-b from-[#DEDBEE1F] to-[#4237F71F] border border-purple-50 rounded-xl p-8 min-h-45 flex flex-col justify-center">
          <div className="flex flex-col items-start gap-3">
            <span className="text-4xl">
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
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 3.5L9 20.5"
                  stroke="#1E1E1E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <div className="text-start">
              <p className="text-gray-700 text-xs font-semibold uppercase tracking-wide mb-2">
                Total Tickets Sold
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {eventData.totalTickets}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-linear-to-b from-[#D9FCD70F] to-[#16EF061F] border border-green-50 rounded-xl p-8 min-h-45 flex flex-col justify-center">
          <div className="flex flex-col items-start gap-3">
            <span className="text-4xl">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 18C14 18 15 18 16 20C16 20 19.1765 15 22 14"
                  stroke="#1E1E1E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C8.75591 13.5891 12.7529 13.5096 16 15.2432"
                  stroke="#1E1E1E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                  stroke="#1E1E1E"
                  stroke-width="1.5"
                />
              </svg>
            </span>
            <div className="text-start">
              <p className="text-gray-700 text-xs font-semibold uppercase tracking-wide mb-2">
                Checked In Attendees
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {eventData.checkedIn}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-linear-to-b from-[#FAF1CB1C] to-[#E8BB061F] border border-yellow-50 rounded-xl p-8 min-h-45 flex flex-col justify-center">
          <div className="flex flex-col items-start gap-3">
            <span className="text-4xl">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 21.9506C12.6711 21.9833 12.3375 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.3375 21.9833 12.6711 21.9506 13"
                  stroke="#141B34"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M7.5 17C8.90247 15.5311 11.0212 14.9041 13 15.1941M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z"
                  stroke="#141B34"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <circle
                  cx="18.5"
                  cy="18.5"
                  r="3.5"
                  stroke="#141B34"
                  stroke-width="1.5"
                />
              </svg>
            </span>
            <div className="text-start">
              <p className="text-gray-700 text-xs font-semibold uppercase tracking-wide mb-2">
                Unchecked
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {eventData.unchecked}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendee List Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Attendee List</h2>

        {/* Search, Filter, and Button Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search email address, attendee name or code"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full h-11 pl-12 pr-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="h-11 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <option value="All">Filter By Status</option>
              <option value="Checked In">Checked In</option>
              <option value="Pending">Pending</option>
            </select>
            <button className="h-11 px-6 flex items-center justify-center gap-2 bg-indigo-900 hover:bg-indigo-950 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
              <span>✓</span>
              <span>Check In Attendees</span>
            </button>
          </div>
        </div>

        {/* Attendees Table or Empty State */}
        {allAttendees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-gray-200 rounded-lg">
            {/* Folder Illustration */}
            <div className="mb-4 w-50 h-40">
              <img
                src={empty}
                alt="empty"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Empty State Message */}
            <p className="text-gray-600 text-base font-medium mb-8">
              Your guest list is currently empty
            </p>

            {/* Copy Link Button */}
            <button
              onClick={copyEventLink}
              className="inline-flex items-center gap-2 px-7 py-3 bg-indigo-900 hover:bg-indigo-950 text-white font-medium rounded-lg transition-colors"
            >
              <FiCopy size={20} />
              <span>Copy Event Link</span>
            </button>
          </div>
        ) : paginatedAttendees.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No attendees found matching your search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Table Header */}
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                    Attendee Name
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                    Email Address
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                    Phone No
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                    Purchase Date
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                    Code
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">
                    Check-in Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedAttendees.map((attendee) => (
                  <tr
                    key={attendee.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <p className="text-sm font-medium text-gray-900">
                        {attendee.name}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600">{attendee.email}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600">{attendee.phone}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600">
                        {attendee.purchaseDate}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm font-medium text-gray-900">
                        {attendee.code}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(attendee.status)}`}
                      >
                        {attendee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {allAttendees.length > 0 && (
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
  );
};

export default EventDetails;
