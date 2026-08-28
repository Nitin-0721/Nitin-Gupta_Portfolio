import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Models
import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Achievement from '../models/Achievement.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load dotenv
dotenv.config({ path: path.join(__dirname, '../.env') });

const defaultProfile = {
  name: 'Nitin Gupta',
  professionalTitle: 'Software Developer | Full-Stack Developer | Problem Solver',
  bio: 'B.Tech student specializing in Electronics & Communication Engineering (IoT), passionate about software development, full-stack applications, and problem solving.',
  email: 'EMAIL',
  location: 'Gorakhpur, Uttar Pradesh, India',
  profileImage: '',
  resumeUrl: 'RESUME_URL',
  githubUrl: 'GITHUB_URL',
  linkedinUrl: 'LINKEDIN_URL',
  leetcodeUrl: 'LEETCODE_URL',
  codechefUrl: 'CODECHEF_URL'
};

const defaultSkills = [
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

const defaultExperiences = [
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

const defaultEducations = [
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

const defaultAchievements = [
  {
    title: 'LeetCode Problem Solving',
    description: 'Solved 425+ algorithmic problems on LeetCode focusing on array structures, dynamic programming, and graph algorithms.',
    organization: 'LeetCode',
    date: '',
    url: 'LEETCODE_URL',
    order: 1
  },
  {
    title: 'LeetCode Contest Rating',
    description: 'Achieved a contest rating of 1600+ participating in biweekly and weekly competitive programming matches.',
    organization: 'LeetCode',
    date: '',
    url: 'LEETCODE_URL',
    order: 2
  },
  {
    title: 'CodeChef Star Rating',
    description: 'Acquired a 2-Star CodeChef ranking in short-format competitive contests.',
    organization: 'CodeChef',
    date: '',
    url: 'CODECHEF_URL',
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

const seedCms = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for CMS seeding...');

    // 1. Profile Seeding
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      console.log('Seeding Profile document...');
      await Profile.create(defaultProfile);
      console.log('Profile seeded.');
    } else {
      console.log('Profile collection is already populated.');
    }

    // 2. Skills Seeding
    const skillsCount = await Skill.countDocuments();
    if (skillsCount === 0) {
      console.log('Seeding Skills collection...');
      await Skill.insertMany(defaultSkills);
      console.log('Skills seeded.');
    } else {
      console.log('Skills collection is already populated.');
    }

    // 3. Experience Seeding
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      console.log('Seeding Experience collection...');
      await Experience.insertMany(defaultExperiences);
      console.log('Experience seeded.');
    } else {
      console.log('Experience collection is already populated.');
    }

    // 4. Education Seeding
    const eduCount = await Education.countDocuments();
    if (eduCount === 0) {
      console.log('Seeding Education collection...');
      await Education.insertMany(defaultEducations);
      console.log('Education seeded.');
    } else {
      console.log('Education collection is already populated.');
    }

    // 5. Achievements Seeding
    const achCount = await Achievement.countDocuments();
    if (achCount === 0) {
      console.log('Seeding Achievements collection...');
      await Achievement.insertMany(defaultAchievements);
      console.log('Achievements seeded.');
    } else {
      console.log('Achievements collection is already populated.');
    }

    await mongoose.disconnect();
    console.log('CMS Seeding process completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('CMS Seeding failed:', error);
    process.exit(1);
  }
};

seedCms();
