import React, { useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { Drawer } from "antd";
import { IoCloseOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/slice";
import logo from "../../../assets/LogoWrap.png";
import Sidebar from "./DashboardSideBar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    setOpenProfile(false);
    setOpenSideBar(false);
    navigate("/login");
  };

  const profileItems = [
    {
      label: <p>Profile</p>,
      key: "0",
    },
    {
      label: <p>Settings</p>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "Logout",
      key: "3",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <div className="w-full h-screen flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="w-0 hidden sm:flex sm:w-64 h-full bg-white border-r border-r-[#DFDCEC] overflow-hidden">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="w-full sm:w-[calc(100%-16rem)] h-full flex flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader
            onMenuClick={() => setOpenSideBar(true)}
            profileItems={profileItems}
            openProfile={openProfile}
            setOpenProfile={setOpenProfile}
            userFullName="fullName"
            userInitial="getInitial"
          />

          {/* Page Content - Scrollable area */}
          <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50">
            <div className="w-full h-max min-h-full p-4 sm:p-6">
              {/* Create Event Button - Mobile Only (Above Outlet) */}
              <div className="w-full mb-4 sm:hidden">
                <NavLink
                  to="/dashboard/create-event"
                  className="w-full h-12 px-3 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#1f0f5a] transition-colors"
                >
                  <GoPlus size={20} />
                  <span>Create Event</span>
                </NavLink>
              </div>

              {/* Outlet - Page Content */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        open={openSideBar}
        closeIcon={false}
        onClose={() => setOpenSideBar(false)}
        placement="left"
        size={280}
        className="sm:hidden"
        styles={{
          body: {
            padding: 0,
            overflow: "hidden",
          },
        }}
      >
        <div className="w-full h-full flex flex-col p-4">
          {/* Drawer Header */}
          <div className="shrink-0 w-full h-16 flex items-center justify-between mb-6">
            <div className="flex gap-2 shrink-0 w-50 h-20 items-center">
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              className="flex w-8 h-8 p-1.5 rounded bg-[#F3F2F8] items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={() => setOpenSideBar(false)}
              aria-label="Close menu"
            >
              <IoCloseOutline size={20} />
            </button>
          </div>

          {/* Drawer Navigation */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <Sidebar isMobile onClose={() => setOpenSideBar(false)} />
          </div>
        </div>
      </Drawer>

      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 20px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </>
  );
};

export default DashboardLayout;
