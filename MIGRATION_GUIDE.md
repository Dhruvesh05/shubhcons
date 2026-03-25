# 🚀 PostgreSQL & Cloudinary Migration Guide

This document outlines the complete migration from in-memory storage to PostgreSQL (Supabase) and Cloudinary cloud storage.

---

## 📋 Migration Overview

### What Was Changed

#### **Backend (Node.js/Express)**
1. ✅ All database operations now use PostgreSQL through `pg` pool
2. ✅ Cloudinary integration for image uploads (secure_url extraction)
3. ✅ Consistent API response format: `{ success: true, data: {...} }`
4. ✅ Soft delete implementation (is_deleted flag)
5. ✅ Field name mapping for database compatibility
6. ✅ Error handling with database offline fallback

#### **Frontend (Next.js)**
1. ✅ API response handling fixed for all pages
2. ✅ ProjectForm sends FormData with correct field names
3. ✅ Admin panel fetches and displays data from database
4. ✅ Project forms properly populate with database values

---

## 🔧 Detailed Changes

### Backend - Database Layer

**File: `backend/config/db.js`**
- Configured PostgreSQL connection pool
- Connection parameters from environment variables
- SSL support for Supabase
- Automatic connection testing

**File: `backend/controllers/projectController.js`**

#### getAllProjects()
```javascript
// Before: Returned in-memory data
// After: Queries database with soft delete filter (is_deleted = false)
const query = `
  SELECT p.id, p.name, p.type, p.location, 
         p.location_link as "locationLink",
         p.map_3d_iframe as "map3dIframe",
         p.thumbnail_url as "image"
  FROM projects p
  WHERE p.is_deleted = false
  ORDER BY p.created_at DESC
`;
```

#### createProject()
```javascript
// Key changes:
1. Extracts Cloudinary URL: req.file.secure_url (not req.file.path)
2. Stores in thumbnail_url column
3. Maps field names: locationLink → location_link, map3dIframe → map_3d_iframe
4. Returns { success: true, data: newProjectObject }
```

#### updateProject()
```javascript
// Key features:
1. Dynamic query building (only updates provided fields)
2. Optional image upload (if req.file provided)
3. Always updates updated_at timestamp
4. Validates project exists before updating
```

#### deleteProject()
```javascript
// Soft delete - does NOT remove row
UPDATE projects SET is_deleted = true WHERE id = $1
```

### Frontend - API Integration

**File: `frontend/components/admin/ProjectForm.tsx`**
- ✅ Already sending FormData correctly
- Field mapping matches backend expectations:
  - name → name
  - type → type
  - location → location
  - locationLink → locationLink
  - map3dIframe → map3dIframe
  - image (File) → image

**File: `frontend/components/admin/ProjectTable.tsx`** [FIXED]
```javascript
// BEFORE (❌ Bug):
const data = await res.json();
setProjects(data); // Sets entire response object

// AFTER (✅ Fixed):
const response = await res.json();
setProjects(response.data || []); // Extracts data array
```

**File: `frontend/app/admin/edit-project/page.tsx`** [FIXED]
```javascript
// BEFORE (❌ Bug):
const data = await res.json();
setProject(data); // Missing data extraction

// AFTER (✅ Fixed):
const response = await res.json();
setProject(response.data); // Properly extracts single project
```

**File: `frontend/app/admin/project-updates/page.tsx`** [FIXED]
```javascript
// Fixed multiple instances of API response handling
// Now properly extracts response.data for all requests
```

---

## 📊 Database Schema

Required Supabase tables:

### Table: `projects`
```sql
- id: BIGINT (Primary Key)
- name: VARCHAR(255) NOT NULL
- type: VARCHAR(100) NOT NULL
- location: VARCHAR(255) NOT NULL
- location_link: VARCHAR(500) – Location/Maps URL
- map_3d_iframe: TEXT – Google Maps 3D iframe embed
- thumbnail_url: VARCHAR(500) – Cloudinary image URL
- category_id: BIGINT (Foreign Key → categories)
- status: VARCHAR(50) DEFAULT 'active'
- is_deleted: BOOLEAN DEFAULT false
- created_at: TIMESTAMP DEFAULT NOW()
- updated_at: TIMESTAMP DEFAULT NOW()
```

### Table: `categories`
```sql
- id: BIGINT (Primary Key)
- name: VARCHAR(100) NOT NULL
- created_at: TIMESTAMP DEFAULT NOW()
```

### Table: `project_updates`
```sql
- id: BIGINT (Primary Key)
- project_id: BIGINT NOT NULL (Foreign Key → projects)
- title: VARCHAR(255) NOT NULL
- description: TEXT NOT NULL
- created_at: TIMESTAMP DEFAULT NOW()
```

---

## 🔑 Environment Variables

### Backend `.env`
```env
# Database Connection
DATABASE_HOST=your-supabase-host.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=your-supabase-password

# Cloudinary
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret

# Server
PORT=5000
NODE_ENV=development
```

---

## 📤 File Upload Flow

### Step-by-Step: Image Upload Process

