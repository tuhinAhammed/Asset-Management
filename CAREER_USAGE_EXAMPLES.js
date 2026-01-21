/**
 * CAREER PAGE - USAGE EXAMPLES & CODE SNIPPETS
 * 
 * This file contains practical examples for using the Career page components
 * and integrating them into your application.
 */

// ============================================================================
// 1. BASIC PAGE RENDERING
// ============================================================================

/**
 * The Career page is already integrated into the main router.
 * Simply navigate to the /career URL:
 * 
 * Browser: http://localhost:5173/career
 * Router:  <Route path="career" element={<Career />} />
 */


// ============================================================================
// 2. COMPONENT IMPORTS & USAGE
// ============================================================================

// Import components in your own pages:
import JobCard from '@/Components/Careers/JobCard';
import DepartmentFilter from '@/Components/Careers/DepartmentFilter';
import { 
  mockJobListings, 
  departmentsList, 
  getDaysUntilDeadline, 
  formatDate,
  getDepartmentName 
} from '@/Data/mockCareersData';

// Example: Using JobCard in a custom component
function MyJobListing() {
  const job = mockJobListings[0]; // Get first job
  
  return (
    <JobCard 
      job={job}
      onClick={() => console.log('Applied for:', job.position_title)}
    />
  );
}

// Example: Using DepartmentFilter
function MyFilterComponent() {
  const [selected, setSelected] = React.useState(null);
  
  return (
    <DepartmentFilter
      departments={departmentsList}
      onDepartmentChange={(deptId) => setSelected(deptId)}
      selectedDepartment={selected}
      jobCount={25}
    />
  );
}


// ============================================================================
// 3. WORKING WITH JOB DATA
// ============================================================================

// Access job listings
console.log(mockJobListings); // Array of 8 jobs

// Get specific job
const jobById = (id) => mockJobListings.find(j => j.id === id);
const seniorReactJob = jobById(1);

// Get jobs by department
const getJobsByDepartment = (deptId) => {
  return mockJobListings.filter(job => job.department_id === deptId);
};
const engineeringJobs = getJobsByDepartment(1);

// Get jobs by location
const getJobsByLocation = (location) => {
  return mockJobListings.filter(job => job.location === location);
};

// Get active jobs (not expired)
const getActiveJobs = () => {
  return mockJobListings.filter(job => 
    getDaysUntilDeadline(job.application_deadline) > 0
  );
};

// Get urgent jobs (<7 days)
const getUrgentJobs = () => {
  return mockJobListings.filter(job => {
    const days = getDaysUntilDeadline(job.application_deadline);
    return days > 0 && days <= 7;
  });
};

// Sort by deadline (soonest first)
const sortByDeadline = (jobs) => {
  return [...jobs].sort((a, b) => {
    const daysA = getDaysUntilDeadline(a.application_deadline);
    const daysB = getDaysUntilDeadline(b.application_deadline);
    return daysA - daysB;
  });
};


// ============================================================================
// 4. HELPER FUNCTIONS USAGE
// ============================================================================

// Get department name from ID
const deptName = getDepartmentName(1); // "Engineering"
const unknownDept = getDepartmentName(999); // "Unknown"

// Calculate days until deadline
const daysLeft = getDaysUntilDeadline("2026-02-28");
if (daysLeft <= 0) {
  console.log("Application deadline has passed");
} else if (daysLeft <= 7) {
  console.log(`Only ${daysLeft} days left!`);
} else {
  console.log(`${daysLeft} days remaining`);
}

// Format date for display
const formatted = formatDate("2026-02-28"); // "February 28, 2026"
const today = formatDate(new Date().toISOString());


// ============================================================================
// 5. API INTEGRATION EXAMPLE
// ============================================================================

/**
 * When your backend is ready, replace mock data with API call.
 * This example shows the pattern:
 */

import axios from 'axios';

