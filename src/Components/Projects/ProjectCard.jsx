import React, { useState, useEffect } from "react";
import MinTitle from "../../Layout/Title/MinTitle";
import MidTitle from "../../Layout/Title/MidTitle";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api/Api";

const ProjectCard = ({ data }) => {
  const { 
    description, 
    thumbnail, 
    id, 
    name, 
    slug, 
    info,
    category_name,
    category_id
  } = data;
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  // Get primary info from the info array
  const primaryInfo = info?.find(item => item.info_type === "primary") || info?.[0];
  
  // Generate project slug if not provided
  const generateSlug = (projectName) => {
    return projectName
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Truncate description
  const truncatedDesc = description?.length > 96 
    ? `${description.slice(0, 96)}...` 
    : description || primaryInfo?.info_details?.slice(0, 96) || '';

  // Handle navigation to single project
  const handleProjectClick = () => {
    const projectSlug = slug || generateSlug(name);
    
    navigate(`/project/${projectSlug}`, { 
      state: { 
        projectId: id, 
        slug: projectSlug,
        projectData: data 
      } 
    });
  };

  // Handle image loading
  useEffect(() => {
    if (thumbnail) {
      const img = new Image();
      img.src = `${api}/storage/${thumbnail}`;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => {
        console.error(`Failed to load image: ${thumbnail}`);
        setImageError(true);
        setIsLoaded(true);
      };
    } else {
      setIsLoaded(true); // No image to load
    }
  }, [thumbnail]);

  // Get image URL with fallback
  const getImageUrl = () => {
    if (!thumbnail || imageError) {
      return "https://images.unsplash.com/photo-1518834103327-0d0b419cee9e?w=600&h=400&fit=crop";
    }
    return `${api}/storage/${thumbnail}`;
  };

  return (
    <div 
      onClick={handleProjectClick}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-theme hover:border-opacity-30">
        {/* Category Badge */}
        {category_name && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-theme bg-opacity-90 text-white rounded-full backdrop-blur-sm">
              {category_name}
            </span>
          </div>
        )}

        {/* ID Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-black bg-opacity-60 text-white rounded-full">
            #{id.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Image Container */}
        <div className="relative overflow-hidden h-48 sm:h-56 md:h-52 lg:h-60 xl:h-64">
          {!isLoaded ? (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-xl"></div>
          ) : null}
          
          <img
            src={getImageUrl()}
            alt={name || "Project Image"}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onError={() => setImageError(true)}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* View Project Button */}
          <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-theme text-white py-3 px-4 flex items-center justify-center gap-2 font-medium hover:bg-opacity-90 transition-colors">
              <span>View Project</span>
              <MdKeyboardArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <MidTitle 
            text={name || "Unnamed Project"} 
            className="text-gray-800 font-semibold mb-2 group-hover:text-theme transition-colors line-clamp-1"
          />
          
          {truncatedDesc && (
            <MinTitle
              text={truncatedDesc}
              className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4"
            />
          )}

          {/* Tech Stack Tags (if info available) */}
          {primaryInfo && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {primaryInfo.info_type || "Info"}
              </span>
            </div>
          )}

          {/* Arrow indicator */}
          <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-theme bg-opacity-10 flex items-center justify-center">
              <MdKeyboardArrowRight className="text-theme" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;