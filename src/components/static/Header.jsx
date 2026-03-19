import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import logo from "../../assets/public/wavepass.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 md:px-12 py-3.5 sticky top-0 z-50">
      <div className="max-w-360 mx-auto flex items-center justify-between">
        <div className="md:w-47.5 shrink-0">
          <Link to="/" className="flex items-center gap-2.5 w-fit">
            <div className="bg-[#241B7A] w-9 h-8 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="Wave Pass Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[#241B7A] font-bold text-sm tracking-tight">
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

          {!isHomePage && (
            <div className="relative w-full max-w-100 ml-10 animate-in fade-in slide-in-from-left-2 duration-300">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
              <input
                type="text"
                placeholder="Search events (tech, comedy, concerts...)"
                className="w-full pl-11 pr-4 py-2.5 bg-[#F9FAFB] border border-gray-100 rounded-full focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all placeholder:text-gray-300 text-[13px]"
              />
            </div>
          )}
        </div>

        <div className="hidden md:flex w-62.5 shrink-0 items-center justify-end gap-8">
          <Link
            to="/auth"
            className="text-[#4F46E5] font-bold text-[14px] hover:text-[#1C1661] transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/auth/register"
            className="bg-[#1C1661] hover:bg-[#15114a] text-white font-bold px-8 py-3 rounded-xl text-[14px] transition-all shadow-md shadow-indigo-100 active:scale-[0.97]"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="md:hidden text-[#1C1661] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black/20 z-60 transition-opacity md:hidden ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-70 bg-white shadow-2xl transition-transform duration-300 ease-in-out p-6 flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-10">
            <span className="text-[#4F46E5] font-bold">Wave Pass</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-400"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 flex-1">
            <Link
              to="/discover"
              className="text-[#1C1661] font-semibold text-[15px] pb-2 border-b border-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Discover Events
            </Link>
            <Link
              to="/about"
              className="text-[#1C1661] font-semibold text-[15px] pb-2 border-b border-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </nav>

          <div className="flex flex-col gap-4 mt-auto">
            <Link
              to="/auth/register"
              className="bg-[#1C1661] text-white text-center font-bold py-3.5 rounded-xl text-[14px]"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              to="/auth/"
              className="border border-[#1C1661] text-[#1C1661] text-center font-bold py-3.5 rounded-xl text-[14px]"
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
