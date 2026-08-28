import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '../common/Button.jsx';

/**
 * Standard user-friendly error notice panel with option for custom retry triggers.
 * Ensures we never dump raw exceptions or stack traces to visitors.
 */
export default function ErrorMessage({ 
  message = 'An unexpected error occurred while loading content.', 
  onRetry, 
  className = '' 
}) {
  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-md mx-auto shadow-sm flex flex-col items-center justify-center ${className}`}>
      <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-full mb-4">
        <AlertTriangle className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="text-md font-bold text-slate-900 mb-2">Notice</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" className="py-2 px-4 text-xs font-semibold cursor-pointer">
          Retry Connection
        </Button>
      )}
    </div>
  );
}
