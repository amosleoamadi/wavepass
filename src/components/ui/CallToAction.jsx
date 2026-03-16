import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="w-full bg-linear-to-tr from-[#27187E] to-[#151515B5]/80 py-16 md:py-20 lg:py-24">
      <section className="max-w-4xl mx-auto px-6 text-center font-['Inter',sans-serif]">
        <h2 className="text-[26px] md:text-[32px] lg:text-[32px] font-semibold text-white tracking-tight mb-8">
          Get Started Now and Bring Your Event to Life!
        </h2>

        <p className="text-indigo-100 text-base md:text-[14.5px] leading-relaxed max-w-2xl mx-auto mb-10 opacity-90">
          Wave Pass is an intuitive platform designed to help event organizers
          effortlessly create, manage, and promote events. From weddings to
          concerts, our easy-to-use tools streamline event planning, ticket
          sales, and user engagement in one seamless experience.
        </p>

        <div className="flex justify-center">
          <Link
            to="/auth/register"
            className="inline-block px-10 py-3.5 rounded-full md:rounded-xl border border-indigo-200 text-indigo-700 bg-white hover:bg-indigo-50 transition-colors text-sm font-bold shadow-md transform hover:-translate-y-0.5"
          >
            Get started for free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CallToAction;
