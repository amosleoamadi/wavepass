import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoChevronDownOutline } from "react-icons/io5";
import { Dropdown } from "antd";
import { useSelector } from "react-redux";
import logo from "../../../assets/LogoWrap.png";

const DashboardHeader = ({
  onMenuClick,
  profileItems,
  openProfile,
  setOpenProfile,
}) => {
  const user = useSelector((state) => state.user?.user);
  const userFullName = user?.fullname || "";
  const userEmail = user?.email || "";

  const getUserInitial = () => {
    if (
      userFullName &&
      userFullName !== "User" &&
      userFullName !== "undefined" &&
      userFullName.trim() !== ""
    ) {
      const trimmedName = userFullName.trim();
      const nameParts = trimmedName.split(" ");

      if (nameParts.length >= 2 && nameParts[0] && nameParts[1]) {
        // Get first letter of first name and first letter of last name
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      } else if (nameParts[0]) {
        // Get first two letters or just first letter if only one character
        const firstPart = nameParts[0];
        if (firstPart.length >= 2) {
          return firstPart.substring(0, 2).toUpperCase();
        }
        return firstPart[0].toUpperCase();
      }
    }

    // Fallback to email if fullname is not available
    if (
      userEmail &&
      userEmail !== "" &&
      userEmail !== "undefined" &&
      userEmail.trim() !== ""
    ) {
      // Get first two characters from email
      const emailPrefix = userEmail.trim().substring(0, 2).toUpperCase();
      return emailPrefix;
    }

    // Default fallback
    return "U";
  };

  const userInitial = getUserInitial();

  return (
    <div className="shrink-0 w-full h-20 border-b border-b-[#DFDCEC] flex items-center justify-between px-4 sm:px-6 bg-white">
      {/* Left section - Mobile Menu Button - Fixed width */}
      <div className="items-center flex md:hidden w-10 sm:w-auto">
        <button
          className="flex w-10 h-10 p-2 rounded bg-[#F3F2F8] items-center justify-center hover:bg-gray-200 transition-colors"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <CiMenuBurger size={20} />
        </button>
      </div>

      {/* Center section - Mobile Logo - Flexible with max width */}
      <div className="sm:hidden w-[calc(100%-100px)] flex justify-center px-2">
        <div className="w-45 h-16">
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Desktop Logo - Hidden on mobile */}
      <div className="hidden sm:block sm:flex-1" />

      {/* Right section - Profile - Fixed width */}
      <div className="flex items-center justify-end w-10 sm:w-auto">
        {/* Desktop Profile */}
        <div className="hidden sm:flex items-center px-10 gap-3">
          <p className="text-sm font-medium text-gray-700">
            {userFullName || "User"}
          </p>
          <div className="w-12 h-12 rounded-full bg-[#27187E] uppercase text-lg text-white flex items-center justify-center font-medium shadow-sm">
            {userInitial}
          </div>
        </div>

        {/* Mobile Profile Dropdown - Well-structured circle */}
        <div
          className="flex sm:hidden items-center w-15 cursor-pointer"
          onClick={() => setOpenProfile(!openProfile)}
        >
          <div className="w-10 h-10 rounded-full bg-[#27187E] uppercase text-lg text-white flex items-center justify-center font-medium shadow-sm hover:bg-[#1f0f5a] transition-colors">
            {userInitial}
          </div>
          <Dropdown
            menu={{ items: profileItems }}
            trigger={["click"]}
            open={openProfile}
            onOpenChange={setOpenProfile}
          >
            <a
              onClick={(e) => e.preventDefault()}
              className="flex items-center text-gray-600 hover:text-gray-900 ml-1"
            >
              <IoChevronDownOutline size={18} />
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
