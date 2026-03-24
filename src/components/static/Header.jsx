import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import logo from "../../assets/public/wavepass.png";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "antd";
import { logoutUser } from "../../store/slice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state?.user?.token);
  const userDetails = useSelector((state) => state?.user?.user);
  const isHomePage = location.pathname === "/";

  const getInitials = () => {
    if (!userDetails?.fullname) return "U";

    const names = userDetails.fullname.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth");
  };

  const menuItems = [
    {
      key: "1",
      label: (
        <Link
          to="/dashboard/overview"
          className="flex items-center gap-2 px-1 py-1 font-semibold text-gray-700"
        >
          <User size={16} />
          Profile
        </Link>
      ),
    },
    { type: "divider" },
    {
      key: "2",
      danger: true,
      label: (
        <div
          onClick={handleLogout}
          className="flex items-center gap-2 px-1 py-1 font-semibold"
        >
          <LogOut size={16} />
          Logout
        </div>
      ),
    },
  ];

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
              to="/"
              className="text-[#4B5563] font-semibold text-[14px] hover:text-[#1C1661]"
            >
              Home
            </Link>
            <Link
              to="/discover"
              className="text-[#4B5563] font-semibold text-[14px] hover:text-[#1C1661]"
            >
              Discover Events
            </Link>
          </nav>
          {!isHomePage && (
            <div className="relative w-full max-w-100 ml-10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-11 pr-4 py-2.5 bg-[#F9FAFB] border border-gray-100 rounded-full text-[13px]"
              />
            </div>
          )}
        </div>

        <div className="hidden md:flex w-62.5 shrink-0 items-center justify-end gap-8">
          {userToken ? (
            <Dropdown
              menu={{ items: menuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <button className="flex items-center gap-2 group outline-none">
                <div className="w-10 h-10 rounded-full bg-[#1C1661] flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:bg-[#241B7A] transition-all">
                  {getInitials()}
                </div>
                <ChevronDown
                  size={14}
                  className="text-gray-400 group-hover:text-[#1C1661]"
                />
              </button>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-8">
              <Link to="/auth" className="text-[#4F46E5] font-bold text-[14px]">
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="bg-[#1C1661] text-white font-bold px-8 py-3 rounded-xl text-[14px]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button
          className="md:hidden text-[#1C1661]"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black/20 z-60 transition-opacity md:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white p-6 flex flex-col transition-transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-10">
            {userToken ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1C1661] flex items-center justify-center text-white font-bold text-xs">
                  {getInitials()}
                </div>
                <span className="text-xs font-bold text-gray-900 truncate max-w-37.5">
                  {userDetails?.fullname}
                </span>
              </div>
            ) : (
              <span className="text-[#4F46E5] font-bold">Wave Pass</span>
            )}
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col gap-6 flex-1 font-semibold text-[#1C1661]">
            <Link to="/discover" onClick={() => setIsMenuOpen(false)}>
              Discover Events
            </Link>
            {userToken && (
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                Profile Settings
              </Link>
            )}
          </nav>
          <div className="mt-auto pt-6 border-t border-gray-50">
            {userToken ? (
              <button
                onClick={handleLogout}
                className="w-full py-3.5 rounded-xl bg-red-50 text-red-600 font-bold"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/auth/register"
                  className="w-full py-3.5 bg-[#1C1661] text-white rounded-xl text-center font-bold"
                >
                  Sign Up
                </Link>
                <Link
                  to="/auth"
                  className="w-full py-3.5 border border-[#1C1661] text-[#1C1661] rounded-xl text-center font-bold"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
