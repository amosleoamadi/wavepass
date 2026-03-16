import React, { useRef, useState } from "react";
import { FiUploadCloud, FiMapPin } from "react-icons/fi";

const Step1EventDetails = ({ formData, setFormData, onNext, onSaveDraft }) => {
  const fileInputRef = useRef(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Mock data for states and LGAs
  const states = [
    "Lagos",
    "Abuja",
    "Rivers",
    "Kano",
    "Oyo",
    "Kaduna",
    "Delta",
    "Enugu",
  ];

  // Mock LGAs based on selected state
  const getLGAs = (state) => {
    const lgaMap = {
      Lagos: ["Ikeja", "Surulere", "Victoria Island", "Lekki", "Apapa", "Yaba"],
      Abuja: ["Garki", "Wuse", "Maitama", "Asokoro", "Gwarimpa", "Kubwa"],
      Rivers: [
        "Port Harcourt",
        "Obio-Akpor",
        "Eleme",
        "Ikwerre",
        "Oyigbo",
        "Tai",
      ],
      Kano: [
        "Kano Municipal",
        "Nassarawa",
        "Fagge",
        "Gwale",
        "Tarauni",
        "Dala",
      ],
      Oyo: ["Ibadan North", "Ibadan South", "Oyo East", "Ogbomosho", "Saki"],
      Kaduna: ["Kaduna North", "Kaduna South", "Zaria", "Kaura", "Jema'a"],
      Delta: ["Warri", "Uvwie", "Sapele", "Ughelli", "Okpe", "Ethiope"],
      Enugu: ["Enugu East", "Enugu North", "Enugu South", "Nsukka", "Udi"],
    };
    return lgaMap[state] || [];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationSelect = () => {
    // Format the full location string
    const fullLocation = `${formData.street}, ${formData.lga}, ${formData.state}, ${formData.country}`;
    setFormData((prev) => ({
      ...prev,
      location: fullLocation,
    }));
    setIsLocationModalOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          coverImage: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload({ target: { files } });
    }
  };

  const handleSocialLinkChange = (e, index) => {
    const { value } = e.target;
    const newSocialLinks = [...(formData.socialLinks || [])];
    newSocialLinks[index] = value;
    setFormData((prev) => ({
      ...prev,
      socialLinks: newSocialLinks,
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

      {/* Event Details Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Event Details</h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Event Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="enter event title"
              value={formData.title || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Event Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Location
            </label>
            <div className="relative">
              <input
                type="text"
                name="location"
                placeholder="click to set location"
                value={formData.location || ""}
                readOnly
                onClick={() => setIsLocationModalOpen(true)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer bg-gray-50"
              />
              <FiMapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Event Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Event Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Event Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Time
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                name="startTime"
                placeholder="enter event start time"
                value={formData.startTime || ""}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="time"
                name="endTime"
                placeholder="enter event end time"
                value={formData.endTime || ""}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Event Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Description
          </label>
          <textarea
            name="description"
            placeholder="clearly and briefly describe your event"
            value={formData.description || ""}
            onChange={handleInputChange}
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Event Cover Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Cover Image
          </label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDragDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            {formData.coverImage ? (
              <div className="space-y-4">
                <img
                  src={formData.coverImage}
                  alt="Event cover"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-indigo-600 font-medium hover:text-indigo-700"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <FiUploadCloud className="w-12 h-12 mx-auto text-gray-400" />
                <p className="text-gray-600">Drag & drop image here</p>
                <p className="text-gray-500 text-sm">OR</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-indigo-600 font-medium hover:text-indigo-700"
                >
                  Upload Image
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Image size should be less than 5mb
          </p>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">
            Add Social Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Facebook", "LinkedIn", "Twitter/X", "Instagram"].map(
              (platform, index) => (
                <div key={index}>
                  <label className="block text-xs text-gray-600 mb-1">
                    {platform}
                  </label>
                  <input
                    type="url"
                    placeholder={`enter ${platform.toLowerCase()} profile link`}
                    value={formData.socialLinks?.[index] || ""}
                    onChange={(e) => handleSocialLinkChange(e, index)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              ),
            )}
          </div>
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
        <button
          onClick={onNext}
          className="px-8 py-2 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-950 transition-colors"
        >
          Next
        </button>
      </div>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Set Event Location
            </h3>

            {/* Country */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country || ""}
                onChange={handleInputChange}
                placeholder="Enter country"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* State */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                name="state"
                value={formData.state || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select state</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* LGA */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local Government Area
              </label>
              <select
                name="lga"
                value={formData.lga || ""}
                onChange={handleInputChange}
                disabled={!formData.state}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select LGA</option>
                {formData.state &&
                  getLGAs(formData.state).map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
              </select>
            </div>

            {/* Street */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={formData.street || ""}
                onChange={handleInputChange}
                placeholder="Enter street address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLocationSelect}
                disabled={
                  !formData.country ||
                  !formData.state ||
                  !formData.lga ||
                  !formData.street
                }
                className="flex-1 px-4 py-2 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-950 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Set Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1EventDetails;
