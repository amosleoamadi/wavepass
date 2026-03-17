import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

// Skeleton Components
const CoverImageSkeleton = () => (
  <div className="w-full h-48 sm:h-64 md:h-80 rounded-xl bg-gray-200 animate-pulse"></div>
);

const PreviewRowSkeleton = ({ hasBorder = true }) => (
  <div
    className={`${hasBorder ? "border-b border-gray-200 pb-4 sm:pb-6" : ""} mb-4 sm:mb-6`}
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <div>
        <div className="w-16 sm:w-20 h-3 sm:h-4 bg-gray-200 rounded mb-1 sm:mb-2 animate-pulse"></div>
        <div className="w-32 sm:w-40 h-4 sm:h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div>
        <div className="w-16 sm:w-20 h-3 sm:h-4 bg-gray-200 rounded mb-1 sm:mb-2 animate-pulse"></div>
        <div className="w-32 sm:w-40 h-4 sm:h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

const DescriptionSkeleton = () => (
  <div className="border-b border-gray-200 pb-4 sm:pb-6 mb-4 sm:mb-6">
    <div className="w-20 sm:w-24 h-3 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-3 animate-pulse"></div>
    <div className="space-y-1 sm:space-y-2">
      <div className="w-full h-3 sm:h-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="w-5/6 h-3 sm:h-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="w-4/6 h-3 sm:h-4 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

const SocialLinksSkeleton = () => (
  <div>
    <div className="w-20 sm:w-24 h-3 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-3 animate-pulse"></div>
    <div className="flex gap-2 sm:gap-3">
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
  </div>
);

const Step3Preview = ({
  formData,
  onPublish,
  onSaveDraft,
  isPublishing,
  message,
}) => {
  const handlePublish = async (e) => {
    e.preventDefault();
    await onPublish();
  };

  const handleSaveDraft = () => {
    onSaveDraft();
  };

  // Map social links to their respective platforms
  const socialPlatforms = [
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "text-blue-600",
      hoverColor: "hover:text-blue-700",
      link: formData.socialLinks?.[0],
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      color: "text-blue-700",
      hoverColor: "hover:text-blue-800",
      link: formData.socialLinks?.[1],
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      color: "text-sky-500",
      hoverColor: "hover:text-sky-600",
      link: formData.socialLinks?.[2],
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      color: "text-pink-600",
      hoverColor: "hover:text-pink-700",
      link: formData.socialLinks?.[3],
    },
  ];

  // Filter out empty social links
  const activeSocials = socialPlatforms.filter(
    (social) => social.link && social.link.trim() !== "",
  );

  // Format price with commas
  const formatPrice = (price) => {
    if (!price) return "0";
    return parseFloat(price).toLocaleString();
  };

  // Show skeleton loading while publishing
  if (isPublishing) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <CoverImageSkeleton />
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          <PreviewRowSkeleton />
          <PreviewRowSkeleton />
          <DescriptionSkeleton />
          <PreviewRowSkeleton hasBorder={false} />
          <SocialLinksSkeleton />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
          <div className="w-full sm:w-24 h-10 bg-gray-200 rounded-lg animate-pulse order-2 sm:order-1"></div>
          <div className="w-full sm:w-32 h-10 bg-gray-200 rounded-lg animate-pulse order-1 sm:order-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Cover Image */}
      {formData.coverImage && (
        <div className="w-full h-48 sm:h-64 md:h-80 rounded-xl overflow-hidden">
          <img
            src={formData.coverImage}
            alt="Event cover"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Event Details Preview */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        {/* Title and Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 border-b border-gray-200 pb-4 sm:pb-6">
          <div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
              Event Title
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-900 wrap-break-word">
              {formData.title || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
              Event Location
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-900 wrap-break-word">
              {formData.location || "Not provided"}
            </p>
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 border-b border-gray-200 pb-4 sm:pb-6">
          <div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
              Event Date
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-900">
              {formData.date || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
              Event Time
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-900 wrap-break-word">
              {formData.startTime || "Not provided"}
              {formData.endTime && ` - ${formData.endTime}`}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="border-b border-gray-200 pb-4 sm:pb-6">
          <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1 sm:mb-2">
            Event Description
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed wrap-break-word">
            {formData.description || "No description provided"}
          </p>
        </div>

        {/* Ticket Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 border-b border-gray-200 pb-4 sm:pb-6">
          <div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
              Ticket Type
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-900 capitalize">
              {formData.ticketType || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
              Ticket Quantity
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-900">
              {formData.ticketQuantity || "0"}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
              Purchase Limit
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-900">
              {formData.ticketPurchaseLimit || "0"}
            </p>
          </div>
          {formData.ticketType === "paid" && (
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
                Ticket Price
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                ₦{formatPrice(formData.ticketPrice)}
              </p>
            </div>
          )}
        </div>

        {/* Social Links - Icons Only */}
        {activeSocials.length > 0 && (
          <div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2 sm:mb-3">
              Social Links
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {activeSocials.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} ${social.hoverColor} transition-all hover:scale-110`}
                    title={`Visit our ${social.name} page`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
          <button
            onClick={handleSaveDraft}
            disabled={isPublishing}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
          >
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="w-full sm:w-auto px-6 sm:px-8 py-2 bg-indigo-900 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-indigo-950 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
          >
            {isPublishing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Publishing...</span>
              </div>
            ) : (
              "Publish Event"
            )}
          </button>
        </div>

        {/* Message Display - Using message from props */}
        {message?.text && (
          <div
            className={`flex items-start sm:items-center gap-2 p-3 sm:p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 sm:mt-0" />
            ) : (
              <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 sm:mt-0" />
            )}
            <p className="text-xs sm:text-sm flex-1">{message.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3Preview;
