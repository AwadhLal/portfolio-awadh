const { pool } = require('../config/db');

// GET /api/profile (public)
async function getProfile(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM profile WHERE id = 1');
    res.json({ success: true, data: rows[0] || null });
  } catch (err) {
    next(err);
  }
}

// PUT /api/profile (protected)
async function updateProfile(req, res, next) {
  try {
    const {
      full_name, title, tagline, bio, email, phone, location,
      avatar_url, resume_url, github_url, linkedin_url, twitter_url,
      website_url, years_experience,
    } = req.body;

    const [existing] = await pool.execute('SELECT id FROM profile WHERE id = 1');

    if (existing.length === 0) {
      await pool.execute(
        `INSERT INTO profile
          (id, full_name, title, tagline, bio, email, phone, location,
           avatar_url, resume_url, github_url, linkedin_url, twitter_url,
           website_url, years_experience)
         VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [full_name, title, tagline, bio, email, phone, location, avatar_url,
          resume_url, github_url, linkedin_url, twitter_url, website_url,
          years_experience || 0]
      );
    } else {
      await pool.execute(
        `UPDATE profile SET
          full_name = ?, title = ?, tagline = ?, bio = ?, email = ?, phone = ?,
          location = ?, avatar_url = ?, resume_url = ?, github_url = ?,
          linkedin_url = ?, twitter_url = ?, website_url = ?, years_experience = ?
         WHERE id = 1`,
        [full_name, title, tagline, bio, email, phone, location, avatar_url,
          resume_url, github_url, linkedin_url, twitter_url, website_url,
          years_experience || 0]
      );
    }

    const [rows] = await pool.execute('SELECT * FROM profile WHERE id = 1');
    res.json({ success: true, message: 'Profile updated', data: rows[0] });
  } catch (err) {
    next(err);
  }
}

// POST /api/profile/upload-avatar (protected)
async function uploadAvatar(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const fileUrl = `/uploads/${req.file.filename}`;
    await pool.execute('UPDATE profile SET avatar_url = ? WHERE id = 1', [fileUrl]);
    res.json({ success: true, message: 'Avatar uploaded', url: fileUrl });
  } catch (err) {
    next(err);
  }
}

// POST /api/profile/upload-resume (protected)
async function uploadResume(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const fileUrl = `/uploads/${req.file.filename}`;
    await pool.execute('UPDATE profile SET resume_url = ? WHERE id = 1', [fileUrl]);
    res.json({ success: true, message: 'Resume uploaded', url: fileUrl });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, updateProfile, uploadAvatar, uploadResume };
