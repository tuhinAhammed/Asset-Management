import React from "react";
import Container from "../../Layout/Container";
import { MdFlatware, MdOutlineDesignServices } from "react-icons/md";
import ExtraMidTitle from "../../Layout/Title/ExtraMidTitle";
import MidTitle from "../../Layout/Title/MidTitle";
import { ImInfo } from "react-icons/im";
import { api } from "../../Api/Api";
import defaultService from "../../assets/Service/defaultService.png"
import { useNavigate } from "react-router";
const ServiceCard = ({ item, index }) => {
  const formattedIndex = String(index + 1).padStart(2, "0");
  const navigate = useNavigate()
  const goSingleService = async () => {
    const slug = item?.service_title
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-')    // Replace spaces with hyphens
        .replace(/-+/g, '-')     // Replace multiple hyphens with single hyphen
        .trim();
    navigate(`/service/${slug}`, { state: { id: item?.id } });
};
  return (
    <div 
    onClick={goSingleService} 
    className="overflow-hidden bg-white group cursor-pointer relative border border-[rgba(0,0,0,0.23)]
      rounded-[10px] py-[17px] px-[16px]">

      <div className="relative aspect-[4/4] max-h-full overflow-hidden rounded-lg">
        <img
          src={item?.icon ? `${api}/storage/${item.icon}` : defaultService}
          alt="Service"
          className="w-full h-full object-cover rounded-[16px]"
        />

        {/* Black overlay */}
        <div className="rounded-lg absolute inset-0 bg-black/40 rounded-[16px] "></div>

        {/* Gradient animation */}
        <div
          className="absolute rounded-lg inset-0 bg-gradient-to-t
          from-theme/100 via-[#f1d59a]/40 to-transparent
          translate-y-full group-hover:translate-y-0
          transition-all duration-700 ease-out "
        ></div>

        {/* Top Left Icon */}
        <div className="absolute top-[-11px] left-[-12px]">
          <div className="relative w-20 h-20 rounded-full flex justify-center items-center
            bg-black text-yellow-400 text-4xl border-[13px] border-white overflow-hidden group">

            <div className="absolute inset-0 bg-yellow-400 scale-0 group-hover:animate-spread"></div>

            <i className="ri-smartphone-line relative z-10 group-hover:text-black">
            <MdOutlineDesignServices />
            </i>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-6 left-6 text-white group-hover:text-[#222429] z-10">
          <MidTitle className="font-medium" text={formattedIndex} />
          <ExtraMidTitle
            className="!text-2xl font-bold leading-tight"
            text={item.service_title}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
