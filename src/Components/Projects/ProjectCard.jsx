import React, { useState, useEffect } from "react";
import MinTitle from "../../Layout/Title/MinTitle";
import MidTitle from "../../Layout/Title/MidTitle";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../Api/Api";

const ProjectCard = ({
  data
}) => {
const {description ,image , id , product_name , slug} = data
const [isLoaded , setIsLoaded] = useState(false)
const navigate = useNavigate()
  // Truncate projectDesc to 76 characters
  const truncatedDesc =
    description?.length > 96 ? description?.slice(0, 96) + "..." : description;

  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true); // Set isLoaded to true when the image is fully loaded
  };
  const GoSingleProject = async () => {
    console.log("ok");
    const projectSlug = product_name
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-')    // Replace spaces with hyphens
        .replace(/-+/g, '-')     // Replace multiple hyphens with single hyphen
        .trim();
    navigate(`/project/${projectSlug}`, { state: { projectId: id , slug : slug} });
};
  // Trigger image load effect
  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = handleImageLoad; // Trigger on image load
    }
  }, [image]);
  return (
    <div onClick={GoSingleProject}>
      <div className="group/outer relative overflow-hidden bg-opacity-[0.2] rounded-md  shadow-lg hover:shadow-xl border-2 border-theme border-opacity-[0.1]">
        {/* Skeleton Loading */}

          {/* <div className=" shadow rounded-md max-w-sm w-full mx-auto">
            <div className="animate-pulse flex flex-col">
              <div className="overflow-hidden h-[220px] sm:h-[220px] md:h-[150px] lg:h-[200px] xl:h-[250px] relative ">
                <div className="h-full bg-slate-200 rounded-md"></div>
              </div>
              <div className="p-4">
                <div className="h-4 bg-slate-200 rounded col-span-2 w-3/4 my-2 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-2 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-2 bg-slate-200 rounded w-1/3 mb-2"></div>
                </div>
              </div>
            </div>
          </div> */}


        {/* Main Content - After Image is Loaded */}

          <>
            <MinTitle
              text={id}
              className="py-[3px] px-3 !text-[12px] rounded-sm bg-theme bg-opacity-[0.6] inline-block text-secondary absolute right-0 top-0 z-[2]"
            />
            <div className="overflow-hidden h-[220px] sm:h-[220px] md:h-[150px] lg:h-[200px] xl:h-[250px] relative">
              <img
                loading="lazy"
                src={`${api}/storage/${image}`}
                alt="Project"
                onLoad={handleImageLoad} // Trigger on image load
                className="w-full h-auto transform transition-transform duration-[6000ms] ease-in group-hover/outer:-translate-y-[calc(100%-250px)] group-hover:animation-paused"
                srcSet={`${api}/storage/${image}?w=300 300w, ${api}/storage/${image}?w=600 600w, ${api}/storage/${image}?w=1200 1200w`} // Example of responsive image loading
              />
              <Link
                to={id}
                className={`absolute bottom-0 left-0 z-2 bg-theme bg-opacity-[0.7] w-full text-secondary text-xl cursor-pointer font-medium duration-300 items-center gap-1 inline-block duration-300 justify-center hidden group-hover/outer:flex duration-1000 group/inner`}
              >
                <MidTitle
                  text="View Project"
                  className="text-secondary font-secondary !text-[16px]"
                />
                <MdKeyboardArrowRight className="text-secondary group-hover/inner:ml-2 duration-300 mt-[2px]" />
              </Link>
            </div>
            <div className="p-4">
              <MidTitle text={product_name} className="text-left py-1 group-hover/outer:!text-theme duration-300 font-secondary" />
              <MinTitle
                text={truncatedDesc}
                className="text-left h-[40px] sm:h-[35px] md:h-[50px] lg:h-[70px] xl:h-[60px] text-[#535353] font-secondary pb-4"
              />
            </div>
          </>

      </div>
    </div>
  );
};

export default ProjectCard;
