import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
import { useForgotPasswordMutation } from "../../services/authApi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const response = await forgotPassword({ email }).unwrap();
      setMessage(response?.message || "Verification code sent to your email");
      localStorage.setItem("userEmail", email);
      navigate("/auth/verify-otp");
    } catch (err) {
      setError(
        err?.data?.message || err?.error || "Unable to send verification code",
      );
    }
  };

  return (
    <div className="w-full max-w-100 bg-white rounded-xl shadow-sm p-6 md:p-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-[#1E1B4B] mb-1">
          Forgot your password?
        </h2>
        <p className="text-gray-400 text-[12px] px-4">
          Enter your email address to reset your password
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-[13px] font-semibold text-gray-600 ml-0.5">
            Email address
          </label>

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email address"
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-lg focus:outline-none focus:border-[#241B7A] transition-all placeholder:text-gray-300 text-[14px]"
            />
          </div>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-green-50 border border-red-100 text-red-600 text-[12px] rounded-lg text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 bg-green-50 border border-green-100 text-green-600 text-[12px] rounded-lg text-center">
            {message}
          </div>
        )}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#241B7A] hover:bg-[#1a135d] disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors text-sm shadow-sm flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send verification code"
            )}
          </button>
        </div>

        <div className="text-center pt-2">
          <Link
            to="/auth"
            className="text-[12px] font-bold text-gray-500 hover:text-[#241B7A] transition-colors"
          >
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
