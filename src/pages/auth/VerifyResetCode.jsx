import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { X, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import EmailVerificationSuccess from "../../components/ui/EmailVerificationSuccess";
import {
  useVerifyEmailMutation,
  useResendCodeMutation,
} from "../../services/authApi";
import logo from "../../assets/public/wavepass.png";

const VerifyResetCode = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendCode, { isLoading: isResending }] = useResendCodeMutation();

  const [seconds, setSeconds] = useState(119);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (message.text && !isVerified) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message, isVerified]);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0) {
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
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(data)) return;
    const pasteData = data.split("");
    const newOtp = [...otp];
    pasteData.forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    const nextFocus = data.length < 6 ? data.length : 5;
    inputRefs.current[nextFocus]?.focus();
  };

  const validate = () => {
    if (otp.some((digit) => digit === "")) {
      setErrors("Enter the complete 6-digit code");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const data = {
          email: localStorage.getItem("userEmail"),
          otp: otp.join(""),
        };
        await verifyEmail(data).unwrap();
        setIsVerified(true);
      } catch (error) {
        setMessage({
          type: "error",
          text: error?.data?.message || "Invalid code",
        });
      }
    }
  };

  const handleResend = async () => {
    if (seconds > 0 || isResending) return;
    try {
      const data = { email: localStorage.getItem("userEmail") };
      const response = await resendCode(data).unwrap();
      setMessage({
        type: "success",
        text: response?.message || "Verification code resent!",
      });
      setSeconds(119);
      setIsActive(true);
      setOtp(new Array(6).fill(""));
      inputRefs.current[0].focus();
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.data?.message || "Failed to resend code",
      });
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainderSeconds = time % 60;
    return `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}s`;
  };

  if (isVerified) {
    return (
      <EmailVerificationSuccess
        navigate={() => navigate("/auth/reset-password")}
        buttonText="Go to Reset password"
      />
    );
  }

  return (
    <div className="h-dvh w-full flex flex-col p-4 sm:p-6">
      <header className="flex items-center gap-2 shrink-0 mb-2">
        <div className="bg-[#241B7A] w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden">
          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-[#241B7A] font-bold text-base tracking-tight">
          Wave Pass
        </span>
      </header>

      <main className="grow flex items-center justify-center">
        <div className="w-full max-w-100 bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-6 sm:px-8 flex flex-col transition-all">
          <div className="text-center mb-5">
            <h2 className="text-xl font-bold text-[#1E1B4B] mb-1">
              Verify Your Email
            </h2>
            <p className="text-gray-400 text-xs px-2">
              Input the code sent to your email
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div
                className="grid grid-cols-6 gap-2 w-full"
                onPaste={handlePaste}
              >
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={(e) => e.target.select()}
                    className={`w-full aspect-square text-center bg-gray-50 border rounded-xl focus:outline-none transition-all text-base sm:text-lg font-bold text-[#1E1B4B] ${
                      errors
                        ? "border-red-400 ring-1 ring-red-400"
                        : "border-gray-100 focus:border-[#241B7A] focus:bg-white focus:ring-1 focus:ring-[#241B7A]"
                    }`}
                  />
                ))}
              </div>

              <div className="h-4 flex items-center justify-center">
                {errors && (
                  <p className="text-[10px] font-bold text-red-500 uppercase">
                    {errors}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-[#241B7A] hover:bg-[#1a135d] disabled:bg-gray-300 text-white font-bold py-3 rounded-xl text-sm transition-transform active:scale-95 flex items-center justify-center"
            >
              {isVerifying ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Verify Code"
              )}
            </button>

            <div className="pt-1">
              <div className="flex flex-col items-center gap-3">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">
                  Didn't receive any code?
                </p>
                <div className="flex justify-between items-center w-full px-1">
                  <button
                    type="button"
                    disabled={seconds > 0 || isResending}
                    onClick={handleResend}
                    className={`text-[11px] font-bold transition-colors ${
                      seconds > 0 || isResending
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-[#241B7A] hover:underline"
                    }`}
                  >
                    {isResending ? "Resending..." : "Resend code"}
                  </button>
                  <span className="text-[#F43F5E] font-bold text-[11px] bg-red-50 px-2 py-0.5 rounded">
                    {formatTime(seconds)}
                  </span>
                </div>
              </div>
            </div>

            <div className="min-h-8 flex items-end">
              {message.text && (
                <div
                  className={`flex items-center justify-between w-full p-2 rounded-lg border text-[10px] font-bold ${
                    message.type === "success"
                      ? "bg-green-50 border-green-100 text-green-700"
                      : "bg-red-50 border-red-100 text-red-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {message.type === "success" ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    <span>{message.text}</span>
                  </div>
                  <X
                    className="w-3 h-3 cursor-pointer opacity-50"
                    onClick={() => setMessage({ type: "", text: "" })}
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default VerifyResetCode;
