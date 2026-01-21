/**
 * NEWS & EVENTS SERVICE
 * ====================
 * Single data access layer for News & Events
 * Supports both mock data (development) and real API (production)
 * 
 * ENVIRONMENT VARIABLE CONTROL:
 * - VITE_USE_MOCK_NEWS: Set to 'false' to use real API
 * - VITE_API_BASE_URL: Backend API base URL (default: https://asset-api.shelaigor.com/api)
 * 
 * COMPONENTS DO NOT KNOW THE DATA SOURCE
 * They simply call these methods and receive data in the same format
 */

import axios from 'axios';
import {
  mockNews,
  mockEvents,
  getNewsBySlug,
  getEventBySlug,
  getFeaturedItems,
  getUpcomingEvents,
  formatEventDate
} from '../Data/mockNewsEventsData';

/**
 * Configuration
 */
const USE_MOCK_NEWS = import.meta.env.VITE_USE_MOCK_NEWS !== 'false';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://asset-api.shelaigor.com/api';

/**
 * Simulate API delay for mock data (for realistic feel)
 */
const MOCK_DELAY = 300;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * NEWS & EVENTS SERVICE
 * Provides consistent interface regardless of data source
 */
export const newsEventsService = {
  /**
   * GET ALL NEWS
   * @returns {Promise} { data: news[], total: number }
   */
  getAllNews: async () => {
    try {
      if (USE_MOCK_NEWS) {
        console.log('📰 Fetching news from MOCK data');
        await delay(MOCK_DELAY);
        return {
          success: true,
          data: mockNews,
          total: mockNews.length
        };
      }

      // Real API call
      console.log('📰 Fetching news from API:', `${API_BASE_URL}/news`);
      const response = await axios.get(`${API_BASE_URL}/news`);
      return {
        success: true,
        data: response.data.data || response.data,
        total: response.data.total || response.data.length
      };
    } catch (error) {
      console.error('Error fetching news:', error.message);
      // Fallback to mock data on API error
      console.log('⚠️ Falling back to MOCK data due to API error');
      await delay(MOCK_DELAY);
      return {
        success: true,
        data: mockNews,
        total: mockNews.length,
        fallback: true
      };
    }
  },

  /**
   * GET SINGLE NEWS BY SLUG
   * @param {string} slug - News slug
   * @returns {Promise} { data: newsItem }
   */
  getNewsBySlug: async (slug) => {
    try {
      if (USE_MOCK_NEWS) {
        await delay(MOCK_DELAY);
        const item = getNewsBySlug(slug);
        return {
          success: !!item,
          data: item || null
        };
      }

      // Real API call
      const response = await axios.get(`${API_BASE_URL}/news/${slug}`);
      return {
        success: true,
        data: response.data.data || response.data
      };
    } catch (error) {
      console.error(`Error fetching news by slug ${slug}:`, error.message);
      await delay(MOCK_DELAY);
      const item = getNewsBySlug(slug);
      return {
        success: !!item,
        data: item || null,
        fallback: true
      };
    }
  },

  /**
   * GET ALL EVENTS
   * @returns {Promise} { data: events[], total: number }
   */
  getAllEvents: async () => {
    try {
      if (USE_MOCK_NEWS) {
        console.log('📅 Fetching events from MOCK data');
        await delay(MOCK_DELAY);
        return {
          success: true,
          data: mockEvents,
          total: mockEvents.length
        };
      }

      // Real API call
      console.log('📅 Fetching events from API:', `${API_BASE_URL}/events`);
      const response = await axios.get(`${API_BASE_URL}/events`);
      return {
        success: true,
        data: response.data.data || response.data,
        total: response.data.total || response.data.length
      };
    } catch (error) {
      console.error('Error fetching events:', error.message);
      console.log('⚠️ Falling back to MOCK data due to API error');
      await delay(MOCK_DELAY);
      return {
        success: true,
        data: mockEvents,
        total: mockEvents.length,
        fallback: true
      };
    }
  },

  /**
   * GET SINGLE EVENT BY SLUG
   * @param {string} slug - Event slug
   * @returns {Promise} { data: eventItem }
   */
  getEventBySlug: async (slug) => {
    try {
      if (USE_MOCK_NEWS) {
        await delay(MOCK_DELAY);
        const item = getEventBySlug(slug);
        return {
          success: !!item,
          data: item || null
        };
      }

      // Real API call
      const response = await axios.get(`${API_BASE_URL}/events/${slug}`);
      return {
        success: true,
        data: response.data.data || response.data
      };
    } catch (error) {
      console.error(`Error fetching event by slug ${slug}:`, error.message);
      await delay(MOCK_DELAY);
      const item = getEventBySlug(slug);
      return {
        success: !!item,
        data: item || null,
        fallback: true
      };
    }
  },

  /**
   * GET FEATURED NEWS & EVENTS
   * @returns {Promise} { data: featuredItems[], total: number }
   */
  getFeaturedItems: async () => {
    try {
      if (USE_MOCK_NEWS) {
        await delay(MOCK_DELAY);
        const featured = getFeaturedItems();
        return {
          success: true,
          data: featured,
          total: featured.length
        };
      }

      // Real API call
      const response = await axios.get(`${API_BASE_URL}/news-events/featured`);
      return {
        success: true,
        data: response.data.data || response.data,
        total: response.data.total || response.data.length
      };
    } catch (error) {
      console.error('Error fetching featured items:', error.message);
      await delay(MOCK_DELAY);
      const featured = getFeaturedItems();
      return {
        success: true,
        data: featured,
        total: featured.length,
        fallback: true
      };
    }
  },

  /**
   * GET UPCOMING EVENTS
   * @returns {Promise} { data: upcomingEvents[], total: number }
   */
  getUpcomingEvents: async () => {
    try {
      if (USE_MOCK_NEWS) {
        await delay(MOCK_DELAY);
        const upcoming = getUpcomingEvents();
        return {
          success: true,
          data: upcoming,
          total: upcoming.length
        };
      }

      // Real API call
      const response = await axios.get(`${API_BASE_URL}/events/upcoming`);
      return {
        success: true,
        data: response.data.data || response.data,
        total: response.data.total || response.data.length
      };
    } catch (error) {
      console.error('Error fetching upcoming events:', error.message);
      await delay(MOCK_DELAY);
      const upcoming = getUpcomingEvents();
      return {
        success: true,
        data: upcoming,
        total: upcoming.length,
        fallback: true
      };
    }
  },

  /**
   * GET COMBINED NEWS & EVENTS (LATEST)
   * @param {number} limit - Number of items to return
   * @returns {Promise} { data: combinedItems[], total: number }
   */
  getCombinedLatest: async (limit = 10) => {
    try {
      const [newsRes, eventsRes] = await Promise.all([
        newsEventsService.getAllNews(),
        newsEventsService.getAllEvents()
      ]);

      const combined = [
        ...newsRes.data,
        ...eventsRes.data
      ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      return {
        success: true,
        data: combined.slice(0, limit),
        total: combined.length
      };
    } catch (error) {
      console.error('Error fetching combined latest:', error.message);
      return {
        success: false,
        data: [],
        error: error.message
      };
    }
  },

  /**
   * GET CURRENT DATA SOURCE STATUS
   * Useful for debugging and testing
   */
  getStatus: () => ({
    using_mock_data: USE_MOCK_NEWS,
    api_base_url: API_BASE_URL,
    data_source: USE_MOCK_NEWS ? 'MOCK (Development)' : 'Real API (Production)',
    news_count: mockNews.length,
    events_count: mockEvents.length
  })
};

// Export helper functions for direct use if needed
export {
  getNewsBySlug,
  getEventBySlug,
  getFeaturedItems,
  getUpcomingEvents,
  formatEventDate,
  mockNews,
  mockEvents
};
