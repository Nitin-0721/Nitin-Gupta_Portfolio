import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, ArrowUp } from 'lucide-react';
import { getProfile } from '../../services/profileService.js';
import { PROFILE } from '../../constants/profile.js';
import { isPlaceholder } from '../../utils/placeholderCheck.js';
import { GitHubIcon, LinkedInIcon, LeetCodeIcon, CodeChefIcon } from '../common/SocialLinks.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger helper
gsap.registerPlugin(ScrollTrigger);

// Sub-component: Floating 3D Monogram card
function Footer3DObject() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  const handleMouseMove = (e) => {
    // Disable interaction on touch screen devices and respect reduced motion choice
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // rotation limits: X axis (-6 to 6 deg), Y axis (-8 to 8 deg)
    const rotateX = ((centerY - y) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      className="flex items-center justify-center select-none"
      aria-hidden="true"
    >
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center cursor-pointer"
        style={{
          perspective: '1000px',
        }}
      >
        <div 
          className="w-24 h-24 sm:w-28 sm:h-28 relative transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Front Layer Face - Deep Red, Cream Text */}
          <div 
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center text-[#F4EBDD] font-extrabold text-3xl sm:text-4xl shadow-md border bg-[#B4232F] border-[#7F1D1D]/30"
            style={{
              transform: 'translateZ(15px)',
              transformStyle: 'preserve-3d',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
            }}
          >
            <span className="font-black tracking-tight select-none">NG</span>
            
            {/* Tech details */}
            <span 
              className="absolute bottom-2 text-[8px] font-mono text-[#F4EBDD]/80 tracking-widest uppercase select-none"
              style={{ transform: 'translateZ(5px)' }}
            >
              Nitin Gupta
            </span>
          </div>

          {/* Middle Accent Layer - Dark Red */}
          <div 
            className="absolute inset-1 rounded-2xl border border-[#7F1D1D]/60 bg-[#7F1D1D]/20"
            style={{
              transform: 'translateZ(5px)',
            }}
          />

          {/* Shadow Back Layer */}
          <div 
            className="absolute inset-[-4px] rounded-3xl bg-black/40 blur-md"
            style={{
              transform: 'translateZ(-10px)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [profile, setProfile] = useState(PROFILE);
  const { theme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Refs for ScrollTrigger and GSAP animations
  const footerRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const obj3DRef = useRef(null);
  
  const ctaButtonRef = useRef(null);
  const ctaArrowRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        if (response.success && response.data) {
          setProfile(response.data);
        }
      } catch (err) {
        console.error('Failed to load profile for Footer:', err.message);
      }
    };
    fetchProfile();
  }, []);

  // GSAP Entrance ScrollTrigger Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      tl.fromTo(headingRef.current, 
        { opacity: 0, y: 35, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(obj3DRef.current,
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' },
        '-=0.6'
      )
      .fromTo('.footer-animate-item',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out' },
        '-=0.4'
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // CTA Hover animation trigger
  const handleCtaMouseEnter = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.to(ctaButtonRef.current, { scale: 1.02, duration: 0.25, ease: 'power2.out' });
    gsap.to(ctaArrowRef.current, { x: 5, duration: 0.25, ease: 'power2.out' });
  };

  const handleCtaMouseLeave = () => {
    gsap.to(ctaButtonRef.current, { scale: 1, duration: 0.25, ease: 'power2.out' });
    gsap.to(ctaArrowRef.current, { x: 0, duration: 0.25, ease: 'power2.out' });
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (hash) => {
    if (isHomePage) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSocialClick = (e, name, url) => {
    const actualUrl = url?.startsWith('mailto:') ? url.substring(7) : url;
    if (isPlaceholder(actualUrl) || !actualUrl) {
      e.preventDefault();
      alert(`${name} link is currently being updated. Please check back later!`);
    }
  };

  const navLinks = [
    { name: 'About', hash: '#about' },
    { name: 'Skills', hash: '#skills' },
    { name: 'Experience', hash: '#experience' },
    { name: 'Education', hash: '#education' },
    { name: 'Projects', hash: '#projects' },
    { name: 'Contact', hash: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', url: profile?.githubUrl, icon: <GitHubIcon className="w-5 h-5" />, hoverClass: 'hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500' },
    { name: 'LinkedIn', url: profile?.linkedinUrl, icon: <LinkedInIcon className="w-5 h-5" />, hoverClass: 'hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-800' },
    { name: 'LeetCode', url: profile?.leetcodeUrl, icon: <LeetCodeIcon className="w-5 h-5" />, hoverClass: 'hover:text-amber-500 hover:border-amber-400' },
    { name: 'CodeChef', url: profile?.codechefUrl, icon: <CodeChefIcon className="w-5 h-5" />, hoverClass: 'hover:text-rose-600 hover:border-rose-500' },
    { name: 'Email', url: profile?.email ? `mailto:${profile.email}` : '', icon: <Mail className="w-5 h-5" />, hoverClass: 'hover:text-red-500 hover:border-red-400' },
  ];

  return (
    <footer 
      ref={footerRef}
      className="bg-[#F1F5F9] dark:bg-[rgba(5,10,20,0.90)] border-t border-slate-200 dark:border-slate-800/80 text-[#0F172A] dark:text-[#F8FAFC] py-16 md:py-24 relative overflow-hidden transition-colors duration-300"
    >
      {/* Subtle background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-red-600/5 dark:bg-red-950/2 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-red-800/5 dark:bg-red-900/2 blur-[90px] pointer-events-none" />
      
      {/* Extra subtle grid pattern overlay for visual texture */}
      <div className="absolute inset-0 bg-tech-dots opacity-40 dark:opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Top CTA Row */}
        <div className="grid md:grid-cols-12 gap-10 items-center pb-16 border-b border-slate-200/80 dark:border-slate-800/60">
          <div className="md:col-span-8 space-y-6">
            <h2 
              ref={headingRef} 
              className="font-display font-black text-slate-900 dark:text-white tracking-tight leading-none"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)' }}
            >
              Let's build<br />something meaningful.
            </h2>
            <p 
              ref={subtextRef} 
              className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-medium"
            >
              Have an idea, opportunity, or project in mind? Let's connect and create something great.
            </p>
            <div ref={ctaRef}>
              <a
                ref={ctaButtonRef}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                onMouseEnter={handleCtaMouseEnter}
                onMouseLeave={handleCtaMouseLeave}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition-all duration-300 shadow-blue-600/10 hover:shadow-lg cursor-pointer"
                aria-label="Navigate to Contact Section"
              >
                <span>Let's Talk</span>
                <span ref={ctaArrowRef} className="inline-block">→</span>
              </a>
            </div>
          </div>

          <div ref={obj3DRef} className="md:col-span-4 flex justify-center md:justify-end">
            <Footer3DObject />
          </div>
        </div>

        {/* Brand, Links and Directory Row */}
        <div className="grid md:grid-cols-12 gap-10 pt-16 pb-12 items-start">
          {/* Identity column */}
          <div className="md:col-span-5 space-y-4 footer-animate-item">
            <h3 className="font-display font-black text-xl text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#B11226] flex items-center justify-center text-[#F5F5F5] font-extrabold shadow-sm">
                {profile?.name ? profile.name.charAt(0) : 'N'}
              </span>
              <span>{profile?.name || 'Nitin Gupta'}</span>
            </h3>
            <p className="text-xs sm:text-sm font-bold text-[#B11226] dark:text-[#D01F35] uppercase tracking-wider">
              MERN Stack Developer & ML/AI Engineer
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed font-medium">
              Building thoughtful digital experiences with modern technology.
            </p>
          </div>

          {/* Quick Nav links */}
          <div className="md:col-span-3 space-y-4 footer-animate-item">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Navigation</h4>
            <div className="grid grid-cols-2 gap-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {navLinks.map((link) => (
                isHomePage ? (
                  <a
                    key={link.name}
                    href={link.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.hash);
                    }}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-1"
                    aria-label={`Scroll to ${link.name}`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={`/${link.hash}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-1"
                    aria-label={`Navigate to ${link.name}`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Get in touch / Social Links */}
          <div className="md:col-span-4 space-y-4 md:text-right flex flex-col md:items-end footer-animate-item">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Get In Touch</h4>
            
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url || '#'}
                  onClick={(e) => handleSocialClick(e, link.name, link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  aria-label={link.name}
                  className={`group relative p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-900/40 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300 cursor-pointer ${link.hoverClass}`}
                >
                  {link.icon}
                  {/* Subtle hover indicator dot */}
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              ))}
            </div>

            <button
              onClick={handleScrollTop}
              className="p-2.5 bg-white dark:bg-slate-900 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white text-slate-500 dark:text-slate-400 rounded-xl transition duration-200 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs group cursor-pointer mt-2"
              title="Scroll to Top"
              aria-label="Scroll to Top of Page"
            >
              <ArrowUp className="w-4.5 h-4.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Bottom Credits / Copyright Row */}
        <div className="mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 dark:text-slate-500 font-bold tracking-wide uppercase footer-animate-item">
          <p className="normal-case">
            &copy; {new Date().getFullYear()} Nitin Gupta. All rights reserved.
          </p>
          <p className="normal-case font-medium">
            Built with React · Node.js · MongoDB
          </p>
        </div>

      </div>
    </footer>
  );
}
