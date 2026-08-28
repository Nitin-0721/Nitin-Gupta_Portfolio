import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Cpu, CheckCircle } from 'lucide-react';
import { GitHubIcon } from '../components/common/SocialLinks.jsx';
import { getProjectBySlug } from '../services/projectService.js';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Button from '../components/common/Button.jsx';
import Loader from '../components/ui/Loader.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';
import { setPageMeta } from '../utils/seo.js';

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // SEO page headers dynamic handler
  useEffect(() => {
    if (project) {
      setPageMeta(
        `${project.title} | Nitin Gupta`,
        project.description ? project.description.substring(0, 150) + '...' : 'Project details'
      );
    } else {
      setPageMeta('Project Details | Nitin Gupta', 'Loading project details...');
    }
  }, [project]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await getProjectBySlug(slug);
        if (response.success && response.data) {
          setProject(response.data);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError(err.message || 'Error fetching project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-6 pt-28 pb-16 w-full">
        {/* Back Link */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </Link>

        {loading ? (
          <Loader message="Loading project details..." />
        ) : error ? (
          <ErrorMessage
            message={error}
            onRetry={() => navigate('/#projects')}
          />
        ) : (
          <article className="bg-white border border-slate-100 rounded-2xl p-6 md:p-10 shadow-sm">
            {/* Title & Metadata */}
            <div className="border-b border-slate-100 pb-6 mb-6">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {project.category || 'Development Project'}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                {project.title}
              </h1>
            </div>

            {/* Overview / Description */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">Project Overview</h2>
              <p className="text-slate-600 leading-relaxed text-base">{project.description}</p>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Key Features</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                      <CheckCircle className="w-4.5 h-4.5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-slate-400" /> Technologies & Tools
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links Block */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100">
              {project.githubUrl ? (
                <Button href={project.githubUrl} variant="primary" className="gap-2">
                  <GitHubIcon className="w-4 h-4" /> View Source Code
                </Button>
              ) : (
                <Button href="https://github.com/placeholder-nitin" variant="primary" className="gap-2">
                  <GitHubIcon className="w-4 h-4" /> View Source Code
                </Button>
              )}

              {project.liveUrl ? (
                <Button href={project.liveUrl} variant="secondary" className="gap-2">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </Button>
              ) : (
                <Button href="#" variant="secondary" className="gap-2 opacity-50 cursor-not-allowed" onClick={(e) => e.preventDefault()}>
                  <ExternalLink className="w-4 h-4" /> No Live Demo
                </Button>
              )}
            </div>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}
