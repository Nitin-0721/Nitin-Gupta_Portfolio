import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button.jsx';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-6 text-center font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        {/* Big error status code */}
        <h1 className="text-6xl font-extrabold text-blue-600 tracking-tight mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Page Not Found</h2>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        {/* Return Button */}
        <Button to="/" variant="primary" className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Button>
      </div>
    </div>
  );
}
