require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');

const { testConnection } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const educationRoutes = require('./routes/educationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');

const app = express();

// -------------------- Core Middleware --------------------
app.use(helmet({ crossOriginResourcePolicy: false }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-awadh.vercel.app",
  "https://portfolio.awadhpatel.in",
  "https://awadhpatel.in",
  "https://www.awadhpatel.in",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// -------------------- Rate Limiter --------------------
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', apiLimiter);

// -------------------- Static Files --------------------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -------------------- Routes --------------------
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);

// -------------------- Error Handling --------------------
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start() {
  await testConnection();

  app.listen(PORT, () => {
    console.log(`Portfolio API server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

start();

module.exports = app;




// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const path = require('path');
// const rateLimit = require('express-rate-limit');

// const { testConnection } = require('./config/db');
// const { notFound, errorHandler } = require('./middleware/errorHandler');

// const authRoutes = require('./routes/authRoutes');
// const profileRoutes = require('./routes/profileRoutes');
// const projectRoutes = require('./routes/projectRoutes');
// const skillRoutes = require('./routes/skillRoutes');
// const experienceRoutes = require('./routes/experienceRoutes');
// const educationRoutes = require('./routes/educationRoutes');
// const contactRoutes = require('./routes/contactRoutes');
// const testimonialRoutes = require('./routes/testimonialRoutes');

// const app = express();

// // --- Core middleware -------------------------------------------------
// app.use(helmet({ crossOriginResourcePolicy: false }));
// app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
// app.use(express.json({ limit: '2mb' }));
// app.use(express.urlencoded({ extended: true }));
// if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// // General API rate limiter (protects the whole API from abuse)
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 300,
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// app.use('/api', apiLimiter);

// // Serve uploaded files (avatars, resumes, project images)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // --- Routes ------------------------------------------------------------
// app.get('/api/health', (req, res) => {
//   res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/profile', profileRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/skills', skillRoutes);
// app.use('/api/experience', experienceRoutes);
// app.use('/api/education', educationRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/testimonials', testimonialRoutes);

// // --- Error handling ------------------------------------------------------
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// async function start() {
//   await testConnection();
//   app.listen(PORT, () => {
//     console.log(`Portfolio API server running on http://localhost:${PORT}`);
//     console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
//   });
// }

// start();

// module.exports = app;
