import React, { useState, useEffect, useRef } from 'react';
import { getProfile } from '../../services/profileService.js';
import Button from '../../components/common/Button.jsx';
import SocialLinks from '../../components/common/SocialLinks.jsx';
import ProfilePhoto from '../../components/common/ProfilePhoto.jsx';
import { isPlaceholder } from '../../utils/placeholderCheck.js';
import { PROFILE } from '../../constants/profile.js';
import profileImage from '../../assets/images/profile.jpg';
import gsap from 'gsap';

export default function Hero() {
  const [profile, setProfile] = useState(PROFILE);
  const heroRef = useRef(null);
  
  // Element refs for GSAP targeting
  const taglineRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const bioRef = useRef(null);
  const ctaRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        if (response.success && response.data) {
          setProfile(response.data);
        }
      } catch (err) {
        console.error('Failed to load profile for Hero:', err.message);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!profile) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      // Force immediate opacity if animations are disabled
      gsap.set('.hero-animate', { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(taglineRef.current, 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
      .fromTo(nameRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1 }, 
        '-=0.6'
      )
      .fromTo(titleRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8 }, 
        '-=0.7'
      )
      .fromTo(bioRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8 }, 
        '-=0.7'
      )
      .fromTo(ctaRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8 }, 
        '-=0.7'
      )
      .fromTo(photoRef.current, 
        { opacity: 0, scale: 0.9, rotate: -2 }, 
        { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: 'back.out(1.2)' }, 
        '-=1'
      );
    }, heroRef);

    return () => ctx.revert();
  }, [profile]);

  const handleScrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = (e) => {
    const resumeUrl = profile?.resumeUrl || '';
    if (isPlaceholder(resumeUrl)) {
      e.preventDefault();
      alert('Resume PDF is currently being updated. Please check back soon or contact me directly!');
    }
  };

  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-white relative pt-20 overflow-hidden bg-dot-pattern"
    >
      {/* Decorative subtle background visual layers */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 w-full grid md:grid-cols-12 gap-12 items-center">
        {/* Left Column (Content) */}
        <div className="md:col-span-7 space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
          {/* Tagline */}
          <span 
            ref={taglineRef}
            className="hero-animate opacity-0 text-[11px] font-bold text-blue-600 tracking-widest uppercase bg-blue-50 border border-blue-100/50 px-4 py-1.5 rounded-full inline-block shadow-2xs"
          >
            Welcome to my portfolio
          </span>

          {/* Name */}
          <h1 
            ref={nameRef}
            className="hero-animate opacity-0 text-4xl sm:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            Hi, I'm <span className="name-gradient">{profile?.name || 'Nitin Gupta'}</span>
          </h1>

          <h2 
            ref={titleRef}
            className="hero-animate opacity-0 text-lg sm:text-2xl font-display font-semibold text-slate-700 tracking-wide"
          >
            MERN Stack Developer & ML/AI Engineer
          </h2>

          {/* Bio Description */}
          <p 
            ref={bioRef}
            className="hero-animate opacity-0 text-sm sm:text-base text-slate-500 max-w-xl leading-relaxed"
          >
            {profile?.bio || 'Loading bio details...'}
          </p>

          {/* CTAs */}
          <div 
            ref={ctaRef}
            className="hero-animate opacity-0 flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2"
          >
            <Button onClick={handleScrollToProjects} variant="primary" className="py-3 px-6 shadow-sm">
              View Projects
            </Button>
            <Button href={profile?.resumeUrl || '#'} onClick={handleResumeClick} variant="secondary" className="py-3 px-6">
              Download Resume
            </Button>
            <button 
              onClick={handleScrollToContact}
              className="text-sm font-bold text-slate-500 hover:text-blue-600 transition cursor-pointer px-2"
            >
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-slate-100 w-full max-w-sm flex flex-col items-center md:items-start gap-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connect With Me</span>
            <SocialLinks iconSize="w-5 h-5" profile={profile} />
          </div>
        </div>

        {/* Right Column (Asymmetric Photo Frame) */}
        <div 
          ref={photoRef}
          className="hero-animate opacity-0 md:col-span-5 flex justify-center z-10"
        >
          <ProfilePhoto 
            imageUrl={profileImage} 
            name="Nitin Gupta" 
          />
        </div>
      </div>
    </section>
  );
}
