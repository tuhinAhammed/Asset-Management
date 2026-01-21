import axios from 'axios';
import mockAPIService from './mockAPIService';

/**
 * API CONFIGURATION
 * =================
 * 
 * SWITCHING BETWEEN MOCK AND REAL API:
 * 1. Set USE_MOCK_DATA to true for development/demo (default)
 * 2. Set USE_MOCK_DATA to false to use real API backend
 * 3. Update API_BASE_URL if your backend is on different server
 * 
 * Current Status: USE_MOCK_DATA = true (Using mock/demo data)
 * 
 * TO CONNECT TO REAL API:
 * - Change USE_MOCK_DATA to false
 * - Ensure API_BASE_URL points to your backend server
 * - Verify your backend implements all endpoints in src/Api/endpoints.js
 * - Test login with real credentials (email: admin@example.com, password: 12345678 - or your real credentials)
 */

// ===== IMPORTANT: Toggle between mock and real API =====
export const USE_MOCK_DATA = false;  // Set to true to use mock data

const API_BASE_URL = 'https://asset-api.shelaigor.com/api';
// Alternative: const API_BASE_URL = 'http://localhost:8000/api'; // For local backend

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Disabled due to CORS policy - using JWT token instead
});

// Add request interceptor to inject auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to get mock data based on URL and method
const getMockResponse = async (url, method, data) => {
  method = method.toUpperCase();
  
  // PRODUCTS
  if (url.includes('/admin/product/list') || url.includes('/product/list')) {
    if (method === 'GET') return mockAPIService.getProducts();
  } else if (url.includes('/admin/product/single')) {
    if (method === 'GET') {
      const id = url.split('/').pop();
      return mockAPIService.getProductById(id);
    }
  } else if (url.includes('/admin/product/create') || url.includes('/product/create')) {
    if (method === 'POST') return mockAPIService.createProduct(data);
  } else if (url.includes('/admin/product/update')) {
    if (method === 'PUT') {
      const id = url.split('/')[url.split('/').length - 2];
      return mockAPIService.updateProduct(id, data);
    }
  } else if (url.includes('/admin/product/delete')) {
    if (method === 'DELETE') {
      const id = url.split('/').pop();
      return mockAPIService.deleteProduct(id);
    }
  }

  // CATEGORIES
  else if (url.includes('/admin/category/list') || url.includes('/category/list')) {
    if (method === 'GET') return mockAPIService.getCategories();
  } else if (url.includes('/admin/category/single')) {
    if (method === 'GET') {
      const id = url.split('/').pop();
      return mockAPIService.getCategoryById(id);
    }
  } else if (url.includes('/admin/category/create') || url.includes('/category/create')) {
    if (method === 'POST') return mockAPIService.createCategory(data);
  } else if (url.includes('/admin/category/update')) {
    if (method === 'PUT') {
      const id = url.split('/')[url.split('/').length - 2];
      return mockAPIService.updateCategory(id, data);
    }
  } else if (url.includes('/admin/category/delete')) {
    if (method === 'DELETE') {
      const id = url.split('/').pop();
      return mockAPIService.deleteCategory(id);
    }
  }

  // PAGES
  else if (url.includes('/admin/page/list') || url.includes('/page/list')) {
    if (method === 'GET') return mockAPIService.getPages();
  } else if (url.includes('/admin/page/single')) {
    if (method === 'GET') {
      const id = url.split('/').pop();
      return mockAPIService.getPageById(id);
    }
  } else if (url.includes('/admin/page/create') || url.includes('/page/create')) {
    if (method === 'POST') return mockAPIService.createPage(data);
  } else if (url.includes('/admin/page/update')) {
    if (method === 'PUT') {
      const id = url.split('/')[url.split('/').length - 2];
      return mockAPIService.updatePage(id, data);
    }
  } else if (url.includes('/admin/page/delete')) {
    if (method === 'DELETE') {
      const id = url.split('/').pop();
      return mockAPIService.deletePage(id);
    }
  }

  // COMPONENTS
  else if (url.includes('/admin/component/list') || url.includes('/component/list')) {
    if (method === 'GET') return mockAPIService.getComponents();
  } else if (url.includes('/admin/component/single')) {
    if (method === 'GET') {
      const id = url.split('/').pop();
      return mockAPIService.getComponentById(id);
    }
  } else if (url.includes('/admin/component/create') || url.includes('/component/create')) {
    if (method === 'POST') return mockAPIService.createComponent(data);
  } else if (url.includes('/admin/component/update')) {
    if (method === 'PUT') {
      const id = url.split('/')[url.split('/').length - 2];
      return mockAPIService.updateComponent(id, data);
    }
  } else if (url.includes('/admin/component/delete')) {
    if (method === 'DELETE') {
      const id = url.split('/').pop();
      return mockAPIService.deleteComponent(id);
    }
  }

  // CONTENT
  else if (url.includes('/admin/content/list') || url.includes('/content/list')) {
    if (method === 'GET') return mockAPIService.getContent();
  } else if (url.includes('/admin/content/single')) {
    if (method === 'GET') {
      const id = url.split('/').pop();
      return mockAPIService.getContentById(id);
    }
  } else if (url.includes('/admin/content/create') || url.includes('/content/create')) {
    if (method === 'POST') return mockAPIService.createContent(data);
  } else if (url.includes('/admin/content/update')) {
    if (method === 'PUT') {
      const id = url.split('/')[url.split('/').length - 2];
      return mockAPIService.updateContent(id, data);
    }
  } else if (url.includes('/admin/content/delete')) {
    if (method === 'DELETE') {
      const id = url.split('/').pop();
      return mockAPIService.deleteContent(id);
    }
  }

  // MENUS
  else if (url.includes('/admin/menu/list') || url.includes('/menu/list')) {
    if (method === 'GET') return mockAPIService.getMenus();
  } else if (url.includes('/admin/menu/single')) {
    if (method === 'GET') {
      const id = url.split('/').pop();
      return mockAPIService.getMenuById(id);
    }
  } else if (url.includes('/admin/menu/create') || url.includes('/menu/create')) {
    if (method === 'POST') return mockAPIService.createMenu(data);
  } else if (url.includes('/admin/menu/update')) {
    if (method === 'PUT') {
      const id = url.split('/')[url.split('/').length - 2];
      return mockAPIService.updateMenu(id, data);
    }
  } else if (url.includes('/admin/menu/delete')) {
    if (method === 'DELETE') {
      const id = url.split('/').pop();
      return mockAPIService.deleteMenu(id);
    }
  }

  // BANNERS
  else if (url.includes('/admin/banner/list') || url.includes('/banner/list')) {
    if (method === 'GET') return mockAPIService.getBanners();
  } else if (url.includes('/admin/banner/single')) {
    if (method === 'GET') {
      const id = url.split('/').pop();
      return mockAPIService.getBannerById(id);
    }
  } else if (url.includes('/admin/banner/create') || url.includes('/banner/create')) {
    if (method === 'POST') return mockAPIService.createBanner(data);
  } else if (url.includes('/admin/banner/update')) {
    if (method === 'PUT') {
      const id = url.split('/')[url.split('/').length - 2];
      return mockAPIService.updateBanner(id, data);
    }
  } else if (url.includes('/admin/banner/delete')) {
    if (method === 'DELETE') {
      const id = url.split('/').pop();
      return mockAPIService.deleteBanner(id);
    }
  }

  // CAREERS
  else if (url.includes('/admin/career/list') || url.includes('/career/list')) {
    if (method === 'GET') return mockAPIService.getCareers();
  } else if (url.includes('/admin/career/single')) {
    if (method === 'GET') {
      const id = url.split('/').pop();
      return mockAPIService.getCareerById(id);
    }
  } else if (url.includes('/admin/career/create') || url.includes('/career/create')) {
    if (method === 'POST') return mockAPIService.createCareer(data);
  } else if (url.includes('/admin/career/update')) {
    if (method === 'PUT') {
      const id = url.split('/')[url.split('/').length - 2];
      return mockAPIService.updateCareer(id, data);
    }
  } else if (url.includes('/admin/career/delete')) {
    if (method === 'DELETE') {
      const id = url.split('/').pop();
      return mockAPIService.deleteCareer(id);
    }
  }

  // PROFILE
  else if (url.includes('/user') && !url.includes('change-password')) {
    if (method === 'GET') return mockAPIService.getProfile();
  }

  // SETTINGS
  else if (url.includes('/settings')) {
    if (method === 'GET') return mockAPIService.getSettings();
  }

  // If no mock found, return null to let real request go through
  return null;
};

