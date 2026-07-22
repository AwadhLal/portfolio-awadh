const { pool } = require('../config/db');

// GET /api/testimonials (public)
async function getTestimonials(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM testimonials ORDER BY display_order ASC, created_at DESC');
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    next(err);
  }
}

// POST /api/testimonials (protected)
async function createTestimonial(req, res, next) {
  try {
    const { author_name, author_role, content, avatar_url, display_order } = req.body;
    if (!author_name || !content) {
      return res.status(400).json({ success: false, message: 'author_name and content are required' });
    }
    const [result] = await pool.execute(
      'INSERT INTO testimonials (author_name, author_role, content, avatar_url, display_order) VALUES (?, ?, ?, ?, ?)',
      [author_name, author_role || null, content, avatar_url || null, display_order || 0]
    );
    const [rows] = await pool.execute('SELECT * FROM testimonials WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Testimonial created', data: rows[0] });
  } catch (err) {
    next(err);
  }
}

// PUT /api/testimonials/:id (protected)
async function updateTestimonial(req, res, next) {
  try {
    const { id } = req.params;
    const { author_name, author_role, content, avatar_url, display_order } = req.body;

    const [existing] = await pool.execute('SELECT * FROM testimonials WHERE id = ?', [id]);
    if (!existing[0]) return res.status(404).json({ success: false, message: 'Testimonial not found' });

    await pool.execute(
      'UPDATE testimonials SET author_name = ?, author_role = ?, content = ?, avatar_url = ?, display_order = ? WHERE id = ?',
      [author_name ?? existing[0].author_name, author_role ?? existing[0].author_role,
        content ?? existing[0].content, avatar_url ?? existing[0].avatar_url,
        display_order ?? existing[0].display_order, id]
    );
    const [rows] = await pool.execute('SELECT * FROM testimonials WHERE id = ?', [id]);
    res.json({ success: true, message: 'Testimonial updated', data: rows[0] });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/testimonials/:id (protected)
async function deleteTestimonial(req, res, next) {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM testimonials WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
