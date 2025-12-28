import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Autoplay } from "swiper/modules";

import amigofabric from "../../assets/SubBrand/amigofabric.png";
import jamidary from "../../assets/SubBrand/jamidary.png";
import jmcfts from "../../assets/SubBrand/jmcfts.png";
import lavogos from "../../assets/SubBrand/lavogos.png";
import proyojon from "../../assets/SubBrand/proyojon.png";
import shelaigor from "../../assets/SubBrand/shelaigor.png";
import thikanashop from "../../assets/SubBrand/thikanashop.png";

import Container from "../../Layout/Container";
import MidTitle from "../../Layout/Title/MidTitle";

const subBrandData = [
    {
        img: amigofabric,
        link: "https://amigofabric.com",
    },
    {
        img: jamidary,
        link: "https://jamidary.com",
    },
    {
        img: jmcfts,
        link: "https://jmcfts.com",
    },
    {
        img: lavogos,
        link: "https://lavogos.com",
    },
    {
        img: proyojon,
        link: "https://arizonbd.com",
    },
    {
        img: shelaigor,
        link: "https://shelaigor.com",
    },
    {
        img: thikanashop,
        link: "https://thikanashop.com",
    },
];

const SubBrands = () => {
    const GoSingleBrand = () => {
        console.log("ok");
    }
    return (
        <div className=" relative bg-secondary">
            <MidTitle
                className="text-primary pb-6 md:pb-sectionMd font-semibold !uppercase text-center"
                text="1K+ Brands Trust Us"
            />
            <Container>
                <Swiper
                    slidesPerView={2}
                    breakpoints={{
                        768: { slidesPerView: 4 },
                    }}
                    spaceBetween={12}
                    freeMode={true}        // Enables drag/scroll
                    autoplay={{            // Auto-scroll every 3 seconds
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}            // Loop continuously
                    modules={[FreeMode, Autoplay]}
                >
                    {subBrandData.map((item, index) => (
                        <SwiperSlide key={index} className="flex justify-center">
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative cursor-pointer group"
                            >
                                <div className="h-[60px] md:h-[80px] w-full flex items-center justify-center bg-white overflow-hidden">
                                    <img
                                        src={item.img}
                                        alt=""
                                        className="max-w-full max-h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
                                    />
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </div>
    );
};

export default SubBrands;
