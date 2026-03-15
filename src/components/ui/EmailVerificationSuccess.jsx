import React from "react";
import { useNavigate } from "react-router-dom";

const EmailVerificationSuccess = ({ navigate, buttonText }) => {
  console.log(buttonText);
  return (
    <>
      <style>
        {`
          @keyframes starTwinkle {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 1; }
          }
          .animate-star { animation: starTwinkle 3s infinite ease-in-out; }
          .animate-star-delayed { animation: starTwinkle 3s infinite ease-in-out 1.5s; }
        `}
      </style>

      <div className="flex w-full items-center justify-center p-4">
        <div className="w-full max-w-95 bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 md:p-6 text-center border border-gray-50">
          <h2 className="text-[19px] font-bold text-[#1E1B4B] mb-1 tracking-tight">
            Email Verification Complete
          </h2>
          <p className="text-[#8F94A8] text-[12px] leading-tight mb-5 px-2 font-normal">
            You can now proceed to your dashboard to plan your event
          </p>

          <div className="w-[60%] h-45 bg-[#F1F1FF] rounded-2xl flex items-center justify-center mx-auto relative mb-6 overflow-hidden">
            <div className="absolute top-4 left-8 flex flex-col items-center gap-1 animate-star">
              <svg width="14" height="20" viewBox="0 0 18 24" fill="none">
                <path
                  d="M9 0L11.25 10.125L18 12L11.25 13.875L9 24L6.75 13.875L0 12L6.75 10.125L9 0Z"
                  fill="#3D37A3"
                />
              </svg>
              <svg
                width="4"
                height="4"
                viewBox="0 0 6 6"
                fill="none"
                className="-ml-2"
              >
                <path
                  d="M3 0L3.75 2.25L6 3L3.75 3.75L3 6L2.25 3.75L0 3L2.25 2.25L3 0Z"
                  fill="#3D37A3"
                />
              </svg>
            </div>

            <div className="relative flex items-center justify-center scale-[0.85]">
              <div className="absolute w-20 h-20 border-[0.75px] border-[#CBD5E1]/40 rounded-full" />
              <div className="absolute w-16.5 h-16.5 border-[0.75px] border-[#CBD5E1]/40 rounded-full" />

              <svg
                width="90"
                height="90"
                viewBox="0 0 56 62"
                fill="none"
                className="z-10"
              >
                <circle cx="28" cy="34" r="28" fill="#1C1661" />
                <circle cx="28" cy="28" r="28" fill="#C7C1FF" />
                <circle cx="28" cy="28" r="21" fill="#4F46E5" />
                <path
                  d="M21.5 28L26 32.5L35.5 23"
                  stroke="white"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="absolute bottom-5 right-10 animate-star-delayed">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 0L10 6.75L16 8L10 9.25L8 16L6 9.25L0 8L6 6.75L8 0Z"
                  fill="#3D37A3"
                />
              </svg>
            </div>
          </div>

          <button
            onClick={navigate}
            className="w-full bg-[#1E1B4B] hover:bg-[#151336] text-white font-bold py-3 rounded-xl transition-all text-[14px] active:scale-[0.98]"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default EmailVerificationSuccess;
