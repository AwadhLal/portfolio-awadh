const { pool } = require('../config/db');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// GET /api/projects (public) - supports ?featured=true
async function getProjects(req, res, next) {
  try {
    const { featured } = req.query;
    let query = 'SELECT * FROM projects';
    const params = [];

    if (featured === 'true') {
      query += ' WHERE featured = ?';
      params.push(true);
    }
    query += ' ORDER BY display_order ASC, created_at DESC';

    const [rows] = await pool.execute(query, params);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    next(err);
  }
}

// GET /api/projects/:idOrSlug (public)
async function getProject(req, res, next) {
  try {
    const { idOrSlug } = req.params;
    const isNumeric = /^\d+$/.test(idOrSlug);
    const [rows] = await pool.execute(
      `SELECT * FROM projects WHERE ${isNumeric ? 'id' : 'slug'} = ?`,
      [idOrSlug]
    );
    if (!rows[0]) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
}

// POST /api/projects (protected)
async function createProject(req, res, next) {
  try {
    const {
      title, short_description, description, tech_stack,
      image_url, live_url, github_url, featured, display_order,
    } = req.body;

    if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

    let slug = slugify(title);
    const [existingSlug] = await pool.execute('SELECT id FROM projects WHERE slug = ?', [slug]);
    if (existingSlug.length > 0) slug = `${slug}-${Date.now()}`;

    const [result] = await pool.execute(
      `INSERT INTO projects
        (title, slug, short_description, description, tech_stack, image_url,
         live_url, github_url, featured, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, short_description || null, description || null, tech_stack || null,
        image_url || null, live_url || null, github_url || null,
        !!featured, display_order || 0]
    );

    const [rows] = await pool.execute('SELECT * FROM projects WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Project created', data: rows[0] });
  } catch (err) {
    next(err);
  }
}

// PUT /api/projects/:id (protected)
async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    const {
      title, short_description, description, tech_stack,
      image_url, live_url, github_url, featured, display_order,
    } = req.body;

    const [existing] = await pool.execute('SELECT * FROM projects WHERE id = ?', [id]);
    if (!existing[0]) return res.status(404).json({ success: false, message: 'Project not found' });

    let slug = existing[0].slug;
    if (title && title !== existing[0].title) {
      slug = slugify(title);
      const [existingSlug] = await pool.execute('SELECT id FROM projects WHERE slug = ? AND id != ?', [slug, id]);
      if (existingSlug.length > 0) slug = `${slug}-${Date.now()}`;
    }

    await pool.execute(
      `UPDATE projects SET
        title = ?, slug = ?, short_description = ?, description = ?, tech_stack = ?,
        image_url = ?, live_url = ?, github_url = ?, featured = ?, display_order = ?
       WHERE id = ?`,
      [title || existing[0].title, slug, short_description ?? existing[0].short_description,
        description ?? existing[0].description, tech_stack ?? existing[0].tech_stack,
        image_url ?? existing[0].image_url, live_url ?? existing[0].live_url,
        github_url ?? existing[0].github_url,
        featured !== undefined ? !!featured : existing[0].featured,
        display_order ?? existing[0].display_order, id]
    );

    const [rows] = await pool.execute('SELECT * FROM projects WHERE id = ?', [id]);
    res.json({ success: true, message: 'Project updated', data: rows[0] });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/projects/:id (protected)
async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM projects WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
}

// POST /api/projects/upload-image (protected)
async function uploadProjectImage(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    res.json({ success: true, url: `/uploads/${req.file.filename}` });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getProjects, getProject, createProject, updateProject, deleteProject, uploadProjectImage,
};
