import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { CiCircleList, CiLogout, CiSettings } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { useDispatch } from "react-redux";
import logo from "../../../assets/LogoWrap.png";
import { logoutUser } from "../../../store/slice";

const Sidebar = ({ isMobile = false, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    if (onClose) onClose();
    navigate("/login");
  };

  const linkClasses = ({ isActive }) =>
    `w-full ${
      isMobile ? "h-14 text-base" : "h-12 text-sm"
    } flex items-center gap-3 px-3 font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded ${
      isActive ? "bg-[#F7F6FA] border border-[#DFDCEC]" : ""
    }`;

  const iconSize = isMobile ? 22 : 18;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Logo - Hidden on mobile, visible on desktop */}
      {!isMobile && (
        <div className="shrink-0 w-full h-16 flex gap-2 items-center mb-6 px-4">
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        </div>
      )}

      {/* Create Event Button with Divider - Desktop only */}
      {!isMobile && (
        <>
          <div className="shrink-0 w-full mb-4 px-4">
            <NavLink
              to="/dashboard/create-event"
              onClick={onClose}
              className="w-full h-12 px-3 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium hidden sm:flex items-center gap-2 hover:bg-[#1f0f5a] transition-colors"
            >
              <GoPlus size={20} />
              <span>Create Event</span>
            </NavLink>
          </div>
          {/* Divider - Only on desktop, below the button */}
          <div className="w-[90%] self-center h-px bg-[#DFDCEC] mb-4" />
        </>
      )}

      {/* Navigation Links */}
      <div
        className={`flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 ${!isMobile ? "px-4" : ""}`}
      >
        <div className="w-full h-full flex flex-col justify-between">
          {/* Top Navigation */}
          <div className="w-full flex flex-col gap-1">
            <NavLink
              onClick={onClose}
              className={linkClasses}
              to="/dashboard/overview"
            >
              <RxDashboard size={iconSize} />
              <span>Overview</span>
            </NavLink>
            <NavLink
              onClick={onClose}
              className={linkClasses}
              to="/dashboard/manage/events"
            >
              <CiCircleList size={iconSize} />
              <span>Manage Events</span>
            </NavLink>
          </div>

          {/* Bottom Navigation */}
          <div className="w-full flex flex-col gap-1 mt-auto pt-4">
            <NavLink
              onClick={onClose}
              className={linkClasses}
              to="/dashboard/settings"
            >
              <CiSettings size={iconSize} />
              <span>Settings</span>
            </NavLink>

            <div
              onClick={handleLogout}
              className={`w-full ${
                isMobile ? "h-14" : "h-12"
              } flex items-center gap-3 px-3 font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded`}
            >
              <CiLogout size={iconSize} />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
