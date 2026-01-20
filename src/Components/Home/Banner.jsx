import React, { useEffect, useState } from 'react'
import Container from '../../Layout/Container'
import MinTitle from '../../Layout/Title/MinTitle'
import MidTitle from '../../Layout/Title/MidTitle'
import ExtraLargeTitle from '../../Layout/Title/ExtraLargeTitle'
import PrimaryButton from '../../Layout/Button/PrimaryButton'
import { IoArrowRedo } from 'react-icons/io5'
import axios from 'axios'
import { api, bannerApi } from '../../Api/Api'
import shapeRing from "../../assets/Banner/shapeRing.png"
import shapeSend from "../../assets/Banner/shapeSend.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
import shapeDot from "../../assets/Banner/shapeDot.png"
import shapeEllipse from "../../assets/Banner/shapeEllipse.png"
import shapeZebra from "../../assets/Banner/shapeZebra.png"

const Banner = () => {
    const [bannerData, setBannerData] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await axios.get(bannerApi)
            setBannerData(response.data?.banner?.contents || [])
            console.log(response);
        }
        fetchApi()
    }, [])


    useEffect(() => {
        AOS.init({
            once: false, // or true, depending on whether you want animation only once
            // other global settings
        });
    }, []);
    return (
        <div className="div">
                <ExtraLargeTitle className="text-center py-12 font-light tracking-widest !text-[80px]" text="Setting Standards"/>

        <div className='py-sectionSm md:py-sectionMd lg:py-sectionLg bg-no-repeat bg-center bg-cover relative bg-static' >
            <img
                src={shapeDot}
                alt="shape"
                className="absolute bottom-10 right-0 w-[460px]   z-2"
            />

            {/* SHAPE 2 (Ellipse) */}
            <img
                src={shapeEllipse}
                alt="shape"
                className="absolute bottom-[-35%] left-[-5%] w-[650px] hidden md:flex  z-2"
            />

            {/* SHAPE 3 (Zebra) */}
            <img
                src={shapeZebra}
                alt="shape"
                className="absolute bottom-[-35%] left-[-5%] w-[650px] hidden md:flex opacity-20 rotate-12 z-2"
            />
            <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2  relative">
                    <div className="pt-8">
                        <div data-aos="fade-right" data-aos-duration="1000" className="text-center md:text-left">
                            <MidTitle
                                className="bg-[#2B2631] px-6 py-2 text-secondary inline-block rounded-full"
                                text="Solution for your Digital Products"
                            />
                        </div>
                        <div data-aos="fade-right" data-aos-duration="1000" className="text-secondary py-8 md:py-10 text-5xl sm:text-6xl md:text-8xl text-center md:text-left">
                            <p className='font-bold'>Your Vision, Our <br /></p>
                            <p className='text-5xl sm:text-6xl md:text-7xl'>Digital Expertise</p>
                        </div>
                        <div data-aos="fade-right" data-aos-duration="1000" className="">
                            <MidTitle className="text-secondary text-center md:text-left md:w-[60%]" text="Highlights the partnership between the client’s vision and the agency’s technical and creative skills." />

                        </div>
                        <div data-aos="fade-right" data-aos-duration="1000" className="flex flex-col items-center md:items-start">
                            <PrimaryButton
                                icon={<IoArrowRedo />}
                                slug="about-us"
                                className="!text-primary mt-10 w-[60%] md:w-[40%] uppercase"
                                text="Discover More"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 pt-12 md:pt-0">

                        {/* Shapes */}
                        <div className="shape absolute top-2 left-[30rem] animate-bounce-top [animation-duration:2s]">
                            <img src={shapeRing} alt="" />
                        </div>
                        <div className="shape absolute bottom-2 left-[20rem] animate-bounce-left [animation-duration:2s]">
                            <img src={shapeSend} alt="" />
                        </div>

                        {/* Left main banner → bannerData[0] */}
                        <div className="flex items-center justify-center">
                            <div data-aos="fade-down" className="relative group p-2 md:p-3 border-[6px] border-gray-200 rounded-l-full rounded-t-full shadow-md overflow-hidden">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                                    translate-x-[-100%] rotate-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></span>

                                <img
                                    data-aos-duration="1000"
                                    src={`${api}/storage/${bannerData?.[0]?.file}`}
                                    alt="Banner 1"
                                    className="w-full aspect-[2/4] max-h-[250px] md:max-h-[550px] object-cover rounded-l-full rounded-t-full"
                                />
                            </div>
                        </div>

                        {/* Right 2 banners → bannerData[1] & bannerData[2] */}
                        <div className="flex flex-col gap-6">
                            {[1, 2].map((pos, index) => (
                                bannerData[pos] && (
                                    <div data-aos="fade-left" data-aos-duration="1000" key={pos} className="flex items-center gap-6 justify-center md:justify-end">
                                        <div
                                            className={`relative group p-2 md:p-3 border-2 border-gray-200 shadow-md overflow-hidden
                                                ${index === 0
                                                    ? "rounded-r-full rounded-b-full"
                                                    : "rounded-r-full rounded-t-full"
                                                }`}
                                        >
                                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                                                translate-x-[-100%] rotate-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></span>

                                            <img
                                                src={`${api}/storage/${bannerData[pos]?.file}`}
                                                alt={`Banner ${pos + 1}`}
                                                className={`w-full aspect-[4/4] max-h-[100px] md:max-h-[250px] object-cover 
                                                    ${index === 0
                                                        ? "rounded-r-full rounded-b-full"
                                                        : "rounded-r-full rounded-t-full"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
        </div>
    )
}

export default Banner
