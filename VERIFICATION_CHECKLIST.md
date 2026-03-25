# ✅ Migration Verification Checklist

Use this checklist to verify all migration steps are working correctly.

---

## 🔧 Setup Verification

### Backend Readiness
- [ ] Backend running: `npm run dev` in `backend/` directory
- [ ] Port 5000 accessible: `curl http://localhost:5000`
- [ ] Database credentials set in `backend/.env`
- [ ] Cloudinary credentials set in `backend/.env`
- [ ] No errors in backend console (check for "✅ Database connected")

### Frontend Readiness
- [ ] Frontend running: `npm run dev` in `frontend/` directory
- [ ] Port 3000 accessible: `http://localhost:3000`
- [ ] Admin panel accessible: `http://localhost:3000/admin/login`
- [ ] Admin logged in successfully

---

## 🗄️ Database Verification

### Connection Test
```bash
# From backend logs, should show:
# ✅ Database connected successfully
# ✅ Database query successful: SELECT NOW()
```
- [ ] "Database connected successfully" shows in logs
- [ ] "Database query successful" shows in logs

### Schema Verification
```bash
# Connect to Supabase and verify tables exist:
psql -h [your-host] -U [user] -d postgres

# Then run:
\dt projects
\dt categories  
\dt project_updates

# Columns should match requirements
```
- [ ] `projects` table exists with all columns
- [ ] `categories` table exists
- [ ] `project_updates` table exists
- [ ] All columns have correct data types

---

## 🧪 API Testing

### Test Endpoints Using Browser Console or curl

#### 1. Create Project (with image)
```bash
# Using curl:
curl -X POST http://localhost:5000/api/projects \
  -F "name=Test Project" \
  -F "type=Residential" \
  -F "location=Delhi" \
  -F "locationLink=https://maps.google.com/..." \
  -F "map3dIframe=<iframe src='...'></iframe>" \
  -F "image=@/path/to/image.jpg"

# Expected response:
# {
#   "success": true,
#   "data": {
#     "id": 1,
#     "name": "Test Project",
#     "image": "https://res.cloudinary.com/.../image.jpg",
#     ...
#   }
# }
```
- [ ] Returns `success: true`
- [ ] Returns `data` object with project
- [ ] `image` field contains Cloudinary HTTPS URL
- [ ] Project appears in database

#### 2. Get All Projects
```bash
curl http://localhost:5000/api/projects

# Expected: Array of projects in data field
```
- [ ] Returns `success: true`
- [ ] Returns `data` as array
- [ ] Array contains projects from database
- [ ] Deleted projects excluded (is_deleted check working)
- [ ] Field names correctly mapped (locationLink, map3dIframe)

#### 3. Get Single Project
```bash
curl http://localhost:5000/api/projects/1
```
- [ ] Returns `success: true`
- [ ] Returns single project object in `data`
- [ ] All fields populated correctly

#### 4. Update Project
```bash
curl -X PUT http://localhost:5000/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Project",
    "type": "Commercial"
  }'

# Or with image update:
curl -X PUT http://localhost:5000/api/projects/1 \
  -F "name=Updated Project" \
  -F "image=@/path/to/new-image.jpg"
```
- [ ] Returns `success: true`
- [ ] Project updated in database
- [ ] Updated image uploaded to Cloudinary (if provided)
- [ ] `updated_at` timestamp changes

#### 5. Delete Project (Soft Delete)
```bash
curl -X DELETE http://localhost:5000/api/projects/1
```
- [ ] Returns `success: true`
- [ ] Project excluded from GET requests
- [ ] Row still exists in database (verify with `is_deleted = true`)

#### 6. Project Updates API
```bash
# Add update
curl -X POST http://localhost:5000/api/projects/1/updates \
  -H "Content-Type: application/json" \
  -d '{"title": "Update Title", "description": "Update Description"}'

# Get updates
curl http://localhost:5000/api/projects/1/updates

# Delete update
curl -X DELETE http://localhost:5000/api/projects/1/updates/1
```
- [ ] All update operations return `success: true`
- [ ] Updates stored and retrieved from database

---

## 🎨 Frontend Admin Panel Testing

### Projects Management (`/admin/manage-projects`)
- [ ] Page loads without errors
- [ ] Projects table displays data from database
- [ ] Project count matches database
- [ ] Each row shows: ID, Name, Type, Location, Location Link, 3D Map, Actions
- [ ] "Location Link" column shows clickable link (if populated)
- [ ] "Interactive 3D Map" column shows iframe preview (if populated)

### Add Project (`/admin/add-project`)
- [ ] Form loads with empty fields
- [ ] All fields present: Name, Type, Location, Location Link, 3D Iframe, Image
- [ ] Image upload field accepts JPG/PNG/WEBP
- [ ] Submit button processes form
- [ ] Success alert shows after submission
- [ ] New project appears in manage projects
- [ ] Image uploaded to Cloudinary and stored in database

