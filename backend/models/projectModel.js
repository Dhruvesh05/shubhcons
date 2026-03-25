// In-memory storage for projects (replace with database later)
let projects = [
  {
    id: 1,
    name: "Luxury Villa",
    type: "Residential",
    location: "Mumbai",
    locationLink: "https://maps.google.com/?q=Mumbai",
    map3dIframe: "",
    image: null,
    updates: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Shopping Complex",
    type: "Commercial",
    location: "Delhi",
    locationLink: "https://maps.google.com/?q=Delhi",
    map3dIframe: "",
    image: null,
    updates: [],
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;
let nextUpdateId = 1;

// Get all projects
const getAllProjects = () => {
  return projects;
};

// Get project by ID
const getProjectById = (id) => {
  return projects.find(p => p.id === id);
};

// Create project
const createProject = (projectData) => {
  const newProject = {
    id: nextId++,
    ...projectData,
    updates: [],
    createdAt: new Date().toISOString()
  };
  projects.push(newProject);
  return newProject;
};

// Update project
const updateProject = (id, projectData) => {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  projects[index] = {
    ...projects[index],
    ...projectData,
    updatedAt: new Date().toISOString()
  };
  
  return projects[index];
};

// Delete project
const deleteProject = (id) => {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  const deleted = projects[index];
  projects.splice(index, 1);
  return deleted;
};

// Add update to project
const addProjectUpdate = (projectId, updateData) => {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;
  
  if (!project.updates) {
    project.updates = [];
  }
  
  const newUpdate = {
    id: nextUpdateId++,
    ...updateData,
    createdAt: new Date().toISOString()
  };
  
  project.updates.unshift(newUpdate); // Add to beginning
  return newUpdate;
};

// Get all updates for a project
const getProjectUpdates = (projectId) => {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;
  
  // Ensure updates array exists (backwards compatibility)
  if (!project.updates) {
    project.updates = [];
  }
  
  return project.updates;
};

// Delete an update from a project
const deleteProjectUpdate = (projectId, updateId) => {
  const project = projects.find(p => p.id === projectId);
  if (!project || !project.updates) return null;
  
  const updateIndex = project.updates.findIndex(u => u.id === updateId);
  if (updateIndex === -1) return null;
  
  const deleted = project.updates[updateIndex];
  project.updates.splice(updateIndex, 1);
  return deleted;
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addProjectUpdate,
  getProjectUpdates,
  deleteProjectUpdate
};
