/**
 * Built-in fallback portfolio data.
 * Used for instant first-load rendering and fallback if the backend service
 * is spinning up (e.g., Render free-tier cold starts) or temporarily unreachable.
 */

export const DEFAULT_SKILLS = [
  // Languages
  { _id: 'sk-1', name: 'C++', category: 'Languages', order: 1 },
  { _id: 'sk-2', name: 'Java', category: 'Languages', order: 2 },
  { _id: 'sk-3', name: 'JavaScript', category: 'Languages', order: 3 },
  { _id: 'sk-4', name: 'Python', category: 'Languages', order: 4 },
  // Frontend
  { _id: 'sk-5', name: 'HTML', category: 'Frontend', order: 1 },
  { _id: 'sk-6', name: 'CSS', category: 'Frontend', order: 2 },
  { _id: 'sk-7', name: 'JavaScript', category: 'Frontend', order: 3 },
  { _id: 'sk-8', name: 'React.js', category: 'Frontend', order: 4 },
  { _id: 'sk-9', name: 'Tailwind CSS', category: 'Frontend', order: 5 },
  { _id: 'sk-10', name: 'Vite', category: 'Frontend', order: 6 },
  // Backend
  { _id: 'sk-11', name: 'Node.js', category: 'Backend', order: 1 },
  { _id: 'sk-12', name: 'Express.js', category: 'Backend', order: 2 },
  { _id: 'sk-13', name: 'Spring Boot', category: 'Backend', order: 3 },
  { _id: 'sk-14', name: 'REST APIs', category: 'Backend', order: 4 },
  // Databases
  { _id: 'sk-15', name: 'MongoDB', category: 'Databases', order: 1 },
  { _id: 'sk-16', name: 'MySQL', category: 'Databases', order: 2 },
  // AI / ML
  { _id: 'sk-17', name: 'NumPy', category: 'AI/ML', order: 1 },
  { _id: 'sk-18', name: 'Pandas', category: 'AI/ML', order: 2 },
  { _id: 'sk-19', name: 'Matplotlib', category: 'AI/ML', order: 3 },
  { _id: 'sk-20', name: 'Scikit-learn', category: 'AI/ML', order: 4 },
  { _id: 'sk-21', name: 'FAISS', category: 'AI/ML', order: 5 },
  { _id: 'sk-22', name: 'Sentence Transformers', category: 'AI/ML', order: 6 },
  { _id: 'sk-23', name: 'RAG', category: 'AI/ML', order: 7 },
  // Tools
  { _id: 'sk-24', name: 'Git', category: 'Tools', order: 1 },
  { _id: 'sk-25', name: 'GitHub', category: 'Tools', order: 2 },
  { _id: 'sk-26', name: 'VS Code', category: 'Tools', order: 3 },
  { _id: 'sk-27', name: 'IntelliJ IDEA', category: 'Tools', order: 4 },
  { _id: 'sk-28', name: 'Postman', category: 'Tools', order: 5 },
  { _id: 'sk-29', name: 'MongoDB Compass', category: 'Tools', order: 6 }
];

export const DEFAULT_PROJECTS = [
  {
    _id: 'proj-1',
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
    _id: 'proj-2',
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
    _id: 'proj-3',
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
    _id: 'proj-4',
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
    _id: 'proj-5',
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

export const DEFAULT_EXPERIENCES = [
  {
    _id: 'exp-1',
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

export const DEFAULT_EDUCATIONS = [
  {
    _id: 'edu-1',
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

export const DEFAULT_ACHIEVEMENTS = [
  {
    _id: 'ach-1',
    title: 'LeetCode Problem Solving',
    description: 'Solved 425+ algorithmic problems on LeetCode focusing on array structures, dynamic programming, and graph algorithms.',
    organization: 'LeetCode',
    date: '',
    url: 'https://leetcode.com',
    order: 1
  },
  {
    _id: 'ach-2',
    title: 'LeetCode Contest Rating',
    description: 'Achieved a contest rating of 1600+ participating in biweekly and weekly competitive programming matches.',
    organization: 'LeetCode',
    date: '',
    url: 'https://leetcode.com',
    order: 2
  },
  {
    _id: 'ach-3',
    title: 'CodeChef Star Rating',
    description: 'Acquired a 2-Star CodeChef ranking in short-format competitive contests.',
    organization: 'CodeChef',
    date: '',
    url: 'https://codechef.com',
    order: 3
  },
  {
    _id: 'ach-4',
    title: 'Smart India Hackathon',
    description: 'Qualified the internal round of Smart India Hackathon (SIH) representing Team Synapse with the Intelibin prototype.',
    organization: 'SIH / Team Synapse',
    date: '',
    url: '',
    order: 4
  },
  {
    _id: 'ach-5',
    title: 'Intelibin Hardware Prototype',
    description: 'Represented MMMUT and built a physical ESP32 and TensorFlow Lite prototype for smart refuse bin classification.',
    organization: 'MMMUT Gorakhpur',
    date: '',
    url: '',
    order: 5
  },
  {
    _id: 'ach-6',
    title: 'RBI Quiz Representative',
    description: 'Selected to represent MMMUT in the regional round of the Reserve Bank of India (RBI) Academic Quiz.',
    organization: 'Reserve Bank of India',
    date: '',
    url: '',
    order: 6
  },
  {
    _id: 'ach-7',
    title: 'Training & Placement Cell Coordinator',
    description: 'Assisted in coordinating on-campus recruitment drives, candidate scheduling, and company relations.',
    organization: 'Training & Placement Cell, MMMUT',
    date: '',
    url: '',
    order: 7
  },
  {
    _id: 'ach-8',
    title: 'Robotics Club Graphics Design Lead',
    description: 'Led digital branding and graphics design assets for workshops and robot exhibitions.',
    organization: 'Robotics Club, MMMUT',
    date: '',
    url: '',
    order: 8
  }
];
