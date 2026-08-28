import React from 'react';

/**
 * Reusable Section Header component.
 * Outputs a title, a blue accent underline, and an optional subtitle description.
 */
export default function SectionTitle({ title, subtitle, center = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
        {title}
      </h2>
      <div className={`h-1.5 w-14 bg-blue-600 rounded-full mt-3.5 ${center ? 'mx-auto' : 'mr-auto'}`} />
      {subtitle && (
        <p className={`mt-4 text-lg text-slate-500 max-w-3xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
