# Shubh Construction Admin Panel

## Overview
This project includes a fully functional admin panel for managing construction projects. The admin panel is accessible at `/admin` route.

## Admin Panel Features

### Authentication
- **Login Page**: `/admin/login`
- **Demo Credentials**:
  - Email: `admin@shubhconstruction.com`
  - Password: `admin123`

### Admin Routes
- **Dashboard**: `/admin` - Overview with quick stats and actions
- **Add Project**: `/admin/add-project` - Create new construction projects
- **Manage Projects**: `/admin/manage-projects` - View, edit, and delete projects
- **Uploads**: `/admin/uploads` - Upload site update images

## Setup Instructions

### Frontend (Next.js)

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run the development server:
```bash
npm run dev
```

The frontend will be available at: http://localhost:3000

### Backend (Express)

1. Install dependencies:
```bash
cd backend
npm install
```

2. Start the server:
```bash
npm start
```

The backend will be available at: http://localhost:5000

## Accessing the Admin Panel

1. Start both frontend and backend servers
2. Navigate to: http://localhost:3000/admin/login
3. Login with the demo credentials
4. You'll be redirected to the admin dashboard

## Admin Features

### Project Management
- **Add Projects**: Fill in project name, type, location, and upload images
- **View Projects**: See all projects in a table format
- **Edit Projects**: Click edit button to modify existing projects
- **Delete Projects**: Remove projects with confirmation
- **Real-time Updates**: Changes reflect immediately

### Security
- Protected routes - requires authentication
- Automatic redirect to login if not authenticated
- Session persists in localStorage
- Logout functionality available in navbar

### UI/UX Features
- Responsive design
- Active navigation highlighting
- Loading states for async operations
- Error handling with user-friendly messages
- Success confirmations
- Form validation

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Uploads
- `POST /api/uploads` - Upload images

## Technology Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- React Context API (for authentication)

### Backend
- Express.js
- Node.js
- In-memory storage (can be replaced with database)

## File Structure

```
frontend/
├── app/
│   └── admin/
│       ├── layout.tsx          # Admin layout with auth protection
│       ├── page.tsx             # Dashboard
│       ├── login/
│       │   └── page.tsx         # Login page
│       ├── add-project/
│       │   └── page.tsx         # Add project page
│       ├── manage-projects/
│       │   └── page.tsx         # Manage projects page
│       ├── edit-project/
│       │   └── page.tsx         # Edit project page
│       └── uploads/
│           └── page.tsx         # Uploads page
├── components/
│   └── admin/
│       ├── AdminNavbar.tsx      # Admin navigation bar
│       ├── AdminSidebar.tsx     # Admin sidebar menu
│       ├── ProjectForm.tsx      # Reusable project form
│       └── ProjectTable.tsx     # Projects table component
├── contexts/
│   └── AuthContext.tsx          # Authentication context
└── types/
    └── project.ts               # TypeScript interfaces

backend/
├── controllers/
│   └── projectController.js     # Project business logic
├── models/
│   └── projectModel.js          # Project data model
├── routes/
│   └── projectRoutes.js         # API routes
└── server.js                    # Express server setup
```

## Notes

- The backend currently uses in-memory storage. Replace with a proper database (MongoDB, PostgreSQL, etc.) for production.
- File uploads are configured but need Multer middleware for actual file handling.
- Update authentication logic for production use (JWT tokens, secure password hashing, etc.)
- Add proper error logging and monitoring for production.

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Image upload with Cloudinary
- User management
- Role-based access control
- Activity logs
- Project categories and tags
- Advanced search and filtering
- Analytics dashboard
