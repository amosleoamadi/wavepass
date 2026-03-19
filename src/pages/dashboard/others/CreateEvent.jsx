import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import Step1EventDetails from "../components/Step1EventDetails";
import Step2TicketDetails from "../components/Step2TicketDetails";
import Step3Preview from "../components/Step3Preview";
import { useCreateEventMutation } from "../../../services/overview";

const EventFormContainer = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [createEvent, { isLoading: isPublishing }] = useCreateEventMutation();
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    country: "",
    state: "",
    lga: "",
    street: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    coverImage: null,
    coverImageFile: null,
    socialLinks: ["", "", "", ""],
    ticketType: "free",
    ticketQuantity: "",
    ticketPurchaseLimit: "",
    ticketPrice: "",
    status: "draft",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };

  const handleNextStep = () => {
    setMessage({ type: "", text: "" });
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setMessage({ type: "", text: "" });
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    setMessage({ type: "", text: "" });

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title || "Untitled Draft");

      formDataToSend.append("category", formData.category || "Other");

      formDataToSend.append("location", formData.location || "TBD");
      formDataToSend.append("description", formData.description || "");

      formDataToSend.append("type", formData.ticketType || "free");
      formDataToSend.append("status", "draft");

      if (formData.coverImageFile instanceof File) {
        formDataToSend.append("cover", formData.coverImageFile);
      }

      const qty = parseInt(formData.ticketQuantity);
      formDataToSend.append("quantity", isNaN(qty) ? 0 : qty);

      const limit = parseInt(formData.ticketPurchaseLimit);
      formDataToSend.append("limit", isNaN(limit) ? 0 : limit);

      const price = parseFloat(formData.ticketPrice);
      const priceValue =
        formData.ticketType === "paid" && !isNaN(price) ? price : 0;
      formDataToSend.append("price", priceValue);

      if (formData.date) {
        formDataToSend.append("date", formatDate(formData.date));
        if (formData.startTime) {
          formDataToSend.append(
            "start",
            `${formData.date}T${formData.startTime}:00`,
          );
        }
        if (formData.endTime) {
          formDataToSend.append(
            "end",
            `${formData.date}T${formData.endTime}:00`,
          );
        }
      }

      formDataToSend.append("facebook", formData.socialLinks[0] || "");
      formDataToSend.append("linkedIn", formData.socialLinks[1] || "");
      formDataToSend.append("twitter", formData.socialLinks[2] || "");
      formDataToSend.append("instagram", formData.socialLinks[3] || "");

      const response = await createEvent(formDataToSend).unwrap();

      setMessage({
        type: "success",
        text: response?.data?.message,
      });

      setTimeout(() => {
        navigate("/dashboard/event-management");
      }, 1000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.response?.data?.message || "Failed to save draft.",
      });
    }
  };

  const handlePublish = async () => {
    setMessage({ type: "", text: "" });

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("type", formData.ticketType);
      formDataToSend.append("status", "publish");

      if (formData.coverImageFile) {
        formDataToSend.append("cover", formData.coverImageFile);
      }

      formDataToSend.append("quantity", parseInt(formData.ticketQuantity) || 0);
      formDataToSend.append(
        "limit",
        parseInt(formData.ticketPurchaseLimit) || 0,
      );

      const priceValue =
        formData.ticketType === "paid"
          ? parseFloat(formData.ticketPrice) || 0
          : 0;
      formDataToSend.append("price", priceValue);

      const formattedDate = formatDate(formData.date);
      formDataToSend.append("date", formattedDate);

      if (formData.date && formData.startTime) {
        const startTimestamp = `${formData.date}T${formData.startTime}:00`;
        formDataToSend.append("start", startTimestamp);
      }

      if (formData.date && formData.endTime) {
        const endTimestamp = `${formData.date}T${formData.endTime}:00`;
        formDataToSend.append("end", endTimestamp);
      }

      formDataToSend.append("facebook", formData.socialLinks[0] || "");
      formDataToSend.append("linkedIn", formData.socialLinks[1] || "");
      formDataToSend.append("twitter", formData.socialLinks[2] || "");
      formDataToSend.append("instagram", formData.socialLinks[3] || "");

      const response = await createEvent(formDataToSend).unwrap();

      setMessage({
        type: "success",
        text: response?.data?.message,
      });

      setTimeout(() => {
        navigate("/dashboard/event-management");
      }, 1000);
    } catch (error) {
      const errorMsg =
        error?.data?.message ||
        "Failed to publish event. Please check all fields.";
      setMessage({
        type: "error",
        text: errorMsg,
      });
    }
  };

  const updateFormData = (newData) => {
    setFormData(newData);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FiChevronLeft size={20} />
        <span className="text-gray-700 font-medium">Back</span>
      </div>

      {/* Step Content */}
      <div className="bg-gray-50 rounded-lg p-6 sm:p-8">
        {currentStep === 1 && (
          <Step1EventDetails
            formData={formData}
            setFormData={updateFormData}
            onNext={handleNextStep}
            onSaveDraft={handleSaveDraft}
          />
        )}

        {currentStep === 2 && (
          <Step2TicketDetails
            formData={formData}
            setFormData={updateFormData}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            onSaveDraft={handleSaveDraft}
          />
        )}

        {currentStep === 3 && (
          <Step3Preview
            formData={formData}
            onPublish={handlePublish}
            onSaveDraft={handleSaveDraft}
            isPublishing={isPublishing}
            message={message}
          />
        )}

        {/* Global Message Display (for steps 1 & 2) */}
        {currentStep < 3 && message.text && (
          <div className="mt-6">
            <div
              className={`flex items-center gap-2 p-3 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <FiCheckCircle className="w-5 h-5 shrink-0" />
              ) : (
                <FiAlertCircle className="w-5 h-5 shrink-0" />
              )}
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFormContainer;
