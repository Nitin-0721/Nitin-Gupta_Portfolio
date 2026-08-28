import api from './api.js';

export const getEducations = async () => {
  const response = await api.get('/education');
  return response.data;
};

export const createEducation = async (educationData) => {
  const response = await api.post('/education', educationData);
  return response.data;
};

export const updateEducation = async (id, educationData) => {
  const response = await api.put(`/education/${id}`, educationData);
  return response.data;
};

export const deleteEducation = async (id) => {
  const response = await api.delete(`/education/${id}`);
  return response.data;
};
