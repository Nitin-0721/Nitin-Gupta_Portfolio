import api from './api.js';

/**
 * Fetch all projects from backend API.
 * Returns response containing { success: true, data: [...] }
 */
export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

/**
 * Fetch a single project by its slug from backend API.
 * Returns response containing { success: true, data: {...} }
 */
export const getProjectBySlug = async (slug) => {
  const response = await api.get(`/projects/${slug}`);
  return response.data;
};
