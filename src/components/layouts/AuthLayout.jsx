import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/public/wavepass.png";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen bg-[#E9E7F4] authImg flex justify-center items-center relative">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
