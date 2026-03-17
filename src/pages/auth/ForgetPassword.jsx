import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
import { useForgotPasswordMutation } from "../../services/authApi";
import logo from "../../assets/public/wavepass.png";

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
      setTimeout(() => navigate("/auth/verify-otp"), 1500);
    } catch (err) {
      setError(
        err?.data?.message || err?.error || "Unable to send verification code",
      );
    }
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 md:p-6 overflow-hidden">
      <header className="flex items-center gap-2 shrink-0 mb-4">
        <div className="bg-[#241B7A] w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-[#241B7A] font-bold text-[16px] md:text-lg tracking-tight">
          Wave Pass
        </span>
      </header>

      <main className="grow flex items-center justify-center">
        <div className="w-full max-w-100 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-2xl font-bold text-[#1E1B4B] mb-1">
              Forgot your password?
            </h2>
            <p className="text-gray-400 text-xs px-2">
              Enter your email address to reset your password
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-gray-500 ml-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  disabled={isLoading}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#241B7A] transition-all text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="min-h-10 flex items-center justify-center">
                <div className="w-full p-2 bg-red-50 border border-red-100 text-red-600 text-[11px] rounded-lg text-center font-medium">
                  {error}
                </div>
              </div>
            )}

            {message && (
              <div className="min-h-10 flex items-center justify-center">
                <div className="w-full p-2 bg-green-50 border border-green-100 text-green-600 text-[11px] rounded-lg text-center font-medium">
                  {message}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#241B7A] hover:bg-[#1a135d] disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl text-sm transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  "Send verification code"
                )}
              </button>

              <div className="text-center">
                <Link
                  to="/auth"
                  className="text-xs font-bold text-gray-500 hover:text-[#241B7A] transition-colors hover:underline"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ForgetPassword;
