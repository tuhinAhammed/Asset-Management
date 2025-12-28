import React, { useEffect } from 'react'
import Container from '../../Layout/Container'
import SectionTitle from '../../Layout/Title/SectionTitle'
import LargeTitle from '../../Layout/Title/LargeTitle'
import { FaBezierCurve } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdCall } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { api } from '../../Api/Api';
import textRound from "../../assets/About/textRound.png"
import MidTitle from '../../Layout/Title/MidTitle';
import MinTitle from '../../Layout/Title/MinTitle';
import ExtraMidTitle from '../../Layout/Title/ExtraMidTitle';
import founderImg from "../../assets/About/founderImg.png"
import founderSignature from "../../assets/About/founderSignature.png"
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { useSelector } from 'react-redux';
const AboutOurCompany = ({ bannerData }) => {
  const { logo, company_phone } = useSelector(
    (state) => state.landingPageData?.data || {}
  );
  useEffect(() => {
    AOS.init({
      once: false, // or true, depending on whether you want animation only once
      // other global settings
    });
  }, []);
  return (
    <div className='py-sectionSm md:py-sectionMd lg:py-sectionLg '>
      <Container>
        <div className='grid md:grid-cols-2 gap-12 md:gap-16'>
          <div className="w-full flex justify-center items-center">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">

              {/* Left Big Image */}
              <div>
                <img
                  src={`${api}/storage/${bannerData?.[0]?.file}`}
                  className="w-full h-[500px] object-cover rounded-3xl"
                />
              </div>

              {/* Right Side (2 stacked images) */}
              <div className="flex flex-col gap-6">
                <img
                  src={`${api}/storage/${bannerData?.[1]?.file}`} alt="About Our Company"
                  className="w-full h-[240px] object-cover rounded-3xl"
                />
                <img
                  src={`${api}/storage/${bannerData?.[2]?.file}`} alt="About Our Company"
                  className="w-full h-[240px] object-cover rounded-3xl"
                />
              </div>

              {/* Center Rotating Logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-circle-spin z-10">
                <img
                  src={textRound}
                  alt="logo"
                  className="w-32 h-32"
                />
              </div>

            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="1000">
            <SectionTitle text="About Our Company" />
            <LargeTitle className="font-bold pt-2 md:pt-4 font-primary text-primary" text="We Deliver Innovative Ideas To Elevate Your Digital Agency." />
            <MidTitle className="text-tertiary font-secondary py-6 md:py-8" text="Skilify Tech is a modern digital solutions and learning-focused agency committed to building smart, scalable, and high-quality technology services.
 We combine innovation, creativity, and technical expertise to help businesses grow and individuals enhance their skills." />
            <div className="md:px-3 ">
              <div className="flex items-center gap-4 md:gap-12 bg-white md:shadow rounded-full  py-4 group transition-all duration-300"
              >
                {/* Icon Circle */}
                <div
                  className="p-6 md:p-8 bg-theme bg-opacity-[0.4] rounded-full flex items-center justify-center transition-all text-2xl md:text-4xl text-blacktransition-all duration-500 group-hover:text-primary duration-500group-hover:bg-theme group-hover:flip-y"
                >
                  <FaBezierCurve
                    className=""
                  />
                </div>

                {/* Text */}
                <ExtraMidTitle text="We have more then 50+ year of services experience" className="font-semibold text-gray-900 md:w-[70%]" />

              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-6 sm:gap-12 py-8'>
              <div className="">
                <a href={`tel:${company_phone}`} target='_blank' className=" group flex gap-4 items-center rounded-bl-3xl bottom-0 right-[25%] rounded-lg z-[2]">
                  <div className="icon text-xl  bg-theme p-2 md:p-3 text-primary rounded-full ">
                    <MdOutlineWifiCalling3 className='transform transition-transform duration-300 group-hover:-scale-x-100' />
                  </div>
                  <div className="">
                    <MinTitle className="text-tertiary" text="Call us anytime" />
                    <MidTitle className="text-primary" text={company_phone} />
                  </div>
                </a>
              </div>
              <div className="flex gap-4 items-center order-1 md:order-2">
                <div className="aspect-[1/1] max-h-[55px] border-2 border-tertiary rounded-full">
                  <img src={founderImg} alt="" className='rounded-full w-full object-fill' />
                </div>
                <div className="">
                  <img src={founderSignature} alt="" className='rounded-full w-full object-fill' />
                  <MinTitle className="font-bold md:mt-2 text-theme" text="Founder" />
                </div>
              </div>


            </div>


          </div>
        </div>
      </Container>
    </div>
  )
}

export default AboutOurCompany