-- =====================================================================
-- Sample content so the portfolio isn't empty on first run.
-- The admin account is created separately by `npm run seed` (see
-- database/runSeed.js) because its password must be bcrypt-hashed.
-- =====================================================================

USE portfolio_db;

INSERT INTO profile (id, full_name, title, tagline, bio, email, phone, location,
                      avatar_url, resume_url, github_url, linkedin_url, twitter_url,
                      website_url, years_experience)
VALUES (
  1,
  'Awadh Lal',
  'Full-Stack Software Engineer',
  'I build reliable web systems from database to browser.',
  'I am a full-stack developer specializing in React.js, Node.js, Express.js, MongoDB and MySQL. I enjoy turning ambiguous problems into clean, maintainable systems, and I care about the details that make software feel dependable: sensible data models, honest error states, and interfaces that get out of the way.',
  'awadhpatel177@gmail.com',
  '+91 76776 04616',
  'Remote / WFH / WFO',
  '/uploads/avatar-placeholder.png',
  '/uploads/resume-placeholder.pdf',
  'https://github.com/AwadhLal',
  'https://linkedin.com/awadhlal',
  'https://twitter.com/',
  'https://awadhpatel.in',
  1
)
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

INSERT INTO skills (name, category, proficiency, icon, display_order) VALUES
('JavaScript (ES6+)', 'Languages', 90, 'javascript', 1),
('TypeScript', 'Languages', 80, 'typescript', 2),
('Java', 'Languages', 70, 'java', 3),
('Python', 'Languages', 60, 'python', 4),
('React', 'Frontend', 90, 'react', 5),
('Redux / Context API', 'Frontend', 82, 'redux', 6),
('Tailwind CSS', 'Frontend', 88, 'tailwindcss', 7),
('Node.js', 'Backend', 90, 'nodejs', 8),
('Express.js', 'Backend', 88, 'express', 9),
('REST API Design', 'Backend', 87, 'api', 10),
('MySQL', 'Database', 85, 'mysql', 11),
('MongoDB', 'Database', 75, 'mongodb', 12),
('Docker', 'DevOps', 70, 'docker', 13),
('Git / GitHub', 'Tools', 90, 'git', 14);

INSERT INTO projects (title, slug, short_description, description, tech_stack,
                       image_url, live_url, github_url, featured, display_order) VALUES
(
  'Inventory Management System',
  'inventory-management-system',
  'A multi-warehouse inventory tracker with real-time stock alerts.',
  'Built a full-stack inventory platform used by three warehouses to track stock levels, transfers, and reorder points. Implemented role-based access control, audit logging, and a reporting dashboard with exportable CSV summaries.',
  'React, Node.js, Express, MySQL, JWT, Chart.js',
  '/uploads/project-placeholder-1.png',
  'https://example.com/demo',
  'https://github.com/example/inventory-system',
  TRUE,
  1
),
(
  'Client Billing Portal',
  'client-billing-portal',
  'Self-service invoicing and payment portal for freelance agencies.',
  'Designed and shipped a billing portal that lets agency clients view invoices, download PDF receipts, and track payment status. Integrated a queue-based email notification system and a MySQL-backed audit trail for every invoice state change.',
  'React, Node.js, Express, MySQL, Stripe API',
  '/uploads/project-placeholder-2.png',
  'https://example.com/demo',
  'https://github.com/example/billing-portal',
  TRUE,
  2
),
(
  'Team Task Board',
  'team-task-board',
  'A Kanban-style project management tool with live updates.',
  'A drag-and-drop task board for small engineering teams, with per-board permissions, activity history, and optimistic UI updates backed by a normalized MySQL schema for boards, columns, and cards.',
  'React, Node.js, Express, MySQL, WebSockets',
  '/uploads/project-placeholder-3.png',
  'https://example.com/demo',
  'https://github.com/example/task-board',
  FALSE,
  3
);

INSERT INTO experience (company, role, location, start_date, end_date, is_current, description, display_order) VALUES
('Northlane Digital', 'Senior Full-Stack Developer', 'Remote', '2023-02-01', NULL, TRUE,
 'Leading development of internal tooling and client-facing dashboards. Own the Node.js/MySQL service layer that powers five production applications.', 1),
('Brightform Labs', 'Full-Stack Developer', 'Austin, TX', '2020-06-01', '2023-01-15', FALSE,
 'Built and maintained React front ends and Express APIs for SaaS clients. Migrated a legacy PHP application to a Node.js and MySQL stack, cutting page load times by 40%.', 2),
('Studio Vela', 'Junior Web Developer', 'Austin, TX', '2018-08-01', '2020-05-30', FALSE,
 'Developed marketing sites and small web applications for local businesses using React and Node.js.', 3);

INSERT INTO education (institution, degree, field_of_study, start_date, end_date, is_current, description, display_order) VALUES
('I.K Gujral Punjab Technical University, Jalandhar, Punjab', 'B.Tech', 'Computer Science and Engineering', '2023-08-01', '2027-07-01', FALSE,
 'Focused on software engineering and databases. Senior capstone project: a distributed task scheduler.', 1);

INSERT INTO testimonials (author_name, author_role, content, avatar_url, display_order) VALUES
('Priya Patel', 'Product Manager, Northlane Digital',
 'Awadh consistently turns vague requirements into working systems faster than anyone else on the team, and the code is always easy for the rest of us to pick up.',
 '/uploads/avatar-placeholder.png', 1),
('Rahul Singh', 'CTO, Brightform Labs',
 'The migration Awadh led saved us real infrastructure cost and the documentation left behind made onboarding new engineers painless.',
 '/uploads/avatar-placeholder.png', 2);
