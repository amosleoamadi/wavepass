import React from "react";

const NewsLetter = () => {
  return (
    <div className="w-full bg-[#efeff4] py-16 md:py-20">
      <section className="max-w-7xl mx-auto px-6 font-['Inter',sans-serif] text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Stay in the Loop with Wave Pass Updates!
        </h2>

        <p className="text-gray-500 text-sm md:text-base max-w-3xl mx-auto mb-10 leading-relaxed">
          Get the latest event planning tips, platform updates, exclusive
          offers, and more, straight to your inbox. Sign up for our NewsLetter
          and never miss out on exciting news and features.
        </p>

        <form
          className="flex flex-col sm:flex-row items-stretch justify-center max-w-2xl mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="enter your email address"
            className="grow px-6 py-4 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none border-y border-l border-r sm:border-r-0 border-gray-200 focus:outline-none transition-all text-gray-600 placeholder:text-gray-400"
            required
          />
          <button
            type="submit"
            className="bg-[#2d2080] hover:bg-[#241a66] text-white font-semibold px-10 py-4 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default NewsLetter;
