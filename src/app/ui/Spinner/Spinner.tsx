
'use client';
import React from "react";

interface SpinnerProps {
  message?: string;
  size?: number; 
  color?: string; 
}

const Spinner: React.FC<SpinnerProps> = ({
  message = "Loading...",
  size = 16,
  color = "red-500",
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div
          className={`border-4 border-gray-300 border-t-${color} rounded-full animate-spin`}
          style={{ width: `${size}px`, height: `${size}px` }}
        ></div>
        <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default Spinner;
