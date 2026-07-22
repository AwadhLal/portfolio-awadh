const { pool } = require('../config/db');

// GET /api/experience (public)
async function getExperience(req, res, next) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM experience ORDER BY is_current DESC, start_date DESC'
    );
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    next(err);
  }
}

// POST /api/experience (protected)
async function createExperience(req, res, next) {
  try {
    const { company, role, location, start_date, end_date, is_current, description, display_order } = req.body;
    if (!company || !role || !start_date) {
      return res.status(400).json({ success: false, message: 'Company, role, and start_date are required' });
    }

    const [result] = await pool.execute(
      `INSERT INTO experience (company, role, location, start_date, end_date, is_current, description, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [company, role, location || null, start_date, is_current ? null : (end_date || null),
        !!is_current, description || null, display_order || 0]
    );
    const [rows] = await pool.execute('SELECT * FROM experience WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Experience entry created', data: rows[0] });
  } catch (err) {
    next(err);
  }
}

// PUT /api/experience/:id (protected)
async function updateExperience(req, res, next) {
  try {
    const { id } = req.params;
    const { company, role, location, start_date, end_date, is_current, description, display_order } = req.body;

    const [existing] = await pool.execute('SELECT * FROM experience WHERE id = ?', [id]);
    if (!existing[0]) return res.status(404).json({ success: false, message: 'Experience entry not found' });

    await pool.execute(
      `UPDATE experience SET company = ?, role = ?, location = ?, start_date = ?, end_date = ?,
        is_current = ?, description = ?, display_order = ? WHERE id = ?`,
      [company ?? existing[0].company, role ?? existing[0].role, location ?? existing[0].location,
        start_date ?? existing[0].start_date,
        is_current ? null : (end_date ?? existing[0].end_date),
        is_current !== undefined ? !!is_current : existing[0].is_current,
        description ?? existing[0].description, display_order ?? existing[0].display_order, id]
    );
    const [rows] = await pool.execute('SELECT * FROM experience WHERE id = ?', [id]);
    res.json({ success: true, message: 'Experience entry updated', data: rows[0] });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/experience/:id (protected)
async function deleteExperience(req, res, next) {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM experience WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Experience entry not found' });
    res.json({ success: true, message: 'Experience entry deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getExperience, createExperience, updateExperience, deleteExperience };
