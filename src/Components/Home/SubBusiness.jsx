import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import { FiExternalLink } from "react-icons/fi";

import amigofabric from "../../assets/SubBrand/amigofabric.png";
import jamidary from "../../assets/SubBrand/jamidary.png";
import jmcfts from "../../assets/SubBrand/jmcfts.png";
import lavogos from "../../assets/SubBrand/lavogos.png";
import proyojon from "../../assets/SubBrand/proyojon.png";
import shelaigor from "../../assets/SubBrand/shelaigor.png";
import thikanashop from "../../assets/SubBrand/thikanashop.png";

import Container from "../../Layout/Container";
import MidTitle from "../../Layout/Title/MidTitle";
import { FaPlus } from "react-icons/fa";

const subBrandData = [
  { name: "Amigo Fabric", title: "Premium Textile Brand", img: amigofabric, link: "https://amigofabric.com" },
  { name: "Jamidary", title: "Traditional Wear", img: jamidary, link: "https://jamidary.com" },
  { name: "JMC FTS", title: "Fashion & Textile", img: jmcfts, link: "https://jmcfts.com" },
  { name: "Lavogos", title: "Lifestyle Brand", img: lavogos, link: "https://lavogos.com" },
  { name: "Proyojon", title: "E-commerce Platform", img: proyojon, link: "https://arizonbd.com" },
  { name: "Shelaigor", title: "Ethnic Clothing", img: shelaigor, link: "https://shelaigor.com" },
  { name: "Thikana Shop", title: "Online Store", img: thikanashop, link: "https://thikanashop.com" },
];

const SubBusiness = () => {
  return (
    <div className="relative bg-secondary py-16">
      <MidTitle
        className="text-primary pb-10 font-semibold uppercase text-center"
        text="1K+ Brands Trust Us"
      />

      <Container>
        <div className="relative">
          {/* Arrows */}
          <div className="sub-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 w-10 h-10 flex items-center justify-center">
            ←
          </div>
          <div className="sub-next absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 w-10 h-10 flex items-center justify-center">
            →
          </div>

          <Swiper
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1224: { slidesPerView: 4 },
            }}
            spaceBetween={16}
            loop
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={{ prevEl: ".sub-prev", nextEl: ".sub-next" }}
            modules={[Navigation, Autoplay]}
          >
            {subBrandData.map((item, index) => (
              <SwiperSlide key={index}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block h-[320px] overflow-hidden"
                >
                  {/* Image */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Center icon (visible initially, hidden on hover) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-full group-hover:opacity-0 transition-opacity duration-300 z-20 pointer-events-none">
                  <FaPlus className="text-white text-5xl p-4 bg-themeDeep text-secondary rounded-full" />
                  </div>

                  {/* Overlay - FIXED VERSION */}
                  <div
                    className="
                      absolute bottom-0 left-0 w-full
                      bg-black/70
                      h-16
                      group-hover:h-full
                      transition-all duration-500 ease-out
                      z-10
                      flex flex-col justify-end
                      p-4
                    "
                  >
                    {/* Name — ALWAYS visible */}
                    <h4 className="text-white text-lg font-semibold">
                      {item.name}
                    </h4>

                    {/* Title — initially hidden, shown on hover */}
                    <div className="overflow-hidden">
                      <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default SubBusiness;