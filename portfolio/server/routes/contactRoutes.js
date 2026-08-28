import express from 'express';
import {
  createContactMessage,
  getContactMessages,
  markContactMessageAsRead,
  deleteContactMessage
} from '../controllers/contactController.js';
import validateContact from '../validators/validateContact.js';
import validateObjectId from '../validators/validateObjectId.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for submitting messages
router.post('/', validateContact, createContactMessage);

// Admin-level endpoints (protected)
router.get('/', protect, getContactMessages);
router.patch('/:id/read', protect, validateObjectId('id'), markContactMessageAsRead);
router.delete('/:id', protect, validateObjectId('id'), deleteContactMessage);

export default router;
