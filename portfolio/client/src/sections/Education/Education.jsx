import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../../components/common/SectionTitle.jsx';
import { getEducations } from '../../services/educationService.js';
import Loader from '../../components/ui/Loader.jsx';
import ErrorMessage from '../../components/ui/ErrorMessage.jsx';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const fetchEducationData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getEducations();
      if (response.success && Array.isArray(response.data)) {
        setEducations(response.data);
      } else {
        setError('Failed to fetch education records.');
      }
    } catch (err) {
      setError(err.message || 'Error occurred while loading education.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducationData();
  }, []);

  useEffect(() => {
    if (educations.length === 0) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Reveal education card list
      gsap.fromTo(cardsContainerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [educations]);

  return (
    <section 
      id="education" 
      ref={containerRef}
      className="py-24 bg-slate-50 border-t border-slate-200/60 relative overflow-hidden bg-dot-pattern"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle
          title="Education"
          subtitle="My academic history and fields of study."
        />

        {loading ? (
          <Loader message="Loading education records..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchEducationData} />
        ) : educations.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl max-w-md mx-auto shadow-sm">
            <p className="text-slate-500 text-sm font-medium">No education added yet.</p>
          </div>
        ) : (
          <div 
            ref={cardsContainerRef}
            className="space-y-6 max-w-3xl"
          >
            {educations.map((edu) => (
              <div 
                key={edu._id} 
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-slate-350 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="flex gap-5 items-start">
                  {/* Left Side Icon badge */}
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 hidden sm:block shadow-3xs flex-shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>

                  {/* Content Details */}
                  <div className="space-y-3.5">
                    <div>
                      <h3 className="text-lg md:text-xl font-display font-extrabold text-slate-900 leading-snug">
                        {edu.institution}
                      </h3>
                      <p className="text-sm font-semibold text-slate-655 mt-1">
                        {edu.degree} {edu.field ? `— ${edu.field}` : ''}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs font-mono">
                      {edu.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{edu.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{edu.startDate} – {edu.endDate || 'Present'}</span>
                      </div>
                    </div>

                    {edu.description && (
                      <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
