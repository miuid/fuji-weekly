import React from 'react';

const CameraIcon = ({ width = 32, height = 32, className = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main camera body */}
      <rect
        x="3"
        y="9"
        width="26"
        height="18"
        rx="3"
        fill="currentColor"
        opacity="0.95"
      />

      {/* Top panel */}
      <rect
        x="8"
        y="5"
        width="16"
        height="6"
        rx="2"
        fill="currentColor"
        opacity="0.85"
      />

      {/* Lens outer ring */}
      <circle
        cx="16"
        cy="18"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Lens inner ring */}
      <circle
        cx="16"
        cy="18"
        r="5"
        fill="currentColor"
        opacity="0.2"
      />

      {/* Lens center */}
      <circle
        cx="16"
        cy="18"
        r="3"
        fill="currentColor"
        opacity="0.4"
      />

      {/* Lens reflection */}
      <circle
        cx="17.5"
        cy="16.5"
        r="1.5"
        fill="currentColor"
        opacity="0.6"
      />

      {/* Viewfinder */}
      <rect
        x="12"
        y="3"
        width="8"
        height="3"
        rx="1"
        fill="currentColor"
        opacity="0.8"
      />

      {/* Shutter button */}
      <circle
        cx="26"
        cy="7"
        r="1.5"
        fill="currentColor"
        opacity="0.9"
      />

      {/* Flash */}
      <rect
        x="6"
        y="6"
        width="3"
        height="2"
        rx="0.5"
        fill="currentColor"
        opacity="0.7"
      />

      {/* Brand text area */}
      <rect
        x="5"
        y="11"
        width="4"
        height="1"
        rx="0.3"
        fill="currentColor"
        opacity="0.6"
      />

      {/* Control dial */}
      <circle
        cx="24"
        cy="12"
        r="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.8"
      />

      {/* Dial indicator */}
      <line
        x1="24"
        y1="10.5"
        x2="24"
        y2="11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
};

export default CameraIcon;