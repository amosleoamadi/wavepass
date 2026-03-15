import React from "react";
import heroImg from "../../assets/public/heroImg.jpg";

const Hero = () => {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden ">
      <img src={heroImg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#313131]/70 flex justify-center items-center">
        <div className="w-1/2 h-[70%] bg-white"></div>
      </div>
    </div>
  );
};

export default Hero;
