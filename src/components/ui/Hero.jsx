import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/public/heroImg.jpg";
import { Ticket } from "lucide-react";
import { FiGlobe, FiSearch, FiShield, FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        src={heroImg}
        alt=""
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-[#313131]/80 flex justify-center items-center p-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-[95%] md:w-[80%] lg:w-[38%] h-auto md:h-[80%] flex flex-col items-center gap-7.5"
        >
          <motion.div
            variants={fadeInUp}
            className="p-[8px_20px] flex justify-center items-center gap-2.5 bg-white rounded-full text-[#27187E]"
          >
            <Ticket />
            <h4 className="font-semibold text-[12px]">
              The next generation of ticketing
            </h4>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-[24px] md:text-[32px] text-white text-center font-semibold leading-[180%] md:leading-[200%]"
          >
            Catch the{" "}
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="span inline-block text-[40px] md:text-[60px] font-light bg-white text-[#241B7A] px-2.5 py-0 rounded-[50px_20px_50px_20px] rotate-2"
            >
              wave
            </motion.span>{" "}
            to your next favorite{" "}
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="span inline-block text-[40px] md:text-[60px] font-light bg-white text-[#241B7A] px-2.5 py-0 rounded-[20px_50px_20px_50px] rotate-2"
            >
              event
            </motion.span>
          </motion.h2>

          <motion.h4
            variants={fadeInUp}
            className="text-[14px] md:text-[15px] text-white font-semibold text-center max-w-md"
          >
            Effortlessly create, manage, and book tickets for the most exciting
            events happening around you.
          </motion.h4>

          <motion.div
            variants={fadeInUp}
            whileFocus={{ scale: 1.02 }}
            className="w-full max-w-2xl bg-white p-2 rounded-full flex items-center shadow-2xl"
          >
            <div className="flex-1 flex items-center px-2 md:px-4 gap-2 md:gap-3">
              <FiSearch className="text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full bg-transparent border-none focus:ring-0 text-[12px] md:text-sm py-2 text-gray-700 placeholder:text-gray-400 outline-none"
              />
            </div>
            <button
              onClick={() => navigate("/auth/register")}
              className="bg-[#241B7A] text-white px-6 md:px-10 py-2.5 md:py-3 rounded-full font-bold text-[12px] md:text-sm hover:bg-[#1a145a] transition-colors"
            >
              Sign Up
            </button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-nowrap md:flex-wrap justify-center items-center gap-4 md:gap-12 w-full py-2"
          >
            {[
              { icon: <FiZap />, text: "Fast booking" },
              { icon: <FiShield />, text: "Secure Payments" },
              { icon: <FiGlobe />, text: "Global Reach" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center shrink-0 gap-2 text-white"
              >
                {feature.icon}
                <span className="text-[12px] md:text-[13px] font-medium opacity-90 whitespace-nowrap">
                  {feature.text}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
