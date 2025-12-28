import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
const TertiaryButton = ({ className, text, slug, disabled, icon , ...rest}) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate()
  const handleButtonClick = () => {
    setIsClicked(true);

    // Set a timeout to reset the click state after a brief moment
    setTimeout(() => setIsClicked(false), 200); // 200ms delay
    if(slug){
      navigate(`/${slug}`);
    }
  };
    // Animation
useEffect(() => {
  AOS.init({
    once: false, // or true, depending on whether you want animation only once
    // other global settings
  });
}, []);
  return (
    <div
    {...rest}
    onClick={handleButtonClick}
    disabled={disabled}
      className={`relative inline-block px-2 sm:px-2 md:px-5 py-1 sm:py-[6px] md:py-[6px] lg:py-3  text-sm lg:text-base text-center  font-medium border-2 border-theme bg-theme rounded-md cursor-pointer text-white uppercase ${className} overflow-hidden group`}
    >

        <span className="flex items-center gap-2 justify-center relative z-20 transition-colors duration-0 ease-in-out group-hover:text-theme group-active:text-secondary">
        {
          icon && <p >{icon}</p>
        }
        {text}
      </span>
        <div className="absolute inset-0 bg-[#fff] transition-transform duration-300 ease-in-out transform translate-x-full group-hover:translate-x-0 group-active:bg-theme z-10"></div>
    </div>
  );
};

export default TertiaryButton;

