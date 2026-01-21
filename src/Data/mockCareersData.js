/**
 * Mock Career Opportunities Data
 * This data structure is designed to be scalable for API integration.
 * Each job includes department categorization, location, and deadline metadata.
 */

export const mockJobListings = [
  {
    id: 1,
    position_title: "Senior React Developer",
    department: "Engineering",
    department_id: 1,
    location: "Dhaka",
    experience: "5+ years",
    employment_type: "Full-time",
    application_deadline: "2026-02-28",
    short_description: "Lead the development of modern React applications with a focus on performance and scalability.",
    responsibilities: [
      "Architect and develop scalable React components",
      "Mentor junior developers",
      "Optimize application performance",
      "Collaborate with design and product teams"
    ],
    requirements: [
      "5+ years of React experience",
      "Strong JavaScript/TypeScript knowledge",
      "Experience with state management (Redux, Zustand)",
      "Familiarity with Tailwind CSS"
    ]
  },
  {
    id: 2,
    position_title: "UX/UI Designer",
    department: "Design",
    department_id: 2,
    location: "Dhaka",
    experience: "3+ years",
    employment_type: "Full-time",
    application_deadline: "2026-02-15",
    short_description: "Create intuitive and beautiful user interfaces for our digital products.",
    responsibilities: [
      "Design user interfaces and experiences",
      "Create wireframes and prototypes",
      "Conduct user research and testing",
      "Maintain design system consistency"
    ],
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma or similar tools",
      "Understanding of user-centered design principles",
      "Portfolio demonstrating design work"
    ]
  },
  {
    id: 3,
    position_title: "Backend Engineer (Node.js)",
    department: "Engineering",
    department_id: 1,
    location: "Dhaka",
    experience: "4+ years",
    employment_type: "Full-time",
    application_deadline: "2026-02-20",
    short_description: "Build robust and scalable backend services using Node.js and modern frameworks.",
    responsibilities: [
      "Design and implement RESTful APIs",
      "Optimize database queries and performance",
      "Implement authentication and security measures",
      "Write unit and integration tests"
    ],
    requirements: [
      "4+ years of Node.js experience",
      "Strong understanding of databases (SQL/NoSQL)",
      "Experience with API design and documentation",
      "Knowledge of microservices architecture"
    ]
  },
  {
    id: 4,
    position_title: "Product Manager",
    department: "Product",
    department_id: 3,
    location: "Dhaka",
    experience: "3+ years",
    employment_type: "Full-time",
    application_deadline: "2026-02-25",
    short_description: "Drive product strategy and vision for our core digital platform.",
    responsibilities: [
      "Define product roadmap and strategy",
      "Collaborate with engineering and design teams",
      "Analyze user data and market trends",
      "Manage product releases and iterations"
    ],
    requirements: [
      "3+ years of product management experience",
      "Strong analytical and communication skills",
      "Experience with agile methodologies",
      "Portfolio of successful product launches"
    ]
  },
  {
    id: 5,
    position_title: "Digital Marketing Specialist",
    department: "Marketing",
    department_id: 4,
    location: "Dhaka",
    experience: "2+ years",
    employment_type: "Full-time",
    application_deadline: "2026-02-10",
    short_description: "Plan and execute digital marketing campaigns across multiple channels.",
    responsibilities: [
      "Develop and execute digital marketing campaigns",
      "Manage social media presence",
      "Analyze campaign performance metrics",
      "Conduct market research and competitor analysis"
    ],
    requirements: [
      "2+ years of digital marketing experience",
      "Proficiency with SEO, SEM, and analytics tools",
      "Strong copywriting and communication skills",
      "Experience with marketing automation platforms"
    ]
  },
  {
    id: 6,
    position_title: "Frontend Developer (React/Vue)",
    department: "Engineering",
    department_id: 1,
    location: "Dhaka",
    experience: "2+ years",
    employment_type: "Full-time",
    application_deadline: "2026-02-22",
    short_description: "Develop interactive and responsive web applications with modern JavaScript frameworks.",
    responsibilities: [
      "Build responsive UI components",
      "Optimize rendering performance",
      "Implement responsive design patterns",
      "Collaborate with backend engineers"
    ],
    requirements: [
      "2+ years of frontend development experience",
      "Strong HTML, CSS, and JavaScript skills",
      "Experience with React or Vue.js",
      "Understanding of responsive design"
    ]
  },
  {
    id: 7,
    position_title: "QA Engineer",
    department: "Quality Assurance",
    department_id: 5,
    location: "Dhaka",
    experience: "2+ years",
    employment_type: "Full-time",
    application_deadline: "2026-02-18",
    short_description: "Ensure product quality through comprehensive testing and quality assurance processes.",
    responsibilities: [
      "Create and execute test plans",
      "Identify and document bugs",
      "Perform manual and automated testing",
      "Collaborate with development team on fixes"
    ],
    requirements: [
      "2+ years of QA testing experience",
      "Knowledge of testing methodologies",
      "Experience with automation testing tools",
      "Attention to detail and problem-solving skills"
    ]
  },
  {
    id: 8,
    position_title: "Business Development Executive",
    department: "Business",
    department_id: 6,
    location: "Dhaka",
    experience: "2+ years",
    employment_type: "Full-time",
    application_deadline: "2026-02-12",
    short_description: "Identify and pursue new business opportunities to drive company growth.",
    responsibilities: [
      "Identify and evaluate business opportunities",
      "Develop and maintain client relationships",
      "Create business proposals and presentations",
      "Track and report on business metrics"
    ],
    requirements: [
      "2+ years of business development experience",
      "Strong sales and negotiation skills",
      "Excellent communication and presentation abilities",
      "Track record of closing deals"
    ]
  }
];

/**
 * Department list for filtering
 * Each department has an ID that maps to job listings
 * Icons are rendered as React Icon components
 */
export const departmentsList = [
  { id: 1, name: "Engineering", iconName: "FiCode" },
  { id: 2, name: "Design", iconName: "FiPenTool" },
  { id: 3, name: "Product", iconName: "FiBox" },
  { id: 4, name: "Marketing", iconName: "FiTrendingUp" },
  { id: 5, name: "Quality Assurance", iconName: "FiCheckCircle" },
  { id: 6, name: "Business", iconName: "FiBriefcase" }
];

/**
 * Unique locations for filtering
 */
export const locationsList = [
  { id: 1, name: "Dhaka" },
  { id: 2, name: "Chattogram" },
  { id: 3, name: "Sylhet" }
];

/**
 * Helper function to get department name by ID
 */
export const getDepartmentName = (departmentId) => {
  return departmentsList.find(dept => dept.id === departmentId)?.name || "Unknown";
};

/**
 * Helper function to get days remaining until deadline
 */
export const getDaysUntilDeadline = (deadlineDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(deadlineDate);
  deadline.setHours(0, 0, 0, 0);
  const daysRemaining = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  return daysRemaining;
};

/**
 * Helper function to format date
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
