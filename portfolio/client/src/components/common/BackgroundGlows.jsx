import React from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function BackgroundGlows() {
  const { theme } = useTheme();

  // In dark mode, render a very faint red ambient blur layer and dots
  if (theme === 'dark') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
        {/* Extremely subtle dark red tonal ambient glows */}
        <div className="absolute top-[20%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-red-950/3 blur-[140px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-red-900/2 blur-[130px]" />

        {/* Editorial tech dots pattern with very low opacity */}
        <div className="absolute inset-0 bg-tech-dots opacity-[0.03]" />
      </div>
    );
  }

  // Light/Cream Mode
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Very faint red accent glows */}
      <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-red-600/[0.015] blur-[120px]" />
      <div className="absolute -top-[5%] -right-[5%] w-[40vw] h-[40vw] rounded-full bg-red-800/[0.01] blur-[100px]" />

      {/* Center/Bottom tonal variations */}
      <div className="absolute top-[45%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-red-700/[0.01] blur-[110px]" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[55vw] h-[55vw] rounded-full bg-red-600/[0.015] blur-[130px]" />

      {/* Editorial dots pattern overlay */}
      <div className="absolute inset-0 bg-tech-dots opacity-[0.06]" />

      {/* Very subtle editorial divider grid line */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <line x1="15%" y1="0" x2="15%" y2="100%" stroke="#0B0B0B" strokeWidth="1" strokeDasharray="5 5" />
        <line x1="85%" y1="0" x2="85%" y2="100%" stroke="#0B0B0B" strokeWidth="1" strokeDasharray="5 5" />
      </svg>
    </div>
  );
}
