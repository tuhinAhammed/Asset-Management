import React, { useEffect, useState, useMemo } from "react";
import Container from "../Layout/Container";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import SectionTitle from "../Layout/Title/SectionTitle";
import LargeTitle from "../Layout/Title/LargeTitle";
import JobCard from "../Components/Careers/JobCard";
import DepartmentFilter from "../Components/Careers/DepartmentFilter";
import ResumeModal from "../Components/Careers/ResumeModal";
import { mockJobListings, departmentsList, getDaysUntilDeadline } from "../Data/mockCareersData";
import axios from "axios";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import { BiSearchAlt } from "react-icons/bi";
import { FiSend, FiCheckCircle } from "react-icons/fi";

/**
 * Career Page Component
 * Displays job opportunities with filtering capabilities
 * Features:
 * - Department-based filtering
 * - Responsive grid layout (mobile-first)
 * - Job urgency indicators
 * - Application deadline tracking
 * - AOS animations
 * - Real API integration (with mock data fallback)
 */
const Career = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  /**
   * Initialize page data and animations
   * Attempts to fetch from API, falls back to mock data if unavailable
   */
  useEffect(() => {
    const initializeCareerPage = async () => {
      try {
        setLoading(true);
        
        // Check if we should use mock data or real API
        const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_CAREERS !== 'false';
        
        if (USE_MOCK_DATA) {
          // Use mock data (development/demo mode)
          console.log("Using mock career data for development");
          setTimeout(() => {
            setJobsData(mockJobListings);
            setLoading(false);
          }, 300);
        } else {
          // Fetch from real API
          const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://asset-api.shelaigor.com/api";
          const response = await axios.get(`${API_BASE_URL}/careers`);
          
          if (response.data && response.data.list) {
            setJobsData(response.data.list);
          } else if (response.data && Array.isArray(response.data)) {
            setJobsData(response.data);
          } else {
            throw new Error("Invalid API response format");
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading career data from API:", error);
        console.log("Falling back to mock data...");
        
        // Fallback to mock data if API fails
        setJobsData(mockJobListings);
        setLoading(false);
        
        if (!import.meta.env.VITE_USE_MOCK_CAREERS || import.meta.env.VITE_USE_MOCK_CAREERS === 'false') {
          toast.warning("Failed to load careers from API. Showing demo data.");
        }
      }
    };

    initializeCareerPage();
  }, []);

  /**
   * Initialize AOS animations
   */
  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      duration: 1000,
    });
  }, []);

  /**
   * Filter jobs based on selected department
   * Sorts by application deadline (urgent first)
   */
  const filteredJobs = useMemo(() => {
    let filtered = jobsData;

    if (selectedDepartment) {
      filtered = filtered.filter(job => job.department_id === selectedDepartment);
    }

    // Sort by days remaining (urgent first)
    return filtered.sort((a, b) => {
      const daysA = getDaysUntilDeadline(a.application_deadline);
      const daysB = getDaysUntilDeadline(b.application_deadline);
      return daysA - daysB;
    });
  }, [jobsData, selectedDepartment]);

  /**
   * Handle department filter change
   */
  const handleDepartmentChange = (deptId) => {
    setSelectedDepartment(deptId);
  };

  /**
   * Handle job card click
   * In production, navigate to job details page
   */
  const handleJobCardClick = (job) => {
    console.log("Selected job:", job);
    // Future: Navigate to job detail page or open modal
    // navigate(`/career/${job.id}`)
  };

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb title="Careers" />

      {/* Main Career Section */}
      <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg">
        <Container>
          {/* Section Header */}
          <div className="text-center mb-sectionSm md:mb-sectionMd">
            <div 
              className="flex items-center justify-center mb-4"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <SectionTitle text="Join Our Team" />
            </div>
            <LargeTitle
              data-aos="fade-down"
              data-aos-duration="1200"
              className="text-primary"
              text="Explore Exciting Career Opportunities"
            />
            <p 
              className="text-base md:text-lg text-tertiary mt-4 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              Join our dynamic team and grow with a company that values innovation, 
              creativity, and excellence. We're looking for talented professionals like you.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filter Section */}
            <div 
              className="lg:col-span-1"
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              <div className="sticky top-24 bg-quaternary p-5 md:p-6 rounded-lg border border-[rgba(0,0,0,0.08)]">
                <DepartmentFilter
                  departments={departmentsList}
                  onDepartmentChange={handleDepartmentChange}
                  selectedDepartment={selectedDepartment}
                  jobCount={filteredJobs.length}
                />
              </div>
            </div>

            {/* Main Content - Job Listings */}
            <div className="lg:col-span-3">
              {/* Loading State */}
              {loading && (
                <div className="grid md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-300 rounded-lg p-5 md:p-6 
                        space-y-4 animate-pulse"
                    >
                      <div className="h-6 bg-skeletonLoading rounded w-3/4"></div>
                      <div className="h-4 bg-skeletonLoading rounded w-1/3"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-skeletonLoading rounded"></div>
                        <div className="h-4 bg-skeletonLoading rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredJobs.length === 0 && (
                <div 
                  className="text-center py-12 md:py-16 px-4"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div className="mb-6 flex justify-center">
                    <BiSearchAlt className="text-5xl md:text-6xl lg:text-7xl text-theme opacity-30" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3">No Positions Found</h3>
                  <p className="text-tertiary text-sm md:text-base max-w-md mx-auto">
                    {selectedDepartment
                      ? "No job openings in this department at the moment. Try another filter."
                      : "Check back soon for new opportunities!"}
                  </p>
                </div>
              )}

              {/* Job Listings Grid */}
              {!loading && filteredJobs.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredJobs.map((job, index) => (
                    <div
                      key={job.id}
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay={index * 100}
                    >
                      <JobCard
                        job={job}
                        onClick={() => handleJobCardClick(job)}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Results Summary */}
              {!loading && filteredJobs.length > 0 && (
                <div 
                  className="mt-8 pt-8 border-t border-[rgba(0,0,0,0.08)] text-center"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <p className="text-sm md:text-base text-tertiary">
                    Showing <span className="font-semibold text-primary">{filteredJobs.length}</span> of{" "}
                    <span className="font-semibold text-primary">{jobsData.length}</span> positions
                  </p>
                  <p className="text-xs md:text-sm text-tertiary mt-2">
                    Don't see the role you're looking for? Check back soon!
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Call-to-Action Section */}
      <div 
        className="bg-static py-sectionSm md:py-sectionMd lg:py-sectionLg"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <Container>
          <div className="text-center px-4 md:px-0">
            <div className="flex justify-center mb-4 md:mb-6">
              <FiCheckCircle className="text-4xl md:text-5xl lg:text-6xl text-theme" />
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-secondary mb-4">
              Don't See What You're Looking For?
            </h3>
            <p className="text-secondary/80 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-6 md:mb-8">
              We're always interested in hearing from talented professionals. Send us your resume 
              and let us know how you'd like to contribute to our mission.
            </p>
            <button 
              onClick={() => setIsResumeModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-theme text-secondary font-medium 
                rounded-full hover:bg-buttonHover transition-all duration-300 transform hover:scale-105
                text-sm md:text-base shadow-lg hover:shadow-xl cursor-pointer"
              aria-label="Send us your resume"
            >
              <FiSend className="text-lg md:text-xl" />
              Send Your Resume
            </button>
          </div>
        </Container>
      </div>

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export default Career;
