import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import Step1EventDetails from "../components/Step1EventDetails";
import Step2TicketDetails from "../components/Step2TicketDetails";
import Step3Preview from "../components/Step3Preview";

const EventFormContainer = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
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
    socialLinks: ["", "", "", ""],
    ticketType: "free",
    ticketQuantity: "",
    ticketPurchaseLimit: "",
    ticketPrice: "",
  });

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData);
    alert("Draft saved successfully!");
  };

  const handlePublish = async () => {
    console.log("Publishing event:", formData);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Event published successfully!");
    navigate("/dashboard/my-events");
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
            setFormData={setFormData}
            onNext={handleNextStep}
            onSaveDraft={handleSaveDraft}
          />
        )}

        {currentStep === 2 && (
          <Step2TicketDetails
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            onSaveDraft={handleSaveDraft}
          />
        )}

        {currentStep === 3 && (
          <Step3Preview
            formData={formData}
            onPrev={handlePrevStep}
            onPublish={handlePublish}
            onSaveDraft={handleSaveDraft}
          />
        )}
      </div>
    </div>
  );
};

export default EventFormContainer;
