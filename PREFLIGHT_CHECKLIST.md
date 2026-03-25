# ✅ PRE-FLIGHT CHECKLIST - Before Starting Backend

Use this checklist to ensure everything is configured correctly before running the server.

---

## 📋 File Verification

Check that all new/updated files are in place:

- [ ] `backend/config/db.js` exists (PostgreSQL pool)
- [ ] `backend/config/cloudinary.js` exists (Cloudinary config)
- [ ] `backend/middleware/uploadMiddleware.js` exists (uses Cloudinary)
- [ ] `backend/controllers/projectController.js` updated (uses DB)
- [ ] `backend/routes/projectRoutes.js` updated (ES modules)
- [ ] `backend/server.js` updated (no local uploads)
- [ ] `backend/package.json` updated ("type": "module")
- [ ] `backend/.env.example` exists
- [ ] All files use `import/export` (ES modules)

---

## 🔑 Environment Variables (.env)

### Create `.env` file
- [ ] Create `backend/.env` file (NOT .env.example)
- [ ] Add `PORT=5000`
- [ ] Add `NODE_ENV=development`

### PostgreSQL / Supabase
- [ ] Go to https://supabase.com/dashboard
- [ ] Select your project → Settings → Database → Connection String
- [ ] Copy connection string
- [ ] Replace [YOUR-PASSWORD] with actual password
- [ ] Add to `.env`:
  ```
  DATABASE_URL=postgresql://postgres:PASSWORD@db.XXXXXXX.supabase.co:5432/postgres
  ```
- [ ] Verify format matches: `postgresql://user:pass@host:port/db`
- [ ] Test connection: `psql postgresql://...` (should NOT raise connection error)

### Cloudinary
- [ ] Go to https://cloudinary.com/console
- [ ] Copy **Cloud Name** (e.g., dxxxxxx)
- [ ] Copy **API Key** (digit string)
- [ ] Go to Settings → Security → API Secret (careful - sensitive!)
- [ ] Copy **API Secret**
- [ ] Add to `.env`:
  ```
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  ```

### Final `.env` file should look like:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxxxx.supabase.co:5432/postgres
CLOUDINARY_CLOUD_NAME=dxxxxxx
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdefghijklmn
```

- [ ] `.env` file is **NOT** committed to git (add to .gitignore)
- [ ] No spaces around `=` signs
- [ ] No quotes around values
- [ ] All values are actual credentials (not placeholders)

---

## 🗄️ Database Setup

### Verify Tables Exist
- [ ] Go to Supabase Dashboard
- [ ] Click "SQL Editor"
- [ ] Run query to verify tables:
  ```sql
  SELECT table_name FROM information_schema.tables 
  WHERE table_schema = 'public';
  ```
- [ ] You should see:
  - [ ] `projects`
  - [ ] `categories`
  - [ ] `project_updates`

### Verify projects table columns
- [ ] Run in SQL Editor:
  ```sql
  \d projects
  ```
- [ ] Should have columns:
  - [ ] `id` (SERIAL PRIMARY KEY)
  - [ ] `name` (VARCHAR)
  - [ ] `type` (VARCHAR)
  - [ ] `location` (VARCHAR)
  - [ ] `location_link` (VARCHAR)
  - [ ] `map_3d_iframe` (TEXT)
  - [ ] `thumbnail_url` (VARCHAR) ← For Cloudinary URLs
  - [ ] `category_id` (INTEGER)
  - [ ] `status` (VARCHAR)
  - [ ] `is_deleted` (BOOLEAN)
  - [ ] `created_at` (TIMESTAMP)
  - [ ] `updated_at` (TIMESTAMP)

### Verify project_updates table
- [ ] Run: `\d project_updates`
- [ ] Should have columns:
  - [ ] `id` (SERIAL PRIMARY KEY)
  - [ ] `project_id` (INTEGER, FK to projects)
  - [ ] `title` (VARCHAR)
  - [ ] `description` (TEXT)
  - [ ] `created_at` (TIMESTAMP)

---

## ☁️ Cloudinary Setup

### Create folder for uploads
- [ ] Go to https://cloudinary.com/console → Media Library
- [ ] Ensure you can access the dashboard
- [ ] Check that you can navigate folders

**Note:** Folder `shubh_projects` will be auto-created on first upload from backend

### Verify credentials
- [ ] Test credentials format in `.env`
- [ ] Should match exactly:
  - [ ] Cloud Name: `dxxxxxx` format
  - [ ] API Key: `123456789` (numbers)
  - [ ] API Secret: `abcdef...` (longer string)

---

## 📦 Node Dependencies

### Check installations
```bash
cd backend

