/**
 * MOCK DATA FOR DEMONSTRATION
 * ============================
 * This file contains mock/demo data for all API endpoints.
 * 
 * All data is stored in memory and will reset on page refresh.
 * This is useful for:
 * - Frontend development without a backend
 * - Testing UI/UX without API dependencies
 * - Demo and presentation purposes
 * - Learning and understanding data structures
 */

// ============= PRODUCTS =============
export const mockProducts = [
  { id: 1, name: "Web Design Service", description: "Professional web design and development services", price: 5000, quantity: 10, status: "active", image: "https://via.placeholder.com/300x200?text=Web+Design", created_at: "2024-01-10", updated_at: "2024-01-20" },
  { id: 2, name: "Mobile App Development", description: "Custom iOS and Android app development", price: 15000, quantity: 5, status: "active", image: "https://via.placeholder.com/300x200?text=Mobile+App", created_at: "2024-01-15", updated_at: "2024-01-20" },
  { id: 3, name: "SEO Optimization", description: "Complete SEO strategy and implementation", price: 3000, quantity: 20, status: "active", image: "https://via.placeholder.com/300x200?text=SEO", created_at: "2024-01-20", updated_at: "2024-01-20" },
  { id: 4, name: "UI/UX Design Package", description: "Complete user interface and experience design", price: 4500, quantity: 15, status: "active", image: "https://via.placeholder.com/300x200?text=UI+Design", created_at: "2024-01-12", updated_at: "2024-01-20" },
  { id: 5, name: "Cloud Infrastructure Setup", description: "AWS/Azure cloud deployment and management", price: 8000, quantity: 8, status: "active", image: "https://via.placeholder.com/300x200?text=Cloud", created_at: "2024-01-14", updated_at: "2024-01-20" },
  { id: 6, name: "Content Management System", description: "Custom CMS development with WordPress/Headless", price: 6500, quantity: 12, status: "active", image: "https://via.placeholder.com/300x200?text=CMS", created_at: "2024-01-18", updated_at: "2024-01-20" },
  { id: 7, name: "E-Commerce Solution", description: "Full e-commerce platform with payment integration", price: 12000, quantity: 7, status: "active", image: "https://via.placeholder.com/300x200?text=E-Commerce", created_at: "2024-01-19", updated_at: "2024-01-20" },
  { id: 8, name: "API Development", description: "RESTful and GraphQL API development services", price: 7000, quantity: 10, status: "inactive", image: "https://via.placeholder.com/300x200?text=API", created_at: "2024-01-08", updated_at: "2024-01-20" },
];

// ============= CATEGORIES =============
export const mockCategories = [
  { id: 1, name: "Web Development", description: "Web design and development services", status: "active", created_at: "2024-01-01" },
  { id: 2, name: "Mobile Development", description: "iOS and Android app development", status: "active", created_at: "2024-01-02" },
  { id: 3, name: "Digital Marketing", description: "SEO, SEM, and content marketing", status: "active", created_at: "2024-01-03" },
  { id: 4, name: "Cloud Services", description: "Cloud infrastructure and deployment", status: "active", created_at: "2024-01-04" },
  { id: 5, name: "Design Services", description: "UI/UX and graphic design", status: "active", created_at: "2024-01-05" },
  { id: 6, name: "Consulting", description: "Business and technology consulting", status: "active", created_at: "2024-01-06" },
];

// ============= PAGES =============
export const mockPages = [
  { id: 1, title: "Home", slug: "home", content: "Welcome to our website", status: "published", created_at: "2024-01-01" },
  { id: 2, title: "About Us", slug: "about-us", content: "Learn more about our company", status: "published", created_at: "2024-01-02" },
  { id: 3, title: "Services", slug: "services", content: "Our services and offerings", status: "draft", created_at: "2024-01-03" },
];

// ============= COMPONENTS =============
export const mockComponents = [
  { id: 1, name: "Hero Section", description: "Main hero banner component", type: "section", status: "active", created_at: "2024-01-01" },
  { id: 2, name: "Feature Cards", description: "Feature showcase cards", type: "component", status: "active", created_at: "2024-01-02" },
  { id: 3, name: "Testimonials", description: "Customer testimonials section", type: "section", status: "active", created_at: "2024-01-03" },
];

// ============= CONTENT =============
export const mockContent = [
  { id: 1, title: "Blog Post 1", body: "This is the first blog post content", status: "published", created_at: "2024-01-10" },
  { id: 2, title: "Blog Post 2", body: "This is the second blog post content", status: "published", created_at: "2024-01-15" },
];

