import express from 'express';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '../controllers/achievementController.js';
import validateAchievement from '../validators/validateAchievement.js';
import validateObjectId from '../validators/validateObjectId.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAchievements);
router.post('/', protect, validateAchievement, createAchievement);
router.put('/:id', protect, validateObjectId('id'), validateAchievement, updateAchievement);
router.delete('/:id', protect, validateObjectId('id'), deleteAchievement);

export default router;
