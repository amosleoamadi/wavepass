import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { X, AlertCircle, CheckCircle2 } from "lucide-react";
import { useVerifyEmailMutation } from "../../services/authApi";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const [seconds, setSeconds] = useState(119);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    setErrors("");

    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(data)) return;

    const pasteData = data.split("");
    const newOtp = [...otp];
    pasteData.forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
        if (inputRefs.current[index]) inputRefs.current[index].value = char;
      }
    });
    setOtp(newOtp);
    const nextFocus = data.length < 6 ? data.length : 5;
    inputRefs.current[nextFocus].focus();
  };

  const validate = () => {
    if (otp.some((digit) => digit === "")) {
      setErrors("Please enter the complete 6-digit code");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const code = otp.join("");
        const response = await verifyEmail({ code }).unwrap();

        setMessage({
          type: "success",
          text: response?.message || "Email verified successfully!",
        });

        setTimeout(() => navigate("/login"), 2500);
      } catch (error) {
        const errorMsg =
          error?.data?.message || "Invalid or expired code. Please try again.";
        setMessage({ type: "error", text: errorMsg });
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainderSeconds = time % 60;
    return `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}s`;
  };

  return (
    <div className="w-full max-w-100 bg-white rounded-xl shadow-sm p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-[#1E1B4B] mb-1">
          Verify Your Email
        </h2>
        <p className="text-gray-400 text-[12px] leading-tight px-4">
          Please input the code sent to your email
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div
            className="flex justify-between gap-2 px-2"
            onPaste={handlePaste}
          >
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                className={`w-10 h-10 md:w-12 md:h-12 text-center bg-[#F3F4F6] border rounded-lg focus:outline-none focus:bg-white transition-all text-lg font-semibold text-[#1E1B4B] ${
                  errors
                    ? "border-red-400"
                    : "border-transparent focus:border-[#241B7A]"
                }`}
              />
            ))}
          </div>
          {errors && (
            <p className="text-center text-[11px] text-red-500 font-medium">
              {errors}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#241B7A] hover:bg-[#1a135d] disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors text-sm shadow-sm"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>

        <div className="text-center space-y-4">
          <p className="text-[12px] text-gray-500 font-medium">
            Didn't receive any code?
          </p>
          <div className="flex justify-between items-center px-2">
            {message.text && (
              <div
                className={`mt-4 flex items-center justify-between p-3 rounded-lg border animate-in fade-in slide-in-from-bottom-2 ${
                  message.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  {message.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <p className="text-[12px] font-medium leading-tight">
                    {message.text}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMessage({ type: "", text: "" })}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <button
              type="button"
              disabled={seconds > 0}
              onClick={() => {
                setSeconds(119);
                setIsActive(true);
              }}
              className={`text-[12px] font-semibold border-b pb-0.5 transition-colors ${
                seconds > 0
                  ? "text-gray-300 border-gray-200 cursor-not-allowed"
                  : "text-[#241B7A] border-[#241B7A] cursor-pointer"
              }`}
            >
              Resend code in
            </button>
            <span className="text-[#F43F5E] font-bold text-sm min-w-11.25 text-right">
              {formatTime(seconds)}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
