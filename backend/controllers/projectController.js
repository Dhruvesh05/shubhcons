import pool from '../config/db.js';

// Helper function to check if error is database connection error
const isDatabaseOffline = (error) => {
  const isOffline = error.code === 'ENOTFOUND' || 
    (error.message && error.message.includes('getaddrinfo')) || 
    (error.message && error.message.includes('not support SSL')) ||
    (error.message && error.message.includes('ENOTFOUND'));
  console.log('isDatabaseOffline check:', { code: error.code, message: error.message, result: isOffline });
  return isOffline;
};

// Get all projects (not deleted, ordered by created_at DESC)
export const getAllProjects = async (req, res) => {
  console.log('🔷 getAllProjects called');
  try {
    const query = `
      SELECT 
        p.id,
        p.name,
        p.type,
        p.location,
        p.location_link as "locationLink",
        p.map_3d_iframe as "map3dIframe",
        p.thumbnail_url as "image",
        p.status,
        p.category_id,
        c.name as "categoryName",
        p.created_at as "createdAt",
        p.updated_at as "updatedAt"
      FROM projects p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_deleted = false
      ORDER BY p.created_at DESC
    `;
    
    const result = await pool.query(query);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    console.log('Error details for debugging:', {
      code: error.code,
      message: error.message,
      hasENotFound: error.code === 'ENOTFOUND',
      hasGetaddrinfo: error.message.includes('getaddrinfo')
    });
    
    // Return empty array if database is offline
    if (isDatabaseOffline(error)) {
      return res.json({
        success: true,
        data: [],
        message: '⚠️ Database offline - returning empty data'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT 
        p.id,
        p.name,
        p.type,
        p.location,
        p.location_link as "locationLink",
        p.map_3d_iframe as "map3dIframe",
        p.thumbnail_url as "image",
        p.status,
        p.category_id,
        c.name as "categoryName",
        p.created_at as "createdAt",
        p.updated_at as "updatedAt"
      FROM projects p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1 AND p.is_deleted = false
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    
    // Return not found if database is offline
    if (isDatabaseOffline(error)) {
      return res.status(404).json({
        success: false,
        message: '⚠️ Database offline - project not available'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};

// Create new project
export const createProject = async (req, res) => {
  console.log('📥 [CONTROLLER] createProject handler invoked');
  console.log('📥 Request Body received:', JSON.stringify({ name: req.body?.name, type: req.body?.type, location: req.body?.location }, null, 2));
  console.log('📸 Uploaded file (if any):', req.uploadedFile ?? 'NO FILE');
  
  try {
    console.log('🔷 createProject called');
    console.log('📤 Request body fields:', { name: req.body.name, type: req.body.type, location: req.body.location });
    console.log('📁 File info:', req.uploadedFile ? {
      url: req.uploadedFile.url,
      public_id: req.uploadedFile.public_id,
    } : 'No file uploaded');
    
    const { name, type, location, locationLink, map3dIframe, category_id, status } = req.body;
    
    // Validate required fields
    if (!name || !type || !location) {
      console.warn('⚠️ Missing required fields:', { name: !!name, type: !!type, location: !!location });
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, type, location'
      });
    }
    
    // Get image URL from Cloudinary (if uploaded)
    const thumbnailUrl = req.uploadedFile?.url || null;
    console.log('🖼️ Thumbnail URL:', thumbnailUrl ? 'Set ✅' : 'Not provided (optional)');
    
    const query = `
      INSERT INTO projects (name, type, location, location_link, map_3d_iframe, thumbnail_url, category_id, status, is_deleted, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false, NOW(), NOW())
      RETURNING 
        id,
        name,
        type,
        location,
        location_link as "locationLink",
        map_3d_iframe as "map3dIframe",
        thumbnail_url as "image",
        status,
        category_id,
        created_at as "createdAt",
        updated_at as "updatedAt"
    `;
    
    console.log('🗄️ Attempting DB Insert with values...');
    const values = [
      name,
      type,
      location,
      locationLink || null,
      map3dIframe || null,
      thumbnailUrl,
      category_id || null,
      status || 'active'
    ];
    
    console.log('💾 Database query executing... Sending to pool.query()');
    const result = await pool.query(query, values);
    console.log('💾 Database query completed successfully');
    
    console.log('✅ Project created successfully:', {
      id: result.rows[0].id,
      name: result.rows[0].name,
      image: result.rows[0].image ? 'Yes ✅' : 'No'
    });
    
    console.log('📤 [RESPONSE] Sending success response with status 201');
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
    console.log('✅ [COMPLETE] Response sent successfully');
  } catch (error) {
    console.error('❌ [ERROR] Error in createProject catch block:', error.message);
    console.error('❌ [ERROR] Stack trace:', error.stack);
    console.error('❌ [ERROR] Error properties:', { code: error.code, message: error.message, status: error.status });
    
    // CRITICAL: Ensure response is always sent
    if (res.headersSent) {
      console.error('⚠️ Headers already sent, cannot send error response');
      return;
    }
    
    if (isDatabaseOffline(error)) {
      console.error('📡 Database is offline');
      return res.status(503).json({
        success: false,
        message: '⚠️ Database offline - cannot create project',
        error: 'Database unavailable'
      });
    }
    
    console.log('📤 [RESPONSE] Sending error response with status 500');
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
    console.log('✅ [COMPLETE] Error response sent');
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, location, locationLink, map3dIframe, category_id, status } = req.body;
    
    // Check if project exists
    const checkQuery = 'SELECT id FROM projects WHERE id = $1 AND is_deleted = false';
    const checkResult = await pool.query(checkQuery, [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;
    
    if (name !== undefined) {
      updates.push(`name = $${paramCount}`);
      values.push(name);
      paramCount++;
    }
    
    if (type !== undefined) {
      updates.push(`type = $${paramCount}`);
      values.push(type);
      paramCount++;
    }
    
    if (location !== undefined) {
      updates.push(`location = $${paramCount}`);
      values.push(location);
      paramCount++;
    }
    
    if (locationLink !== undefined) {
      updates.push(`location_link = $${paramCount}`);
      values.push(locationLink || null);
      paramCount++;
    }
    
    if (map3dIframe !== undefined) {
      updates.push(`map_3d_iframe = $${paramCount}`);
      values.push(map3dIframe || null);
      paramCount++;
    }
    
    if (category_id !== undefined) {
      updates.push(`category_id = $${paramCount}`);
      values.push(category_id || null);
      paramCount++;
    }
    
    if (status !== undefined) {
      updates.push(`status = $${paramCount}`);
      values.push(status);
      paramCount++;
    }
    
    // If new image uploaded, update thumbnail_url
    if (req.uploadedFile?.url) {
      updates.push(`thumbnail_url = $${paramCount}`);
      values.push(req.uploadedFile.url);
      paramCount++;
    }
    
    // Always update updated_at
    updates.push(`updated_at = NOW()`);
    
    // Add ID to values
    values.push(id);
    
    const query = `
      UPDATE projects
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING 
        id,
        name,
        type,
        location,
        location_link as "locationLink",
        map_3d_iframe as "map3dIframe",
        thumbnail_url as "image",
        status,
        category_id,
        created_at as "createdAt",
        updated_at as "updatedAt"
    `;
    
    const result = await pool.query(query, values);
    
    res.json({
      success: true,
      message: 'Project updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating project:', error);
    
    if (isDatabaseOffline(error)) {
      return res.status(503).json({
        success: false,
        message: '⚠️ Database offline - cannot update project',
        error: 'Database unavailable'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

// Delete project (soft delete)
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if project exists
    const checkQuery = 'SELECT id FROM projects WHERE id = $1 AND is_deleted = false';
    const checkResult = await pool.query(checkQuery, [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Soft delete
    const query = `
      UPDATE projects
      SET is_deleted = true, updated_at = NOW()
      WHERE id = $1
    `;
    
    await pool.query(query, [id]);
    
    res.json({
      success: true,
      message: 'Project deleted successfully',
      data: null
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    
    if (isDatabaseOffline(error)) {
      return res.status(503).json({
        success: false,
        message: '⚠️ Database offline - cannot delete project',
        error: 'Database unavailable'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};

// Add project update
export const addProjectUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, description'
      });
    }
    
    // Check if project exists
    const checkQuery = 'SELECT id FROM projects WHERE id = $1 AND is_deleted = false';
    const checkResult = await pool.query(checkQuery, [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    const query = `
      INSERT INTO project_updates (project_id, title, description, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING 
        id,
        project_id,
        title,
        description,
        created_at as "createdAt"
    `;
    
    const result = await pool.query(query, [id, title, description]);
    
    res.status(201).json({
      success: true,
      message: 'Project update added successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding project update:', error);
    
    if (isDatabaseOffline(error)) {
      return res.status(503).json({
        success: false,
        message: '⚠️ Database offline - cannot add update',
        error: 'Database unavailable'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error adding project update',
      error: error.message
    });
  }
};

// Get all updates for a project
export const getProjectUpdates = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if project exists
    const checkQuery = 'SELECT id FROM projects WHERE id = $1 AND is_deleted = false';
    const checkResult = await pool.query(checkQuery, [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    const query = `
      SELECT 
        id,
        project_id,
        title,
        description,
        created_at as "createdAt"
      FROM project_updates
      WHERE project_id = $1
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query, [id]);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching project updates:', error);
    
    if (isDatabaseOffline(error)) {
      return res.json({
        success: true,
        data: [],
        message: '⚠️ Database offline - returning empty updates'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error fetching project updates',
      error: error.message
    });
  }
};

// Delete project update
export const deleteProjectUpdate = async (req, res) => {
  try {
    const { id, updateId } = req.params;
    
    // Check if update exists and belongs to the project
    const checkQuery = `
      SELECT id FROM project_updates 
      WHERE id = $1 AND project_id = $2
    `;
    const checkResult = await pool.query(checkQuery, [updateId, id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Update not found'
      });
    }
    
    const query = 'DELETE FROM project_updates WHERE id = $1';
    await pool.query(query, [updateId]);
    
    res.json({
      success: true,
      message: 'Project update deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project update:', error);
    
    if (isDatabaseOffline(error)) {
      return res.status(503).json({
        success: false,
        message: '⚠️ Database offline - cannot delete update',
        error: 'Database unavailable'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error deleting project update',
      error: error.message
    });
  }
};
