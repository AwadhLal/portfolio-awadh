import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach the admin JWT (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If a token expires or is rejected, clear it so the app falls back to the login screen.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && localStorage.getItem('admin_token')) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_info');
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

// ---- Public endpoints -------------------------------------------------
export const getProfile = () => api.get('/profile');
export const getProjects = (featured) => api.get('/projects', { params: featured ? { featured: true } : {} });
export const getProject = (idOrSlug) => api.get(`/projects/${idOrSlug}`);
export const getSkills = () => api.get('/skills');
export const getExperience = () => api.get('/experience');
export const getEducation = () => api.get('/education');
export const getTestimonials = () => api.get('/testimonials');
export const submitContactMessage = (data) => api.post('/contact', data);

// ---- Auth ---------------------------------------------------------------
export const login = (credentials) => api.post('/auth/login', credentials);
export const getMe = () => api.get('/auth/me');
export const changePassword = (data) => api.put('/auth/change-password', data);

// ---- Admin: profile -------------------------------------------------------
export const updateProfile = (data) => api.put('/profile', data);
export const uploadAvatar = (formData) =>
  api.post('/profile/upload-avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const uploadResume = (formData) =>
  api.post('/profile/upload-resume', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

// ---- Admin: projects -----------------------------------------------------
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const uploadProjectImage = (formData) =>
  api.post('/projects/upload-image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

// ---- Admin: skills ---------------------------------------------------------
export const createSkill = (data) => api.post('/skills', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

// ---- Admin: experience -----------------------------------------------------
export const createExperience = (data) => api.post('/experience', data);
export const updateExperience = (id, data) => api.put(`/experience/${id}`, data);
export const deleteExperience = (id) => api.delete(`/experience/${id}`);

// ---- Admin: education -------------------------------------------------------
export const createEducation = (data) => api.post('/education', data);
export const updateEducation = (id, data) => api.put(`/education/${id}`, data);
export const deleteEducation = (id) => api.delete(`/education/${id}`);

// ---- Admin: messages -----------------------------------------------------
export const getMessages = (unreadOnly) => api.get('/contact', { params: unreadOnly ? { unreadOnly: true } : {} });
export const markMessageRead = (id, is_read = true) => api.patch(`/contact/${id}/read`, { is_read });
export const deleteMessage = (id) => api.delete(`/contact/${id}`);

// ---- Admin: testimonials -----------------------------------------------------
export const createTestimonial = (data) => api.post('/testimonials', data);
export const updateTestimonial = (id, data) => api.put(`/testimonials/${id}`, data);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

export default api;