1. **Frontend (ProjectForm.tsx)**
   ```javascript
   const formData = new FormData();
   formData.append("name", name);
   formData.append("image", imageFile); // File object
   
   fetch(`http://localhost:5000/api/projects`, {
     method: "POST",
     body: formData // No Content-Type header (multipart/form-data)
   });
   ```

2. **Middleware (uploadMiddleware.js)**
   ```javascript
   // multer-storage-cloudinary processes the request
   // - Validates file type (jpg, png, jpeg, webp, mp4)
   // - Uploads to Cloudinary folder: "shubh_projects/"
   // - Populates req.file with Cloudinary metadata
   ```

3. **Backend (createProject)**
   ```javascript
   const thumbnailUrl = req.file ? req.file.secure_url : null;
   // req.file.secure_url = "https://res.cloudinary.com/..."
   
   // Save to database
   INSERT INTO projects (thumbnail_url, ...) VALUES ($1, ...)
   ```

4. **Frontend Display**
   ```javascript
   // ProjectCard displays: <Image src={item.image} />
   // item.image = thumbnail_url from database
   ```

---

## 🧪 Testing Checklist

### Setup
- [ ] PostgreSQL/Supabase database configured
- [ ] Cloudinary account setup with API credentials
- [ ] Environment variables set in `.env`
- [ ] Backend server running on localhost:5000
- [ ] Frontend dev server running on localhost:3000

### Database Operations
- [ ] Create new project with image
  - Verify image uploaded to Cloudinary
  - Verify thumbnail_url saved to database
  - Verify soft delete flag is false
- [ ] Edit project
  - Update text fields
  - Upload new image (optional)
  - Verify updated_at timestamp changes
- [ ] Delete project
  - Verify project marked as deleted (is_deleted = true)
  - Verify project not shown in project list
  - Verify project still exists in database (soft delete)
- [ ] Fetch projects
  - Verify all non-deleted projects returned
  - Verify field names correctly mapped (locationLink, map3dIframe)

### Admin Panel
- [ ] Manage Projects page loads and displays all projects
- [ ] Add Project form submits correctly
- [ ] Edit Project form loads existing data
- [ ] Delete Project confirms and removes from list
- [ ] Project Updates feature works (add/view/delete)
- [ ] 3D map iframe renders in table preview

### Frontend-Backend Integration
- [ ] API responses properly parsed (response.data extraction)
- [ ] Error handling displays user-friendly messages
- [ ] Form validation works correctly
- [ ] Page navigation works after operations

---

## 🚨 Common Issues & Solutions

### Issue 1: "Database offline" error
**Cause:** Database connection parameters incorrect or database unavailable
**Solution:**
1. Verify `.env` variables are correct
2. Test connection: `psql -h host -U user -d database`
3. Check Supabase dashboard for connection details
4. Ensure SSL certificate is valid

### Issue 2: Images not uploading
**Cause:** Cloudinary credentials incorrect or multer not configured
**Solution:**
1. Verify Cloudinary API credentials in `.env`
2. Check file size not exceeding limits
3. Verify allowed MIME types in uploadMiddleware.js
4. Check Cloudinary dashboard for upload activity

### Issue 3: Projects not displaying in admin panel
**Cause:** API response not properly extracted (response.data)
**Solution:**
1. Check browser console for fetch errors
2. Inspect network requests in DevTools
3. Verify backend returns correct response format
4. Frontend should extract: `response.data` not `response`

### Issue 4: Form not updating existing project
**Cause:** Project ID not passed correctly or field name mismatch
**Solution:**
1. Verify projectId in URL parameters
2. Check field names match backend expectations
3. Verify API endpoint PUT /api/projects/:id is correct
4. Check database for updated records

---

## 🔄 API Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Project Name",
    "type": "Residential",
    "location": "Delhi",
    "locationLink": "https://maps.google.com/...",
    "map3dIframe": "<iframe src=\"...3d-embed...\"></iframe>",
    "image": "https://res.cloudinary.com/.../image.jpg",
    "createdAt": "2026-03-16T12:00:00Z",
    "updatedAt": "2026-03-16T12:00:00Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

### List Response
```json
{
  "success": true,
  "data": [
    { /* project 1 */ },
    { /* project 2 */ }
  ]
}
```

---

## 📚 Key Files Reference

| File | Purpose | Changes |
|------|---------|---------|
| `backend/config/db.js` | Database pool config | ✅ PostgreSQL pool setup |
| `backend/controllers/projectController.js` | CRUD operations | ✅ All database queries updated |
| `backend/middleware/uploadMiddleware.js` | File upload handling | ✅ Cloudinary integration |
| `frontend/components/admin/ProjectForm.tsx` | Project form | ✅ Sending FormData correctly |
| `frontend/components/admin/ProjectTable.tsx` | Projects list | ✅ Fixed API response extraction |
| `frontend/app/admin/edit-project/page.tsx` | Edit form page | ✅ Fixed API response extraction |
| `frontend/app/admin/project-updates/page.tsx` | Updates management | ✅ Fixed API response extraction |

---

## ✨ Next Steps

1. **Verify Database Connection**
   - Test backend: `npm run dev` in backend folder
   - Check logs for "✅ Database connected successfully"

2. **Test Upload Flow**
   - Add a new project with an image
   - Verify image appears in Cloudinary dashboard
   - Verify thumbnail_url in database

3. **Verify Frontend Integration**
   - Check admin panel displays projects
   - Test CRUD operations (create, read, update, delete)
   - Monitor browser DevTools for API calls

4. **Production Deployment**
   - Update environment variables for production
   - Test with production database
   - Monitor error logs
   - Set up automated backups

---

## 📞 Support

For issues or questions about the migration:
1. Check the **Common Issues & Solutions** section above
2. Review **API Response Format** for debugging
3. Examine DevTools Network tab for API calls
4. Check backend logs for database errors
5. Verify Cloudinary dashboard for upload activity

---

**Migration completed on: March 24, 2026** ✅
