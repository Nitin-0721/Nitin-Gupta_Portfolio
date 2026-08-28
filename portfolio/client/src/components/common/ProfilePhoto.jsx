import React, { useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import gsap from 'gsap';

export default function ProfilePhoto({ imageUrl, name }) {
  const containerRef = useRef(null);
  const borderRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Gentle floating animation
      gsap.fromTo(containerRef.current,
        { y: 5 },
        {
          y: -5,
          duration: 3,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto select-none group"
    >
      {/* Layered Accent Background Shape 1 */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl opacity-15 dark:opacity-20 blur-md transform rotate-6 scale-95 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-100"
      />

      {/* Layered Border Shape 2 */}
      <div 
        ref={borderRef}
        className="absolute -inset-2.5 border-2 border-dashed border-primary/25 dark:border-secondary/20 rounded-4xl transform -rotate-3 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105"
      />

      {/* Outer Solid Accent Shape 3 */}
      <div 
        className="absolute inset-2 bg-slate-900/2 dark:bg-white/2 rounded-3xl transform rotate-3 scale-98 transition-transform duration-500 group-hover:rotate-1 group-hover:scale-100"
      />

      {/* Main Image Frame Container */}
      <div 
        className="absolute inset-0 bg-white border border-slate-200 dark:border-primary/35 p-2.5 rounded-3xl shadow-md overflow-hidden transform transition-all duration-500 group-hover:-translate-y-1.5 backdrop-blur-md"
      >
        <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100 relative flex items-center justify-center">
          {imageUrl ? (
            <img
              ref={imageRef}
              src={imageUrl}
              alt={name || 'Profile photo'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                // If local image fails, hide image element to show the placeholder
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}

          {/* Dynamic Initials Placeholder Face (Fallback) */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center text-slate-400 gap-2"
            style={{ display: imageUrl ? 'none' : 'flex' }}
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs">
              <User className="w-8 h-8" />
            </div>
            <span className="font-display font-extrabold text-slate-800 text-lg uppercase tracking-wider">
              {name ? name.split(' ').map(n => n[0]).join('') : 'NG'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
