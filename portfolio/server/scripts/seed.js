import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';

// Load environment variables from .env
dotenv.config();

const seedProjects = [
  {
    title: 'HireSense AI',
    slug: 'hiresense-ai',
    description: 'An AI-powered candidate evaluation and screening system that parses resumes, extracts attributes, and matches them to job criteria using LLMs and semantic vector search.',
    technologies: ['FastAPI', 'Python', 'Streamlit', 'FAISS', 'Sentence Transformers', 'Groq Llama', 'PyMuPDF'],
    features: ['Resume PDF parsing and parsing metrics', 'Vector space semantic retrieval using FAISS', 'Instant candidate ranking comparisons'],
    githubUrl: '',
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
    githubUrl: '',
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
    githubUrl: '',
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
    githubUrl: '',
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
    githubUrl: '',
    liveUrl: '',
    image: '',
    category: 'Full Stack',
    order: 5
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('Seeding Failed: MONGO_URI is not defined in environment variables.');
      process.exit(1);
    }

    console.log('Connecting to database for seeding...');
    await mongoose.connect(mongoUri);
    console.log('Database connection established.');

    // Delete existing projects
    console.log('Clearing existing projects collection...');
    await Project.deleteMany({});
    console.log('Cleared existing projects.');

    // Insert new projects
    console.log('Inserting seed projects...');
    const result = await Project.insertMany(seedProjects);
    console.log(`Success! Seeded ${result.length} projects successfully.`);

    // Close mongoose connection
    await mongoose.disconnect();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Error during database seeding: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
