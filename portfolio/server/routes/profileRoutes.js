import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import validateProfile from '../validators/validateProfile.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProfile);
router.put('/', protect, validateProfile, updateProfile);

export default router;
