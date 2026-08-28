import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getProfile } from '../../services/profileService.js';
import Button from '../common/Button.jsx';
import { isPlaceholder } from '../../utils/placeholderCheck.js';
import { PROFILE } from '../../constants/profile.js';
import gsap from 'gsap';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [profile, setProfile] = useState(PROFILE);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const headerRef = useRef(null);

  // Track page scroll for background styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch Profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getProfile();
        if (response.success && response.data) {
          setProfile(response.data);
        }
      } catch (err) {
        console.error('Navbar profile load error:', err.message);
      }
    };
    fetchProfileData();
  }, []);

  // Slide down entry animation
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    gsap.fromTo(headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  // ScrollSpy active section tracking
  useEffect(() => {
    if (!isHomePage) return;

    const sections = ['home', 'about', 'skills', 'experience', 'education', 'achievements', 'projects', 'contact'];
    
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    // Initial call
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [isHomePage]);

  const handleResumeClick = (e) => {
    const resumeUrl = profile?.resumeUrl || '';
    if (isPlaceholder(resumeUrl)) {
      e.preventDefault();
      alert('Resume PDF is currently being updated. Please check back soon or contact me directly!');
    }
  };

  const navLinks = [
    { name: 'About', hash: '#about', id: 'about' },
    { name: 'Skills', hash: '#skills', id: 'skills' },
    { name: 'Experience', hash: '#experience', id: 'experience' },
    { name: 'Achievements', hash: '#achievements', id: 'achievements' },
    { name: 'Projects', hash: '#projects', id: 'projects' },
    { name: 'Contact', hash: '#contact', id: 'contact' }
  ];

  const handleNavClick = (hash) => {
    setIsOpen(false);
    if (!isHomePage) return;
    
    const targetId = hash.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 opacity-0 ${
        scrolled
          ? 'bg-[#F5F5F5]/90 dark:bg-[#080808]/92 backdrop-blur-md border-b border-[#D6D6D6]/40 dark:border-[#2A2A2A]/40 py-3.5 shadow-2xs'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => isHomePage && window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display font-black text-lg tracking-tight text-[#080808] dark:text-[#F5F5F5] flex items-center gap-1.5 cursor-pointer group"
        >
          <span className="w-8 h-8 rounded-lg bg-[#B11226] flex items-center justify-center text-[#F5F5F5] font-extrabold shadow-sm transform group-hover:rotate-6 transition duration-200">
            {profile?.name ? profile.name.charAt(0) : 'N'}
          </span>
          <span>{profile?.name || 'Nitin Gupta'}</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = isHomePage && activeSection === link.id;
            return (
              <Link
                key={link.name}
                to={isHomePage ? link.hash : `/${link.hash}`}
                onClick={() => handleNavClick(link.hash)}
                className={`relative text-xs font-bold uppercase tracking-wider transition-colors duration-200 py-1.5 cursor-pointer ${
                  isActive 
                    ? 'text-[#B11226] dark:text-[#D01F35]' 
                    : 'text-[#555555] hover:text-[#080808] dark:text-[#B8B8B8] dark:hover:text-[#F5F5F5]'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B11226] dark:bg-[#D01F35] rounded-full" />
                )}
              </Link>
            );
          })}

          <Button href={profile?.resumeUrl || '#'} onClick={handleResumeClick} variant="secondary" className="px-4.5 py-1.5 text-[11px] font-bold">
            Resume
          </Button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex items-center gap-2.5 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-[#555555] dark:text-[#B8B8B8] hover:text-[#080808] dark:hover:text-[#F5F5F5] focus:outline-none transition cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#F5F5F5] dark:bg-[#111111] border-b border-[#D6D6D6] dark:border-[#2A2A2A] shadow-md py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = isHomePage && activeSection === link.id;
            return (
              <Link
                key={link.name}
                to={isHomePage ? link.hash : `/${link.hash}`}
                onClick={() => handleNavClick(link.hash)}
                className={`text-sm font-bold uppercase tracking-wider transition-colors duration-200 py-1 cursor-pointer ${
                  isActive ? 'text-[#B11226] dark:text-[#D01F35]' : 'text-[#555555] dark:text-[#B8B8B8]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <Button href={profile?.resumeUrl || '#'} onClick={handleResumeClick} variant="secondary" className="w-full text-center py-2">
            Download Resume
          </Button>
        </div>
      )}
    </header>
  );
}
