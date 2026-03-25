# Backend Integration Guide

## ✅ Completed Implementation

This document outlines the complete backend integration with PostgreSQL (Supabase) and Cloudinary.

---

## 📋 What's Been Implemented

### 1. **Database Connection (config/db.js)**
- Uses `pg.Pool` for PostgreSQL connection
- Connects to Supabase via `DATABASE_URL` environment variable
- SSL enabled with `rejectUnauthorized: false` for Supabase
- Connection pooling for efficient resource management
- Error and connection logging

### 2. **Cloudinary Configuration (config/cloudinary.js)**
- Initializes Cloudinary SDK with environment variables
- Validates credentials on startup
- Ready for image and video uploads

### 3. **File Upload Middleware (middleware/uploadMiddleware.js)**
- Uses `multer-storage-cloudinary` for direct cloud uploads
- **No local file storage** - all files go directly to Cloudinary
- Folder structure: `shubh_projects/` in Cloudinary
- Allowed formats: jpg, png, jpeg, webp, mp4
- File size limit: 50MB
- Returns `secure_url` from Cloudinary for database storage

### 4. **Project Controller (controllers/projectController.js)**
Complete CRUD operations with PostgreSQL:

#### GET All Projects
```
GET /api/projects
```
- Fetches only non-deleted projects (`is_deleted = false`)
- Orders by `created_at DESC`
- LEFT JOINs with categories table
- Response includes category names

#### GET Single Project
```
GET /api/projects/:id
```
- Fetches single project by ID
- Returns 404 if not found or deleted

#### CREATE Project
```
POST /api/projects
- Content-Type: multipart/form-data
- Required: name, type, location
- Optional: locationLink, map3dIframe, image, category_id, status
```
- Uploads image to Cloudinary
- Stores Cloudinary URL as `thumbnail_url`
- Defaults status to 'active'
- Sets `is_deleted = false`

#### UPDATE Project
```
PUT /api/projects/:id
- Content-Type: multipart/form-data
- All fields optional
- Can replace image by uploading new one
```
- Dynamic update query (only updates provided fields)
- Updates `updated_at` timestamp
- Preserves `created_at`

#### DELETE Project
```
DELETE /api/projects/:id
```
- Soft delete (sets `is_deleted = true`)
- Project remains in database but hidden from queries

### 5. **Project Updates Management**
```
POST   /api/projects/:id/updates          → Add update
GET    /api/projects/:id/updates          → Get updates
DELETE /api/projects/:id/updates/:updateId → Delete update
```

### 6. **Response Format**
All responses follow consistent format:
```json
{
  "success": true,
  "message": "Operation completed",
  "data": { ... }
}
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 14+
- PostgreSQL database (Supabase)
- Cloudinary account
- Tables created: `projects`, `categories`, `project_updates`, `project_images`

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create `.env` file:
```bash
PORT=5000
NODE_ENV=development

# Supabase PostgreSQL
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.XXXXXXX.supabase.co:5432/postgres

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Verify Database Connection
```bash
# The server will log connection status
npm start
```

---

## 🧪 Testing the API

### 1. GET All Projects
```bash
curl http://localhost:5000/api/projects
```

### 2. CREATE Project (with image)
```bash
curl -X POST http://localhost:5000/api/projects \
  -F "name=Modern Villa" \
  -F "type=Residential" \
  -F "location=Mumbai" \
  -F "locationLink=https://maps.google.com" \
  -F "map3dIframe=<iframe...>" \
  -F "image=@./photo.jpg"
```

### 3. GET Single Project
```bash
curl http://localhost:5000/api/projects/1
```

### 4. UPDATE Project
```bash
curl -X PUT http://localhost:5000/api/projects/1 \
  -F "name=Updated Villa" \
  -F "type=Residential"
```

### 5. DELETE Project (soft delete)
```bash
curl -X DELETE http://localhost:5000/api/projects/1
```

