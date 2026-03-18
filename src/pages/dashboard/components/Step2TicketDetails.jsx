import React, { useState } from "react";
import { useSelector } from "react-redux";

const Step2TicketDetails = ({
  formData,
  setFormData,
  onNext,
  onPrev,
  onSaveDraft,
}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSavingDraft, setIsSavingDraft] = useState(false); // Loading state for save draft

  const user = useSelector((state) => state.user?.user);
  const fullName = user?.fullname || "User";
  const FirstName = fullName.split(" ")[0];

  const validateField = (name, value) => {
    switch (name) {
      case "ticketQuantity":
        if (!value || value === "") return "Ticket quantity is required";
        if (parseInt(value) <= 0)
          return "Ticket quantity must be greater than 0";
        if (parseInt(value) > 10000)
          return "Ticket quantity cannot exceed 10,000";
        return "";

      case "ticketPurchaseLimit":
        if (!value || value === "") return "Purchase limit is required";
        if (parseInt(value) <= 0)
          return "Purchase limit must be greater than 0";
        if (parseInt(value) > 100) return "Purchase limit cannot exceed 100";
        return "";

      case "ticketPrice":
        if (formData.ticketType === "paid") {
          if (!value || value === "")
            return "Ticket price is required for paid tickets";
          if (parseFloat(value) <= 0)
            return "Ticket price must be greater than 0";
        }
        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    newErrors.ticketQuantity = validateField(
      "ticketQuantity",
      formData.ticketQuantity,
    );
    newErrors.ticketPurchaseLimit = validateField(
      "ticketPurchaseLimit",
      formData.ticketPurchaseLimit,
    );

    if (formData.ticketType === "paid") {
      newErrors.ticketPrice = validateField(
        "ticketPrice",
        formData.ticketPrice,
      );
    }

    setErrors(newErrors);

    // Mark all fields as touched
    const allTouched = {
      ticketQuantity: true,
      ticketPurchaseLimit: true,
    };
    if (formData.ticketType === "paid") {
      allTouched.ticketPrice = true;
    }
    setTouched(allTouched);

    // Return true if no errors
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      ["ticketQuantity", "ticketPurchaseLimit", "ticketPrice"].includes(name)
    ) {
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Validate on change
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    } else {
      // Scroll to first error
      const firstError = document.querySelector(".border-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    try {
      await onSaveDraft();
    } finally {
      setIsSavingDraft(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Greeting */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Hello {FirstName},
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Set up your ticket details
        </p>
      </div>

      {/* Ticket Details Section */}
      <div className="">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
          Ticket Details
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {/* Ticket Type and Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Ticket Type */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Ticket Type
              </label>
              <select
                name="ticketType"
                value={formData.ticketType || "free"}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
              >
                <option value="free">Free Ticket</option>
                <option value="paid">Paid Ticket</option>
              </select>
            </div>

            {/* Ticket Quantity */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Ticket Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ticketQuantity"
                placeholder="0"
                value={formData.ticketQuantity || ""}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  touched.ticketQuantity && errors.ticketQuantity
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {touched.ticketQuantity && errors.ticketQuantity && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.ticketQuantity}
                </p>
              )}
            </div>
          </div>

          {/* Ticket Purchase Limit */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Ticket Purchase Limit <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ticketPurchaseLimit"
              placeholder="0"
              value={formData.ticketPurchaseLimit || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                touched.ticketPurchaseLimit && errors.ticketPurchaseLimit
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Maximum number of tickets each person can purchase
            </p>
            {touched.ticketPurchaseLimit && errors.ticketPurchaseLimit && (
              <p className="mt-1 text-xs text-red-500">
                {errors.ticketPurchaseLimit}
              </p>
            )}
          </div>

          {/* Ticket Price (conditional) */}
          {formData.ticketType === "paid" && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Ticket Price (₦) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₦</span>
                </div>
                <input
                  type="text"
                  name="ticketPrice"
                  placeholder="0.00"
                  value={formData.ticketPrice || ""}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full pl-8 pr-3 sm:pl-10 sm:pr-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    touched.ticketPrice && errors.ticketPrice
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>
              {touched.ticketPrice && errors.ticketPrice && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.ticketPrice}
                </p>
              )}
            </div>
          )}

          {/* Ticket Summary - Optional helpful info */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Ticket Summary
            </h3>
            <div className="space-y-1 text-xs sm:text-sm text-gray-600">
              <p>
                <span className="font-medium">Type:</span>{" "}
                {formData.ticketType === "free" ? "Free Ticket" : "Paid Ticket"}
              </p>
              {formData.ticketQuantity && (
                <p>
                  <span className="font-medium">Total Tickets:</span>{" "}
                  {formData.ticketQuantity}
                </p>
              )}
              {formData.ticketPurchaseLimit && (
                <p>
                  <span className="font-medium">Per Person Limit:</span>{" "}
                  {formData.ticketPurchaseLimit}
                </p>
              )}
              {formData.ticketType === "paid" && formData.ticketPrice && (
                <p>
                  <span className="font-medium">Price per Ticket:</span> ₦
                  {parseFloat(formData.ticketPrice).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
        <button
          onClick={handleSaveDraft}
          disabled={isSavingDraft}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-3 sm:order-1 flex items-center justify-center gap-2"
        >
          {isSavingDraft ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            "Save Draft"
          )}
        </button>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onPrev}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 font-medium hover:bg-gray-50 transition-colors order-1 sm:order-2"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-6 sm:px-8 py-2 bg-indigo-900 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-indigo-950 transition-colors order-2 sm:order-3"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2TicketDetails;
