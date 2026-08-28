import api from './api.js';

/**
 * Submit contact message form data to the backend API.
 * Returns response containing { success: true, data: {...} }
 */
export const submitContactMessage = async (formData) => {
  const response = await api.post('/contact', formData);
  return response.data;
};
