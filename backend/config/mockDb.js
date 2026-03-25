// Mock Database for Development/Testing
// Stores data in memory - perfect for testing without Supabase

let projects = [];
let projectUpdates = [];
let nextProjectId = 1;
let nextUpdateId = 1;

const mockDb = {
  // Query interface matching pg pool
  query: async (queryText, params = []) => {
    console.log(`📊 [MOCK-DB] Executing query: ${queryText.substring(0, 50)}...`);
    
    // CREATE - INSERT
    if (queryText.includes('INSERT INTO projects')) {
      const [name, type, location, locationLink, map3dIframe, thumbnailUrl, categoryId, status] = params;
      
      const project = {
        id: nextProjectId++,
        name,
        type,
        location,
        location_link: locationLink,
        map_3d_iframe: map3dIframe,
        thumbnail_url: thumbnailUrl,
        category_id: categoryId,
        status,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        locationLink,
        map3dIframe,
        image: thumbnailUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      projects.push(project);
      console.log(`✅ [MOCK-DB] Project inserted with ID: ${project.id}`);
      
      return {
        rows: [project],
        rowCount: 1
      };
    }
    
    // READ - SELECT projects (with or without WHERE/JOIN)
    if (queryText.includes('FROM projects')) {
      const filteredProjects = projects
        .filter(p => !p.is_deleted)
        .map(p => ({
          id: p.id,
          name: p.name,
          type: p.type,
          location: p.location,
          locationLink: p.location_link,
          map3dIframe: p.map_3d_iframe,
          image: p.thumbnail_url,
          status: p.status,
          category_id: p.category_id,
          categoryName: 'General',
          createdAt: p.created_at,
          updatedAt: p.updated_at
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // If a WHERE clause is present with id = $1, handle it here too
      if (queryText.includes('WHERE') && params.length === 1) {
        const [id] = params;
        const match = filteredProjects.find(p => p.id === parseInt(id));
        const rows = match ? [match] : [];
        console.log(`✅ [MOCK-DB] Retrieved project by id ${id} (${rows.length ? 'found' : 'not found'})`);
        return { rows, rowCount: rows.length };
      }

      console.log(`✅ [MOCK-DB] Retrieved ${filteredProjects.length} projects`);
      return {
        rows: filteredProjects,
        rowCount: filteredProjects.length
      };
    }
    
    // READ - SELECT by ID
    if (queryText.includes('WHERE p.id = $1')) {
      const [id] = params;
      const project = projects.find(p => p.id === parseInt(id) && !p.is_deleted);
      
      if (!project) {
        console.log(`⚠️  [MOCK-DB] Project ID ${id} not found`);
        return { rows: [], rowCount: 0 };
      }
      
      const mapped = {
        id: project.id,
        name: project.name,
        type: project.type,
        location: project.location,
        locationLink: project.location_link,
        map3dIframe: project.map_3d_iframe,
        image: project.thumbnail_url,
        status: project.status,
        category_id: project.category_id,
        createdAt: project.created_at,
        updatedAt: project.updated_at
      };
      
      console.log(`✅ [MOCK-DB] Retrieved project: ${project.name}`);
      return { rows: [mapped], rowCount: 1 };
    }
    
    // UPDATE - PUT
    if (queryText.includes('UPDATE projects SET')) {
      const [name, type, location, locationLink, map3dIframe, thumbnailUrl, categoryId, status, id] = params;
      const project = projects.find(p => p.id === parseInt(id));
      
      if (!project) {
        console.log(`⚠️  [MOCK-DB] Project ID ${id} not found for update`);
        return { rows: [], rowCount: 0 };
      }
      
      Object.assign(project, {
        name: name || project.name,
        type: type || project.type,
        location: location || project.location,
        location_link: locationLink || project.location_link,
        map_3d_iframe: map3dIframe || project.map_3d_iframe,
        thumbnail_url: thumbnailUrl || project.thumbnail_url,
        category_id: categoryId || project.category_id,
        status: status || project.status,
        updated_at: new Date()
      });
      
      const updated = {
        id: project.id,
        name: project.name,
        type: project.type,
        location: project.location,
        locationLink: project.location_link,
        map3dIframe: project.map_3d_iframe,
        image: project.thumbnail_url,
        status: project.status,
        category_id: project.category_id,
        createdAt: project.created_at,
        updatedAt: project.updated_at
      };
      
      console.log(`✅ [MOCK-DB] Project ${id} updated`);
      return { rows: [updated], rowCount: 1 };
    }
    
    // DELETE - Soft delete
    if (queryText.includes('UPDATE projects SET is_deleted = true')) {
      const [id] = params;
      const project = projects.find(p => p.id === parseInt(id));
      
      if (!project) {
        console.log(`⚠️  [MOCK-DB] Project ID ${id} not found for deletion`);
        return { rows: [], rowCount: 0 };
      }
      
      project.is_deleted = true;
      console.log(`✅ [MOCK-DB] Project ${id} soft deleted`);
      return { rows: [ { id, success: true } ], rowCount: 1 };
    }
    
    // Default response
    console.log(`⚠️  [MOCK-DB] Unknown query type`);
    return { rows: [], rowCount: 0 };
  },
  
  // For testing - get in-memory data
  getAllProjects: () => projects.filter(p => !p.is_deleted),
  
  // Disconnect (no-op for mock)
  end: async () => {
    console.log('✅ [MOCK-DB] Connection closed');
  }
};

export default mockDb;
