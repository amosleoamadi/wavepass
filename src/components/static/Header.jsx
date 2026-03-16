import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import logo from "../../assets/public/wavepass.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 md:px-16 py-3.5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="md:w-47.5 shrink-0">
          <Link to="/" className="flex items-center gap-2.5 w-fit">
            <div className="bg-[#27187E] w-9 h-8 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="Wave Pass Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[#27187E] font-bold text-sm tracking-tight">
              Wave Pass
            </span>
          </Link>
        </div>

        <div
          className={`hidden md:flex flex-1 items-center ${isHomePage ? "justify-center" : "justify-start px-8"}`}
        >
          <nav className="flex items-center gap-10">
            <Link
              to="/discover"
              className="text-[#4B5563] font-semibold text-[14px] hover:text-[#27187E] transition-colors whitespace-nowrap"
            >
              Discover Events
            </Link>
            <Link
              to="/about"
              className="text-[#4B5563] font-semibold text-[14px] hover:text-[#27187E] transition-colors whitespace-nowrap"
            >
              About Us
            </Link>
          </nav>

          {!isHomePage && (
            <div className="relative w-full max-w-100 ml-10 animate-in fade-in slide-in-from-left-2 duration-300">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-11 pr-4 py-2.5 bg-[#F9FAFB] border border-gray-100 rounded-full focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all text-[13px]"
              />
            </div>
          )}
        </div>

        <div className="hidden md:flex w-62.5 shrink-0 items-center justify-end gap-8">
          <Link to="/auth/" className="text-[#27187E] font-bold text-[14px]">
            Sign In
          </Link>
          <Link
            to="/auth/register"
            className="bg-[#27187E] text-white font-bold px-8 py-3 rounded-xl text-[14px] shadow-md shadow-indigo-100 active:scale-[0.97]"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="md:hidden text-[#27187E] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`absolute left-0 top-full w-full bg-white border-b border-gray-100 shadow-xl z-60 md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-8">
          <nav className="flex flex-col gap-6">
            <Link
              to="/discover"
              className="text-[#27187E] font-semibold text-[16px] border-b border-gray-50 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Discover Events
            </Link>
            <Link
              to="/about"
              className="text-[#27187E] font-semibold text-[16px] border-b border-gray-50 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </nav>

          <div className="flex flex-col gap-4">
            <Link
              to="/auth/register"
              className="w-full bg-[#27187E] text-white text-center font-bold py-4 rounded-xl text-[15px] shadow-lg shadow-indigo-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              to="/auth/"
              className="w-full border border-[#1C1661]/20 text-[#27187E] text-center font-bold py-4 rounded-xl text-[15px]"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
