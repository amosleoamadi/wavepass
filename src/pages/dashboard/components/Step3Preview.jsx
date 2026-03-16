import React, { useState } from "react";

const Step3Preview = ({ formData, onPublish, onSaveDraft }) => {
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await onPublish();
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      {formData.coverImage && (
        <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden">
          <img
            src={formData.coverImage}
            alt="Event cover"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Event Details Preview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 space-y-6">
        {/* Title and Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-gray-200 pb-6">
          <div>
            <p className="text-sm text-gray-600 font-medium mb-1">
              Event Title
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {formData.title}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium mb-1">
              Event Location
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {formData.location}
            </p>
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-gray-200 pb-6">
          <div>
            <p className="text-sm text-gray-600 font-medium mb-1">Event Date</p>
            <p className="text-lg font-semibold text-gray-900">
              {formData.date}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium mb-1">Event Time</p>
            <p className="text-lg font-semibold text-gray-900">
              {formData.startTime} {formData.endTime && `- ${formData.endTime}`}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="border-b border-gray-200 pb-6">
          <p className="text-sm text-gray-600 font-medium mb-2">
            Event Description
          </p>
          <p className="text-gray-700 leading-relaxed">
            {formData.description}
          </p>
        </div>

        {/* Ticket Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-gray-200 pb-6">
          <div>
            <p className="text-sm text-gray-600 font-medium mb-1">
              Ticket Type
            </p>
            <p className="text-lg font-semibold text-gray-900 capitalize">
              {formData.ticketType}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium mb-1">
              Ticket Quantity
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {formData.ticketQuantity}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium mb-1">
              Purchase Limit
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {formData.ticketPurchaseLimit}
            </p>
          </div>
        </div>

        {/* Social Links */}
        {formData.socialLinks && formData.socialLinks.some((link) => link) && (
          <div>
            <p className="text-sm text-gray-600 font-medium mb-3">
              Social Links
            </p>
            <div className="space-y-2">
              {formData.socialLinks.map(
                (link, index) =>
                  link && (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-gray-600">•</span>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 break-all"
                      >
                        {link}
                      </a>
                    </div>
                  ),
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-between">
        <button
          onClick={onSaveDraft}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Save Draft
        </button>
        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className="px-8 py-2 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-950 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPublishing ? "Publishing..." : "Publish Event"}
        </button>
      </div>
    </div>
  );
};

export default Step3Preview;
