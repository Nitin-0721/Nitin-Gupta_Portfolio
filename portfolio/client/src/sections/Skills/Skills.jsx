import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../../components/common/SectionTitle.jsx';
import { getSkills } from '../../services/skillService.js';
import Loader from '../../components/ui/Loader.jsx';
import ErrorMessage from '../../components/ui/ErrorMessage.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Sub-component for cursor-responsive 3D Skill Category Cards
function Skill3DCard({ cat, idx }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0, active: false });
  const cardRef = useRef(null);
  const numberLabel = String(idx + 1).padStart(2, '0');

  const handleMouseMove = (e) => {
    // Skip 3D math on mobile/touch screens or reduced motion environments
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    
    // Calculate cursor coordinate offset from center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // rotation limits: X axis (max ±4deg), Y axis (max ±6deg)
    const rotateX = ((centerY - y) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY, active: true });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0, active: false });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 w-full group"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D Card Base with responsive transitions */}
      <div 
        className="w-full relative transition-all duration-300 ease-out rounded-2xl border bg-white dark:bg-[#111111] border-[#D6D6D6] dark:border-[#B11226]/50 group-hover:border-[#080808] dark:group-hover:border-[#B11226] p-6 shadow-sm flex flex-col justify-between"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(${rotate.active ? '-5px' : '0px'})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Subtle Right Face Depth */}
        <div 
          className="absolute right-0 top-1 bottom-1 w-[3px] bg-[#7F0D1A] rounded-r-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            transform: 'rotateY(90deg) translateZ(1px)',
            transformOrigin: 'right center',
          }}
        />
        
        {/* Subtle Bottom Face Depth */}
        <div 
          className="absolute bottom-0 left-1 right-1 h-[3px] bg-[#7F0D1A] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            transform: 'rotateX(-90deg) translateZ(1px)',
            transformOrigin: 'center bottom',
          }}
        />

        {/* Content Container utilizing depth projection */}
        <div style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}>
          {/* Header Indicators */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#B11226] dark:text-[#D01F35]">
              {numberLabel}
            </span>
            <div className="w-8 h-[1.5px] bg-transparent group-hover:bg-[#B11226] dark:group-hover:bg-[#D01F35] transition-colors duration-300" />
          </div>

          {/* Category Title */}
          <h3 className="text-xs font-display font-black text-[#080808] dark:text-[#F5F5F5] tracking-widest uppercase mb-4 border-b border-[#D6D6D6]/40 dark:border-[#2A2A2A]/40 pb-2.5 transition-transform duration-300 group-hover:translate-x-[2px]">
            {cat.category}
          </h3>

          {/* Skill List */}
          <div className="flex flex-wrap gap-2 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
            {cat.skills.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 border border-[#D6D6D6] dark:border-[#2A2A2A] px-2.5 py-1.5 rounded-lg bg-transparent hover:bg-[#B11226] hover:text-[#F5F5F5] dark:hover:bg-[#D01F35] transition duration-150 cursor-default select-none"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const fetchSkillsData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getSkills();
      if (response.success && Array.isArray(response.data)) {
        setSkills(response.data);
      } else {
        setError('Failed to load skills details.');
      }
    } catch (err) {
      setError(err.message || 'Error occurred while loading skills.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillsData();
  }, []);

  useEffect(() => {
    if (skills.length === 0) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Reveal category cards
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [skills]);

  // Group skills by category
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category;
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(skill.name);
    return acc;
  }, {});

  const skillCategories = Object.keys(grouped).map((catName) => ({
    category: catName,
    skills: grouped[catName]
  }));

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle title="Skills & Expertise" subtitle="A summary of programming languages, development stacks, and engineering tools I utilize." />

        {loading ? (
          <Loader message="Loading skills expertise..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchSkillsData} />
        ) : skillCategories.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto shadow-sm">
            <p className="text-slate-500 text-sm font-medium">No skills added yet.</p>
          </div>
        ) : (
          <div 
            ref={gridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((cat, idx) => (
              <Skill3DCard key={idx} cat={cat} idx={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
