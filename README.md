# Professional Portfolio Website

A full-stack portfolio site: **React (Vite)** on the frontend, **Node.js/Express** on the backend, and **MySQL** for storage. It includes a public site (hero, about, skills, projects, experience, education, testimonials, contact form) and a password-protected admin dashboard for managing every section — no code changes needed to update your content.

## Tech stack

| Layer     | Tech |
|-----------|------|
| Frontend  | React 18, Vite, React Router, Tailwind CSS, Axios, lucide-react |
| Backend   | Node.js, Express, JWT auth, Multer (file uploads), bcrypt |
| Database  | MySQL 8 |

## Features

- Public site: hero, about, skills (grouped, with proficiency bars), project grid, work experience + education timeline, testimonials, and a contact form that writes to the database.
- Admin dashboard (`/admin`): JWT-protected login, and full CRUD screens for profile, projects, skills, experience, education, testimonials, and incoming contact messages (with read/unread state).
- File uploads for avatar, résumé (PDF), and project images, served from `/uploads`.
- Rate limiting on the contact form and the API in general.
- Clean REST API you can reuse for a mobile app or CLI later.

## Project structure
portfolio-website/
├── backend/
│ ├── config/db.js # MySQL connection pool
│ ├── controllers/ # Route handlers (business logic)
│ ├── middleware/ # auth (JWT), upload (multer), error handling
│ ├── routes/ # Express routers per resource
│ ├── database/
│ │ ├── schema.sql # Run once to create the database + tables
│ │ ├── seed.sql # Sample content
│ │ └── runSeed.js # Inserts sample content + hashed admin account
│ ├── uploads/ # Uploaded files (avatars, résumés, project images)
│ ├── server.js # Express app entry point
│ └── .env.example
└── frontend/
├── src/
│ ├── components/ # Navbar, Hero, About, Skills, Projects, etc.
│ ├── pages/ # Home, NotFound, admin/*
│ ├── context/AuthContext.jsx
│ └── services/api.js # Axios client + all API calls
└── .env.example


## Prerequisites

- Node.js 18+
- MySQL 8+ (or MariaDB 10.6+) running locally or reachable remotely
- npm

## 1. Set up the database

```bash
mysql -u root -p < backend/database/schema.sql
```

This creates the `portfolio_db` database and every table (admins, profile, skills, projects, experience, education, messages, testimonials).

## 2. Configure and run the backend

```bash
cd backend
cp .env.example .env
# edit .env: set DB_PASSWORD, JWT_SECRET, and ADMIN_EMAIL/ADMIN_PASSWORD

npm install
npm run seed     # inserts sample content + creates your admin login
npm run dev      # starts the API on http://localhost:5000
```

`npm run seed` is what actually creates your admin account — it hashes `ADMIN_PASSWORD` from `.env` with bcrypt before inserting it, so the plaintext password is never stored. Run it once; running it again just skips creating a duplicate admin.

Verify it's running: `curl http://localhost:5000/api/health`

## 3. Configure and run the frontend

```bash
cd frontend
cp .env.example .env    # defaults are fine for local dev (uses Vite's proxy)

npm install
npm run dev              # starts the site on http://localhost:5173
```

Visit `http://localhost:5173` for the public site, and `http://localhost:5173/admin/login` to sign in with the admin credentials you set in `backend/.env`.

## Environment variables

**backend/.env**

| Variable | Description |
|---|---|
| `PORT` | API port (default 5000) |
| `CLIENT_URL` | Frontend origin, used for CORS |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | MySQL connection |
| `JWT_SECRET` | Long random string used to sign admin auth tokens |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Used once by `npm run seed` to create your admin login |

**frontend/.env**

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL for API calls (leave as `/api` in dev — Vite proxies it to the backend) |

## API reference

All routes are prefixed with `/api`. Protected routes require `Authorization: Bearer <token>`.

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/auth/login` | Public | Admin login, returns JWT |
| GET | `/auth/me` | Protected | Current admin info |
| PUT | `/auth/change-password` | Protected | Change admin password |
| GET | `/profile` | Public | Get profile |
| PUT | `/profile` | Protected | Update profile |
| POST | `/profile/upload-avatar` | Protected | Upload avatar image |
| POST | `/profile/upload-resume` | Protected | Upload résumé PDF |
| GET | `/projects` | Public | List projects (`?featured=true` to filter) |
| GET | `/projects/:idOrSlug` | Public | Get a single project |
| POST | `/projects` | Protected | Create project |
| PUT | `/projects/:id` | Protected | Update project |
| DELETE | `/projects/:id` | Protected | Delete project |
| POST | `/projects/upload-image` | Protected | Upload project image |
| GET | `/skills` | Public | List skills |
| POST/PUT/DELETE | `/skills` | Protected | Manage skills |
| GET | `/experience` | Public | List work history |
| POST/PUT/DELETE | `/experience` | Protected | Manage work history |
| GET | `/education` | Public | List education history |
| POST/PUT/DELETE | `/education` | Protected | Manage education history |
| POST | `/contact` | Public (rate-limited) | Submit contact form |
| GET | `/contact` | Protected | List messages (`?unreadOnly=true`) |
| PATCH | `/contact/:id/read` | Protected | Mark message read/unread |
| DELETE | `/contact/:id` | Protected | Delete message |
| GET | `/testimonials` | Public | List testimonials |
| POST/PUT/DELETE | `/testimonials` | Protected | Manage testimonials |

## Customizing your content

Everything shown on the public site — name, bio, skills, projects, work history, education, testimonials — is stored in MySQL and edited through `/admin`. There's no need to touch the React code to update your résumé content; you only need to edit code to change layout, styling, or add new sections.

## Building for production

```bash
# frontend
cd frontend
npm run build      # outputs static files to frontend/dist

# backend
cd backend
NODE_ENV=production npm start
```

Serve `frontend/dist` from any static host (Vercel, Netlify, Nginx, etc.) and point `VITE_API_URL` at your deployed backend's URL before building. Deploy the backend anywhere that runs Node.js and can reach your MySQL instance (Railway, Render, a VPS, etc.), and make sure `CLIENT_URL` in `backend/.env` matches your deployed frontend origin for CORS.

## Security notes

- Change `JWT_SECRET` and the default admin password before deploying.
- The `uploads/` folder is served statically — don't put anything sensitive in it.
- The contact form is rate-limited (5 submissions per 15 minutes per IP) to reduce spam.
EOF

echo ""
echo "Done. Project created in ./$ROOT"
echo "Next steps:"
echo "  1) mysql -u root -p < $ROOT/backend/database/schema.sql"
echo "  2) cd $ROOT/backend && cp .env.example .env   (edit it, then: npm install && npm run seed && npm run dev)"
echo "  3) cd $ROOT/frontend && cp .env.example .env  (npm install && npm run dev)"