import React from "react";

const HeartbeatLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[300px] h-[120px]">
        <svg
          viewBox="0 0 300 120"
          className="w-full h-full text-red-500"
        >
          {/* ECG heartbeat path */}
          <path
            d="M 0 60 
               L 60 60 
               L 80 20 
               L 100 100 
               L 120 60 
               L 180 60 
               L 200 40 
               L 220 80 
               L 240 60 
               L 300 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Animate ECG line drawing */}
            <animate
              attributeName="stroke-dasharray"
              from="0,600"
              to="600,0"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        {/* Glowing pulse dot */}
        <div className="absolute top-[43%] left-[-5px] w-4 h-4 rounded-full bg-red-500 animate-ping"></div>
      </div>
    </div>
  );
};

export default HeartbeatLoader;
