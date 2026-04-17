"use client";
import React from "react";
  
export default function PressButton({ onClick, children, className,variant = "primary",disabled=false }) {
  const baseStyle = "px-6 py-2 rounded-lg transition duration-200 focus:outline-none font-semibold text-sm";
  const variants = {
    primary: "bg-orange-400 text-white hover:bg-orange-700",
    secondary:"bg-blue-500 text-white hover:bg-blue-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? "opacity-50" : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
