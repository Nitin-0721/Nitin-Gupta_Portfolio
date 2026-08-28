import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Image } from 'lucide-react';
import { GitHubIcon } from '../../components/common/SocialLinks.jsx';

export default function ProjectCard({ project }) {
  const { title, description, technologies, githubUrl, liveUrl, image, slug } = project;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-350 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group">
      {/* Visual Header / Image Container */}
      <div className="h-48 w-full bg-slate-100 relative overflow-hidden flex items-center justify-center border-b border-slate-200">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            loading="lazy"
            onError={(e) => {
              // If local image fails, hide image element to show the placeholder
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}

        {/* Dynamic Image Placeholder Face */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center text-slate-450 gap-2"
          style={{ display: image ? 'none' : 'flex' }}
        >
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 shadow-3xs">
            <Image className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Image Coming Soon</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="text-md font-display font-extrabold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors duration-200 flex items-center justify-between">
            <span>{title}</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Tags and Links */}
        <div className="space-y-4 pt-2 border-t border-slate-150/40">
          {/* Tech Tags */}
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {technologies.slice(0, 4).map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[9px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 4 && (
                <span className="text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded-md">
                  +{technologies.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 text-xs pt-1.5">
            <Link
              to={`/projects/${slug}`}
              className="text-blue-600 font-bold hover:underline cursor-pointer"
            >
              View Details
            </Link>
            
            <div className="flex items-center gap-3.5 ml-auto text-slate-400">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors duration-150 cursor-pointer"
                  title="Source Code"
                  aria-label={`Source Code for ${title}`}
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors duration-150 cursor-pointer"
                  title="Live Demo"
                  aria-label={`Live Demo for ${title}`}
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
