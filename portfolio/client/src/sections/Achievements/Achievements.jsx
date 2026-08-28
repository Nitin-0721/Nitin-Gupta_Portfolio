import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../../components/common/SectionTitle.jsx';
import { getAchievements } from '../../services/achievementService.js';
import Loader from '../../components/ui/Loader.jsx';
import ErrorMessage from '../../components/ui/ErrorMessage.jsx';
import { Award, Trophy, Code, Target, BookOpen, Users, Palette, Cpu, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Dynamically select high-fidelity Lucide icon based on achievement keywords
const getAchievementIcon = (title) => {
  const t = title.toLowerCase();
  const c = "w-4 h-4 text-inherit";
  if (t.includes('leetcode') && (t.includes('solve') || t.includes('problem'))) return <Code className={c} />;
  if (t.includes('leetcode') || t.includes('rating')) return <Trophy className={c} />;
  if (t.includes('codechef')) return <Award className={c} />;
  if (t.includes('hackathon') || t.includes('sih') || t.includes('synapse')) return <Target className={c} />;
  if (t.includes('intelibin') || t.includes('hardware') || t.includes('refuse')) return <Cpu className={c} />;
  if (t.includes('quiz') || t.includes('rbi')) return <BookOpen className={c} />;
  if (t.includes('placement') || t.includes('coordinator')) return <Users className={c} />;
  if (t.includes('robotics') || t.includes('graphics') || t.includes('palette')) return <Palette className={c} />;
  return <Trophy className={c} />;
};

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const fetchAchievementsData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAchievements();
      if (response.success && Array.isArray(response.data)) {
        setAchievements(response.data);
      } else {
        setError('Failed to fetch achievements records.');
      }
    } catch (err) {
      setError(err.message || 'Error occurred while loading achievements.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievementsData();
  }, []);

  useEffect(() => {
    if (achievements.length === 0) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Staggered reveal transition: opacity 0->1, upward translate 20px
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [achievements]);

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle
          title="Achievements & Metrics"
          subtitle="Coding profile ratings, academic honors, hackathons, and leadership roles."
        />

        {loading ? (
          <Loader message="Loading achievements records..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchAchievementsData} />
        ) : achievements.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto shadow-sm">
            <p className="text-slate-500 text-sm font-medium">No achievements added yet.</p>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {achievements.map((item, idx) => {
              const numberLabel = String(idx + 1).padStart(2, '0');

              // Parse out the metrics (e.g. 1600+, 425+, 2★) from title/description
              const regex = /^(\d+\+?|\d+★|[A-Z]{3,4})\s*(.*)$/;
              let bigText = '';
              let subText = '';

              const titleMatch = item.title.match(regex);
              const descMatch = item.description.match(regex);

              if (titleMatch) {
                bigText = titleMatch[1];
                subText = titleMatch[2] || item.description;
              } else if (descMatch) {
                bigText = descMatch[1];
                subText = descMatch[2] || item.title;
              } else {
                bigText = item.title;
                subText = item.description;
              }

              return (
                <div
                  key={item._id || idx}
                  className="bg-[#F5F5F5] dark:bg-black/25 border border-[#D6D6D6] dark:border-white/18 text-[#080808] dark:text-[#F5F5F5] rounded-2xl p-6 transition-all duration-300 hover:border-[#080808] dark:hover:border-white/40 hover:shadow-sm transform hover:-translate-y-1 flex flex-col justify-between min-h-[200px] h-auto min-w-0"
                >
                  <div className="space-y-4">
                    {/* Index Indicator & Icon */}
                    <div className="flex justify-between items-center text-[11px] font-mono font-bold tracking-widest text-[#B11226] dark:text-white/50">
                      <span>{numberLabel}</span>
                      <div className="p-1.5 bg-[#080808]/5 dark:bg-white/10 rounded-lg text-[#080808] dark:text-[#F5F5F5]">
                        {getAchievementIcon(item.title)}
                      </div>
                    </div>

                    {/* Metric Number */}
                    <div className="text-3xl font-black tracking-tight text-[#B11226] dark:text-white font-display break-words whitespace-normal leading-none">
                      {bigText}
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1.5 min-w-0">
                      <h4 className="text-sm font-bold tracking-normal text-[#080808] dark:text-[#F5F5F5] leading-snug break-words whitespace-normal">
                        {subText}
                      </h4>
                      {item.description && item.description !== subText && item.description !== item.title && (
                        <p className="text-xs text-[#555555] dark:text-[#F5F5F5]/75 leading-relaxed break-words whitespace-normal font-medium">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Organization & Links */}
                  {(item.organization || item.url) && (
                    <div className="mt-6 pt-4 border-t border-[#D6D6D6] dark:border-white/20 flex items-center justify-between text-[10px] text-[#555555] dark:text-slate-200 font-bold uppercase tracking-wider">
                      <span className="truncate max-w-[120px]">{item.organization || 'MMMUT'}</span>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#B11226] dark:text-white hover:underline flex items-center gap-1.5 transition duration-150"
                        >
                          <span>View Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
