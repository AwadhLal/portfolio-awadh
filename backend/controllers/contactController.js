const { pool } = require('../config/db');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact (public) - submit the contact form
async function submitMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }
    if (message.length > 5000) {
      return res.status(400).json({ success: false, message: 'Message is too long (max 5000 characters)' });
    }

    const [result] = await pool.execute(
      'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name.trim(), email.trim(), subject ? subject.trim() : null, message.trim()]
    );

    res.status(201).json({
      success: true,
      message: "Thanks for reaching out — I'll get back to you soon.",
      id: result.insertId,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/contact (protected) - list all messages, newest first
async function getMessages(req, res, next) {
  try {
    const { unreadOnly } = req.query;
    let query = 'SELECT * FROM messages';
    const params = [];
    if (unreadOnly === 'true') {
      query += ' WHERE is_read = ?';
      params.push(false);
    }
    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.execute(query, params);
    const [[{ unread_count }]] = await pool.query(
      'SELECT COUNT(*) as unread_count FROM messages WHERE is_read = false'
    );

    res.json({ success: true, count: rows.length, unread_count, data: rows });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/contact/:id/read (protected) - mark message read/unread
async function markMessageRead(req, res, next) {
  try {
    const { id } = req.params;
    const { is_read } = req.body;
    const [result] = await pool.execute(
      'UPDATE messages SET is_read = ? WHERE id = ?',
      [is_read !== undefined ? !!is_read : true, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, message: 'Message updated' });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/contact/:id (protected)
async function deleteMessage(req, res, next) {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM messages WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { submitMessage, getMessages, markMessageRead, deleteMessage };
