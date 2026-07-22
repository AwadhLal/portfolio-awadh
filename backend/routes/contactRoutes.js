const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  submitMessage, getMessages, markMessageRead, deleteMessage,
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

// Limit contact form submissions to reduce spam/abuse: 5 per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many messages sent. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, submitMessage);
router.get('/', protect, getMessages);
router.patch('/:id/read', protect, markMessageRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