# Verify all dependencies are installed
npm list pg
npm list cloudinary
npm list multer-storage-cloudinary
npm list multer
npm list express
npm list cors
npm list dotenv
```

All should return version numbers, NOT `npm ERR!`

### If missing, install:
```bash
npm install
```

- [ ] `npm install` completed successfully
- [ ] `node_modules` folder created
- [ ] `package-lock.json` updated

---

## 🔗 Network & Connectivity

### Database Connection
- [ ] Firewall allows PostgreSQL (port 5432)
- [ ] If on corporate network, verify VPN not needed
- [ ] Try test connection:
  ```bash
  psql postgresql://postgres:PASSWORD@db.XXXXXXX.supabase.co:5432/postgres
  ```
  Should NOT return connection timeout

### Cloudinary Access
- [ ] Can access https://cloudinary.com/console
- [ ] Can view Media Library
- [ ] No proxy/VPN issues

---

## 🧪 Pre-Start Tests

### Test 1: Import all modules
```bash
cd backend
node -e "import('./server.js')"
```
- [ ] Should NOT show import errors
- [ ] Should NOT show "Cannot find module"

### Test 2: Verify package.json
```bash
cat package.json | grep '"type"'
```
- [ ] Should output: `"type": "module",`

### Test 3: Check environment loading
```bash
node -e "import('./config/db.js')"
```
- [ ] Should NOT show errors

### Test 4: Check Cloudinary config
```bash
node -e "import('./config/cloudinary.js')"
```
- [ ] Should NOT show import errors

---

## 🚀 Start-Up Verification

Ready to start? Run:
```bash
npm start
```

Expected output:
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

- [ ] Server starts without errors
- [ ] Database connection message appears
- [ ] Server running message appears
- [ ] No ECONNREFUSED errors
- [ ] No credential errors
- [ ] No import errors

---

## 🧪 First API Test

In another terminal, test:

```bash
curl http://localhost:5000/
```

Expected response:
```json
{
  "message": "Shubh Construction API",
  "version": "1.0.0",
  "status": "running"
}
```

- [ ] Response received (200 OK)
- [ ] JSON format is valid
- [ ] No connection errors

---

## 🖼️ File Upload Test

Create test image or use existing one, then:

```bash
curl -X POST http://localhost:5000/api/projects \
  -F "name=Test Project" \
  -F "type=Residential" \
  -F "location=Mumbai" \
  -F "image=@/path/to/test.jpg"
```

Expected:
- [ ] Status 201 Created
- [ ] Response has `success: true`
- [ ] Image URL starts with `https://res.cloudinary.com/`
- [ ] Image appears in Cloudinary Media Library

---

## ✅ Final Checklist

- [ ] `.env` file created with all credentials
- [ ] All 5 core files are in place and use ES modules
- [ ] Database tables verified to exist
- [ ] Cloudinary credentials verified
- [ ] Node dependencies installed
- [ ] No import errors when starting
- [ ] Server starts successfully
- [ ] First API test (GET /) returns 200
- [ ] File upload creates Cloudinary URL

---

## 🚨 If Something Fails

| Error | Check |
|-------|-------|
| `DATABASE_URL not found` | `.env` file exists and has DATABASE_URL |
| `CLOUDINARY_CLOUD_NAME not found` | `.env` file has Cloudinary variables |
| `Cannot find module` | Run `npm install` |
| `ECONNREFUSED` | Database URL is correct, network accessible |
| `Port 5000 in use` | Change PORT in `.env` or kill process |
| `File upload fails` | Check Cloudinary credentials, file size, format |

---

## 📞 Support Resources

- 📖 **BACKEND_SETUP.md** - Detailed setup guide
- ⚡ **QUICK_START_BACKEND.md** - Quick start in 5 minutes
- 📦 **.env.example** - Environment variable template

---

## ✨ You're Ready!

Once this checklist is complete, you're ready to:
1. Run the backend server
2. Test all endpoints
3. Connect with frontend
4. Deploy to production

**All systems should be GO!** 🚀

---

**Date Checked:** ___________  
**By:** ___________  
**Status:** ✅ READY / ❌ NOT READY
