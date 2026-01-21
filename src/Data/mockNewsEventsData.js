/**
 * MOCK NEWS & EVENTS DATA
 * =======================
 * Realistic mock data for News and Events
 * Matches the real API response shape
 * 
 * This data is used when VITE_USE_MOCK_NEWS is not set to 'false'
 * Or when the real API is unavailable (automatic fallback)
 */

// ============= NEWS =============
export const mockNews = [
  {
    id: 1,
    title: "Introducing React 19: Major Performance Improvements",
    slug: "react-19-major-improvements",
    category: "news",
    content: "React 19 is here with significant performance enhancements and new features. Learn about the latest improvements in server components, automatic batching, and the new useOptimistic hook.",
    excerpt: "React 19 brings major performance improvements and exciting new features for developers.",
    image: "https://via.placeholder.com/800x400?text=React+19",
    author: "Tech News Team",
    status: "published",
    featured: true,
    views: 1250,
    created_at: "2024-12-10T10:00:00Z",
    updated_at: "2024-12-10T10:00:00Z",
    published_at: "2024-12-10T10:00:00Z"
  },
  {
    id: 2,
    title: "Web Development Trends in 2025",
    slug: "web-dev-trends-2025",
    category: "news",
    content: "Explore the top web development trends expected in 2025 including AI integration, enhanced security protocols, and progressive web apps becoming the new standard.",
    excerpt: "What's trending in web development this year? We cover AI integration, security, and PWAs.",
    image: "https://via.placeholder.com/800x400?text=Web+Trends+2025",
    author: "Development Insights",
    status: "published",
    featured: true,
    views: 2100,
    created_at: "2024-12-08T14:30:00Z",
    updated_at: "2024-12-09T09:15:00Z",
    published_at: "2024-12-08T14:30:00Z"
  },
  {
    id: 3,
    title: "Chrome DevTools New Features",
    slug: "chrome-devtools-new-features",
    category: "news",
    content: "Google Chrome has released new DevTools features including enhanced performance profiling, better CSS debugging, and improved accessibility testing tools.",
    excerpt: "Chrome DevTools now includes enhanced performance profiling and accessibility testing.",
    image: "https://via.placeholder.com/800x400?text=Chrome+DevTools",
    author: "Browser Updates",
    status: "published",
    featured: false,
    views: 890,
    created_at: "2024-12-05T11:00:00Z",
    updated_at: "2024-12-05T11:00:00Z",
    published_at: "2024-12-05T11:00:00Z"
  },
  {
    id: 4,
    title: "AI Integration in Web Applications",
    slug: "ai-integration-web-apps",
    category: "news",
    content: "Artificial Intelligence is transforming web development. From chatbots to predictive analytics, learn how to integrate AI capabilities into your web applications.",
    excerpt: "Discover how to integrate AI and machine learning into modern web applications.",
    image: "https://via.placeholder.com/800x400?text=AI+Web+Apps",
    author: "AI Innovations",
    status: "published",
    featured: true,
    views: 3450,
    created_at: "2024-12-03T16:45:00Z",
    updated_at: "2024-12-03T16:45:00Z",
    published_at: "2024-12-03T16:45:00Z"
  },
  {
    id: 5,
    title: "Securing Your APIs: Best Practices",
    slug: "securing-apis-best-practices",
    category: "news",
    content: "API security is more important than ever. This comprehensive guide covers OAuth 2.0, JWT tokens, rate limiting, and other essential security measures for your APIs.",
    excerpt: "Learn essential API security practices including OAuth, JWT, and rate limiting.",
    image: "https://via.placeholder.com/800x400?text=API+Security",
    author: "Security Team",
    status: "published",
    featured: false,
    views: 1670,
    created_at: "2024-12-01T09:20:00Z",
    updated_at: "2024-12-01T09:20:00Z",
    published_at: "2024-12-01T09:20:00Z"
  },
  {
    id: 6,
    title: "Upcoming JavaScript ES2025 Features",
    slug: "javascript-es2025-features",
    category: "news",
    content: "Get a sneak peek at the exciting new JavaScript features coming in ES2025. Includes pattern matching, records and tuples, and improved async handling.",
    excerpt: "Explore the new JavaScript ES2025 features that will change how you write code.",
    image: "https://via.placeholder.com/800x400?text=ES2025+Features",
    author: "JavaScript Updates",
    status: "published",
    featured: false,
    views: 2340,
    created_at: "2024-11-28T13:00:00Z",
    updated_at: "2024-11-28T13:00:00Z",
    published_at: "2024-11-28T13:00:00Z"
  }
];

