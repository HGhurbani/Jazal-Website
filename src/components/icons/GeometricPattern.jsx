import React from "react";

export const GeometricPattern = ({ className }) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M50 0 L100 50 L50 100 L0 50 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M0 0 L100 100"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="4 4"
    />
    <path
      d="M100 0 L0 100"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="4 4"
    />
    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);