// Request interceptor to add auth token and handle mock data
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // If using mock data, try to get mock response
    if (USE_MOCK_DATA) {
      const mockResponse = await getMockResponse(config.url, config.method, config.data);
      if (mockResponse) {
        // Return a resolved promise with the mock data as response
        config.mockResponse = mockResponse;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle mock data and errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // If this was a mock request with mock response ready, return it instead of error
    if (error.config && error.config.mockResponse) {
      return Promise.resolve(error.config.mockResponse);
    }

    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Override request method to return mock data without making actual HTTP request
const originalRequest = axiosInstance.request;
axiosInstance.request = async function(config) {
  if (USE_MOCK_DATA && config.mockResponse) {
    return config.mockResponse;
  }
  return originalRequest.call(this, config);
};

// Also override get, post, put, delete methods
const methods = ['get', 'post', 'put', 'delete', 'patch'];
methods.forEach(method => {
  const originalMethod = axiosInstance[method];
  axiosInstance[method] = function(...args) {
    // Get the config (could be at different positions depending on method)
    const config = (typeof args[args.length - 1] === 'object' && !Array.isArray(args[args.length - 1])) 
      ? args[args.length - 1] 
      : {};
    
    // For mock data, return promise directly
    if (USE_MOCK_DATA) {
      const url = args[0] || '';
      const data = (method === 'get' || method === 'delete') ? undefined : args[1];
      return getMockResponse(url, method, data);
    }
    
    return originalMethod.apply(this, args);
  };
});

export default axiosInstance;
