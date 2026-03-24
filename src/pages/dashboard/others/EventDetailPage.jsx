import { CircleDollarSign } from "lucide-react";
import React, { useState, useMemo, useCallback } from "react";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCopy,
  FiCalendar,
  FiMail,
  FiPhone,
  FiClock,
  FiMapPin,
  FiAlertCircle,
  FiX,
  FiLoader,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import empty from "../../../assets/Frame.png";
import { GoPlus } from "react-icons/go";
import {
  useGetEventByOrganizerQuery,
  useEndTicketSalesQuery,
  useStartTicketSalesQuery,
} from "../../../services/overview";

// Toast component
const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  const bgColor =
    type === "success"
      ? "bg-green-50 border-green-200"
      : "bg-red-50 border-red-200";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const Icon = type === "success" ? FiCheckCircle : FiXCircle;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border ${bgColor} shadow-lg animate-slide-in`}
    >
      <Icon
        className={`w-5 h-5 ${type === "success" ? "text-green-500" : "text-red-500"}`}
      />
      <span className={`text-sm font-medium ${textColor}`}>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
        className="ml-2"
      >
        <FiX className="w-4 h-4 text-gray-400 hover:text-gray-600" />
      </button>
    </div>
  );
};

// Helper function to format time from ISO string to AM/PM
const formatTimeFromISO = (isoString) => {
  if (!isoString) return "N/A";
  try {
    const timePart = isoString.split("T")[1]?.substring(0, 5);

    if (timePart) {
      const [hours, minutes] = timePart.split(":");
      const hour = parseInt(hours);
      const minute = parseInt(minutes);

      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      const displayMinute = minute.toString().padStart(2, "0");

      return `${displayHour}:${displayMinute} ${ampm}`;
    }
    return isoString;
  } catch {
    return isoString;
  }
};

// Helper function to format date
const formatDateFromISO = (dateStr) => {
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

// Helper function to check if event has passed based on end time
const isEventPast = (endDateTime) => {
  if (!endDateTime) return false;

  const now = new Date();
  const nigeriaTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Africa/Lagos" }),
  );
  const eventEndTime = new Date(endDateTime);

  return nigeriaTime > eventEndTime;
};

// Helper function to check if event is accessible for check-in (event has started)
const isEventAccessible = (eventDate, eventStartTime) => {
  if (!eventDate || !eventStartTime) return false;

  // Combine date and start time
  const eventStartDateTime = new Date(eventStartTime);
  const now = new Date();
  const nigeriaTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Africa/Lagos" }),
  );

  return nigeriaTime >= eventStartDateTime;
};

// Helper function to get remaining days until event
const getDaysUntilEvent = (eventDate) => {
  if (!eventDate) return null;

  const now = new Date();
  const nigeriaTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Africa/Lagos" }),
  );
  const eventDateObj = new Date(eventDate);

  const todayStart = new Date(
    nigeriaTime.getFullYear(),
    nigeriaTime.getMonth(),
    nigeriaTime.getDate(),
  );
  const eventStart = new Date(
    eventDateObj.getFullYear(),
    eventDateObj.getMonth(),
    eventDateObj.getDate(),
  );

  const diffTime = eventStart - todayStart;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

// Stats Card Skeleton
const StatSkeleton = () => (
  <div className="bg-linear-to-b from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col justify-center min-h-30 sm:min-h-35 lg:min-h-45 animate-pulse">
    <div className="flex flex-col items-start gap-2 sm:gap-3">
      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gray-200 rounded-lg"></div>
      <div className="text-start w-full">
        <div className="w-20 sm:w-24 h-3 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-3"></div>
        <div className="w-24 sm:w-32 h-5 sm:h-6 lg:h-7 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

// Title Skeleton
const TitleSkeleton = () => (
  <div className="space-y-3 flex-1">
    <div className="h-8 sm:h-9 lg:h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
    <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
  </div>
);

// Desktop Table Row Skeleton
const TableRowSkeleton = () => (
  <tr className="border-b border-gray-200 animate-pulse">
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-200"></div>
        <div className="space-y-2">
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    </td>
    <td className="py-4 px-4">
      <div className="w-40 h-4 bg-gray-200 rounded"></div>
    </td>
    <td className="py-4 px-4">
      <div className="w-32 h-4 bg-gray-200 rounded"></div>
    </td>
    <td className="py-4 px-4">
      <div className="w-24 h-4 bg-gray-200 rounded"></div>
    </td>
    <td className="py-4 px-4">
      <div className="w-20 h-4 bg-gray-200 rounded"></div>
    </td>
    <td className="py-4 px-4">
      <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
    </td>
  </tr>
);

// Mobile Attendee Card Skeleton
const MobileAttendeeCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 animate-pulse">
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <div className="w-32 h-5 bg-gray-200 rounded mb-2"></div>
        <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
      </div>
      <div className="text-right">
        <div className="w-8 h-3 bg-gray-200 rounded mb-1"></div>
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
      <div className="flex flex-col">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-gray-200 rounded mr-1"></div>
          <div className="w-8 h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="w-24 h-3 bg-gray-200 rounded"></div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-gray-200 rounded mr-1"></div>
          <div className="w-8 h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="w-20 h-3 bg-gray-200 rounded"></div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-gray-200 rounded mr-1"></div>
          <div className="w-8 h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="w-20 h-3 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

// Search and Filter Bar Skeleton
const SearchFilterSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-4 mb-6 animate-pulse">
    <div className="flex-1">
      <div className="w-full h-11 bg-gray-200 rounded-lg"></div>
    </div>
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-40 h-11 bg-gray-200 rounded-lg"></div>
      <div className="w-full sm:w-48 h-11 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

// Pagination Skeleton
const PaginationSkeleton = () => (
  <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 lg:mt-10 pt-4 sm:pt-6 border-t border-gray-200">
    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    <div className="hidden sm:flex items-center gap-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-8 h-8 bg-gray-200 rounded animate-pulse"
        ></div>
      ))}
    </div>
    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
  </div>
);

// Mobile Attendee Card Component
const MobileAttendeeCard = ({ attendee }) => {
  const isCheckedIn = attendee.isCheckedIn || false;

  const getStatusColor = () => {
    return isCheckedIn
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  const getStatusText = () => {
    return isCheckedIn ? "Checked In" : "Pending";
  };

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

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base mb-1">
            {attendee.fullname}
          </h3>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}
          >
            {getStatusText()}
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Code</p>
          <p className="text-sm font-medium text-gray-900">{attendee.code}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
        <div className="flex flex-col">
          <div className="flex items-center text-gray-500 mb-1">
            <FiMail className="w-3 h-3 mr-1" />
            <span className="text-xs">Email</span>
          </div>
          <span className="text-xs text-gray-700 truncate">
            {attendee.email}
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center text-gray-500 mb-1">
            <FiPhone className="w-3 h-3 mr-1" />
            <span className="text-xs">Phone</span>
          </div>
          <span className="text-xs text-gray-700">{attendee.phoneNumber}</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center text-gray-500 mb-1">
            <FiCalendar className="w-3 h-3 mr-1" />
            <span className="text-xs">Purchase Date</span>
          </div>
          <span className="text-xs text-gray-700">
            {formatDate(attendee.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [copyButtonText, setCopyButtonText] = useState("Copy link");
  const [showEndSaleConfirm, setShowEndSaleConfirm] = useState(false);
  const [showStartSaleConfirm, setShowStartSaleConfirm] = useState(false);
  const [toast, setToast] = useState(null);
  const ITEMS_PER_PAGE = 10;

  // Determine status value for API
  const getApiStatus = useCallback(() => {
    if (filterStatus === "All") return "";
    if (filterStatus === "Checked In") return "checkedin";
    if (filterStatus === "Pending") return "pending";
    return "";
  }, [filterStatus]);

  // Fetch event data with query parameters
  const {
    data: response,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetEventByOrganizerQuery(id, {
    pageNumber: page,
    pageSize: ITEMS_PER_PAGE,
    status: getApiStatus(),
    search: searchQuery,
  });

  // Fetch ticket sales status - GET queries
  const { data: endTicketSalesData, isLoading: isEndingSalesLoading } =
    useEndTicketSalesQuery(id, {
      skip: !id || !showEndSaleConfirm,
    });

  const { data: startTicketSalesData, isLoading: isStartingSalesLoading } =
    useStartTicketSalesQuery(id, {
      skip: !id || !showStartSaleConfirm,
    });

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Extract event data from response
  const eventData = useMemo(() => {
    if (!response?.event) return null;
    const event = response.event;
    const overview = response.overview || {};

    return {
      id: event._id,
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date,
      start: event.start,
      end: event.end,
      formattedDate: formatDateFromISO(event.date),
      startTime: formatTimeFromISO(event.start),
      endTime: formatTimeFromISO(event.end),
      key: event.key,
      totalRevenue: `₦${((overview.ticketSold || 0) * (event.price || 0)).toLocaleString()}`,
      totalTickets: overview.ticketSold || 0,
      checkedIn: overview.checkedIn || 0,
      unchecked: overview.unchecked || 0,
      isTicketOnSale: event.isTicketOnSale ?? true,
    };
  }, [response]);

  // Check if event has passed based on end time
  const isEventPassed = useMemo(() => {
    if (!eventData?.end) return false;
    return isEventPast(eventData.end);
  }, [eventData]);

  // Check if event is accessible for check-in (event has started)
  const isCheckinAvailable = useMemo(() => {
    if (!eventData?.start) return false;
    return isEventAccessible(eventData.date, eventData.start);
  }, [eventData]);

  // Get days until event
  const daysUntilEvent = useMemo(() => {
    if (!eventData?.date) return null;
    return getDaysUntilEvent(eventData.date);
  }, [eventData]);

  // Extract attendees from response
  const allAttendees = useMemo(() => {
    return response?.data?.attendees || [];
  }, [response]);

  // Get pagination info from the API response
  const pagination = useMemo(() => {
    return (
      response?.data?.pagination || {
        pageNumber: 1,
        pageSize: ITEMS_PER_PAGE,
        totalAttendees: 0,
        totalPages: 0,
      }
    );
  }, [response]);

  // Effect to handle end ticket sales response
  React.useEffect(() => {
    if (endTicketSalesData && showEndSaleConfirm) {
      setShowEndSaleConfirm(false);
      refetch();
      showToast("Ticket sales ended successfully", "success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTicketSalesData]);

  // Effect to handle start ticket sales response
  React.useEffect(() => {
    if (startTicketSalesData && showStartSaleConfirm) {
      setShowStartSaleConfirm(false);
      refetch();
      showToast("Ticket sales started successfully", "success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTicketSalesData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPage(1);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < pagination.totalPages) {
      setPage(page + 1);
    }
  };

  const copyEventLink = () => {
    const link = `${window.location.origin}/event?key=${eventData?.key}`;
    navigator.clipboard.writeText(link);
    setCopyButtonText("Copied!");
    setTimeout(() => setCopyButtonText("Copy link"), 2000);
  };

  const handleEndTicketSales = () => {
    setShowEndSaleConfirm(true);
  };

  const handleStartTicketSales = () => {
    setShowStartSaleConfirm(true);
  };

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 text-red-500">
            <svg
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-600 mb-4 text-lg">
            Error loading event details
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-900 text-white rounded-lg hover:bg-indigo-950 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}

      {/* Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiChevronLeft size={20} className="sm:w-6 sm:h-6 text-gray-700" />
        </button>
        <span className="text-sm sm:text-base text-gray-700 font-medium">
          Back
        </span>
      </div>

      {/* Event Title with Copy Button */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {isLoading ? (
          <TitleSkeleton />
        ) : (
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {eventData?.title || "Event Title"}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {eventData?.description?.substring(0, 100) +
                (eventData?.description?.length > 100 ? "..." : "") ||
                "Event description"}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">
                  {eventData?.location || "Location not specified"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FiCalendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">
                  {eventData?.formattedDate}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FiClock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">
                  {eventData?.startTime}{" "}
                  {eventData?.endTime && `- ${eventData?.endTime}`}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={copyEventLink}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base whitespace-nowrap w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed min-w-25"
          >
            <FiCopy size={16} className="sm:w-4.5 sm:h-4.5" />
            <span>{copyButtonText}</span>
          </button>
        </div>
      </div>

      {/* Top Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-end">
        <button
          disabled={isLoading}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Edit Event
        </button>

        {/* Conditional Ticket Sales Button - Only show if event hasn't passed */}
        {!isEventPassed ? (
          eventData?.isTicketOnSale ? (
            <button
              onClick={handleEndTicketSales}
              disabled={isLoading || isEndingSalesLoading}
              className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg text-sm sm:text-base hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isEndingSalesLoading && <FiLoader className="animate-spin" />}
              End Ticket Sale
            </button>
          ) : (
            <button
              onClick={handleStartTicketSales}
              disabled={isLoading || isStartingSalesLoading}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg text-sm sm:text-base hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isStartingSalesLoading && <FiLoader className="animate-spin" />}
              Start Ticket Sale
            </button>
          )
        ) : (
          <button
            disabled
            className="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded-lg text-sm sm:text-base cursor-not-allowed font-medium"
            title="Event has already passed"
          >
            Event Passed
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {isLoading ? (
          [...Array(4)].map((_, i) => <StatSkeleton key={i} />)
        ) : (
          <>
            {/* Total Revenue */}
            <div className="bg-linear-to-b from-[#FFEAF31F] to-[#FF00B71F] border border-pink-50 rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col justify-center min-h-30 sm:min-h-35 lg:min-h-45">
              <div className="flex flex-col items-start gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl lg:text-4xl">
                  <CircleDollarSign className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                </span>
                <div className="text-start">
                  <p className="text-gray-700 text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">
                    Total Revenue
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 wrap-break-word">
                    {eventData?.totalRevenue || "₦0"}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Tickets Sold */}
            <div className="bg-linear-to-b from-[#DEDBEE1F] to-[#4237F71F] border border-purple-50 rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col justify-center min-h-30 sm:min-h-35 lg:min-h-45">
              <div className="flex flex-col items-start gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl lg:text-4xl">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
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
                </span>
                <div className="text-start">
                  <p className="text-gray-700 text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">
                    Total Tickets Sold
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">
                    {eventData?.totalTickets?.toLocaleString() || "0"}
                  </p>
                </div>
              </div>
            </div>

            {/* Checked In Attendees */}
            <div className="bg-linear-to-b from-[#D9FCD70F] to-[#16EF061F] border border-green-50 rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col justify-center min-h-30 sm:min-h-35 lg:min-h-45">
              <div className="flex flex-col items-start gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl lg:text-4xl">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                  >
                    <path
                      d="M14 18C14 18 15 18 16 20C16 20 19.1765 15 22 14"
                      stroke="#1E1E1E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C8.75591 13.5891 12.7529 13.5096 16 15.2432"
                      stroke="#1E1E1E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                      stroke="#1E1E1E"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
                <div className="text-start">
                  <p className="text-gray-700 text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">
                    Checked In
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">
                    {eventData?.checkedIn?.toLocaleString() || "0"}
                  </p>
                </div>
              </div>
            </div>

            {/* Unchecked */}
            <div className="bg-linear-to-b from-[#FAF1CB1C] to-[#E8BB061F] border border-yellow-50 rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col justify-center min-h-30 sm:min-h-35 lg:min-h-45">
              <div className="flex flex-col items-start gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl lg:text-4xl">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                  >
                    <path
                      d="M13 21.9506C12.6711 21.9833 12.3375 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.3375 21.9833 12.6711 21.9506 13"
                      stroke="#141B34"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7.5 17C8.90247 15.5311 11.0212 14.9041 13 15.1941M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z"
                      stroke="#141B34"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="18.5"
                      cy="18.5"
                      r="3.5"
                      stroke="#141B34"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
                <div className="text-start">
                  <p className="text-gray-700 text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">
                    Unchecked
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">
                    {eventData?.unchecked?.toLocaleString() || "0"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* End Ticket Sales Confirmation Modal */}
      {showEndSaleConfirm && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">End Ticket Sales</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to end ticket sales for this event? This
              action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowEndSaleConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEndTicketSales}
                disabled={isEndingSalesLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isEndingSalesLoading && <FiLoader className="animate-spin" />}
                Confirm End Sales
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Start Ticket Sales Confirmation Modal */}
      {showStartSaleConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Start Ticket Sales</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to start ticket sales for this event?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowStartSaleConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleStartTicketSales}
                disabled={isStartingSalesLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isStartingSalesLoading && (
                  <FiLoader className="animate-spin" />
                )}
                Confirm Start Sales
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attendee List Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            Attendee List
          </h2>

          {/* Check-in Button - Disabled if event has passed */}
          {!isLoading && (
            <div className="relative">
              {!isCheckinAvailable && daysUntilEvent && daysUntilEvent > 0 && (
                <div className="absolute -top-8 right-0 flex items-center gap-1 text-amber-600 text-xs bg-amber-50 px-2 py-1 rounded whitespace-nowrap">
                  <FiAlertCircle size={12} />
                  <span>
                    Available in {daysUntilEvent} day
                    {daysUntilEvent !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
              <NavLink
                to={`/dashboard/checkin-user/${id}`}
                className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm font-medium flex gap-2 items-center justify-center transition-colors ${
                  isCheckinAvailable && !isEventPassed
                    ? "bg-[#27187E] text-white cursor-pointer hover:bg-[#1f0f5a]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                }`}
                onClick={(e) => {
                  if (!isCheckinAvailable || isEventPassed) {
                    e.preventDefault();
                  }
                }}
              >
                <GoPlus size={20} />
                Check In Attendees
              </NavLink>
            </div>
          )}
        </div>

        {isLoading ? (
          <>
            <SearchFilterSkeleton />
            <div className="hidden lg:block overflow-x-auto">
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
                  {[...Array(5)].map((_, index) => (
                    <TableRowSkeleton key={index} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="lg:hidden">
              {[...Array(3)].map((_, index) => (
                <MobileAttendeeCardSkeleton key={index} />
              ))}
            </div>
            <PaginationSkeleton />
          </>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FiSearch
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by name, email, or ticket code..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full h-11 pl-12 pr-10 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="w-full sm:w-auto h-11 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <option value="All">All Attendees</option>
                  <option value="Checked In">Checked In</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Active filters display */}
            {(searchQuery || filterStatus !== "All") && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    Search: "{searchQuery}"
                    <button
                      onClick={clearSearch}
                      className="ml-1 hover:text-blue-900"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                )}
                {filterStatus !== "All" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                    Status: {filterStatus}
                    <button
                      onClick={() => handleFilterChange("All")}
                      className="ml-1 hover:text-purple-900"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {allAttendees.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-20 border border-gray-200 rounded-lg">
                <div className="mb-4 w-32 sm:w-40 md:w-50 h-24 sm:h-32 md:h-40">
                  <img
                    src={empty}
                    alt="empty"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base text-gray-600 font-medium mb-6 sm:mb-8 text-center px-4">
                  {searchQuery || filterStatus !== "All"
                    ? "No attendees match your search criteria"
                    : "Your guest list is currently empty"}
                </p>
                {(searchQuery || filterStatus !== "All") && (
                  <button
                    onClick={() => {
                      clearSearch();
                      handleFilterChange("All");
                    }}
                    className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Results count */}
                <div className="mb-4 text-sm text-gray-600">
                  Showing {allAttendees.length} of {pagination.totalAttendees}{" "}
                  attendees
                </div>

                <div className="hidden lg:block overflow-x-auto">
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
                      {allAttendees.map((attendee) => (
                        <tr
                          key={attendee._id || attendee.id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <p className="text-sm font-medium text-gray-900">
                              {attendee.fullname}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-gray-600">
                              {attendee.email}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-gray-600">
                              {attendee.phoneNumber}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-gray-600">
                              {new Date(attendee.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm font-medium text-gray-900">
                              {attendee.code}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                attendee.isCheckedIn
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {attendee.isCheckedIn ? "Checked In" : "Pending"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="lg:hidden">
                  {allAttendees.map((attendee) => (
                    <MobileAttendeeCard
                      key={attendee._id || attendee.id}
                      attendee={attendee}
                    />
                  ))}
                </div>

                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 lg:mt-10 pt-4 sm:pt-6 border-t border-gray-200">
                    <button
                      onClick={handlePrevPage}
                      disabled={page === 1 || isFetching}
                      className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiChevronLeft size={20} className="sm:w-5.5 sm:h-5.5" />
                    </button>

                    <div className="hidden sm:flex items-center gap-2">
                      {[...Array(pagination.totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        if (
                          pagination.totalPages <= 7 ||
                          pageNum === 1 ||
                          pageNum === pagination.totalPages ||
                          (pageNum >= page - 2 && pageNum <= page + 2)
                        ) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setPage(pageNum)}
                              disabled={isFetching}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs sm:text-sm font-medium transition-colors ${
                                page === pageNum
                                  ? "bg-indigo-900 text-white"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          (pageNum === 2 && page > 4) ||
                          (pageNum === pagination.totalPages - 1 &&
                            page < pagination.totalPages - 3)
                        ) {
                          return (
                            <span
                              key={pageNum}
                              className="text-gray-500 text-xs sm:text-sm"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <span className="sm:hidden text-xs text-gray-600">
                      Page {page} of {pagination.totalPages}
                    </span>

                    <button
                      onClick={handleNextPage}
                      disabled={page >= pagination.totalPages || isFetching}
                      className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiChevronRight size={20} className="sm:w-5.5 sm:h-5.5" />
                    </button>
                  </div>
                )}
              </>
            )}

            {isFetching && !isLoading && allAttendees.length > 0 && (
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

export default EventDetails;
