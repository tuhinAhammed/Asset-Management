/**
 * API ENDPOINTS
 * =============
 * 
 * IMPORTANT: Using Mock Data for Development
 * ===========================================
 * Currently, this dashboard is configured to use MOCK/DEMO DATA.
 * All API calls are intercepted and returns mock data from src/Api/mockAPIService.js
 * 
 * TO CONNECT TO YOUR REAL BACKEND API:
 * ====================================
 * 1. Update axiosInstance.js:
 *    - Set USE_MOCK_DATA = false
 *    - Update API_BASE_URL to your backend server URL
 *    Example: https://your-api-domain.com/api
 * 
 * 2. Verify API Endpoints:
 *    - Review all endpoints below match your backend routes
 *    - Adjust endpoint paths if needed (e.g., /admin/product vs /products)
 *    - Ensure authentication and authorization are properly implemented
 * 
 * 3. Test Login:
 *    - Default demo credentials: admin@example.com / 12345678
 *    - Update with your real admin credentials after connecting to real API
 * 
 * 4. Test Each Module:
 *    - Visit each admin page and test CRUD operations
 *    - Verify file uploads work correctly
 *    - Check search and filter functionality
 * 
 * 5. Data Format:
 *    - Ensure your API returns data in the same format as mockAPIService
 *    - Response structure should match mockData.js examples
 * 
 * Common Issues:
 * - CORS errors: Configure CORS on your backend
 * - Authentication failures: Verify JWT token implementation
 * - File upload errors: Ensure multipart/form-data is handled
 * - 404 errors: Check endpoint URLs match your backend routes
 */

import axiosInstance, { USE_MOCK_DATA } from './axiosInstance';
import mockAPIService from './mockAPIService';

// ============ AUTH ENDPOINTS ============
export const authAPI = {
  login: async (email, password) => {
    // Use mock login when in demo mode
    if (USE_MOCK_DATA) {
      const mockResponse = await mockAPIService.login({ email, Password: password });
      return { data: mockResponse };
    }
    return axiosInstance.post('/login', { email, Password: password });
  },
  logout: () =>
    axiosInstance.get('/logout'),
  getUser: () =>
    axiosInstance.get('/user'),
  changePassword: (oldPassword, newPassword, passwordConfirmation) =>
    axiosInstance.post('/admin/user/change-password', {
      old_password: oldPassword,
      new_password: newPassword,
      password_confirmation: passwordConfirmation,
    }),
};

// ============ COMPONENT ENDPOINTS ============
export const componentAPI = {
  list: () =>
    axiosInstance.get('/admin/component/list'),
  single: (id) =>
    axiosInstance.get(`/admin/component/single/${id}`),
  create: (data) =>
    axiosInstance.post('/admin/component/create', data),
  update: (id, data) =>
    axiosInstance.put(`/admin/component/update/${id}`, data),
  delete: (id) =>
    axiosInstance.delete(`/admin/component/delete/${id}`),
};

