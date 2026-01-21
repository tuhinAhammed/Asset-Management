/**
 * ASSET MANAGEMENT API ENDPOINTS
 * ==============================
 * 
 * Base API: https://asset-api.shelaigor.com/api/
 * Base File Path: https://asset-api.shelaigor.com/api/storage/
 * 
 * IMPLEMENTATION CHECKLIST
 * ========================
 * 1. Frontend Configuration (axiosInstance.js):
 *    - Set API_BASE_URL = "https://asset-api.shelaigor.com/api"
 *    - Set USE_MOCK_DATA = false (for real API)
 *    - Enable CORS with withCredentials: true
 *    - Add Bearer token to all requests
 * 
 * 2. Backend Integration Points:
 *    ✅ Authentication (Login, Logout, User Info)
 *    ✅ Component Management (CRUD)
 *    ✅ Page Layout (CRUD + File Upload)
 *    ✅ Page (CRUD)
 *    ✅ Section Layout (CRUD + File Upload)
 *    ✅ Section (CRUD + File Upload)
 *    ✅ Content (CRUD)
 *    ✅ Category (CRUD)
 *    ✅ Content Layout (CRUD + File Upload)
 *    ✅ Menu (CRUD)
 *    ✅ Menu Item (CRUD)
 *    ✅ Product Category (CRUD)
 *    ✅ Product (CRUD + File Upload)
 *    ✅ Product Info (CRUD)
 *    ✅ Gallery (CRUD + File Upload)
 *    ✅ Banner (CRUD)
 *    ✅ Banner Content (CRUD + File Upload)
 *    ✅ Social (CRUD)
 *    ✅ Career (CRUD)
 *    ✅ Job Application (CRUD + File Upload)
 *    ✅ Settings (Update, Get)
 *    ✅ User Info (Update, Get)
 *    ✅ Change Password
 * 
 * 3. Website APIs (Public):
 *    ✅ GET /banner/{banner_id}
 *    ✅ GET /products
 *    ✅ GET /product/{slug}
 *    ✅ GET /page/{slug}
 *    ✅ GET /system
 * 
 * 4. Testing Steps:
 *    - Test login with correct credentials
 *    - Test each admin module CRUD operations
 *    - Test file uploads (images, resumes, documents)
 *    - Test search and filtering
 *    - Test API error handling (401, 403, 404, 500)
 *    - Verify JWT token refresh mechanism
 * 
 * 5. Error Handling:
 *    - 401 Unauthorized: Redirect to login
 *    - 403 Forbidden: Show permission denied message
 *    - 404 Not Found: Show not found message
 *    - 422 Validation Error: Show validation messages
 *    - 500 Server Error: Show server error message
 * 
 * IMPORTANT: CONNECT TO REAL API
 * ==============================
 * When deploying to production, ensure:
 * - USE_MOCK_DATA = false in axiosInstance.js
 * - API_BASE_URL points to production server
 * - HTTPS is enabled on both frontend and backend
 * - CORS is configured correctly
 * - JWT tokens are validated on backend
 * - All endpoints return proper response formats
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
