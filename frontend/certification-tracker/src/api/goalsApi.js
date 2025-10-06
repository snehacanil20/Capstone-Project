import axios from './axiosConfig';

// Goals API helper functions
export const createGoal = (payload) => axios.post('/goals', payload);

export const getMyGoals = () => axios.get('/goals/my');

export const updateGoal = (id, payload) => axios.put(`/goals/${id}`, payload);

export const updateProgress = (id, progressPercent) =>
  axios.patch(`/goals/${id}/progress`, { progressPercent });