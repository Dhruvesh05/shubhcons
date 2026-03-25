import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes.js';
import pool from "./config/db.js";

dotenv.config();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 
  'http://localhost:3000,http://localhost:5000'
).split(',')
 .map(origin => origin.trim())
 .filter(Boolean);

pool.query("SELECT NOW()")
  .then(res => console.log("✅ DB Connected:", res.rows[0]))
  .catch(err => console.error("❌ DB Error:", err));

const app = express();
const PORT = process.env.PORT || 5000;

// CORS with allowlist for localhost
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn(`🌐 [CORS] Blocked origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Global request timeout middleware (extended for uploads)
app.use((req, res, next) => {
  console.log(`📭 [REQUEST] ${req.method} ${req.path}`);
  
  // Set different timeouts based on request type
  // File uploads get 5 minutes, other requests get 60 seconds
  const isFileUpload = req.method === 'POST' && req.path.includes('/projects') && req.headers['content-type']?.includes('multipart');
  const timeout = isFileUpload ? 5 * 60 * 1000 : 60 * 1000;
  
  console.log(`⏱️  [TIMEOUT] Setting ${isFileUpload ? '5-minute (upload)' : '60-second'} timeout`);
  
  res.setTimeout(timeout, () => {
    console.error(`⏱️ [TIMEOUT] Response timeout for ${req.method} ${req.path}`);
    if (!res.headersSent) {
      res.status(503).json({ success: false, message: 'Request timeout - server took too long to respond' });
    }
  });
  
  // Log response when headers are sent
  const originalJson = res.json.bind(res);
  res.json = function(data) {
    console.log(`📬 [RESPONSE] ${req.method} ${req.path} - Status: ${res.statusCode}`);
    return originalJson(data);
  };
  
  next();
});

// Routes
app.use('/api/projects', projectRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Shubh Construction API',
    version: '1.0.0',
    status: 'running'
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({ 
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   - GET  /api/projects        → Get all projects`);
  console.log(`   - GET  /api/projects/:id    → Get single project`);
  console.log(`   - POST /api/projects        → Create project`);
  console.log(`   - PUT  /api/projects/:id    → Update project`);
  console.log(`   - DELETE /api/projects/:id  → Delete project`);
});