// ============= MENU =============
export const mockMenus = [
  { id: 1, name: "Main Menu", slug: "main-menu", items: [{ label: "Home", url: "/" }, { label: "Services", url: "/services" }, { label: "About", url: "/about" }], status: "active", created_at: "2024-01-01" },
  { id: 2, name: "Footer Menu", slug: "footer-menu", items: [{ label: "Privacy", url: "/privacy" }, { label: "Terms", url: "/terms" }], status: "active", created_at: "2024-01-02" },
];

// ============= BANNERS =============
export const mockBanners = [
  { id: 1, title: "Spring Sale", description: "Get 50% off on all products", image: "https://via.placeholder.com/1200x400?text=Spring+Sale", status: "active", created_at: "2024-01-01" },
  { id: 2, title: "New Arrivals", description: "Check out our latest offerings", image: "https://via.placeholder.com/1200x400?text=New+Arrivals", status: "active", created_at: "2024-01-02" },
  { id: 3, title: "Summer Campaign 2024", description: "Limited time summer offers for premium services", image: "https://via.placeholder.com/1200x400?text=Summer+2024", status: "active", created_at: "2024-01-15" },
  { id: 4, title: "Flash Deal - Web Development", description: "50% discount on all web development projects", image: "https://via.placeholder.com/1200x400?text=Flash+Deal", status: "active", created_at: "2024-01-18" },
  { id: 5, title: "Mobile Apps Launch", description: "Introducing our new mobile app development service", image: "https://via.placeholder.com/1200x400?text=Mobile+Launch", status: "inactive", created_at: "2024-01-05" },
  { id: 6, title: "Year-End Clearance", description: "Huge discounts on selected services", image: "https://via.placeholder.com/1200x400?text=Clearance", status: "active", created_at: "2024-01-20" },
];

// ============= CAREERS =============
export const mockCareers = [
  { id: 1, title: "Senior Developer", description: "We are looking for an experienced developer with 5+ years in React/Node.js", location: "Dhaka, Bangladesh", salary: "60000-80000", status: "open", created_at: "2024-01-10" },
  { id: 2, title: "UI/UX Designer", description: "Creative designer for web and mobile projects. Must have portfolio.", location: "Remote", salary: "40000-50000", status: "open", created_at: "2024-01-15" },
  { id: 3, title: "Full Stack Developer", description: "Seeking full stack developer experienced with MERN stack", location: "Dhaka, Bangladesh", salary: "50000-70000", status: "open", created_at: "2024-01-16" },
  { id: 4, title: "DevOps Engineer", description: "DevOps professional for cloud infrastructure management", location: "Remote", salary: "55000-75000", status: "open", created_at: "2024-01-17" },
  { id: 5, title: "QA Automation Engineer", description: "Testing expert for automated testing implementation", location: "Dhaka, Bangladesh", salary: "35000-45000", status: "open", created_at: "2024-01-18" },
  { id: 6, title: "Product Manager", description: "Strategic product manager to lead product development", location: "Dhaka, Bangladesh", salary: "70000-90000", status: "closed", created_at: "2024-01-12" },
];

// ============= FAQS =============
export const mockFaqs = [
  { id: 1, question: "What services do you offer?", answer: "We offer web development, mobile app development, and digital marketing services.", order: 1, created_at: "2024-01-01" },
  { id: 2, question: "How much do your services cost?", answer: "Pricing varies based on project scope. Contact us for a custom quote.", order: 2, created_at: "2024-01-02" },
];

// ============= BLOGS =============
export const mockBlogs = [
  { id: 1, title: "Getting Started with Web Development", slug: "getting-started-web-dev", content: "Learn the basics of web development in 2024. This comprehensive guide covers HTML, CSS, JavaScript, and modern frameworks.", image: "https://via.placeholder.com/800x400?text=Blog+1", author: "John Doe", status: "published", created_at: "2024-01-10" },
  { id: 2, title: "Mobile App Trends", slug: "mobile-app-trends", content: "Latest trends in mobile application development including React Native and Flutter.", image: "https://via.placeholder.com/800x400?text=Blog+2", author: "Jane Smith", status: "published", created_at: "2024-01-15" },
  { id: 3, title: "Cloud Computing Best Practices", slug: "cloud-computing-practices", content: "Learn how to optimize your cloud infrastructure for better performance and cost savings.", image: "https://via.placeholder.com/800x400?text=Cloud+Blog", author: "Mike Johnson", status: "published", created_at: "2024-01-12" },
  { id: 4, title: "AI and Machine Learning in Web Apps", slug: "ai-ml-web-apps", content: "Integrating artificial intelligence and machine learning into modern web applications.", image: "https://via.placeholder.com/800x400?text=AI+Blog", author: "Sarah Williams", status: "published", created_at: "2024-01-18" },
  { id: 5, title: "Cybersecurity Tips for Developers", slug: "cybersecurity-tips", content: "Essential security practices every developer should implement in their projects.", image: "https://via.placeholder.com/800x400?text=Security", author: "Robert Brown", status: "draft", created_at: "2024-01-19" },
  { id: 6, title: "Future of Web3 Development", slug: "future-web3", content: "Understanding blockchain, smart contracts, and decentralized applications.", image: "https://via.placeholder.com/800x400?text=Web3", author: "Emma Davis", status: "published", created_at: "2024-01-20" },
];

