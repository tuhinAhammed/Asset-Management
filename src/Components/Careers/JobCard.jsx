import React, { useMemo } from "react";
import { FiMapPin, FiClock, FiBriefcase, FiCalendar, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import PrimaryButton from "../../Layout/Button/PrimaryButton";
import { formatDate, getDaysUntilDeadline } from "../../Data/mockCareersData";

/**
 * JobCard Component
 * Displays individual job opportunity with key metadata
 * Responsive design: full-width mobile, card layout on desktop
 * 
 * Props:
 * - job: Job object with position details
 * - onClick: Optional callback for card interaction
 */
const JobCard = ({ job, onClick }) => {
  const daysRemaining = useMemo(() => getDaysUntilDeadline(job.application_deadline), [job.application_deadline]);
  
  // Determine urgency status based on days remaining
  const isUrgent = daysRemaining <= 7 && daysRemaining > 0;
  const isExpired = daysRemaining <= 0;

  return (
    <div
      onClick={onClick}
      className="bg-white border border-[rgba(0,0,0,0.12)] rounded-xl p-4 md:p-5 lg:p-6 
        hover:shadow-xl transition-all duration-300 cursor-pointer group 
        relative overflow-hidden h-full flex flex-col hover:border-theme"
    >
      {/* Urgent Badge */}
      {isUrgent && (
        <div className="absolute top-4 right-4 bg-red-50 text-red-600 text-xs font-bold 
          px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <FiAlertCircle className="text-sm" />
          Urgent
        </div>
      )}

      {/* Expired Badge */}
      {isExpired && (
        <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs font-semibold 
          px-3 py-1.5 rounded-full shadow-sm">
          Closed
        </div>
      )}

      {/* Job Title */}
      <h3 className="text-base md:text-lg lg:text-xl font-bold text-primary mb-2 pr-32 group-hover:text-theme 
        transition-colors duration-300 line-clamp-2">
        {job.position_title}
      </h3>

      {/* Department Badge */}
      <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 
        rounded-full mb-4 w-fit">
        {job.department}
      </div>

      {/* Job Metadata Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5 flex-1">
        
        {/* Location */}
        <div className="flex items-start gap-2.5 text-xs md:text-sm text-tertiary hover:text-theme transition-colors">
          <FiMapPin className="text-theme text-base flex-shrink-0 mt-0.5" />
          <span className="line-clamp-1">{job.location}</span>
        </div>

        {/* Experience Level */}
        <div className="flex items-start gap-2.5 text-xs md:text-sm text-tertiary hover:text-theme transition-colors">
          <FiBriefcase className="text-theme text-base flex-shrink-0 mt-0.5" />
          <span className="line-clamp-1">{job.experience}</span>
        </div>

        {/* Employment Type */}
        <div className="flex items-start gap-2.5 text-xs md:text-sm text-tertiary hover:text-theme transition-colors">
          <FiClock className="text-theme text-base flex-shrink-0 mt-0.5" />
          <span className="line-clamp-1">{job.employment_type}</span>
        </div>

        {/* Application Deadline */}
        <div className="flex items-start gap-2.5 text-xs md:text-sm text-tertiary hover:text-theme transition-colors">
          <FiCalendar className="text-theme text-base flex-shrink-0 mt-0.5" />
          <span className="line-clamp-1">{formatDate(job.application_deadline)}</span>
        </div>
      </div>

      {/* Short Description */}
      <p className="text-xs md:text-sm text-tertiary line-clamp-2 mb-4 leading-relaxed">
        {job.short_description}
      </p>

      {/* Footer Section */}
      <div className="flex items-center justify-between pt-4 border-t border-[rgba(0,0,0,0.08)] mt-auto">
        {/* Days Remaining */}
        <div className="text-xs font-semibold">
          {isExpired ? (
            <span className="text-gray-500">Closed</span>
          ) : (
            <span className={`flex items-center gap-1 ${isUrgent ? "text-red-600" : "text-theme"}`}>
              <FiClock className="text-sm" />
              {daysRemaining}d
            </span>
          )}
        </div>

        {/* Apply Button */}
        <button
          disabled={isExpired}
          className={`flex items-center gap-1.5 text-xs lg:text-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all duration-300 
            ${isExpired 
              ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
              : "bg-theme text-white hover:bg-buttonHover group-hover:gap-2"
            }`}
          aria-label={`Apply for ${job.position_title}`}
        >
          <span>Apply</span>
          {!isExpired && <FiArrowRight className="text-base" />}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
