import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";

const BreadcrumbPath = ({ slug , className}) => {
  const location = useLocation();

  // Hide breadcrumb if the pathname matches


  const pathnames = location.pathname.split("/").filter((x) => x);

  const path = location.pathname; 
  const desiredPath = path.substring(0, path.lastIndexOf('/')); 
  if (desiredPath === "/dashboard/order") {
    return <p className="text-base text-theme  ">{location.pathname.split("/")[3]}</p>;
  }
  
  // Split the current pathname into parts
  return (
    <nav className={`  ${className}`}>
      <ul className="flex text-xs font-secondary justify-center items-center sm:text-base md:text-lg">
        {/* Home Link */}
        <li>
          <NavLink to="/" className="text-secondary font-secondary opacity-[0.8] hover:underline ">
            Home
          </NavLink>
        </li>
        <li className="">
          <ul className="flex items-center">
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;

              return (
                <React.Fragment key={index}>
                  <li className="text-primary px-2"><RiArrowRightSLine className="text-secondary opacity-[0.8] font-secondary text-xl mt-1" /></li>
                  {slug ? (
                    <li className="">
                      <span className="text-secondary opacity-[0.8]  capitalize">{slug}</span>
                    </li>
                  ) : (
                    <li className="">
                      {isLast ? (
                        <span className="text-secondary opacity-[0.8]  capitalize">
                          {value}
                        </span>
                      ) : (
                        <NavLink
                          to={to}
                          className="text-secondary opacity-[0.8]  hover:underline capitalize"
                        >
                          {value}
                        </NavLink>
                      )}
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default BreadcrumbPath;
