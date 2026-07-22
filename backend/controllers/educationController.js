const { pool } = require('../config/db');

// GET /api/education (public)
async function getEducation(req, res, next) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM education ORDER BY is_current DESC, start_date DESC'
    );
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    next(err);
  }
}

// POST /api/education (protected)
async function createEducation(req, res, next) {
  try {
    const { institution, degree, field_of_study, start_date, end_date, is_current, description, display_order } = req.body;
    if (!institution || !degree || !start_date) {
      return res.status(400).json({ success: false, message: 'Institution, degree, and start_date are required' });
    }

    const [result] = await pool.execute(
      `INSERT INTO education (institution, degree, field_of_study, start_date, end_date, is_current, description, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [institution, degree, field_of_study || null, start_date,
        is_current ? null : (end_date || null), !!is_current, description || null, display_order || 0]
    );
    const [rows] = await pool.execute('SELECT * FROM education WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Education entry created', data: rows[0] });
  } catch (err) {
    next(err);
  }
}

// PUT /api/education/:id (protected)
async function updateEducation(req, res, next) {
  try {
    const { id } = req.params;
    const { institution, degree, field_of_study, start_date, end_date, is_current, description, display_order } = req.body;

    const [existing] = await pool.execute('SELECT * FROM education WHERE id = ?', [id]);
    if (!existing[0]) return res.status(404).json({ success: false, message: 'Education entry not found' });

    await pool.execute(
      `UPDATE education SET institution = ?, degree = ?, field_of_study = ?, start_date = ?,
        end_date = ?, is_current = ?, description = ?, display_order = ? WHERE id = ?`,
      [institution ?? existing[0].institution, degree ?? existing[0].degree,
        field_of_study ?? existing[0].field_of_study, start_date ?? existing[0].start_date,
        is_current ? null : (end_date ?? existing[0].end_date),
        is_current !== undefined ? !!is_current : existing[0].is_current,
        description ?? existing[0].description, display_order ?? existing[0].display_order, id]
    );
    const [rows] = await pool.execute('SELECT * FROM education WHERE id = ?', [id]);
    res.json({ success: true, message: 'Education entry updated', data: rows[0] });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/education/:id (protected)
async function deleteEducation(req, res, next) {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM education WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Education entry not found' });
    res.json({ success: true, message: 'Education entry deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getEducation, createEducation, updateEducation, deleteEducation };
