import React, { useState, useEffect, useMemo } from "react";
import Container from "../Layout/Container";
import Search from "../Layout/SearchInput/Search";
import ProjectCard from "../Components/Projects/ProjectCard";
import LargeTitle from "../Layout/Title/LargeTitle";
import SectionTitle from "../Layout/Title/SectionTitle";
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import { projectsList } from "../Api/Api";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import LoadingButton from "../Layout/Button/LoadingButton";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleProjects, setVisibleProjects] = useState(9);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract unique categories from projects data
  const categories = useMemo(() => {
    const categoryMap = new Map();
    
    projectsData.forEach(project => {
      if (project.category_id && project.category_name) {
        if (!categoryMap.has(project.category_id)) {
          categoryMap.set(project.category_id, {
            id: project.category_id,
            name: project.category_name,
            slug: project.category_slug,
            status: project.category_status
          });
        }
      }
    });
    
    return Array.from(categoryMap.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  }, [projectsData]);

  // Flatten projects from API response
  const flattenProjects = (data) => {
    if (!data || !data.products) return [];
    
    const flattened = [];
    
    data.products.forEach(category => {
      if (category.products && Array.isArray(category.products)) {
        category.products.forEach(product => {
          flattened.push({
            ...product,
            category_name: category.name,
            category_id: category.id,
            category_slug: category.slug || category.name?.toLowerCase().replace(/\s+/g, '-'),
            category_status: category.status
          });
        });
      }
    });
    
    return flattened;
  };

  // Fetch projects data
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(projectsList);
      console.log("API Response:", response.data);

      // Flatten projects data
      const flattenedProjects = flattenProjects(response.data);
      console.log("Flattened Projects:", flattenedProjects);
      
      setProjectsData(flattenedProjects);
      
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    
    // Initialize AOS
    AOS.init({
      once: true,
      duration: 1000,
      offset: 100,
    });
  }, []);

  // Filter projects based on search and selected category
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesSearch = searchTerm 
        ? project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesCategory = selectedCategory
        ? project.category_id === parseInt(selectedCategory)
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [projectsData, searchTerm, selectedCategory]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleSeeMore = () => setVisibleProjects((prev) => prev + 9);

  // Reset visible projects when filters change
  useEffect(() => {
    setVisibleProjects(9);
  }, [searchTerm, selectedCategory]);

  // Get selected category name
  const selectedCategoryName = useMemo(() => {
    if (!selectedCategory) return '';
    const category = categories.find(cat => cat.id === parseInt(selectedCategory));
    return category ? category.name : '';
  }, [selectedCategory, categories]);

  return (
    <div>
      <Breadcrumb title="Projects" />
      
      <div className="py-sectionSm md:py-sectionMd lg:py-sectionMd">
        <Container>
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12">
            <div className="flex items-center justify-center">
              <SectionTitle
                data-aos="fade-down"
                data-aos-duration="1000"
                text="Our Projects"
              />
            </div>
            <LargeTitle
              data-aos="fade-down"
              data-aos-duration="1000"
              className="font-bold w-[90%] md:w-[70%] lg:w-[60%] mx-auto pt-2 md:pt-4 text-primary leading-tight"
              text="Transform Your Vision Into Reality With Our Innovative Digital Solutions"
            />
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 justify-center items-stretch md:items-center mb-8">
            <div className="w-full md:flex-1 max-w-md">
              <Search
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                placeholder="Search projects by name, description, or category..."
              />
            </div>
            
            <div className="w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full md:w-60 border border-gray-300 rounded-lg p-3 md:p-2.5 focus:ring-2 focus:ring-theme focus:border-transparent outline-none transition-all duration-300 bg-white shadow-sm hover:shadow appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                    {cat.status === 'inactive' && ' (Inactive)'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count and Active Filters */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-gray-600 text-sm md:text-base">
              Showing {Math.min(visibleProjects, filteredProjects.length)} of {filteredProjects.length} projects
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategoryName && ` in "${selectedCategoryName}"`}
            </p>
            
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="text-sm text-theme hover:text-theme-dark font-medium flex items-center gap-1"
              >
                <span>Clear filters</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p>{error}</p>
              <button
                onClick={fetchProjects}
                className="mt-2 text-sm underline hover:text-red-800 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retry
              </button>
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {loading ? (
              // Loading Skeletons
              [...Array(visibleProjects)].map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-sm animate-pulse"
                  data-aos="fade-up"
                  data-aos-delay={(i % 3) * 100}
                >
                  <div className="aspect-[4/3] rounded-lg bg-gray-200 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))
            ) : filteredProjects.length > 0 ? (
              // Actual Projects
              filteredProjects.slice(0, visibleProjects).map((project, index) => (
                <div
                  key={`${project.id}-${project.category_id}-${index}`}
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 100}
                  data-aos-duration="800"
                >
                  <ProjectCard data={project} />
                </div>
              ))
            ) : (
              // No Results
              <div className="col-span-full text-center py-12 md:py-16" data-aos="fade-up">
                <div className="text-gray-400 mb-4">
                  <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
                  No projects found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  {searchTerm || selectedCategory
                    ? "Try adjusting your search or filter to find what you're looking for."
                    : "No projects available at the moment. Please check back later."}
                </p>
                {(searchTerm || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                    }}
                    className="px-6 py-2 bg-theme text-white rounded-lg hover:bg-theme-dark transition-colors"
                  >
                    View All Projects
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Load More Button */}
          {!loading && visibleProjects < filteredProjects.length && (
            <div className="mt-8 md:mt-12 text-center" data-aos="fade-up">
              <LoadingButton
                className="inline-block"
                loadingTime="1000"
                text={`Load More (${filteredProjects.length - visibleProjects} remaining)`}
                onClick={handleSeeMore}
              />
            </div>
          )}

          {/* Categories Summary (Desktop Only) */}
          {categories.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 hidden md:block" data-aos="fade-up">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Browse by Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id.toString())}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.id.toString()
                        ? 'bg-theme text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                    <span className="ml-2 text-xs opacity-75">
                      ({projectsData.filter(p => p.category_id === category.id).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Projects;