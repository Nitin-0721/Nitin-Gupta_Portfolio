import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function SectionBackground({ 
  children, 
  pattern = 'dots', 
  variant = 'white', 
  glowColor = 'blue',
  showGlow = true,
  className = ''
}) {
  const containerRef = useRef(null);
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced || !showGlow) return;

    const ctx = gsap.context(() => {
      // Very slow, organic wandering movement for glowing shapes
      gsap.to(glow1Ref.current, {
        x: 'random(-40, 40)',
        y: 'random(-45, 45)',
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      gsap.to(glow2Ref.current, {
        x: 'random(-45, 45)',
        y: 'random(-40, 40)',
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [showGlow]);

  const bgClasses = {
    white: 'bg-white',
    slate: 'bg-slate-50 border-y border-slate-200/50',
    darkSlate: 'bg-slate-900 text-slate-350 border-y border-slate-800'
  };

  const patternClasses = {
    dots: 'bg-tech-dots',
    grid: 'bg-tech-grid',
    none: ''
  };

  const glowClasses = {
    blue: 'from-blue-50/20 to-indigo-50/15',
    indigo: 'from-indigo-50/20 to-purple-50/15',
    sky: 'from-sky-50/20 to-blue-50/15'
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden transition-colors duration-300 ${bgClasses[variant]} ${patternClasses[pattern]} ${className}`}
    >
      {/* Dynamic Background Glow Elements */}
      {showGlow && (
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none">
          <div 
            ref={glow1Ref}
            className={`absolute top-[-15%] left-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr ${glowClasses[glowColor]} blur-3xl`}
          />
          <div 
            ref={glow2Ref}
            className={`absolute bottom-[-15%] right-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-br ${glowClasses[glowColor]} blur-3xl`}
          />
        </div>
      )}
      
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
