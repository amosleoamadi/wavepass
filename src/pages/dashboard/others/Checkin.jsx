import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const CheckIn = () => {
  const { id } = useParams();
  const [ticketCode, setTicketCode] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [attendeeInfo, setAttendeeInfo] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Mock data for demonstration
  const mockAttendee = {
    _id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 801 234 5678",
    code: "ABC123",
    checkedInStatus: "pending", // "pending" or "checked_in"
  };

  // Auto-search when ticket code is complete (6 characters)
  useEffect(() => {
    if (ticketCode.length === 6 && id) {
      searchAttendee(ticketCode);
    } else {
      setAttendeeInfo(null);
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketCode, id]);

  const searchAttendee = async (code) => {
    setSearchLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock response - in real app, this would come from your API
      if (code === "ABC123") {
        setAttendeeInfo(mockAttendee);
      } else {
        throw new Error("Attendee not found");
      }
    } catch (err) {
      setError(err.message || "Attendee not found");
      setAttendeeInfo(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    // Allow alphanumeric characters and limit to 6 characters
    if (value === "" || /^[a-zA-Z0-9]*$/.test(value)) {
      setTicketCode(value.toUpperCase().slice(0, 6));
    }
  };

  const handleCheckIn = async () => {
    if (!attendeeInfo || !id) {
      setError("No valid attendee found");
      return;
    }

    setCheckInLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAttendeeInfo({
        ...attendeeInfo,
        checkedInStatus: "checked_in",
      });
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to check in attendee");
    } finally {
      setCheckInLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
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
          Enter the 6-character ticket code to check in an attendee.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="flex flex-col gap-6 max-w-md">
        {/* Ticket Code Label */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Ticket Code
          </label>

          {/* Single Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={ticketCode}
            onChange={handleChange}
            placeholder=""
            disabled={searchLoading || checkInLoading}
            className="w-full px-4 py-3 text-lg font-semibold uppercase border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27187E] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            autoFocus
          />

          {/* Helper text */}
          <p className="text-xs text-gray-500 mt-2">
            {ticketCode.length === 6
              ? "✓ Code entered"
              : `${6 - ticketCode.length} more character${6 - ticketCode.length !== 1 ? "s" : ""} needed`}
          </p>

          {/* Error Message */}
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          {/* Loading Indicator */}
          {searchLoading && (
            <p className="text-blue-600 text-xs mt-2">
              Searching for attendee...
            </p>
          )}
        </div>

        {/* Attendee Info Section - Only shown when attendee found */}
        {attendeeInfo && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Name
                </p>
                <p className="text-gray-900 font-medium">{attendeeInfo.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Email
                </p>
                <p className="text-gray-700 text-sm">{attendeeInfo.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Phone
                </p>
                <p className="text-gray-700 text-sm">{attendeeInfo.phone}</p>
              </div>
              <div className="pt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    attendeeInfo.checkedInStatus === "checked_in"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {attendeeInfo.checkedInStatus === "checked_in"
                    ? "Checked In"
                    : "Pending"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Check In Button */}
        {attendeeInfo && attendeeInfo.checkedInStatus !== "checked_in" && (
          <button
            onClick={handleCheckIn}
            disabled={checkInLoading}
            className="w-full px-6 py-3 bg-[#27187E] text-white font-medium rounded-lg hover:bg-[#1f0f5a] active:bg-[#160854] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
          >
            {checkInLoading ? "Checking In..." : "Check In"}
          </button>
        )}

        {/* Already Checked In Message */}
        {attendeeInfo && attendeeInfo.checkedInStatus === "checked_in" && (
          <div className="w-full px-6 py-3 bg-green-100 text-green-700 font-medium rounded-lg text-center">
            Already Checked In
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
