import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-100 bg-white rounded-xl shadow-sm p-6 md:p-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-[#1E1B4B] mb-1">
          Unlock Your Event Access
        </h2>
        <p className="text-gray-400 text-[12px]">
          Sign in to access your event account
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label className="text-[13px] font-semibold text-gray-600 ml-0.5 uppercase tracking-wide">
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

        <div className="space-y-1">
          <label className="text-[13px] font-semibold text-gray-600 ml-0.5 uppercase tracking-wide">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="enter your password"
              className="w-full pl-10 pr-10 py-2 bg-white border border-gray-100 rounded-lg focus:outline-none focus:border-[#241B7A] transition-all placeholder:text-gray-300 text-[14px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="text-left">
          <Link
            to="/forgot-password"
            className="text-[11px] font-bold text-gray-500 hover:text-[#241B7A] transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#241B7A] hover:bg-[#1a135d] text-white font-bold py-3 rounded-lg transition-colors text-sm mt-2 shadow-sm"
        >
          Sign in
        </button>

        <p className="text-center text-[12px] text-gray-500 pt-1">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#241B7A] font-extrabold hover:underline ml-1"
          >
            sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
