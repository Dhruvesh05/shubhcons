# 🚀 API Testing Guide - Using curl or Postman

## Environment Setup

Before testing, ensure these files are properly configured:

### 1. Backend `.env` File

```env
# Database
DATABASE_HOST=your-supabase-host.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=your-password

# Cloudinary
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret

# Server
PORT=5000
NODE_ENV=development
```

### 2. Verify Backend is Running

```bash
cd backend
npm run dev

# Expected output:
# ✅ Server running on http://localhost:5000
# ✅ DB Connected: { now: '2026-03-24T12:00:00.000Z' }
```

---

## API Testing with curl

### Test 1: Health Check (No Auth, No Payload)

```bash
curl -X GET http://localhost:5000/
```

**Expected Response:**
```json
{
  "message": "Shubh Construction API",
  "version": "1.0.0",
  "status": "running"
}
```

---

### Test 2: Get All Projects

```bash
curl -X GET http://localhost:5000/api/projects
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Existing Project",
      "type": "Residential",
      "image": "https://res.cloudinary.com/...",
      "createdAt": "2026-03-24T..."
    }
  ]
}
```

---

### Test 3: Create Project WITHOUT Image

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Project No Image",
    "type": "Commercial",
    "location": "Mumbai"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": 2,
    "name": "Test Project No Image",
    "type": "Commercial",
    "location": "Mumbai",
    "image": null,
    "createdAt": "2026-03-24T..."
  }
}
```

---

### Test 4: Create Project WITH Image (using curl is difficult, use Postman instead)

---

## API Testing with Postman

### Setup

1. Download [Postman](https://www.postman.com/downloads/)
2. Create new collection "Shubh Construction API"
3. Create new requests following the patterns below

### Request 1: GET /api/projects

```
Method: GET
URL: http://localhost:5000/api/projects
Headers: (none needed)
Body: None
```

Click Send → Should see list of projects

---

### Request 2: POST /api/projects (with image)

```
Method: POST
URL: http://localhost:5000/api/projects
Headers: (Postman auto-sets Content-Type: multipart/form-data)
Body Type: form-data
```

**Form Fields:**
- `name` (text): "My Awesome Project"
- `type` (text): "Residential"
- `location` (text): "Bangalore"
- `locationLink` (text): "https://maps.google.com/..."
- `map3dIframe` (text): "<iframe src='...'>...</iframe>"
- `image` (file): Select your JPG/PNG file

Click Send → Should see success with Cloudinary URL in response

---

### Request 3: GET /api/projects/:id

```
Method: GET
URL: http://localhost:5000/api/projects/1
Headers: (none)
Body: None
```

---

### Request 4: PUT /api/projects/:id (update text only)

```
Method: PUT
URL: http://localhost:5000/api/projects/1
Headers: Content-Type: application/json
Body (raw JSON):
```

```json
{
  "name": "Updated Project Name",
  "type": "Industrial"
}
```

---

### Request 5: PUT /api/projects/:id (with new image)

```
Method: PUT
URL: http://localhost:5000/api/projects/1
Body Type: form-data
```

**Form Fields:**
- `name` (text): "Updated Name"
- `image` (file): Select new image

Old Cloudinary URL will be replaced with new one.

---

### Request 6: DELETE /api/projects/:id

```
Method: DELETE
URL: http://localhost:5000/api/projects/1
Headers: (none)
Body: None
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

After deletion:
```bash
# Verify soft delete
GET http://localhost:5000/api/projects
# Project with id:1 should NOT be in list
```

---

## ProjectUpdates API

### Create Update

```
Method: POST
URL: http://localhost:5000/api/projects/1/updates
Headers: Content-Type: application/json
Body (raw JSON):
```

```json
{
  "title": "Foundation Completed",
  "description": "Ground level foundation work has been completed successfully."
}
```

---

### Get Updates

```
Method: GET
URL: http://localhost:5000/api/projects/1/updates
Headers: (none)
Body: None
```

---

### Delete Update

```
Method: DELETE
URL: http://localhost:5000/api/projects/1/updates/1
Headers: (none)
Body: None
```

---

## Backend Console Output Reference

When you run `npm run dev`, watch for these logs:

### Successful Create (with file)
```
🔷 createProject called
📤 Request body fields: { name: 'rsrthtr', type: 'srtsh', location: 'trsh' }
📁 File info: { 
  fieldname: 'image', 
  originalname: 'project.jpg',
  mimetype: 'image/jpeg',
  size: 2345678,
  secure_url: 'https://res.cloudinary.com/...'
}
🖼️ Thumbnail URL: Set ✅
💾 Inserting into database...
✅ Project created successfully: { id: 1, name: 'rsrthtr', image: 'Yes ✅' }
```

