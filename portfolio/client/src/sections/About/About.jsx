import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../../components/common/SectionTitle.jsx';
import { getProfile } from '../../services/profileService.js';
import { Award, BookOpen, Terminal, Cpu, GraduationCap, Calendar } from 'lucide-react';
import { PROFILE } from '../../constants/profile.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const [profile, setProfile] = useState(PROFILE);
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        if (response.success && response.data) {
          setProfile(response.data);
        }
      } catch (err) {
        console.error('Failed to load profile for About:', err.message);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!profile) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Left Column Text Reveal
      gsap.fromTo(leftColRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Right Column Cards Staggered Reveal
      gsap.fromTo(rightColRef.current.children,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [profile]);

  const cards = [
    {
      icon: <BookOpen className="w-5 h-5 text-inherit" />,
      title: 'Academic Focus',
      desc: 'B.Tech student at Madan Mohan Malaviya University of Technology, Gorakhpur.'
    },
    {
      icon: <Cpu className="w-5 h-5 text-inherit" />,
      title: 'What I do?',
      desc: 'Working on software development, backend systems, AI/ML applications, RAG pipelines, Agentic AI systems, and DSA-based problem solving'
    },
    // {
    //   icon: <Terminal className="w-5 h-5 text-inherit" />,
    //   title: 'MERN & Java Stack',
    //   desc: 'Building responsive full-stack applications with Node.js and Spring Boot REST APIs.'
    // },
    {
      icon: <Award className="w-5 h-5 text-inherit" />,
      title: 'Problem Solving',
      desc: 'Active competitive programming solving 425+ algorithmic puzzles on LeetCode.'
    }
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 bg-slate-50 border-y border-slate-200/60 relative overflow-hidden bg-grid-pattern"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle
          title="About Me"
          subtitle="An introduction to my engineering background and full-stack software interests."
        />

        <div className="grid md:grid-cols-12 gap-12 items-start mt-8">
          {/* Summary Text (Left) */}
          <div ref={leftColRef} className="md:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 leading-snug">
              Bridging Hardware Intelligence with Scalable Software
            </h3>
            <p className="text-slate-650 leading-relaxed text-sm sm:text-base">
              {profile?.bio || 'I am a B.Tech student specializing in Electronics & Communication Engineering (IoT). I have a deep passion for building high-quality software, full-stack web applications, and experimenting with AI/ML.'}
            </p>
            <p className="text-slate-655 leading-relaxed text-sm sm:text-base">
              I work as a MERN Stack Developer and AI/ML Engineer, building full-stack applications and scalable backend services using the MERN stack. I develop and integrate AI/ML solutions, including Retrieval-Augmented Generation (RAG) systems and Agentic AI applications, while applying data structures and algorithms to build efficient and reliable solutions.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#B11226] dark:bg-white rounded-full animate-ping" />
              <span className="text-xs font-bold text-white-500 uppercase tracking-widest">Actively Seeking SDE Internships & AI/ML - Roles</span>
            </div>
          </div>

          {/* Quick Info Grid (Right) */}
          <div ref={rightColRef} className="md:col-span-5 grid gap-4">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex gap-4 items-start transform hover:-translate-y-0.5"
              >
                <div className="p-2.5 bg-[#F5F5F5] dark:bg-white/10 border border-[#D6D6D6] dark:border-white/15 rounded-xl text-[#B11226] dark:text-[#D01F35] flex-shrink-0 shadow-3xs">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-slate-900 mb-1 leading-snug">{card.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Education Strip */}
        <div className="mt-12 bg-[#080808] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">

            {/* LEFT Column */}
            <div className="md:col-span-3 flex items-center gap-3 border-b md:border-b-0 md:border-r border-[#2A2A2A] pb-4 md:pb-0 md:pr-4">
              <div className="p-2.5 bg-[#B11226]/10 border border-[#B11226]/20 rounded-xl text-[#D01F35] flex-shrink-0 shadow-3xs">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#D01F35] uppercase block">
                  Academic History
                </span>
                <h4 className="text-sm font-display font-black text-[#F5F5F5] uppercase tracking-wider">
                  Education
                </h4>
              </div>
            </div>

            {/* CENTER Column */}
            <div className="md:col-span-5 space-y-1">
              <h4 className="text-base font-display font-bold text-[#F5F5F5] leading-snug">
                Bachelor of Technology (B.Tech)
              </h4>
              <p className="text-sm font-semibold text-[#B8B8B8]">
                Electronics & Communication Engineering (IoT)
              </p>
            </div>

            {/* RIGHT Column */}
            <div className="md:col-span-4 space-y-2 md:text-right">
              <div>
                <p className="text-sm font-medium text-[#F5F5F5]">
                  Madan Mohan Malaviya University of Technology
                </p>
                <p className="text-xs text-[#B8B8B8]">
                  Gorakhpur
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[#B8B8B8] text-xs font-mono md:justify-end">
                <Calendar className="w-3.5 h-3.5 text-[#D01F35]" />
                <span>2023 – 2027</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
