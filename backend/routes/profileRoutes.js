const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, uploadAvatar, uploadResume } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getProfile);
router.put('/', protect, updateProfile);
router.post('/upload-avatar', protect, upload.single('avatar'), uploadAvatar);
router.post('/upload-resume', protect, upload.single('resume'), uploadResume);

module.exports = router;
