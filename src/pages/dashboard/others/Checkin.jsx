import { useState, useRef, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAttendeeByCodeQuery,
  useCheckinAttendeeMutation,
} from "../../../services/overview";

const CheckIn = () => {
  const { id } = useParams();
  const [ticketCode, setTicketCode] = useState("");
  const [debouncedCode, setDebouncedCode] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const debounceTimeoutRef = useRef(null);

  // Use debounced code for the API call
  const {
    data: attendeeResponse,
    isLoading: searchLoading,
    error: searchError,
    isFetching,
    refetch,
  } = useGetAttendeeByCodeQuery(debouncedCode, {
    skip: !debouncedCode || debouncedCode.trim() === "",
  });

  const [checkinAttendee, { isLoading: checkInLoading }] =
    useCheckinAttendeeMutation();

  // Debounce function to wait for user to stop typing/pasting
  const handleSearchDebounce = useCallback((value) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedCode(value);
    }, 500); // Wait 500ms after user stops typing/pasting
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    // Allow any characters
    const upperValue = value.toUpperCase();
    setTicketCode(upperValue);
    handleSearchDebounce(upperValue);
  };

  const handlePaste = (e) => {
    // Allow paste to work normally
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const upperPastedText = pastedText.toUpperCase();
    setTicketCode(upperPastedText);
    handleSearchDebounce(upperPastedText);
  };

  const handleCheckIn = async () => {
    if (!attendeeData || !id) return;

    try {
      await checkinAttendee({
        code: debouncedCode,
        eventId: id,
      }).unwrap();

      // Refetch to get updated attendee data
      refetch();
    } catch (err) {
      // Error is handled by the mutation, but we can show it if needed
      console.error("Check-in failed:", err);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Clear search when user clears input
  const handleClear = () => {
    setTicketCode("");
    setDebouncedCode("");
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  };

  // Get attendee info from response - data is directly in response.data
  const attendeeData = attendeeResponse?.data;
  const isCheckedIn = attendeeData?.isCheckedIn || false;

  // Determine if we should show search loading
  const isSearching = (searchLoading || isFetching) && debouncedCode;

  // Check if code exists but no attendee found (not loading and no attendee)
  const showNotFoundError =
    debouncedCode && !isSearching && !attendeeData && searchError;

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Attendee Check-In
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Enter the ticket code to check in an attendee.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="flex flex-col gap-6 max-w-md">
        {/* Ticket Code Label */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Ticket Code
          </label>

          {/* Input Field with Clear Button */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={ticketCode}
              onChange={handleChange}
              onPaste={handlePaste}
              placeholder="Enter ticket code"
              disabled={searchLoading || checkInLoading}
              className="w-full px-4 py-3 text-lg font-semibold uppercase border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27187E] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-10"
              autoFocus
            />
            {ticketCode && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear input"
              >
                ✕
              </button>
            )}
          </div>

          {/* Helper text */}
          <p className="text-xs text-gray-500 mt-2">
            {ticketCode
              ? isSearching
                ? "✓ Searching..."
                : attendeeData
                  ? "✓ Attendee found"
                  : "Enter ticket code to search"
              : "Enter ticket code to search"}
          </p>

          {/* Loading Indicator */}
          {isSearching && (
            <p className="text-blue-600 text-xs mt-2">
              Searching for attendee...
            </p>
          )}

          {/* Not Found Error */}
          {showNotFoundError && (
            <p className="text-red-500 text-xs mt-2">
              Attendee not found. Please check the ticket code.
            </p>
          )}
        </div>

        {/* Attendee Info Section - Only shown when attendee found */}
        {attendeeData && debouncedCode && !isSearching && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Name
                </p>
                <p className="text-gray-900 font-medium">
                  {attendeeData.fullname || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Email
                </p>
                <p className="text-gray-700 text-sm break-all">
                  {attendeeData.email || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Phone Number
                </p>
                <p className="text-gray-700 text-sm">
                  {attendeeData.phoneNumber || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Ticket Code
                </p>
                <p className="text-gray-700 text-sm font-mono">
                  {attendeeData.code || debouncedCode}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Registration Date
                </p>
                <p className="text-gray-700 text-sm">
                  {attendeeData.createdAt
                    ? new Date(attendeeData.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )
                    : "N/A"}
                </p>
              </div>
              <div className="pt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    isCheckedIn
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {isCheckedIn ? "Checked In" : "Pending"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Check In Button - Only show if attendee found and not already checked in */}
        {attendeeData && debouncedCode && !isCheckedIn && !isSearching && (
          <button
            onClick={handleCheckIn}
            disabled={checkInLoading}
            className="w-full px-6 py-3 bg-[#27187E] text-white font-medium rounded-lg hover:bg-[#1f0f5a] active:bg-[#160854] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
          >
            {checkInLoading ? "Checking In..." : "Check In"}
          </button>
        )}

        {/* Already Checked In Message */}
        {attendeeData && debouncedCode && isCheckedIn && !isSearching && (
          <div className="w-full px-6 py-3 bg-green-100 text-green-700 font-medium rounded-lg text-center">
            Already Checked In
          </div>
        )}

        {/* Success Message after check-in */}
        {!isSearching && attendeeData && isCheckedIn && (
          <div className="w-full px-6 py-3 bg-green-50 text-green-700 font-medium rounded-lg text-center border border-green-200">
            ✓ Successfully checked in at{" "}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
