import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { getProfile } from '../../services/profileService.js';
import { isPlaceholder } from '../../utils/placeholderCheck.js';
import { PROFILE } from '../../constants/profile.js';

// Custom GitHub SVG Icon
export const GitHubIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Custom LinkedIn SVG Icon
export const LinkedInIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Custom LeetCode SVG Icon
export const LeetCodeIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.102 17.93l-2.697 2.607c-.466.45-1.211.45-1.677 0l-8.579-8.286A2.434 2.434 0 0 1 2.4 10.518V4.898c0-.623.513-1.127 1.144-1.127h5.733c.304 0 .596.118.812.327l6.013 5.81a1.147 1.147 0 0 1 0 1.637l-4.717 4.557 4.717 4.556a1.147 1.147 0 0 1 0 1.638zM8.288 5.76H4.388v3.83l6.452 6.223 3.902-3.766L8.288 5.76z" />
  </svg>
);

// Custom CodeChef SVG Icon
export const CodeChefIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M21 16.5c0 .38-.21.73-.55.9l-8 4c-.28.14-.62.14-.9 0l-8-4c-.34-.17-.55-.52-.55-.9v-9c0-.38.21-.73.55-.9l8-4c.28-.14.62-.14.9 0l8 4c.34.17.55.52.55.9v9zm-10-8.68V19.3l-6-3v-7.62l6-2.86zm8 3v4.62l-6 3V10.82l6-3z" />
  </svg>
);

export default function SocialLinks({ className = '', iconSize = 'w-5 h-5', profile: propProfile }) {
  const [profile, setProfile] = useState(propProfile || PROFILE);

  useEffect(() => {
    if (propProfile) {
      setProfile(propProfile);
      return;
    }
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        if (response.success && response.data) {
          setProfile(response.data);
        }
      } catch (err) {
        console.error('Failed to load profile for SocialLinks:', err.message);
      }
    };
    fetchProfile();
  }, [propProfile]);

  const links = [
    {
      name: 'GitHub',
      url: profile?.githubUrl || '',
      icon: <GitHubIcon className={iconSize} />,
      color: 'hover:text-slate-900 text-slate-500'
    },
    {
      name: 'LinkedIn',
      url: profile?.linkedinUrl || '',
      icon: <LinkedInIcon className={iconSize} />,
      color: 'hover:text-blue-600 text-slate-500'
    },
    {
      name: 'LeetCode',
      url: profile?.leetcodeUrl || '',
      icon: <LeetCodeIcon className={iconSize} />,
      color: 'hover:text-amber-500 text-slate-500'
    },
    {
      name: 'CodeChef',
      url: profile?.codechefUrl || '',
      icon: <CodeChefIcon className={iconSize} />,
      color: 'hover:text-rose-600 text-slate-500'
    },
    {
      name: 'Email',
      url: profile?.email ? `mailto:${profile.email}` : '',
      icon: <Mail className={iconSize} />,
      color: 'hover:text-red-500 text-slate-500'
    }
  ];

  const handleSocialClick = (e, name, url) => {
    const actualUrl = url.startsWith('mailto:') ? url.substring(7) : url;
    if (isPlaceholder(actualUrl) || !actualUrl) {
      e.preventDefault();
      alert(`${name} link is currently being updated. Please check back later!`);
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url || '#'}
          onClick={(e) => handleSocialClick(e, link.name, link.url)}
          target="_blank"
          rel="noopener noreferrer"
          title={link.name}
          aria-label={link.name}
          className={`transition-colors duration-200 ${link.color} cursor-pointer`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
