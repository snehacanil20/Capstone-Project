import axios from './axiosConfig';

// Upload file
export const uploadEvidenceFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post('/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Submit evidence
export const submitEvidence = (payload) => axios.post('/submissions', payload);

// Get my submissions
export const getMySubmissions = () => axios.get('/submissions/my');

// Get pending approvals (for approvers)
export const getPendingSubmissions = () => axios.get('/submissions/pending');

// Approve or reject
export const decideSubmission = (id, payload) =>
  axios.post(`/submissions/${id}/decision`, payload);