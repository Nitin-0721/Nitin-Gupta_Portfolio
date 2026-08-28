import { PROFILE } from './profile.js';

export const DEVELOPER_INFO = {
  name: PROFILE.name,
  title: 'Software Developer | Full-Stack Developer | Problem Solver',
  tagline: `Hi, I'm ${PROFILE.name}`,
  description: PROFILE.shortBio,
  aboutIntroduction: 'I am a B.Tech student specializing in Electronics & Communication Engineering (IoT) at Madan Mohan Malaviya University of Technology, Gorakhpur. I have a deep passion for building high-quality software, full-stack web applications, and experimenting with AI/ML. With a strong foundation in Data Structures and Algorithms, I enjoy analyzing complex challenges and writing clean, efficient code.',
  
  // Contact & Social Profile Placeholders
  email: PROFILE.email,
  githubUrl: PROFILE.githubUrl,
  linkedinUrl: PROFILE.linkedinUrl,
  leetcodeUrl: PROFILE.leetcodeUrl,
  codechefUrl: PROFILE.codechefUrl,
  resumeUrl: PROFILE.resumeUrl,

  // Education Details
  education: {
    institution: 'Madan Mohan Malaviya University of Technology, Gorakhpur',
    degree: 'B.Tech — Electronics & Communication Engineering (IoT)',
    description: 'Focusing on IoT architectures, microcontrollers, embedded programming, and computer science fundamentals.'
  },

  // Internship Experience
  experience: {
    company: 'Tata Advanced Systems Limited (TASL)',
    role: 'Software Developer Intern',
    division: 'Cybersecurity & Physical Security Division — Security Operations Center',
    bullets: [
      'Performed security operations monitoring and log analysis using SIEM platforms including ArcSight, Seceon, and Gurucul.',
      'Monitored security alert pipelines and analyzed incoming logs to identify network security anomalies.',
      'Mapped detected threat behaviors and events to the MITRE ATT&CK framework for standardized threat intelligence tracking.',
      'Developed diagnostic scripts and analyzed server events logs to verify network boundary compliance.'
    ]
  },

  // Achievements List
  achievements: [
    {
      title: 'LeetCode Problem Solving',
      description: 'Solved 425+ algorithmic problems on LeetCode focusing on array structures, dynamic programming, and graph algorithms.'
    },
    {
      title: 'LeetCode Contest Rating',
      description: 'Achieved a contest rating of 1600+ participating in biweekly and weekly competitive programming matches.'
    },
    {
      title: 'CodeChef Star Rating',
      description: 'Acquired a 2-Star CodeChef ranking in short-format competitive contests.'
    },
    {
      title: 'Smart India Hackathon',
      description: 'Qualified the internal round of Smart India Hackathon (SIH) representing Team Synapse with the Intelibin prototype.'
    },
    {
      title: 'Intelibin Hardware Prototype',
      description: 'Represented MMMUT and built a physical ESP32 and TensorFlow Lite prototype for smart refuse bin classification.'
    },
    {
      title: 'RBI Quiz Representative',
      description: 'Selected to represent MMMUT in the regional round of the Reserve Bank of India (RBI) Academic Quiz.'
    },
    {
      title: 'Training & Placement Cell Coordinator',
      description: 'Assisted in coordinating on-campus recruitment drives, candidate scheduling, and company relations.'
    },
    {
      title: 'Robotics Club Graphics Design Lead',
      description: 'Led digital branding and graphics design assets for workshops and robot exhibitions.'
    }
  ]
};
