import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Achievement from '../models/Achievement.js';
import Profile from '../models/Profile.js';
import Admin from '../models/Admin.js';

const initialProfile = {
  name: 'Nitin Gupta',
  professionalTitle: 'Software Developer | Full-Stack Developer | Problem Solver',
  bio: 'B.Tech student specializing in Electronics & Communication Engineering (IoT), passionate about software development, full-stack applications, and problem solving.',
  email: 'nitinguptaa0721@gmail.com',
  location: 'Gorakhpur, Uttar Pradesh, India',
  profileImage: '',
  resumeUrl: '',
  githubUrl: 'https://github.com/Nitin-0721',
  linkedinUrl: 'https://linkedin.com',
  leetcodeUrl: 'https://leetcode.com',
  codechefUrl: 'https://codechef.com'
};

const initialSkills = [
  // Languages
  { name: 'C++', category: 'Languages', order: 1 },
  { name: 'Java', category: 'Languages', order: 2 },
  { name: 'JavaScript', category: 'Languages', order: 3 },
  { name: 'Python', category: 'Languages', order: 4 },
  // Frontend
  { name: 'HTML', category: 'Frontend', order: 1 },
  { name: 'CSS', category: 'Frontend', order: 2 },
  { name: 'JavaScript', category: 'Frontend', order: 3 },
  { name: 'React.js', category: 'Frontend', order: 4 },
  { name: 'Tailwind CSS', category: 'Frontend', order: 5 },
  { name: 'Vite', category: 'Frontend', order: 6 },
  // Backend
  { name: 'Node.js', category: 'Backend', order: 1 },
  { name: 'Express.js', category: 'Backend', order: 2 },
  { name: 'Spring Boot', category: 'Backend', order: 3 },
  { name: 'REST APIs', category: 'Backend', order: 4 },
  // Databases
  { name: 'MongoDB', category: 'Databases', order: 1 },
  { name: 'MySQL', category: 'Databases', order: 2 },
  // AI / ML
  { name: 'NumPy', category: 'AI/ML', order: 1 },
  { name: 'Pandas', category: 'AI/ML', order: 2 },
  { name: 'Matplotlib', category: 'AI/ML', order: 3 },
  { name: 'Scikit-learn', category: 'AI/ML', order: 4 },
  { name: 'FAISS', category: 'AI/ML', order: 5 },
  { name: 'Sentence Transformers', category: 'AI/ML', order: 6 },
  { name: 'RAG', category: 'AI/ML', order: 7 },
  // Tools
  { name: 'Git', category: 'Tools', order: 1 },
  { name: 'GitHub', category: 'Tools', order: 2 },
  { name: 'VS Code', category: 'Tools', order: 3 },
  { name: 'IntelliJ IDEA', category: 'Tools', order: 4 },
  { name: 'Postman', category: 'Tools', order: 5 },
  { name: 'MongoDB Compass', category: 'Tools', order: 6 }
];

const initialExperiences = [
  {
    company: 'Tata Advanced Systems Limited (TASL)',
    position: 'Software Developer Intern',
    location: 'Cybersecurity & Physical Security Division — Security Operations Center',
    startDate: 'Summer 2025',
    endDate: 'Summer 2025',
    current: false,
    description: 'Performed security operations monitoring and log analysis using SIEM platforms including ArcSight, Seceon, and Gurucul.\nMonitored security alert pipelines and analyzed incoming logs to identify network security anomalies.\nMapped detected threat behaviors and events to the MITRE ATT&CK framework for standardized threat intelligence tracking.\nDeveloped diagnostic scripts and analyzed server events logs to verify network boundary compliance.',
    technologies: ['ArcSight', 'Seceon', 'Gurucul', 'MITRE ATT&CK'],
    order: 1
  }
];

const initialEducations = [
  {
    institution: 'Madan Mohan Malaviya University of Technology, Gorakhpur',
    degree: 'B.Tech',
    field: 'Electronics & Communication Engineering (IoT)',
    location: 'Gorakhpur, Uttar Pradesh, India',
    startDate: '2022',
    endDate: '2026',
    description: 'Focusing on IoT architectures, microcontrollers, embedded programming, and computer science fundamentals.',
    order: 1
  }
];

const initialAchievements = [
  {
    title: 'LeetCode Problem Solving',
    description: 'Solved 425+ algorithmic problems on LeetCode focusing on array structures, dynamic programming, and graph algorithms.',
    organization: 'LeetCode',
    date: '',
    url: 'https://leetcode.com',
    order: 1
  },
  {
    title: 'LeetCode Contest Rating',
    description: 'Achieved a contest rating of 1600+ participating in biweekly and weekly competitive programming matches.',
    organization: 'LeetCode',
    date: '',
    url: 'https://leetcode.com',
    order: 2
  },
  {
    title: 'CodeChef Star Rating',
    description: 'Acquired a 2-Star CodeChef ranking in short-format competitive contests.',
    organization: 'CodeChef',
    date: '',
    url: 'https://codechef.com',
    order: 3
  },
  {
    title: 'Smart India Hackathon',
    description: 'Qualified the internal round of Smart India Hackathon (SIH) representing Team Synapse with the Intelibin prototype.',
    organization: 'SIH / Team Synapse',
    date: '',
    url: '',
    order: 4
  },
  {
    title: 'Intelibin Hardware Prototype',
    description: 'Represented MMMUT and built a physical ESP32 and TensorFlow Lite prototype for smart refuse bin classification.',
    organization: 'MMMUT Gorakhpur',
    date: '',
    url: '',
    order: 5
  },
  {
    title: 'RBI Quiz Representative',
    description: 'Selected to represent MMMUT in the regional round of the Reserve Bank of India (RBI) Academic Quiz.',
    organization: 'Reserve Bank of India',
    date: '',
    url: '',
    order: 6
  },
  {
    title: 'Training & Placement Cell Coordinator',
    description: 'Assisted in coordinating on-campus recruitment drives, candidate scheduling, and company relations.',
    organization: 'Training & Placement Cell, MMMUT',
    date: '',
    url: '',
    order: 7
  },
  {
    title: 'Robotics Club Graphics Design Lead',
    description: 'Led digital branding and graphics design assets for workshops and robot exhibitions.',
    organization: 'Robotics Club, MMMUT',
    date: '',
    url: '',
    order: 8
  }
];

