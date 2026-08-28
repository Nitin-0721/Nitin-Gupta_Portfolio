import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/common/SectionTitle.jsx';
import ProjectCard from './ProjectCard.jsx';
import { getProjects } from '../../services/projectService.js';
import Loader from '../../components/ui/Loader.jsx';
import ErrorMessage from '../../components/ui/ErrorMessage.jsx';
import { ArrowUpRight, Globe, Image } from 'lucide-react';
import { GitHubIcon } from '../../components/common/SocialLinks.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const featuredRef = useRef(null);

  const fetchProjectsData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getProjects();
      if (response.success && Array.isArray(response.data)) {
        setProjects(response.data);
      } else {
        setError('Failed to fetch projects data.');
      }
    } catch (err) {
      setError(err.message || 'Error occurred while loading projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Reveal featured project card
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Reveal standard projects grid
      if (listRef.current) {
        gsap.fromTo(listRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  // Designate the first project as "Featured" and the rest as secondary items
  const featuredProject = projects[0];
  const secondaryProjects = projects.slice(1);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-24 bg-slate-50 border-t border-slate-200/60 relative overflow-hidden bg-dot-pattern"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle
          title="Selected Work"
          subtitle="A curated showcase of applications, security tools, and software utilities I have designed."
        />

        {loading ? (
          <Loader message="Loading developer projects..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchProjectsData} />
        ) : projects.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl max-w-md mx-auto shadow-sm">
            <p className="text-slate-500 text-sm font-medium">No projects added yet.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* 1. Large Highlight Featured Project Layout */}
            {featuredProject && (
              <div 
                ref={featuredRef}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-350 transition-all duration-300 transform hover:-translate-y-1 grid md:grid-cols-12 group"
              >
                {/* Horizontal left photo visual */}
                <div className="h-64 md:h-full md:col-span-7 bg-slate-100 relative overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
                  {featuredProject.image ? (
                    <img
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}

                  {/* Fallback visual */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center text-slate-450 gap-2"
                    style={{ display: featuredProject.image ? 'none' : 'flex' }}
                  >
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 shadow-3xs">
                      <Image className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Image Coming Soon</span>
                  </div>
                </div>

                {/* Right side info blocks */}
                <div className="p-8 md:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100/50 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                      Featured Project
                    </span>
                    <h3 className="text-xl font-display font-extrabold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors duration-200 flex items-center justify-between">
                      <span>{featuredProject.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-550 leading-relaxed">
                      {featuredProject.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-150/40">
                    {/* Tags */}
                    {featuredProject.technologies && featuredProject.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {featuredProject.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-md uppercase tracking-wider"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions links */}
                    <div className="flex items-center gap-4 text-xs pt-1.5">
                      <Link
                        to={`/projects/${featuredProject.slug}`}
                        className="text-blue-600 font-extrabold hover:underline cursor-pointer"
                      >
                        View Project Details
                      </Link>

                      <div className="flex items-center gap-4 ml-auto text-slate-400">
                        {featuredProject.githubUrl && (
                          <a
                            href={featuredProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-slate-900 transition-colors duration-150 cursor-pointer"
                            title="Source Code"
                          >
                            <GitHubIcon className="w-4.5 h-4.5" />
                          </a>
                        )}
                        {featuredProject.liveUrl && (
                          <a
                            href={featuredProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-slate-900 transition-colors duration-150 cursor-pointer"
                            title="Live Demo"
                          >
                            <Globe className="w-4.5 h-4.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Smaller Secondary Grid Cards */}
            {secondaryProjects.length > 0 && (
              <div 
                ref={listRef}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {secondaryProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
