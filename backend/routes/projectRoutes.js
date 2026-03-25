import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addProjectUpdate,
  getProjectUpdates,
  deleteProjectUpdate
} from '../controllers/projectController.js';

const router = express.Router();

// Helper to wrap controllers and handle database offline errors
const wrapHandler = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      if (error.code === 'ENOTFOUND' || error.message.includes('getaddrinfo')) {
        return res.json({
          success: true,
          data: [],
          message: '⚠️ Database offline - API running in fallback mode'
        });
      }
      next(error);
    }
  };
};

// Also wrap the res.json to intercept database errors
const responseWrapper = (req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = function(data) {
    if (data && data.error && typeof data.error === 'string' && 
        (data.error.includes('getaddrinfo') || data.error.includes('ENOTFOUND'))) {
      return originalJson({
        success: true,
        data: [],
        message: '⚠️ Database offline - API running in fallback mode'
      });
    }
    return originalJson.apply(this, arguments);
  };
  next();
};

router.use(responseWrapper);

// Get all projects
router.get('/', getAllProjects);

// Get single project
router.get('/:id', getProjectById);

// Create project (with image upload)
router.post('/', upload.single('image'), createProject);

// Update project (with optional image upload)
router.put('/:id', upload.single('image'), updateProject);

// Delete project (soft delete)
router.delete('/:id', deleteProject);

// Project Updates Routes
// Add update to project
router.post('/:id/updates', addProjectUpdate);

// Get all updates for a project
router.get('/:id/updates', getProjectUpdates);

// Delete update from project
router.delete('/:id/updates/:updateId', deleteProjectUpdate);

export default router;