const initialProjects = [
  {
    title: 'HireSense AI',
    slug: 'hiresense-ai',
    description: 'An AI-powered candidate evaluation and screening system that parses resumes, extracts attributes, and matches them to job criteria using LLMs and semantic vector search.',
    technologies: ['FastAPI', 'Python', 'Streamlit', 'FAISS', 'Sentence Transformers', 'Groq Llama', 'PyMuPDF'],
    features: ['Resume PDF parsing and parsing metrics', 'Vector space semantic retrieval using FAISS', 'Instant candidate ranking comparisons'],
    githubUrl: 'https://github.com/Nitin-0721',
    liveUrl: '',
    image: '',
    category: 'AI & Data Science',
    order: 1
  },
  {
    title: 'Intelibin',
    slug: 'intelibin',
    description: 'An IoT-enabled smart waste classification system leveraging machine learning to automatically sort garbage and report fill-levels to municipal dashboards.',
    technologies: ['React', 'Raspberry Pi', 'ESP32/NodeMCU', 'TensorFlow Lite', 'Python'],
    features: ['Real-time object classification at the edge', 'ESP32 automated physical sorting gate', 'Live sensor reporting using WebSockets'],
    githubUrl: 'https://github.com/Nitin-0721',
    liveUrl: '',
    image: '',
    category: 'IoT & Machine Learning',
    order: 2
  },
  {
    title: 'Real-Time Chat Application',
    slug: 'real-time-chat-application',
    description: 'A responsive real-time chat dashboard enabling instant message synchronization, read receipts, and status presences via secure messaging protocols.',
    technologies: ['React', 'Spring Boot', 'WebSocket', 'SockJS', 'STOMP'],
    features: ['Stateful real-time chat rooms', 'Typing indicators and read receipts', 'JWT secure socket handshakes'],
    githubUrl: 'https://github.com/Nitin-0721',
    liveUrl: '',
    image: '',
    category: 'Web Development',
    order: 3
  },
  {
    title: 'Todo Application',
    slug: 'todo-application',
    description: 'A productivity application utilizing modern architectural patterns to track lists, schedule tasks, and maintain progress summaries.',
    technologies: ['Spring Boot', 'Java', 'MySQL', 'React'],
    features: ['Relational task organization and tags', 'User task categories', 'Paginated archive lists'],
    githubUrl: 'https://github.com/Nitin-0721',
    liveUrl: '',
    image: '',
    category: 'Web Development',
    order: 4
  },
  {
    title: 'Job Portal',
    slug: 'job-portal',
    description: 'A comprehensive recruitment platform connecting hiring managers with job seekers, featuring dynamic application timelines, screening tests, and profile dashboards.',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    features: ['Dual candidate/recruiter interfaces', 'File upload resume parsing', 'Interactive job board search filters'],
    githubUrl: 'https://github.com/Nitin-0721',
    liveUrl: '',
    image: '',
    category: 'Full Stack',
    order: 5
  }
];

export const autoSeedIfEmpty = async () => {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('[AutoSeed] Project collection empty. Inserting initial projects...');
      await Project.insertMany(initialProjects);
    }

    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      console.log('[AutoSeed] Skill collection empty. Inserting initial skills...');
      await Skill.insertMany(initialSkills);
    }

    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      console.log('[AutoSeed] Experience collection empty. Inserting initial experiences...');
      await Experience.insertMany(initialExperiences);
    }

    const eduCount = await Education.countDocuments();
    if (eduCount === 0) {
      console.log('[AutoSeed] Education collection empty. Inserting initial educations...');
      await Education.insertMany(initialEducations);
    }

    const achCount = await Achievement.countDocuments();
    if (achCount === 0) {
      console.log('[AutoSeed] Achievement collection empty. Inserting initial achievements...');
      await Achievement.insertMany(initialAchievements);
    }

    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      console.log('[AutoSeed] Profile collection empty. Inserting initial profile...');
      await Profile.create(initialProfile);
    }

    const adminCount = await Admin.countDocuments();
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'Admin';

    if (adminCount === 0 && adminEmail && adminPassword) {
      console.log(`[AutoSeed] Admin account missing. Creating default admin for ${adminEmail}...`);
      await Admin.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword
      });
    }
  } catch (error) {
    console.error('[AutoSeed] Notice during collection auto-seed check:', error.message);
  }
};