### Edit Project (`/admin/edit-project?id=1`)
- [ ] Page loads and fetches project data
- [ ] Form fields populate with existing data
- [ ] Image upload field optional (can skip image)
- [ ] Submit updates project in database
- [ ] Success alert shows after update
- [ ] Changes reflected immediately in manage projects

### Delete Project
- [ ] Delete button shows confirmation dialog
- [ ] Canceling preserves project
- [ ] Confirming hides project from list immediately
- [ ] Project actually marked deleted in database (not physically removed)

### Project Updates (`/admin/project-updates?id=1`)
- [ ] Page loads with project details
- [ ] Form to add new update available
- [ ] Can add update with title and description
- [ ] Updates list displays all project updates
- [ ] Can delete updates individually
- [ ] Updates removed from list and database

---

## 📱 Frontend Project Display

### Project Page (`/project`)
- [ ] Projects load from backend (not hardcoded)
- [ ] Project cards display correctly
- [ ] Project images show from Cloudinary URLs
- [ ] If 3D iframe present, renders in card
- [ ] "View Details" button works (or 3D map displays instead)

### Project Detail Modal (if applicable)
- [ ] Modal opens with project details
- [ ] All field data displays correctly
- [ ] Location link clickable
- [ ] 3D map preview renders and interactive

---

## 🔐 Field Name Mapping Verification

Verify that frontend field names correctly map to backend:

| Frontend Field | Backend Column | Status |
|---|---|---|
| name | name | ✅ |
| type | type | ✅ |
| location | location | ✅ |
| locationLink | location_link | ✅ |
| map3dIframe | map_3d_iframe | ✅ |
| image | thumbnail_url | ✅ |

Check database:
```sql
SELECT id, name, type, location, location_link, map_3d_iframe, thumbnail_url FROM projects LIMIT 1;
```
- [ ] All columns contain expected data
- [ ] No null values where data was provided
- [ ] URLs start with https://res.cloudinary.com for images

---

## 📊 Data Validation

### Sample Data in Database
```sql
-- Check projects table
SELECT COUNT(*) FROM projects WHERE is_deleted = false;
SELECT * FROM projects LIMIT 1;

-- Check soft deletes
SELECT COUNT(*) FROM projects WHERE is_deleted = true;

-- Check project updates
SELECT COUNT(*) FROM project_updates;
```
- [ ] At least one non-deleted project exists
- [ ] Deleted projects marked with is_deleted = true
- [ ] Project updates linked to projects correctly
- [ ] created_at and updated_at timestamps set

### Cloudinary Verification
- [ ] Open Cloudinary dashboard
- [ ] Navigate to media library
- [ ] Check folder `shubh_projects/` contains uploaded images
- [ ] Images are accessible via HTTPS URLs
- [ ] URLs match what's stored in database

---

## 🚨 Error Handling

### Test Error Scenarios

#### Invalid Project ID
```bash
curl http://localhost:5000/api/projects/999999
```
- [ ] Returns 404 with `success: false`
- [ ] Message clearly indicates project not found

#### Database Offline Simulation
- [ ] Stop database connection
- [ ] Backend should return empty data with offline message
- [ ] Should NOT crash or show database errors to user
- [ ] Frontend should handle gracefully

#### Invalid File Upload
- [ ] Try uploading non-image file (.txt, .exe)
- [ ] Should reject with meaningful error message
- [ ] Should NOT be stored

#### Missing Required Fields
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'  # Missing type and location
```
- [ ] Returns 400 with `success: false`
- [ ] Message lists missing required fields

---

## 🔐 Security Verification

- [ ] Form data sanitized (no SQL injection)
- [ ] File uploads validated (type and size)
- [ ] HTTPS URLs used for external resources
- [ ] No sensitive data in frontend code
- [ ] Environment variables not committed to git

---

## 📈 Performance Check

- [ ] Page loads within 2 seconds
- [ ] API responses received within 1 second
- [ ] Images load without visible delay
- [ ] No console errors or warnings
- [ ] Network tab shows no failed requests

---

## ✅ Final Sign-Off

- [ ] All above checks completed successfully
- [ ] No errors in browser console
- [ ] No errors in backend console
- [ ] Database contains expected data
- [ ] Images stored in Cloudinary
- [ ] Admin panel fully functional

**Migration Status: COMPLETE ✨**

**Date Verified:** _______________

**Verified By:** _______________

---

## 📝 Notes

_Use this space to note any issues or special configurations:_

```


```

---

If all checks pass, your PostgreSQL/Supabase and Cloudinary migration is complete and production-ready! 🚀
