import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/LogoWrap.png";
// Make sure to import your background image
import backgroundImage from "../../assets/404.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col">
      {/* Header with Logo */}
      <div className="px-4 sm:px-6 lg:px-10 py-2 sm:py-4 bg-white">
        <div className="flex items-center w-56 h-12">
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none ">
          <img
            src={backgroundImage}
            alt="404 background"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white text-opacity-90 mb-8 sm:mb-12">
            Sorry, the page you are looking for does not exist
          </p>

          {/* Back to Home Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-block cursor-pointer px-8 sm:px-10 py-3 sm:py-4 bg-white text-indigo-950 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 text-base sm:text-lg"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