// ============ PAGE LAYOUT ENDPOINTS ============
export const pageLayoutAPI = {
  list: () =>
    axiosInstance.get('/admin/page-layout/list'),
  single: (id) =>
    axiosInstance.get(`/admin/page-layout/single/${id}`),
  create: (formData) =>
    axiosInstance.post('/admin/page-layout/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    axiosInstance.put(`/admin/page-layout/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) =>
    axiosInstance.delete(`/admin/page-layout/delete/${id}`),
};

// ============ PAGE ENDPOINTS ============
export const pageAPI = {
  list: () =>
    axiosInstance.get('/admin/page/list'),
  single: (id) =>
    axiosInstance.get(`/admin/page/single/${id}`),
  create: (data) =>
    axiosInstance.post('/admin/page/create', data),
  update: (id, data) =>
    axiosInstance.put(`/admin/page/update/${id}`, data),
  delete: (id) =>
    axiosInstance.delete(`/admin/page/delete/${id}`),
};

// ============ SECTION LAYOUT ENDPOINTS ============
export const sectionLayoutAPI = {
  list: () =>
    axiosInstance.get('/admin/blog/list'),
  single: (id) =>
    axiosInstance.get(`/admin/blog/single/${id}`),
  create: (formData) =>
    axiosInstance.post('/admin/blog/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    axiosInstance.put(`/admin/blog/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) =>
    axiosInstance.delete(`/admin/blog/delete/${id}`),
};

// ============ SECTION ENDPOINTS ============
export const sectionAPI = {
  list: () =>
    axiosInstance.get('/admin/section/list'),
  single: (id) =>
    axiosInstance.get(`/admin/section/single/${id}`),
  create: (formData) =>
    axiosInstance.post('/admin/section/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    axiosInstance.put(`/admin/section/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) =>
    axiosInstance.delete(`/admin/section/delete/${id}`),
};

// ============ CONTENT ENDPOINTS ============
export const contentAPI = {
  list: () =>
    axiosInstance.get('/admin/content/list'),
  single: (id) =>
    axiosInstance.get(`/admin/content/single/${id}`),
  create: (data) =>
    axiosInstance.post('/admin/content/create', data),
  update: (id, data) =>
    axiosInstance.put(`/admin/content/update/${id}`, data),
  delete: (id) =>
    axiosInstance.delete(`/admin/content/delete/${id}`),
};

// ============ CATEGORY ENDPOINTS ============
export const categoryAPI = {
  list: () =>
    axiosInstance.get('/admin/category/list'),
  single: (id) =>
    axiosInstance.get(`/admin/category/single/${id}`),
  create: (data) =>
    axiosInstance.post('/admin/category/create', data),
  update: (id, data) =>
    axiosInstance.put(`/admin/category/update/${id}`, data),
  delete: (id) =>
    axiosInstance.delete(`/admin/category/delete/${id}`),
};

// ============ CONTENT LAYOUT ENDPOINTS ============
export const contentLayoutAPI = {
  list: () =>
    axiosInstance.get('/admin/content-layout/list'),
  single: (id) =>
    axiosInstance.get(`/admin/content-layout/single/${id}`),
  create: (formData) =>
    axiosInstance.post('/admin/content-layout/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    axiosInstance.put(`/admin/content-layout/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) =>
    axiosInstance.delete(`/admin/content-layout/delete/${id}`),
};

// ============ MENU ENDPOINTS ============
export const menuAPI = {
  list: () =>
    axiosInstance.get('/admin/menu/list'),
  single: (id) =>
    axiosInstance.get(`/admin/menu/single/${id}`),
  create: (data) =>
    axiosInstance.post('/admin/menu/create', data),
  update: (id, data) =>
    axiosInstance.put(`/admin/menu/update/${id}`, data),
  delete: (id) =>
    axiosInstance.delete(`/admin/menu/delete/${id}`),
};

// ============ MENU ITEM ENDPOINTS ============
export const menuItemAPI = {
  list: () =>
    axiosInstance.get('/admin/menu-item/list'),
  single: (id) =>
    axiosInstance.get(`/admin/menu-item/single/${id}`),
  create: (data) =>
    axiosInstance.post('/admin/menu-item/create', data),
  update: (id, data) =>
    axiosInstance.put(`/admin/menu-item/update/${id}`, data),
  delete: (id) =>
    axiosInstance.delete(`/admin/menu-item/delete/${id}`),
};

// ============ PRODUCT CATEGORY ENDPOINTS ============
export const productCategoryAPI = {
  list: () =>
    axiosInstance.get('/admin/product-category/list'),
  single: (id) =>
    axiosInstance.get(`/admin/product-category/single/${id}`),
  create: (data) =>
    axiosInstance.post('/admin/product-category/create', data),
  update: (id, data) =>
    axiosInstance.put(`/admin/product-category/update/${id}`, data),
  delete: (id) =>
    axiosInstance.delete(`/admin/product-category/delete/${id}`),
};

// ============ PRODUCT ENDPOINTS ============
export const productAPI = {
  list: () =>
    axiosInstance.get('/admin/product/list'),
  single: (id) =>
    axiosInstance.get(`/admin/product/single/${id}`),
  create: (formData) =>
    axiosInstance.post('/admin/product/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    axiosInstance.put(`/admin/product/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) =>
    axiosInstance.delete(`/admin/product/delete/${id}`),
};

// ============ PRODUCT INFO ENDPOINTS ============
export const productInfoAPI = {
  list: () =>
    axiosInstance.get('/admin/product-info/list'),
  single: (id) =>
    axiosInstance.get(`/admin/product-info/single/${id}`),
  create: (formData) =>
    axiosInstance.post('/admin/product-info/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    axiosInstance.put(`/admin/product-info/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) =>
    axiosInstance.delete(`/admin/product-info/delete/${id}`),
};

// ============ GALLERY ENDPOINTS ============
export const galleryAPI = {
  list: () =>
    axiosInstance.get('/admin/gallery/list'),
  single: (id) =>
    axiosInstance.get(`/admin/gallery/single/${id}`),
  create: (formData) =>
    axiosInstance.post('/admin/gallery/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    axiosInstance.put(`/admin/gallery/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) =>
    axiosInstance.delete(`/admin/gallery/delete/${id}`),
};

// ============ BANNER ENDPOINTS ============
export const bannerAPI = {
  list: () =>
    axiosInstance.get('/admin/banner/list'),
  single: (id) =>
    axiosInstance.get(`/admin/banner/single/${id}`),
  create: (formData) =>
    axiosInstance.post('/admin/banner/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    axiosInstance.put(`/admin/banner/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) =>
    axiosInstance.delete(`/admin/banner/delete/${id}`),
};

// ============ BANNER CONTENT ENDPOINTS ============
export const bannerContentAPI = {
  list: () =>
    axiosInstance.get('/admin/banner-content/list'),
  single: (id) =>
    axiosInstance.get(`/admin/banner-content/single/${id}`),
  create: (formData) =>
    axiosInstance.post('/admin/banner-content/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    axiosInstance.put(`/admin/banner-content/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) =>
    axiosInstance.delete(`/admin/banner-content/delete/${id}`),
};

// ============ SOCIAL ENDPOINTS ============
export const socialAPI = {
  list: () =>
    axiosInstance.get('/admin/social/list'),
  single: (id) =>
    axiosInstance.get(`/admin/social/single/${id}`),
  create: (data) =>
    axiosInstance.post('/admin/social/create', data),
  update: (id, data) =>
    axiosInstance.put(`/admin/social/update/${id}`, data),
  delete: (id) =>
    axiosInstance.delete(`/admin/social/delete/${id}`),
};

// ============ CAREER ENDPOINTS ============
export const careerAPI = {
  list: () =>
    axiosInstance.get('/admin/career/list'),
  single: (id) =>
    axiosInstance.get(`/admin/career/single/${id}`),
  create: (data) =>
    axiosInstance.post('/admin/career/create', data),
  update: (id, data) =>
    axiosInstance.put(`/admin/career/update/${id}`, data),
  delete: (id) =>
    axiosInstance.delete(`/admin/career/delete/${id}`),
};

// ============ JOB APPLICATION ENDPOINTS ============
export const jobApplicationAPI = {
  list: () =>
    axiosInstance.get('/admin/job-application/list'),
  single: (id) =>
    axiosInstance.get(`/admin/job-application/single/${id}`),
  create: (formData) =>
    axiosInstance.post('/admin/job-application/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    axiosInstance.put(`/admin/job-application/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) =>
    axiosInstance.delete(`/admin/job-application/delete/${id}`),
};

// ============ SETTINGS ENDPOINTS ============
export const settingsAPI = {
  get: () =>
    axiosInstance.get('/admin/settings'),
  update: (data) =>
    axiosInstance.put('/admin/settings/update', data),
};

// ============ USER ENDPOINTS ============
export const userAPI = {
  getProfile: () =>
    axiosInstance.get('/admin/user'),
  updateProfile: (data) =>
    axiosInstance.put('/admin/user/update', data),
};

// ============ PUBLIC ENDPOINTS ============
export const publicAPI = {
  getBanner: (bannerId) =>
    axiosInstance.get(`/banner/${bannerId}`),
  getProducts: () =>
    axiosInstance.get('/products'),
  getProduct: (slug) =>
    axiosInstance.get(`/product/${slug}`),
  getPage: (slug) =>
    axiosInstance.get(`/page/${slug}`),
  getSystemInfo: () =>
    axiosInstance.get('/system'),
};
