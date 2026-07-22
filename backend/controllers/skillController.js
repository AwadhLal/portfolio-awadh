const { pool } = require('../config/db');

// GET /api/skills (public)
async function getSkills(req, res, next) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM skills ORDER BY category ASC, display_order ASC, name ASC'
    );
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    next(err);
  }
}

// POST /api/skills (protected)
async function createSkill(req, res, next) {
  try {
    const { name, category, proficiency, icon, display_order } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });

    const [result] = await pool.execute(
      'INSERT INTO skills (name, category, proficiency, icon, display_order) VALUES (?, ?, ?, ?, ?)',
      [name, category || 'General', proficiency ?? 80, icon || null, display_order || 0]
    );
    const [rows] = await pool.execute('SELECT * FROM skills WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Skill created', data: rows[0] });
  } catch (err) {
    next(err);
  }
}

// PUT /api/skills/:id (protected)
async function updateSkill(req, res, next) {
  try {
    const { id } = req.params;
    const { name, category, proficiency, icon, display_order } = req.body;

    const [existing] = await pool.execute('SELECT * FROM skills WHERE id = ?', [id]);
    if (!existing[0]) return res.status(404).json({ success: false, message: 'Skill not found' });

    await pool.execute(
      'UPDATE skills SET name = ?, category = ?, proficiency = ?, icon = ?, display_order = ? WHERE id = ?',
      [name ?? existing[0].name, category ?? existing[0].category,
        proficiency ?? existing[0].proficiency, icon ?? existing[0].icon,
        display_order ?? existing[0].display_order, id]
    );
    const [rows] = await pool.execute('SELECT * FROM skills WHERE id = ?', [id]);
    res.json({ success: true, message: 'Skill updated', data: rows[0] });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/skills/:id (protected)
async function deleteSkill(req, res, next) {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM skills WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, message: 'Skill deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
