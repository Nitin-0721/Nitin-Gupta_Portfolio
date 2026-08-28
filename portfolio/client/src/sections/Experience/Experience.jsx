import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../../components/common/SectionTitle.jsx';
import { getExperiences } from '../../services/experienceService.js';
import Loader from '../../components/ui/Loader.jsx';
import ErrorMessage from '../../components/ui/ErrorMessage.jsx';
import { Briefcase, Calendar, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const timelineLineRef = useRef(null);
  const cardsRef = useRef([]);

  const fetchExperienceData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getExperiences();
      if (response.success && Array.isArray(response.data)) {
        setExperiences(response.data);
      } else {
        setError('Failed to fetch experience entries.');
      }
    } catch (err) {
      setError(err.message || 'Error loading experience data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperienceData();
  }, []);

  useEffect(() => {
    if (experiences.length === 0) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Animate vertical timeline drawing line
      gsap.fromTo(timelineLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true
          }
        }
      );

      // Animate each timeline card slide-in
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [experiences]);

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle
          title="Professional Experience"
          subtitle="My industrial training history, internships, and technical roles."
        />

        {loading ? (
          <Loader message="Loading experience history..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchExperienceData} />
        ) : experiences.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto shadow-sm">
            <p className="text-slate-500 text-sm font-medium">No experience added yet.</p>
          </div>
        ) : (
          <div className="relative ml-4 md:ml-6 pl-6 md:pl-10 space-y-12 py-4">
            {/* Vertical timeline line drawing background */}
            <div 
              ref={timelineLineRef}
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#B11226] dark:bg-[#F5F5F5]/40 origin-top transform"
            />
            {/* Backup low contrast static line background */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-white/10 -z-10" />

            {experiences.map((exp, idx) => {
              const bullets = exp.description ? exp.description.split('\n').map(b => b.trim()).filter(Boolean) : [];
              return (
                <div 
                  key={exp._id} 
                  ref={el => cardsRef.current[idx] = el}
                  className="relative"
                >
                  {/* Experience Item Timeline Dot */}
                  <div className="absolute -left-[33px] md:-left-[41px] top-6 w-4.5 h-4.5 bg-[#B11226] dark:bg-[#080808] rounded-full ring-4 ring-[#D6D6D6] dark:ring-white/10 shadow-sm" />

                  {/* Experience Card */}
                  <div className="bg-[#FFFFFF] dark:bg-[#111111] border border-[#D6D6D6] dark:border-[#F5F5F5]/12 rounded-2xl p-6 md:p-8 hover:border-[#080808] dark:hover:border-[#B11226]/50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
                    {/* Header info */}
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#D6D6D6]/40 dark:border-white/10 pb-4 mb-6">
                      <div>
                        {exp.location && (
                          <span className="experience-meta-badge inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full uppercase tracking-wider mb-2">
                            <Shield className="w-3.5 h-3.5" /> {exp.location}
                          </span>
                        )}
                        <h3 className="text-xl font-display font-extrabold text-[#080808] dark:text-[#F5F5F5] leading-snug">{exp.position}</h3>
                        <h4 className="text-md font-bold text-slate-700 dark:text-[#B8B8B8] mt-1 flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4 text-slate-400 dark:text-[#D01F35]" /> {exp.company}
                        </h4>
                      </div>

                      <div className="experience-meta-badge flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg shadow-2xs">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Description Bullets */}
                    {bullets.length > 0 && (
                      <ul className="space-y-3">
                        {bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-[#555555] dark:text-[#B8B8B8] text-sm leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#080808] dark:bg-[#D01F35] mt-2.5 flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies list */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-[#D6D6D6]/40 dark:border-white/10 flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-bold text-[#080808] dark:text-[#F5F5F5] bg-[#F5F5F5] dark:bg-[#171717] border border-[#D6D6D6] dark:border-[#2A2A2A] px-2.5 py-1 rounded-md uppercase tracking-wider">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
