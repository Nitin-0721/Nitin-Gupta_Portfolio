import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Middlewares
import notFoundMiddleware from './middleware/notFoundMiddleware.js';
import errorMiddleware from './middleware/errorMiddleware.js';

// Import Routes
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';

const app = express();

// CORS Configuration
const configuredOrigins = (
  process.env.CLIENT_URL || 'http://localhost:5173'
)
  .split(',')
  .map(url => url.trim())
  .filter(Boolean);

const localDevOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5175'
];

const allowedOrigins = [
  ...new Set([
    ...configuredOrigins,
    ...localDevOrigins
  ])
];

app.use(cors({
  origin: (origin, callback) => {

    // Allow requests without origin
    if (!origin) {
      return callback(null, true);
    }

    const isAllowedExactOrigin = allowedOrigins.includes(origin);

    const isVercelOrigin =
      /^https:\/\/.*\.vercel\.app$/i.test(origin);

    const isRenderOrigin =
      /^https:\/\/.*\.onrender\.com$/i.test(origin);

    const isLocalOrigin =
      /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/i.test(origin);

    if (
      isAllowedExactOrigin ||
      isVercelOrigin ||
      isRenderOrigin ||
      isLocalOrigin
    ) {
      return callback(null, true);
    }

    return callback(
      new Error(`Origin ${origin} not allowed by CORS`)
    );
  },

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ],

  credentials: true
}));

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio API is running'
  });
});

// Register API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/achievements', achievementRoutes);

// 404 Middleware
app.use(notFoundMiddleware);

// Error Middleware
app.use(errorMiddleware);

export default app;