### Successful Create (without file)
```
🔷 createProject called
📤 Request body fields: { name: 'test', type: 'residential', location: 'delhi' }
📁 File info: No file uploaded
🖼️ Thumbnail URL: Not provided (optional)
💾 Inserting into database...
✅ Project created successfully: { id: 2, name: 'test', image: 'No' }
```

### Error - Missing Fields
```
⚠️ Missing required fields: { name: true, type: false, location: true }
```

### Error - Database Connection
```
❌ Error creating project: connect ENOTFOUND your-db-host
Stack: Error: getaddrinfo ENOTFOUND...
```

**Solution:** Check DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD in `.env`

### Error - Cloudinary Auth
```
❌ Error uploading to Cloudinary: 400 Invalid API Key
```

**Solution:** Check CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET in `.env`

---

## Expected Cloudinary Folder Structure

After uploading projects, your Cloudinary dashboard should show:

```
📁 shubh_projects/
  📄 abc123def456.jpg
  📄 xyz789uvw012.png
  📄 ...more images...
```

Visit https://cloudinary.com/console/media_library and verify files appear there.

---

## Database Verification

Connect to your Supabase and run:

### Check Projects Table

```sql
-- Count non-deleted projects
SELECT COUNT(*) as total_projects 
FROM projects 
WHERE is_deleted = false;

-- View recent projects
SELECT id, name, type, location, thumbnail_url, created_at 
FROM projects 
WHERE is_deleted = false
ORDER BY created_at DESC 
LIMIT 10;

-- Check deleted projects (soft deletes)
SELECT id, name, is_deleted, updated_at 
FROM projects 
WHERE is_deleted = true;

-- Verify specific project created via API
SELECT * FROM projects WHERE name = 'rsrthtr';
```

### Check ProjectUpdates Table

```sql
SELECT id, project_id, title, description, created_at 
FROM project_updates 
WHERE project_id = 1 
ORDER BY created_at DESC;
```

---

## Frontend Integration Test

After verifying API endpoints work:

1. Start Backend
   ```bash
   cd backend && npm run dev
   ```

2. Start Frontend
   ```bash
   cd frontend && npm run dev
   ```

3. Open Browser: http://localhost:3000

4. Test Admin Flow
   - Go to /admin/add-project
   - Fill form + select image
   - Submit
   - Should auto-redirect to /admin/manage-projects
   - New project should appear in table
   - Image should show from Cloudinary URL

---

## Common Errors & Solutions

### Error: "TypeError: data.map is not a function"
**Frontend Issue:**
```javascript
// ❌ Wrong - data might be undefined
const projects = data;
projects.map(...) // Crashes!

// ✅ Correct - default to empty array
const projects = data || [];
projects.map(...) // Safe!
```

### Error: "Cannot read property 'secure_url' of undefined"
**Backend Issue:**
- Multer didn't process the file
- Check: Is `upload.single('image')` applied to route?
- Check: Is `Content-Type: multipart/form-data` sent?
- Solution: Restart backend, clear DevTools cache

### Error: "ECONNREFUSED localhost:5000"
**Backend not running:**
```bash
cd backend
npm run dev
# Wait for: ✅ Server running on http://localhost:5000
```

### Error: "Database offline"
**Supabase connection issue:**
- Check internet connection
- Verify DATABASE_HOST endpoint
- Check password contains no special characters (or is URL-encoded)
- Test connection from Supabase SQL Editor

---

## Performance Tips

- Keep images under 5MB
- Supported formats: JPG, PNG, WEBP, MP4
- Recommended: Compress images before upload
- Cloudinary auto-generates thumbnails (use CDN URLs)

---

## Security Notes

✅ **Good practices already implemented:**
- File type validation (MIME type check)
- File size limit (50MB max)
- Soft deletes (no data loss)
- Parameterized queries (SQL injection prevention)
- CORS enabled for localhost

✅ **For production, add:**
- Authentication/Authorization
- API rate limiting
- HTTPS enforcement
- Database backups
- Environment-specific error messages

---

## Support Checklist

If something isn't working:

**Provide these details:**
1. ✅ Backend logs (full console output when submitting form)
2. ✅ Network tab response (what JSON comes back?)
3. ✅ Cloudinary dashboard (file visible there?)
4. ✅ Supabase dashboard (row visible in projects table?)
5. ✅ Browser console errors (F12 → Console tab)
6. ✅ .env values (paste form data you sent to test)

This makes debugging much faster!
