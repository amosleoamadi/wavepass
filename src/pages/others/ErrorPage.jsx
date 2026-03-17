// pages/others/ErrorPage.jsx
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import {
  FiAlertCircle,
  FiHome,
  FiRefreshCw,
  FiArrowLeft,
} from "react-icons/fi";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  // Determine error type
  const isNotFound = error?.status === 404;
  const isServerError = error?.status >= 500;
  const isNetworkError =
    error?.message?.includes("network") || !navigator.onLine;

  // Get appropriate error message
  const getErrorMessage = () => {
    if (isNotFound) return "Page Not Found";
    if (isServerError) return "Server Error";
    if (isNetworkError) return "Network Error";
    return "Something Went Wrong";
  };

  const getErrorDescription = () => {
    if (isNotFound) {
      return "The page you're looking for doesn't exist or has been moved.";
    }
    if (isServerError) {
      return "Our servers are having trouble. Please try again later.";
    }
    if (isNetworkError) {
      return "Please check your internet connection and try again.";
    }
    return "An unexpected error occurred. Our team has been notified.";
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Illustration */}
        <div className="relative mb-8">
          {/* Animated circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-indigo-50 rounded-full animate-ping-slow opacity-20" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-indigo-100 rounded-full animate-pulse-slow opacity-30" />
          </div>

          {/* Error Icon */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="w-32 h-32 bg-linear-to-br from-indigo-600 to-indigo-800 rounded-2xl rotate-45 transform-gpu shadow-xl flex items-center justify-center">
              <div className="w-20 h-20 bg-white/10 rounded-xl -rotate-45 backdrop-blur-sm flex items-center justify-center">
                <FiAlertCircle className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-200 rounded-full animate-float" />
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-300 rounded-full animate-float-delayed" />
        </div>

        {/* Error Code */}
        {error?.status && (
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 font-mono font-bold rounded-full text-sm border border-indigo-200">
              Error {error.status}
            </span>
          </div>
        )}

        {/* Error Message */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          {getErrorMessage()}
        </h1>

        <p className="text-gray-600 text-sm sm:text-base mb-8 leading-relaxed">
          {getErrorDescription()}
        </p>

        {/* Action Buttons */}
        <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:gap-4">
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>

          <button
            onClick={handleRefresh}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <FiRefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>

          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
          >
            <FiHome className="w-4 h-4" />
            Go Home
          </button>
        </div>

        {/* Error Details (only in development) */}
        {import.meta.env.DEV && error?.message && (
          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-left">
            <p className="text-xs font-mono text-gray-500 mb-2">
              Error Details (Dev Only):
            </p>
            <p className="text-sm font-mono text-red-600 wrap-break-word">
              {error.message}
            </p>
            {error?.stack && (
              <pre className="mt-2 text-xs font-mono text-gray-500 overflow-auto max-h-40">
                {error.stack}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
