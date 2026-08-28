import api from './api.js';

/**
 * Fetch profile data from API.
 */
export const getProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};

/**
 * Update profile data on API.
 */
export const updateProfile = async (profileData) => {
  const response = await api.put('/profile', profileData);
  return response.data;
};
