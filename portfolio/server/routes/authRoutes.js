import express from 'express';
import { loginAdmin, getCurrentAdmin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public login trigger
router.post('/login', loginAdmin);

// Protected session state verify trigger
router.get('/me', protect, getCurrentAdmin);

export default router;