async function fetchJobsFromAPI() {
  try {
    // Assuming your API endpoint structure
    const response = await axios.get(`${API_BASE_URL}/careers`);
    
    // Expected response format:
    // {
    //   status: "success",
    //   list: [ { id, position_title, department, ... } ]
    // }
    
    const jobs = response.data.list;
    return jobs;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
}

/**
 * In Career.jsx, replace this:
 *   setJobsData(mockJobListings);
 * 
 * With this:
 *   const jobs = await fetchJobsFromAPI();
 *   setJobsData(jobs);
 */


// ============================================================================
// 6. ADDING NAVIGATION LINKS
// ============================================================================

// In Header.jsx navigation menu, add:
import { Link } from 'react-router-dom';

<Link to="/career" className="nav-link">
  Careers
</Link>

// Or with NavLink (auto active styling):
import { NavLink } from 'react-router-dom';

<NavLink 
  to="/career" 
  className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
>
  Careers
</NavLink>


// ============================================================================
// 7. CREATING A JOB DETAIL PAGE (Future Enhancement)
// ============================================================================

/**
 * Example of how to create a job detail page:
 */

// 1. Add route in main.jsx:
// <Route path="career/:id" element={<CareerDetail />} />

// 2. Create CareerDetail.jsx:
import { useParams } from 'react-router-dom';
import { mockJobListings } from '@/Data/mockCareersData';

function CareerDetail() {
  const { id } = useParams();
  const job = mockJobListings.find(j => j.id === parseInt(id));
  
  if (!job) return <Error />;
  
  return (
    <div>
      <h1>{job.position_title}</h1>
      <h2>{job.department}</h2>
      <p>{job.short_description}</p>
      
      <section>
        <h3>Responsibilities</h3>
        <ul>
          {job.responsibilities.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>
      
      <section>
        <h3>Requirements</h3>
        <ul>
          {job.requirements.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>
      
      <button onClick={() => submitApplication(job.id)}>
        Apply Now
      </button>
    </div>
  );
}

// 3. Update JobCard.jsx to navigate on click:
// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();
// const handleApply = () => navigate(`/career/${job.id}`);


// ============================================================================
// 8. ADDING A JOB APPLICATION FORM (Future Enhancement)
// ============================================================================

/**
 * Example form component for applications:
 */

import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function ApplicationForm({ jobId, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    resume: null,
    coverLetter: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ 
      ...prev, 
      resume: e.target.files[0] 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('job_id', jobId);
    formDataToSend.append('name', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('experience', formData.experience);
    formDataToSend.append('resume', formData.resume);
    formDataToSend.append('cover_letter', formData.coverLetter);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/applications`,
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      
      toast.success('Application submitted successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to submit application');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      
      <textarea
        name="experience"
        placeholder="Tell us about your experience"
        value={formData.experience}
        onChange={handleChange}
      />
      
      <input
        type="file"
        name="resume"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        required
      />
      
      <textarea
        name="coverLetter"
        placeholder="Cover Letter (optional)"
        value={formData.coverLetter}
        onChange={handleChange}
      />
      
      <button type="submit">Submit Application</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}


// ============================================================================
// 9. ADVANCED FILTERING EXAMPLE
// ============================================================================

/**
 * Example of implementing multi-criteria filtering:
 */

function AdvancedCareerFilter() {
  const [filters, setFilters] = useState({
    department: null,
    location: null,
    experience: null,
    searchTerm: ''
  });

  const filteredJobs = mockJobListings.filter(job => {
    const matchesDept = !filters.department || 
      job.department_id === filters.department;
    
    const matchesLocation = !filters.location || 
      job.location === filters.location;
    
    const matchesExperience = !filters.experience || 
      job.experience === filters.experience;
    
    const matchesSearch = !filters.searchTerm || 
      job.position_title.toLowerCase().includes(
        filters.searchTerm.toLowerCase()
      );
    
    return matchesDept && matchesLocation && 
           matchesExperience && matchesSearch;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search positions..."
        value={filters.searchTerm}
        onChange={(e) => setFilters(prev => ({
          ...prev,
          searchTerm: e.target.value
        }))}
      />
      
      <DepartmentFilter
        departments={departmentsList}
        onDepartmentChange={(deptId) => setFilters(prev => ({
          ...prev,
          department: deptId
        }))}
        selectedDepartment={filters.department}
        jobCount={filteredJobs.length}
      />
      
      {filteredJobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}


// ============================================================================
// 10. TESTING EXAMPLES
// ============================================================================

/**
 * Unit test examples for Career page components:
 */

// Test: JobCard renders job info
test('JobCard displays job title', () => {
  const job = mockJobListings[0];
  render(<JobCard job={job} />);
  expect(screen.getByText(job.position_title)).toBeInTheDocument();
});

// Test: Department badge displays
test('JobCard shows department badge', () => {
  const job = mockJobListings[0];
  render(<JobCard job={job} />);
  expect(screen.getByText(job.department)).toBeInTheDocument();
});

// Test: Filter updates job list
test('DepartmentFilter updates filtered list', () => {
  const [selected, setSelected] = useState(null);
  const filtered = mockJobListings.filter(j => 
    !selected || j.department_id === selected
  );
  
  render(
    <DepartmentFilter
      departments={departmentsList}
      onDepartmentChange={setSelected}
      selectedDepartment={selected}
    />
  );
  
  const engineeringBtn = screen.getByText('🔧 Engineering');
  fireEvent.click(engineeringBtn);
  
  expect(filtered).toHaveLength(3); // 3 engineering jobs
});

// Test: Helper functions
test('getDaysUntilDeadline calculates correctly', () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 5);
  const daysLeft = getDaysUntilDeadline(futureDate.toISOString());
  expect(daysLeft).toBe(5);
});

test('formatDate formats correctly', () => {
  const formatted = formatDate('2026-02-28');
  expect(formatted).toBe('February 28, 2026');
});


// ============================================================================
// 11. PERFORMANCE MONITORING
// ============================================================================

/**
 * Example of monitoring page performance:
 */

useEffect(() => {
  // Track when page loads
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    console.log(`Career page load time: ${endTime - startTime}ms`);
  };
}, []);

// Monitor filter performance
const handleFilterChange = (deptId) => {
  const startTime = performance.now();
  setSelectedDepartment(deptId);
  const endTime = performance.now();
  console.log(`Filter update time: ${endTime - startTime}ms`);
};


// ============================================================================
// 12. REDUX INTEGRATION (Optional)
// ============================================================================

/**
 * If you want to use Redux for career data:
 */

// Create a slice for careers
import { createSlice } from '@reduxjs/toolkit';

const careerSlice = createSlice({
  name: 'careers',
  initialState: {
    jobs: [],
    loading: false,
    selectedDepartment: null
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    }
  }
});

// Use in Career.jsx:
import { useDispatch, useSelector } from 'react-redux';

const dispatch = useDispatch();
const { jobs, selectedDepartment } = useSelector(state => state.careers);

useEffect(() => {
  dispatch(setJobs(mockJobListings));
}, []);


// ============================================================================
// 13. LOCALIZATION EXAMPLE
// ============================================================================

/**
 * Example of adding multi-language support:
 */

const translations = {
  en: {
    joinTeam: "Join Our Team",
    filterByDept: "Filter by Department",
    allDepts: "All Departments",
    applyNow: "Apply Now",
    daysRemaining: "days remaining",
    applicationClosed: "Application Closed",
    nothingFound: "No Positions Found"
  },
  es: {
    joinTeam: "Únete a Nuestro Equipo",
    filterByDept: "Filtrar por Departamento",
    allDepts: "Todos los Departamentos",
    applyNow: "Solicitar Ahora",
    daysRemaining: "días restantes",
    applicationClosed: "Solicitud Cerrada",
    nothingFound: "No Se Encontraron Posiciones"
  }
};


// ============================================================================
// 14. QUICK START CHECKLIST
// ============================================================================

/**
 * ✅ Get started in 5 minutes:
 * 
 * 1. Career page is already integrated:
 *    - Navigate to /career in your browser
 *    - All components are working with mock data
 * 
 * 2. Test the filtering:
 *    - Click different department buttons
 *    - See results update in real-time
 * 
 * 3. View responsive design:
 *    - Open DevTools (F12)
 *    - Test mobile, tablet, desktop layouts
 *    - Verify animations on scroll
 * 
 * 4. Add to navigation (optional):
 *    - Find Header.jsx
 *    - Add Career link to menu
 * 
 * 5. When API is ready:
 *    - Update Career.jsx data fetching
 *    - Switch from mockJobListings to API
 *    - No component changes needed
 * 
 * 6. Advanced features (optional):
 *    - Create job detail pages
 *    - Add application form
 *    - Implement saved jobs
 */


// ============================================================================
// END OF EXAMPLES
// ============================================================================

export {
  fetchJobsFromAPI,
  ApplicationForm,
  AdvancedCareerFilter,
  careerSlice,
  translations
};
