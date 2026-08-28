import React from 'react';

/**
 * Clean, standard spinner component matching the minimal professional theme.
 */
export default function Loader({ message = 'Loading...', size = 'md' }) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 text-slate-500 w-full" role="status" aria-live="polite">
      <div 
        className={`${sizeClasses[size] || sizeClasses.md} border-blue-600 border-t-transparent rounded-full animate-spin mb-4`} 
        aria-label="loading indicator"
      />
      <p className="text-sm font-medium tracking-wide animate-pulse">{message}</p>
    </div>
  );
}
