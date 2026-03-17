import React from "react";

const Step2TicketDetails = ({
  formData,
  setFormData,
  onNext,
  onPrev,
  onSaveDraft,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Hello Cynthia,
        </h1>
        <p className="text-gray-600 mt-1">Start setting up your event</p>
      </div>

      {/* Ticket Details Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Ticket Details</h2>

        <div className="space-y-6">
          {/* Ticket Type and Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Ticket Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ticket Type
              </label>
              <select
                name="ticketType"
                value={formData.ticketType || "free"}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
              >
                <option value="free">Free Ticket</option>
                <option value="paid">Paid Ticket</option>
              </select>
            </div>

            {/* Ticket Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ticket Quantity
              </label>
              <input
                type="number"
                name="ticketQuantity"
                placeholder="0"
                value={formData.ticketQuantity || ""}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Ticket Purchase Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Purchase Limit
            </label>
            <input
              type="number"
              name="ticketPurchaseLimit"
              placeholder="0"
              value={formData.ticketPurchaseLimit || ""}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Ticket Price (conditional) */}
          {formData.ticketType === "paid" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ticket Price
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">₦</span>
                <input
                  type="number"
                  name="ticketPrice"
                  placeholder="0.00"
                  value={formData.ticketPrice || ""}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-between">
        <button
          onClick={onSaveDraft}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Save Draft
        </button>
        <div className="flex gap-4">
          <button
            onClick={onPrev}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="px-8 py-2 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-950 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2TicketDetails;