// ============= EVENTS =============
export const mockEvents = [
  {
    id: 1,
    title: "Web Development Summit 2024",
    slug: "web-dev-summit-2024",
    category: "event",
    description: "Annual summit bringing together web developers, designers, and tech leaders to discuss the latest trends and best practices in web development.",
    content: "Join us for the Web Development Summit 2024, featuring keynote speakers from leading tech companies, hands-on workshops, and networking opportunities.",
    image: "https://via.placeholder.com/800x400?text=Web+Dev+Summit",
    location: "San Francisco, CA",
    venue: "Moscone Center",
    start_date: "2025-03-15T09:00:00Z",
    end_date: "2025-03-17T17:00:00Z",
    registration_url: "https://example.com/webdevsummit",
    speaker_count: 45,
    attendee_limit: 2000,
    status: "upcoming",
    featured: true,
    created_at: "2024-12-01T10:00:00Z",
    updated_at: "2024-12-10T14:30:00Z"
  },
  {
    id: 2,
    title: "React Advanced Patterns Workshop",
    slug: "react-advanced-patterns-workshop",
    category: "event",
    description: "Interactive workshop covering advanced React patterns, hooks optimization, and performance best practices.",
    content: "Learn advanced React patterns and optimization techniques from industry experts. This hands-on workshop covers hooks, context API, and performance optimization.",
    image: "https://via.placeholder.com/800x400?text=React+Workshop",
    location: "New York, NY",
    venue: "TechHub Manhattan",
    start_date: "2025-02-20T10:00:00Z",
    end_date: "2025-02-20T16:00:00Z",
    registration_url: "https://example.com/react-workshop",
    speaker_count: 5,
    attendee_limit: 150,
    status: "upcoming",
    featured: true,
    created_at: "2024-11-15T12:00:00Z",
    updated_at: "2024-12-08T10:00:00Z"
  },
  {
    id: 3,
    title: "AI & Machine Learning in Web Development",
    slug: "ai-ml-webdev-conference",
    category: "event",
    description: "Conference exploring the intersection of AI, machine learning, and modern web development technologies.",
    content: "Discover how to leverage AI and ML in your web applications. Features talks on neural networks, natural language processing, and computer vision on the web.",
    image: "https://via.placeholder.com/800x400?text=AI+ML+Conference",
    location: "Boston, MA",
    venue: "Boston Convention Center",
    start_date: "2025-04-10T08:30:00Z",
    end_date: "2025-04-12T18:00:00Z",
    registration_url: "https://example.com/ai-ml-conf",
    speaker_count: 60,
    attendee_limit: 3000,
    status: "upcoming",
    featured: false,
    created_at: "2024-10-20T09:00:00Z",
    updated_at: "2024-12-09T15:00:00Z"
  },
  {
    id: 4,
    title: "Frontend Performance Optimization Meetup",
    slug: "frontend-perf-optimization-meetup",
    category: "event",
    description: "Local meetup focused on frontend performance techniques and real-world optimization case studies.",
    content: "Join local developers to discuss frontend performance optimization, profiling tools, and case studies from real production applications.",
    image: "https://via.placeholder.com/800x400?text=Performance+Meetup",
    location: "Seattle, WA",
    venue: "Amazon Headquarters Community Space",
    start_date: "2025-02-05T18:00:00Z",
    end_date: "2025-02-05T20:00:00Z",
    registration_url: "https://example.com/perf-meetup",
    speaker_count: 3,
    attendee_limit: 200,
    status: "upcoming",
    featured: false,
    created_at: "2024-12-01T14:00:00Z",
    updated_at: "2024-12-05T11:00:00Z"
  },
  {
    id: 5,
    title: "TypeScript Mastery Course",
    slug: "typescript-mastery-course",
    category: "event",
    description: "Comprehensive online course covering TypeScript fundamentals to advanced patterns and best practices.",
    content: "Master TypeScript with this intensive online course. Learn types, generics, decorators, and how to build scalable applications with TypeScript.",
    image: "https://via.placeholder.com/800x400?text=TypeScript+Course",
    location: "Online",
    venue: "Online Platform",
    start_date: "2025-01-20T10:00:00Z",
    end_date: "2025-02-28T17:00:00Z",
    registration_url: "https://example.com/typescript-course",
    speaker_count: 2,
    attendee_limit: 500,
    status: "upcoming",
    featured: true,
    created_at: "2024-11-01T08:00:00Z",
    updated_at: "2024-12-10T09:00:00Z"
  },
  {
    id: 6,
    title: "Web Security Bootcamp",
    slug: "web-security-bootcamp",
    category: "event",
    description: "Intensive bootcamp covering web security vulnerabilities, attack vectors, and defense mechanisms.",
    content: "Learn to build secure web applications. This bootcamp covers OWASP top 10, secure coding practices, penetration testing, and security audits.",
    image: "https://via.placeholder.com/800x400?text=Security+Bootcamp",
    location: "Austin, TX",
    venue: "Tech Academy Austin",
    start_date: "2025-03-01T09:00:00Z",
    end_date: "2025-03-14T17:00:00Z",
    registration_url: "https://example.com/security-bootcamp",
    speaker_count: 8,
    attendee_limit: 100,
    status: "upcoming",
    featured: false,
    created_at: "2024-10-15T10:00:00Z",
    updated_at: "2024-12-08T16:00:00Z"
  }
];

/**
 * Helper function to get news by slug
 */
export const getNewsBySlug = (slug) => {
  return mockNews.find(item => item.slug === slug);
};

/**
 * Helper function to get event by slug
 */
export const getEventBySlug = (slug) => {
  return mockEvents.find(item => item.slug === slug);
};

/**
 * Helper function to get featured news/events
 */
export const getFeaturedItems = () => {
  const featured = [
    ...mockNews.filter(item => item.featured),
    ...mockEvents.filter(item => item.featured)
  ];
  return featured.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

/**
 * Helper function to get upcoming events only
 */
export const getUpcomingEvents = () => {
  return mockEvents
    .filter(item => item.status === "upcoming")
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
};

/**
 * Helper function to format date
 */
export const formatEventDate = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const startStr = start.toLocaleDateString('en-US', options);
  const endStr = end.toLocaleDateString('en-US', options);
  
  if (startStr === endStr) {
    return startStr;
  }
  return `${startStr} - ${endStr}`;
};
