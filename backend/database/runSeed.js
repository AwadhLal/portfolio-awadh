/**
 * Seeds the database with sample content and creates the initial admin
 * account (password hashed with bcrypt, taken from .env).
 *
 * Usage:  npm run seed
 * Requires: schema.sql must already have been run against MySQL.
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'portfolio_db',
    multipleStatements: true,
  });

  try {
    console.log('Connected to MySQL. Seeding sample content...');

    const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    await connection.query(seedSql);
    console.log('Sample content inserted (profile, skills, projects, experience, education, testimonials).');

    const adminName = process.env.ADMIN_NAME || 'Admin User';
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

    const [existing] = await connection.execute(
      'SELECT id FROM admins WHERE email = ?',
      [adminEmail]
    );

    if (existing.length > 0) {
      console.log(`Admin account already exists for ${adminEmail}, skipping creation.`);
    } else {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await connection.execute(
        'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
        [adminName, adminEmail, hashedPassword]
      );
      console.log(`Admin account created: ${adminEmail} (password set from ADMIN_PASSWORD in .env)`);
    }

    console.log('\nSeeding complete. You can now log in to /admin/login with the admin credentials above.');
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  } finally {
    await connection.end();
  }
}

run();
