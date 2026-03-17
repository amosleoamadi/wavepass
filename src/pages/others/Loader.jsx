import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Wave Pass Logo/Icon with animation */}
      <div className="relative mb-8">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl rotate-45 animate-pulse-slow flex items-center justify-center">
          <div className="w-10 h-10 bg-white rounded-lg -rotate-45 flex items-center justify-center">
            <span className="text-indigo-600 font-bold text-xl">WP</span>
          </div>
        </div>

        {/* Orbiting dots */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-indigo-300 rounded-full animate-ping" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-indigo-400 rounded-full animate-ping delay-300" />
      </div>

      {/* Animated text */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Wave Pass</h2>
        <div className="flex items-center justify-center gap-1">
          <span className="text-gray-600 text-sm">Loading</span>
          <span className="flex gap-1">
            <span className="w-1 h-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1 h-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1 h-1 bg-indigo-600 rounded-full animate-bounce" />
          </span>
        </div>
      </div>

      {/* Progress bar at bottom (optional) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 rounded-full animate-progress" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
