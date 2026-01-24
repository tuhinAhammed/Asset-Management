/**
 * MOCK API SERVICE
 * ================
 * This service provides mock/demo data responses for development and testing.
 * 
 * USAGE:
 * - This is used by default for demonstration purposes
 * - All data is stored in memory and resets on page refresh
 * 
 * TO SWITCH TO REAL API:
 * 1. In src/Api/axiosInstance.js, change USE_MOCK_DATA to false
 * 2. Ensure your backend is running at the correct base URL
 * 3. Run the application and test all features
 */

import * as mockData from '../Data/mockData';

// Simulate API response delay (in milliseconds)
const DELAY = 300;

// Helper function to simulate async API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock response wrapper
const mockResponse = (data, status = 200, message = "Success") => ({
  data,
  status,
  message,
  success: status === 200
});

// ============= MOCK API SERVICE =============
export const mockAPIService = {
  // ===== PRODUCTS =====
  getProducts: async () => {
    await delay(DELAY);
    return mockResponse({ data: mockData.mockProducts });
  },

  getProductById: async (id) => {
    await delay(DELAY);
    const product = mockData.mockProducts.find(p => p.id === parseInt(id));
    return mockResponse(product || {}, product ? 200 : 404);
  },

  createProduct: async (data) => {
    await delay(DELAY);
    const newProduct = { id: Math.max(...mockData.mockProducts.map(p => p.id)) + 1, ...data, created_at: new Date().toISOString() };
    mockData.mockProducts.push(newProduct);
    return mockResponse(newProduct, 201, "Product created successfully");
  },

  updateProduct: async (id, data) => {
    await delay(DELAY);
    const index = mockData.mockProducts.findIndex(p => p.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Product not found");
    mockData.mockProducts[index] = { ...mockData.mockProducts[index], ...data };
    return mockResponse(mockData.mockProducts[index], 200, "Product updated successfully");
  },

  deleteProduct: async (id) => {
    await delay(DELAY);
    const index = mockData.mockProducts.findIndex(p => p.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Product not found");
    mockData.mockProducts.splice(index, 1);
    return mockResponse({}, 200, "Product deleted successfully");
  },

  // ===== CATEGORIES =====
  getCategories: async () => {
    await delay(DELAY);
    return mockResponse({ data: mockData.mockCategories });
  },

  getCategoryById: async (id) => {
    await delay(DELAY);
    const category = mockData.mockCategories.find(c => c.id === parseInt(id));
    return mockResponse(category || {}, category ? 200 : 404);
  },

  createCategory: async (data) => {
    await delay(DELAY);
    const newCategory = { id: Math.max(...mockData.mockCategories.map(c => c.id), 0) + 1, ...data };
    mockData.mockCategories.push(newCategory);
    return mockResponse(newCategory, 201, "Category created successfully");
  },

  updateCategory: async (id, data) => {
    await delay(DELAY);
    const index = mockData.mockCategories.findIndex(c => c.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Category not found");
    mockData.mockCategories[index] = { ...mockData.mockCategories[index], ...data };
    return mockResponse(mockData.mockCategories[index], 200, "Category updated successfully");
  },

  deleteCategory: async (id) => {
    await delay(DELAY);
    const index = mockData.mockCategories.findIndex(c => c.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Category not found");
    mockData.mockCategories.splice(index, 1);
    return mockResponse({}, 200, "Category deleted successfully");
  },

  // ===== PAGES =====
  getPages: async () => {
    await delay(DELAY);
    return mockResponse({ data: mockData.mockPages });
  },

  getPageById: async (id) => {
    await delay(DELAY);
    const page = mockData.mockPages.find(p => p.id === parseInt(id));
    return mockResponse(page || {}, page ? 200 : 404);
  },

  createPage: async (data) => {
    await delay(DELAY);
    const newPage = { id: Math.max(...mockData.mockPages.map(p => p.id), 0) + 1, ...data };
    mockData.mockPages.push(newPage);
    return mockResponse(newPage, 201, "Page created successfully");
  },

  updatePage: async (id, data) => {
    await delay(DELAY);
    const index = mockData.mockPages.findIndex(p => p.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Page not found");
    mockData.mockPages[index] = { ...mockData.mockPages[index], ...data };
    return mockResponse(mockData.mockPages[index], 200, "Page updated successfully");
  },

  deletePage: async (id) => {
    await delay(DELAY);
    const index = mockData.mockPages.findIndex(p => p.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Page not found");
    mockData.mockPages.splice(index, 1);
    return mockResponse({}, 200, "Page deleted successfully");
  },

  // ===== COMPONENTS =====
  getComponents: async () => {
    await delay(DELAY);
    return mockResponse({ data: mockData.mockComponents });
  },

  getComponentById: async (id) => {
    await delay(DELAY);
    const component = mockData.mockComponents.find(c => c.id === parseInt(id));
    return mockResponse(component || {}, component ? 200 : 404);
  },

  createComponent: async (data) => {
    await delay(DELAY);
    const newComponent = { id: Math.max(...mockData.mockComponents.map(c => c.id), 0) + 1, ...data };
    mockData.mockComponents.push(newComponent);
    return mockResponse(newComponent, 201, "Component created successfully");
  },

  updateComponent: async (id, data) => {
    await delay(DELAY);
    const index = mockData.mockComponents.findIndex(c => c.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Component not found");
    mockData.mockComponents[index] = { ...mockData.mockComponents[index], ...data };
    return mockResponse(mockData.mockComponents[index], 200, "Component updated successfully");
  },

  deleteComponent: async (id) => {
    await delay(DELAY);
    const index = mockData.mockComponents.findIndex(c => c.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Component not found");
    mockData.mockComponents.splice(index, 1);
    return mockResponse({}, 200, "Component deleted successfully");
  },

  // ===== CONTENT =====
  getContent: async () => {
    await delay(DELAY);
    return mockResponse({ data: mockData.mockContent });
  },

  getContentById: async (id) => {
    await delay(DELAY);
    const content = mockData.mockContent.find(c => c.id === parseInt(id));
    return mockResponse(content || {}, content ? 200 : 404);
  },

  createContent: async (data) => {
    await delay(DELAY);
    const newContent = { id: Math.max(...mockData.mockContent.map(c => c.id), 0) + 1, ...data };
    mockData.mockContent.push(newContent);
    return mockResponse(newContent, 201, "Content created successfully");
  },

  updateContent: async (id, data) => {
    await delay(DELAY);
    const index = mockData.mockContent.findIndex(c => c.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Content not found");
    mockData.mockContent[index] = { ...mockData.mockContent[index], ...data };
    return mockResponse(mockData.mockContent[index], 200, "Content updated successfully");
  },

  deleteContent: async (id) => {
    await delay(DELAY);
    const index = mockData.mockContent.findIndex(c => c.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Content not found");
    mockData.mockContent.splice(index, 1);
    return mockResponse({}, 200, "Content deleted successfully");
  },

  // ===== MENUS =====
  getMenus: async () => {
    await delay(DELAY);
    return mockResponse({ data: mockData.mockMenus });
  },

  getMenuById: async (id) => {
    await delay(DELAY);
    const menu = mockData.mockMenus.find(m => m.id === parseInt(id));
    return mockResponse(menu || {}, menu ? 200 : 404);
  },

  createMenu: async (data) => {
    await delay(DELAY);
    const newMenu = { id: Math.max(...mockData.mockMenus.map(m => m.id), 0) + 1, ...data };
    mockData.mockMenus.push(newMenu);
    return mockResponse(newMenu, 201, "Menu created successfully");
  },

  updateMenu: async (id, data) => {
    await delay(DELAY);
    const index = mockData.mockMenus.findIndex(m => m.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Menu not found");
    mockData.mockMenus[index] = { ...mockData.mockMenus[index], ...data };
    return mockResponse(mockData.mockMenus[index], 200, "Menu updated successfully");
  },

  deleteMenu: async (id) => {
    await delay(DELAY);
    const index = mockData.mockMenus.findIndex(m => m.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Menu not found");
    mockData.mockMenus.splice(index, 1);
    return mockResponse({}, 200, "Menu deleted successfully");
  },

  // ===== BANNERS =====
  getBanners: async () => {
    await delay(DELAY);
    return mockResponse({ data: mockData.mockBanners });
  },

  getBannerById: async (id) => {
    await delay(DELAY);
    const banner = mockData.mockBanners.find(b => b.id === parseInt(id));
    return mockResponse(banner || {}, banner ? 200 : 404);
  },

  createBanner: async (data) => {
    await delay(DELAY);
    const newBanner = { 
      id: Math.max(...mockData.mockBanners.map(b => b.id), 0) + 1, 
      ...data,
      created_at: new Date().toISOString() 
    };
    mockData.mockBanners.push(newBanner);
    return mockResponse(newBanner, 201, "Banner created successfully");
  },

  updateBanner: async (id, data) => {
    await delay(DELAY);
    const index = mockData.mockBanners.findIndex(b => b.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Banner not found");
    mockData.mockBanners[index] = { ...mockData.mockBanners[index], ...data };
    return mockResponse(mockData.mockBanners[index], 200, "Banner updated successfully");
  },

  deleteBanner: async (id) => {
    await delay(DELAY);
    const index = mockData.mockBanners.findIndex(b => b.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Banner not found");
    mockData.mockBanners.splice(index, 1);
    return mockResponse({}, 200, "Banner deleted successfully");
  },

  // ===== CAREERS =====
  getCareers: async () => {
    await delay(DELAY);
    return mockResponse({ data: mockData.mockCareers });
  },

  createCareer: async (data) => {
    await delay(DELAY);
    const newCareer = { 
      id: Math.max(...mockData.mockCareers.map(c => c.id), 0) + 1, 
      ...data,
      created_at: new Date().toISOString() 
    };
    mockData.mockCareers.push(newCareer);
    return mockResponse(newCareer, 201, "Career created successfully");
  },

  updateCareer: async (id, data) => {
    await delay(DELAY);
    const index = mockData.mockCareers.findIndex(c => c.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Career not found");
    mockData.mockCareers[index] = { ...mockData.mockCareers[index], ...data };
    return mockResponse(mockData.mockCareers[index], 200, "Career updated successfully");
  },

  deleteCareer: async (id) => {
    await delay(DELAY);
    const index = mockData.mockCareers.findIndex(c => c.id === parseInt(id));
    if (index === -1) return mockResponse({}, 404, "Career not found");
    mockData.mockCareers.splice(index, 1);
    return mockResponse({}, 200, "Career deleted successfully");
  },

  // ===== FAQS =====
  getFaqs: async () => {
    await delay(DELAY);
    return mockResponse({ data: mockData.mockFaqs });
  },

  // ===== BLOGS =====
  getBlogs: async () => {
    await delay(DELAY);
    return mockResponse({ data: mockData.mockBlogs });
  },

  // ===== SERVICES =====
  getServices: async () => {
    await delay(DELAY);
    return mockResponse({ data: mockData.mockServices });
  },

  // ===== TESTIMONIALS =====
  getTestimonials: async () => {
    await delay(DELAY);
    return mockResponse({ data: mockData.mockTestimonials });
  },

  // ===== SETTINGS =====
  getSettings: async () => {
    await delay(DELAY);
    return mockData.mockSettings;
  },

  // ===== PROFILE =====
  getProfile: async () => {
    await delay(DELAY);
    return mockResponse(mockData.mockProfile);
  },

  // ===== AUTH =====
  login: async (credentials) => {
    await delay(DELAY);
    // Accept both 'password' (lowercase) and 'Password' (capitalized) for compatibility
    const pwd = credentials.password || credentials.Password;
    if (credentials.email === "admin@example.com" && pwd === "12345678") {
      // Return properly wrapped response
      return {
        success: true,
        message: "Login successful",
        token: mockData.mockAuthResponse.token,
        user: mockData.mockAuthResponse.user
      };
    }
    return mockResponse({}, 400, "Provided Credentials are Incorrect");
  },

  logout: async () => {
    await delay(DELAY);
    return mockResponse({}, 200, "Logged out successfully");
  },
};

export default mockAPIService;
