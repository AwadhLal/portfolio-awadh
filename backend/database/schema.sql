-- =====================================================================
-- Portfolio Website - MySQL Schema
-- Run this once to create the database and all tables:
--   mysql -u root -p < database/schema.sql
-- =====================================================================

CREATE DATABASE IF NOT EXISTS portfolio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- ---------------------------------------------------------------------
-- admins: accounts allowed to log in and manage the portfolio content
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- profile: single-row table holding the site owner's headline info
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY DEFAULT 1,
  full_name VARCHAR(150) NOT NULL,
  title VARCHAR(150) NOT NULL,
  tagline VARCHAR(255),
  bio TEXT,
  email VARCHAR(150),
  phone VARCHAR(30),
  location VARCHAR(150),
  avatar_url VARCHAR(500),
  resume_url VARCHAR(500),
  github_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  twitter_url VARCHAR(255),
  website_url VARCHAR(255),
  years_experience INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_profile_single_row CHECK (id = 1)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- skills: technology / tool proficiency list, grouped by category
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'General',
  proficiency INT NOT NULL DEFAULT 80,
  icon VARCHAR(100),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_skill_proficiency CHECK (proficiency BETWEEN 0 AND 100)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- projects: portfolio work items
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  short_description VARCHAR(255),
  description TEXT,
  tech_stack VARCHAR(500),
  image_url VARCHAR(500),
  live_url VARCHAR(500),
  github_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE INDEX idx_projects_featured ON projects (featured);

-- ---------------------------------------------------------------------
-- experience: work history timeline
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(150) NOT NULL,
  role VARCHAR(150) NOT NULL,
  location VARCHAR(150),
  start_date DATE NOT NULL,
  end_date DATE NULL,
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- education: academic history
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS education (
  id INT AUTO_INCREMENT PRIMARY KEY,
  institution VARCHAR(150) NOT NULL,
  degree VARCHAR(150) NOT NULL,
  field_of_study VARCHAR(150),
  start_date DATE NOT NULL,
  end_date DATE NULL,
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- messages: submissions from the public contact form
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE INDEX idx_messages_is_read ON messages (is_read);

-- ---------------------------------------------------------------------
-- testimonials: optional recommendations / references
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(150) NOT NULL,
  author_role VARCHAR(150),
  content TEXT NOT NULL,
  avatar_url VARCHAR(500),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
