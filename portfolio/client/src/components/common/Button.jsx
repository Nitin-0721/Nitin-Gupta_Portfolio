import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Button component matching design system guidelines.
 * Supports primary/secondary styling, click handlers, and route/anchor links.
 */
export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}) {
  const baseStyle = "inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white border border-transparent shadow-blue-600/10 hover:shadow-lg hover:shadow-blue-600/15",
    secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300",
    danger: "bg-rose-600 hover:bg-rose-700 text-white border border-transparent shadow-rose-600/10 focus:ring-rose-500 hover:shadow-lg hover:shadow-rose-600/15"
  };

  const combinedClass = `${baseStyle} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClass} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClass} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClass} {...props}>
      {children}
    </button>
  );
}
