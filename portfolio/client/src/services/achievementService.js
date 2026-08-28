import api from './api.js';

export const getAchievements = async () => {
  const response = await api.get('/achievements');
  return response.data;
};

export const createAchievement = async (achievementData) => {
  const response = await api.post('/achievements', achievementData);
  return response.data;
};

export const updateAchievement = async (id, achievementData) => {
  const response = await api.put(`/achievements/${id}`, achievementData);
  return response.data;
};

export const deleteAchievement = async (id) => {
  const response = await api.delete(`/achievements/${id}`);
  return response.data;
};
