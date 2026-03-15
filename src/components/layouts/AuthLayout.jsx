import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/public/wavepass.png";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen bg-[#E9E7F4] authImg flex justify-center items-center relative p-4">
      <div className="fixed top-8 left-8 md:left-12 flex items-center gap-2">
        <div className="bg-[#241B7A] w-8.5 h-8 rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src={logo}
            alt="Wave Pass Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-[#241B7A] font-bold text-sm tracking-tight">
          Wave Pass
        </span>
      </div>

      <Outlet />
    </div>
  );
};

export default AuthLayout;
