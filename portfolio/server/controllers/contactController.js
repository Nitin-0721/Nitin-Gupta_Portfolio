import ContactMessage from '../models/ContactMessage.js';

/**
 * Submit a contact request message.
 * POST /api/contact
 */
export const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    const contactMessage = await ContactMessage.create({
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      data: contactMessage
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all contact messages, sorted by creation date descending.
 * GET /api/contact
 */
export const getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Mark a contact message as read.
 * PATCH /api/contact/:id/read
 */
export const markContactMessageAsRead = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      res.status(404);
      throw new Error('Contact message not found');
    }

    message.isRead = true;
    await message.save();

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a contact message by MongoDB ID.
 * DELETE /api/contact/:id
 */
export const deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      res.status(404);
      throw new Error('Contact message not found');
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