// ============= SERVICES =============
export const mockServices = [
  { id: 1, name: "Web Development", description: "Custom website development using modern technologies", price: 5000, image: "https://via.placeholder.com/300x200?text=Web+Dev", status: "active", created_at: "2024-01-01" },
  { id: 2, name: "Mobile Apps", description: "Native and cross-platform mobile applications", price: 10000, image: "https://via.placeholder.com/300x200?text=Mobile+Apps", status: "active", created_at: "2024-01-02" },
  { id: 3, name: "Digital Marketing", description: "SEO, SEM, and content marketing strategies", price: 3000, image: "https://via.placeholder.com/300x200?text=Marketing", status: "active", created_at: "2024-01-03" },
  { id: 4, name: "UI/UX Design", description: "User interface and experience design services", price: 4500, image: "https://via.placeholder.com/300x200?text=Design", status: "active", created_at: "2024-01-04" },
  { id: 5, name: "Cloud Migration", description: "Seamless migration of applications to cloud", price: 8000, image: "https://via.placeholder.com/300x200?text=Cloud", status: "active", created_at: "2024-01-05" },
  { id: 6, name: "DevOps Services", description: "CI/CD pipeline setup and infrastructure automation", price: 6000, image: "https://via.placeholder.com/300x200?text=DevOps", status: "active", created_at: "2024-01-06" },
  { id: 7, name: "Maintenance & Support", description: "24/7 technical support and application maintenance", price: 2000, image: "https://via.placeholder.com/300x200?text=Support", status: "active", created_at: "2024-01-07" },
  { id: 8, name: "Consulting", description: "Technology consulting and strategic planning", price: 5500, image: "https://via.placeholder.com/300x200?text=Consulting", status: "active", created_at: "2024-01-08" },
];

// ============= TESTIMONIALS =============
export const mockTestimonials = [
  { id: 1, name: "Ahmed Hassan", company: "Tech Corp", message: "Excellent service and quality work. Highly recommended!", rating: 5, image: "https://via.placeholder.com/100x100?text=Ahmed", created_at: "2024-01-10" },
  { id: 2, name: "Fatima Khan", company: "Digital Solutions", message: "Professional team with great attention to detail.", rating: 5, image: "https://via.placeholder.com/100x100?text=Fatima", created_at: "2024-01-12" },
  { id: 3, name: "Karim Uddin", company: "StartUp Innovations", message: "They delivered our project on time and exceeded expectations.", rating: 5, image: "https://via.placeholder.com/100x100?text=Karim", created_at: "2024-01-14" },
  { id: 4, name: "Nadia Begum", company: "E-Commerce Hub", message: "Great communication and support throughout the project.", rating: 4, image: "https://via.placeholder.com/100x100?text=Nadia", created_at: "2024-01-16" },
  { id: 5, name: "Hassan Ali", company: "Global Ventures", message: "Innovative solutions and expert team. Worth every penny!", rating: 5, image: "https://via.placeholder.com/100x100?text=Hassan", created_at: "2024-01-18" },
  { id: 6, name: "Zara Khan", company: "Creative Agency", message: "Fantastic experience from start to finish. Highly professional.", rating: 5, image: "https://via.placeholder.com/100x100?text=Zara", created_at: "2024-01-20" },
];

// ============= SETTINGS =============
export const mockSettings = {
  data: {
    id: 1,
    company_name: "Skilify Tech",
    company_email: "admin@skilifytech.com",
    company_phone: "+8801234567890",
    company_address: "Uttara, Dhaka, Bangladesh",
    logo: "https://via.placeholder.com/200x50?text=Logo",
    favicon: "https://via.placeholder.com/32x32?text=Favicon",
    description: "Professional technology solutions for your business",
    updated_at: "2024-01-20",
  },
};

// ============= PROFILE =============
export const mockProfile = {
  id: 1,
  name: "Admin User",
  email: "admin@example.com",
  phone: "+8801234567890",
  role: "admin",
  avatar: "https://via.placeholder.com/150x150?text=Admin",
  created_at: "2024-01-01",
};

// ============= AUTH =============
export const mockAuthResponse = {
  success: true,
  message: "Login successful",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiJ9.demo_token_12345",
  user: {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://via.placeholder.com/150x150?text=Admin",
  },
};
