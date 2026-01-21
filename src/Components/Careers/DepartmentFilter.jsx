import React, { useState, useMemo } from "react";
import { MdFilterList } from "react-icons/md";
import { FiChevronDown, FiX } from "react-icons/fi";
import {
  FiCode,
  FiPenTool,
  FiBox,
  FiTrendingUp,
  FiCheckCircle,
  FiBriefcase,
} from "react-icons/fi";

/**
 * DepartmentFilter Component
 * Provides filtering interface for job listings by department and other criteria
 * Mobile: Dropdown/Collapsible, Desktop: Horizontal buttons
 * 
 * Props:
 * - departments: Array of department objects
 * - onDepartmentChange: Callback when department filter changes
 * - selectedDepartment: Currently selected department ID
 * - jobCount: Total number of jobs matching current filter
 */
const DepartmentFilter = ({
  departments,
  onDepartmentChange,
  selectedDepartment,
  jobCount = 0
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Map icon names to actual icon components
  const iconMap = {
    FiCode: FiCode,
    FiPenTool: FiPenTool,
    FiBox: FiBox,
    FiTrendingUp: FiTrendingUp,
    FiCheckCircle: FiCheckCircle,
    FiBriefcase: FiBriefcase,
  };

  // Get icon component by name
  const getIconComponent = (iconName) => {
    return iconMap[iconName] || FiCode;
  };

  // Responsive filter display
  const isMobileView = window.innerWidth < 768;
  const filterDisplayMode = isMobileView ? "dropdown" : "horizontal";

  // Get selected department name for dropdown display
  const selectedDeptName = useMemo(() => {
    if (!selectedDepartment) return "All Departments";
    return departments.find(d => d.id === selectedDepartment)?.name || "All Departments";
  }, [selectedDepartment, departments]);

  /**
   * Handle department selection
   * Clicking same department again deselects it (shows all)
   */
  const handleDepartmentSelect = (deptId) => {
    onDepartmentChange(selectedDepartment === deptId ? null : deptId);
    setIsFilterOpen(false);
  };

  /**
   * Clear all filters
   */
  const handleClearFilters = () => {
    onDepartmentChange(null);
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full">
      {/* Filter Header with Label */}
      <div className="flex items-center gap-2 mb-4">
        <MdFilterList className="text-theme text-lg md:text-xl flex-shrink-0" />
        <h3 className="text-sm md:text-base font-bold text-primary">
          Filter by Department
        </h3>
        {jobCount > 0 && (
          <span className="ml-auto text-xs md:text-sm font-semibold text-theme bg-blue-50 px-2.5 py-1 rounded-full">
            {jobCount} open
          </span>
        )}
      </div>

      {/* DROPDOWN MODE - Mobile */}
      {filterDisplayMode === "dropdown" && (
        <div className="space-y-3">
          {/* Dropdown Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full bg-white border border-[rgba(0,0,0,0.12)] rounded-lg px-4 py-3 
              text-left text-primary font-semibold text-sm
              hover:border-theme hover:shadow-md transition-all duration-300
              flex items-center justify-between group"
            aria-label="Toggle department filter"
            aria-expanded={isFilterOpen}
          >
            <span className="truncate">{selectedDeptName}</span>
            <FiChevronDown
              className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 text-theme ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isFilterOpen && (
            <div className="bg-white border border-[rgba(0,0,0,0.12)] rounded-lg overflow-hidden 
              shadow-xl animate-in fade-in duration-200 divide-y">
              {/* All Departments Option */}
              <button
                onClick={handleClearFilters}
                className={`w-full text-left px-4 py-3.5 text-sm font-semibold transition-all duration-200 
                  flex items-center gap-2
                  ${!selectedDepartment 
                    ? "bg-blue-50 text-theme" 
                    : "text-primary hover:bg-gray-50"
                  }`}
              >
                {!selectedDepartment && <FiX className="text-base flex-shrink-0" />}
                All Departments
              </button>

              {/* Department Options */}
              {departments.map((dept) => {
                const IconComponent = getIconComponent(dept.iconName);
                return (
                  <button
                    key={dept.id}
                    onClick={() => handleDepartmentSelect(dept.id)}
                    className={`w-full text-left px-4 py-3.5 text-sm font-medium 
                      transition-all duration-200 flex items-center gap-2.5
                      ${selectedDepartment === dept.id
                        ? "bg-blue-50 text-theme font-semibold"
                        : "text-primary hover:bg-gray-50"
                      }`}
                  >
                    <IconComponent className="text-lg flex-shrink-0" />
                    {dept.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* HORIZONTAL MODE - Desktop */}
      {filterDisplayMode === "horizontal" && (
        <div className="space-y-3">
          {/* All Departments Button */}
          <button
            onClick={handleClearFilters}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
              inline-flex items-center gap-2 border
              ${!selectedDepartment
                ? "bg-theme text-white border-theme shadow-md hover:shadow-lg"
                : "bg-white text-primary border-[rgba(0,0,0,0.12)] hover:border-theme hover:text-theme hover:bg-blue-50"
              }`}
          >
            {!selectedDepartment && <FiX className="text-base" />}
            All
          </button>

          {/* Department Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => {
              const IconComponent = getIconComponent(dept.iconName);
              return (
                <button
                  key={dept.id}
                  onClick={() => handleDepartmentSelect(dept.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                    border whitespace-nowrap flex items-center gap-2
                    ${selectedDepartment === dept.id
                      ? "bg-theme text-white border-theme shadow-md hover:shadow-lg"
                      : "bg-white text-primary border-[rgba(0,0,0,0.12)] hover:border-theme hover:text-theme hover:bg-blue-50"
                    }`}
                  aria-pressed={selectedDepartment === dept.id}
                >
                  <IconComponent className="text-base" />
                  {dept.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentFilter;
