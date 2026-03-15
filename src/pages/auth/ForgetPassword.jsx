import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const ForgetPassword = () => {
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

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label className="text-[13px] font-semibold text-gray-600 ml-0.5">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
            <input
              type="email"
              placeholder="enter your email address"
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-lg focus:outline-none focus:border-[#241B7A] transition-all placeholder:text-gray-300 text-[14px]"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-[#241B7A] hover:bg-[#1a135d] text-white font-bold py-3 rounded-lg transition-colors text-sm shadow-sm"
          >
            Send verification code
          </button>
        </div>

        <div className="text-center pt-2">
          <Link
            to="/login"
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
