import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 md:px-12 py-3.5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo Section - Fixed width for symmetry */}
        <div className="w-[180px] flex-shrink-0">
          <Link to="/" className="flex items-center gap-2.5 w-fit">
            <div className="w-10 h-10 bg-[#1C1661] rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-[14px]">WP</span>
            </div>
            <span className="text-[#1C1661] font-extrabold text-[18px] tracking-tight hidden sm:block">
              Wave Pass
            </span>
          </Link>
        </div>

        {/* Navigation & Search Container */}
        <div
          className={`flex-1 flex items-center ${isHomePage ? "justify-center" : "justify-start px-8"}`}
        >
          <nav className="flex items-center gap-10">
            <Link
              to="/discover"
              className="text-[#4B5563] font-semibold text-[14px] hover:text-[#1C1661] transition-colors whitespace-nowrap"
            >
              Discover Events
            </Link>
            <Link
              to="/about"
              className="text-[#4B5563] font-semibold text-[14px] hover:text-[#1C1661] transition-colors whitespace-nowrap"
            >
              About Us
            </Link>
          </nav>

          {/* Search Bar - Hidden on Home */}
          {!isHomePage && (
            <div className="relative w-full max-w-[420px] ml-10 animate-in fade-in slide-in-from-left-2 duration-300">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
              <input
                type="text"
                placeholder="Search events (tech, comedy, concerts...)"
                className="w-full pl-11 pr-4 py-2.5 bg-[#F9FAFB] border border-gray-100 rounded-full focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all placeholder:text-gray-300 text-[13px]"
              />
            </div>
          )}
        </div>

        {/* Auth Buttons - Fixed width for symmetry */}
        <div className="w-62.5 shrink-0 flex items-center justify-end gap-8">
          <Link
            to="/login"
            className="text-[#4F46E5] font-bold text-[14px] hover:text-[#1C1661] transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-[#1C1661] hover:bg-[#15114a] text-white font-bold px-8 py-3 rounded-xl text-[14px] transition-all shadow-md shadow-indigo-100 active:scale-[0.97]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
