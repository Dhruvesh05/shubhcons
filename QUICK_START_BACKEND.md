# ⚡ Quick Start Guide - Backend Setup

## 📋 Prerequisites Checklist

Before running the backend, ensure you have:

- [ ] Node.js 14+ installed
- [ ] Supabase account with PostgreSQL database created
- [ ] Cloudinary account created
- [ ] Git (to clone project, if needed)

---

## 🚀 Step 1: Environment Setup (5 minutes)

### 1.1 Create `.env` file in backend directory

```bash
cd backend
# Create .env file
touch .env  # On Windows: type nul > .env
```

### 1.2 Get your credentials

**From Supabase:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "Settings" → "Database"
4. Copy the connection string
5. Replace [YOUR-PASSWORD] with your actual password

**From Cloudinary:**
1. Go to https://cloudinary.com/console
2. Copy: Cloud Name, API Key, API Secret
3. Keep these safe!

### 1.3 Fill `.env` file

```env
PORT=5000
NODE_ENV=development

# Replace with your actual values
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.XXXXXXX.supabase.co:5432/postgres
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

---

## 🚀 Step 2: Start the Server (2 minutes)

```bash
# Make sure you're in backend directory
cd backend

# Install dependencies (if not already done)
npm install

# Start the server
npm start
```

**Expected Output:**
```
✅ Database connected successfully
✅ Server running on http://localhost:5000
📝 API Documentation:
   - GET  /api/projects        → Get all projects
   - GET  /api/projects/:id    → Get single project
   - POST /api/projects        → Create project
   - PUT  /api/projects/:id    → Update project
   - DELETE /api/projects/:id  → Delete project
```

---

## 🧪 Step 3: Test the API (5 minutes)

### Test 1: Check Server Status
```bash
curl http://localhost:5000/
```

**Expected Response:**
```json
{
  "message": "Shubh Construction API",
  "version": "1.0.0",
  "status": "running"
}
```

### Test 2: Get All Projects (Empty initially)
```bash
curl http://localhost:5000/api/projects
```

**Expected Response:**
```json
{
  "success": true,
  "data": []
}
```

### Test 3: Create a Project with Image

**Option A: Using curl (with test image)**
```bash
# Make sure you have an image file named "test.jpg"
curl -X POST http://localhost:5000/api/projects \
  -F "name=Luxury Villa" \
  -F "type=Residential" \
  -F "location=Mumbai" \
  -F "locationLink=https://maps.google.com/?q=Mumbai" \
  -F "map3dIframe=" \
  -F "image=@test.jpg"
```

**Option B: Without image**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Modern Apartment",
    "type": "Residential",
    "location": "Delhi",
    "locationLink": "https://maps.google.com/?q=Delhi"
  }' \
  -X POST http://localhost:5000/api/projects
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": 1,
    "name": "Luxury Villa",
    "type": "Residential",
    "location": "Mumbai",
    "locationLink": "https://maps.google.com/?q=Mumbai",
    "image": "https://res.cloudinary.com/...",
    "createdAt": "2024-03-23T...",
    "updatedAt": "2024-03-23T..."
  }
}
```

### Test 4: Get All Projects
```bash
curl http://localhost:5000/api/projects
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Luxury Villa",
      "type": "Residential",
      "location": "Mumbai",
      "image": "https://res.cloudinary.com/...",
      ... more fields
    }
  ]
}
```

### Test 5: Get Single Project
```bash
curl http://localhost:5000/api/projects/1
```

### Test 6: Update Project
```bash
curl -X PUT http://localhost:5000/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Villa Name",
    "status": "completed"
  }'
```

### Test 7: Add Project Update
```bash
curl -X POST http://localhost:5000/api/projects/1/updates \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Phase 1 Complete",
    "description": "Foundation and basement work completed successfully"
  }'
```

### Test 8: Get Project Updates
```bash
curl http://localhost:5000/api/projects/1/updates
```

### Test 9: Delete Project (Soft Delete)
```bash
curl -X DELETE http://localhost:5000/api/projects/1
```

---

## ✅ Verification Checklist

After completing the above steps:

- [ ] Server starts without errors
- [ ] Database connection successful (in logs)
- [ ] Can fetch all projects
- [ ] Can create a new project
- [ ] Image uploads to Cloudinary (check Cloudinary dashboard)
- [ ] Can update projects
- [ ] Can add project updates
- [ ] Deleted projects don't appear in GET /api/projects

---

## 🔧 Common Issues & Solutions

### Issue 1: "Error: connect ECONNREFUSED"
**Problem:** Cannot connect to database

**Solution:**
1. Check DATABASE_URL in `.env`
2. Verify Supabase project is running
3. Check network/firewall access
4. Test connection: `psql postgresql://...`

### Issue 2: "Error: CLOUDINARY_CLOUD_NAME is not defined"
**Problem:** Missing Cloudinary credentials

**Solution:**
1. Verify .env file has Cloudinary variables
2. Restart server after updating .env
3. Check Cloudinary dashboard for correct values

### Issue 3: "Error: EADDRINUSE :::5000"
**Problem:** Port 5000 already in use

**Solution:**
- Change PORT in .env to 5001 or another port
- Or kill process using port 5000:
  - Mac/Linux: `lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9`
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`

### Issue 4: Image not uploading
**Problem:** Multer/Cloudinary upload failed

**Solution:**
1. Check file size (limit is 50MB)
2. Check file format (jpg, png, jpeg, webp, mp4 only)
3. Verify Cloudinary credentials
4. Check browser console for upload errors

### Issue 5: "Cannot find module" errors
**Problem:** Missing dependencies

**Solution:**
```bash
# Reinstall dependencies
npm install

# Or just install missing packages
npm install pg cloudinary multer-storage-cloudinary
```

---

## 🎯 Testing with Frontend

### To connect frontend to backend:

1. **Frontend is already configured** to use `http://localhost:5000`
2. **Ensure backend is running** on port 5000
3. **Test from admin panel:**
   - Go to http://localhost:3000/admin
   - Try creating a new project
   - Upload an image
   - Verify it appears in the project list

---

## 📊 API Response Format (All Endpoints)

Every endpoint returns this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation description",
  "data": { /* operation result */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Details (only in development)"
}
```

---

## 🚀 Development Tips

### Restart Server
While server is running, press `Ctrl+C` to stop, then `npm start` to restart.

### View Database
Use Supabase dashboard to view database data in real-time.

### View Uploaded Images
Visit https://cloudinary.com/console → Media Library → Folders → shubh_projects

### Enable Auto-Reload
```bash
# Install nodemon
npm install -D nodemon

# Run with auto-reload
npx nodemon server.js
```

### View Logs
```bash
# With nodemon
npm install -D nodemon

# Add to package.json scripts:
"dev": "nodemon server.js"

# Then run:
npm run dev
```

---

## 📞 Support

If you encounter issues:

1. Check `.env` file has all required variables
2. Verify database credentials
3. Check Cloudinary credentials
4. Review error messages in console
5. Check BACKEND_SETUP.md for detailed documentation

---

## ✨ You're All Set!

**Backend is now fully integrated!** 🎉

### Next Steps:
1. Test API endpoints above
2. Connect frontend and test full workflow
3. Monitor logs for any issues
4. Deploy to production when ready

---

**Questions?** Refer to BACKEND_SETUP.md for comprehensive documentation.