### 6. Project Updates
```bash
# Add update
curl -X POST http://localhost:5000/api/projects/1/updates \
  -H "Content-Type: application/json" \
  -d '{"title":"Phase 2 Complete","description":"Foundation laid"}'

# Get updates
curl http://localhost:5000/api/projects/1/updates

# Delete update
curl -X DELETE http://localhost:5000/api/projects/1/updates/5
```

---

## 📊 Database Schema

### projects table
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  location VARCHAR(255),
  location_link VARCHAR(500),
  map_3d_iframe TEXT,
  thumbnail_url VARCHAR(500),
  category_id INTEGER,
  status VARCHAR(50) DEFAULT 'active',
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### project_updates table
```sql
CREATE TABLE project_updates (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL,
  title VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

---

## 🔄 Frontend Integration

The frontend sends:
```javascript
FormData with:
- name (string, required)
- type (string, required)
- location (string, required)
- locationLink (string, optional)
- map3dIframe (string, optional)
- image (file, optional)
```

Backend maps these to database fields:
```
name → projects.name
type → projects.type
location → projects.location
locationLink → projects.location_link
map3dIframe → projects.map_3d_iframe
image → Cloudinary → projects.thumbnail_url
```

---

## 🔐 Key Features

✅ **PostgreSQL Integration**
- Uses `pg` library with connection pooling
- Supports Supabase via `DATABASE_URL`
- SSL enabled for secure connections

✅ **Cloudinary Integration**
- Direct cloud uploads (no local file storage)
- Secure URLs for image delivery
- Auto-resizing and CDN distribution

✅ **Error Handling**
- Try/catch on every endpoint
- Consistent error response format
- Detailed logging for debugging

✅ **Data Validation**
- Required fields validation
- Field existence checks before operations
- 404 handling for missing resources

✅ **Soft Delete**
- Projects never permanently deleted
- `is_deleted` flag for data recovery
- Automatic filtering in queries

✅ **Timestamps**
- `created_at` automatically set on creation
- `updated_at` automatically updated on changes

---

## 🛠️ Troubleshooting

### Database Connection Issues
```
Error: connect ECONNREFUSED
→ Check DATABASE_URL format
→ Verify database is running
→ Check firewall/network access
```

### Cloudinary Upload Fails
```
Error: Invalid Cloudinary credentials
→ Verify CLOUDINARY_CLOUD_NAME
→ Check API_KEY and API_SECRET
→ Ensure credentials are correct in .env
```

### Port Already in Use
```
Error: listen EADDRINUSE
→ Change PORT in .env
→ Or kill process using port 5000: lsof -i :5000
```

---

## 📝 Environment Variables Checklist

- [ ] `DATABASE_URL` set correctly
- [ ] `CLOUDINARY_CLOUD_NAME` configured
- [ ] `CLOUDINARY_API_KEY` set
- [ ] `CLOUDINARY_API_SECRET` set
- [ ] `.env` file created (not committed to git)
- [ ] Database tables exist
- [ ] Node modules installed (`npm install`)

---

## 🚀 Running the Server

```bash
# Development
npm start

# With nodemon (auto-reload)
npm install -D nodemon
npx nodemon server.js
```

Server will start at: `http://localhost:5000`

---

## ✨ What's Removed

❌ In-memory project storage
❌ Local file uploads directory
❌ Hardcoded project data
❌ CommonJS (require/module.exports)
❌ Old multer disk storage configuration

---

## 📚 Additional Resources

- [PostgreSQL pg library docs](https://node-postgres.com/)
- [Cloudinary Node.js docs](https://cloudinary.com/documentation/node_integration)
- [Multer-Storage-Cloudinary](https://github.com/afitzek/multer-storage-cloudinary)
- [Supabase docs](https://supabase.com/docs)

---

**Implementation Complete! Backend is now fully integrated with PostgreSQL and Cloudinary.** 🎉
