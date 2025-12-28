import React, { useEffect, useState } from "react";
import SectionTitle from "../../Layout/Title/SectionTitle";
import LargeTitle from "../../Layout/Title/LargeTitle";
import ExtraLargeTitle from "../../Layout/Title/ExtraLargeTitle";
import Container from "../../Layout/Container";
import axios from "axios";
import { api, serviceListApi } from "../../Api/Api";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import serviceOverviewBg from "../../assets/Service/serviceOverviewBg.jpg"
import defaultService from "../../assets/Service/defaultService.png"
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ServiceOverview = () => {
  const [servicesData, setServicesData] = useState([]);
  const navigate = useNavigate();
  const goSingleService = async ({name , id}) => {
    const slug = name
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-')    // Replace spaces with hyphens
        .replace(/-+/g, '-')     // Replace multiple hyphens with single hyphen
        .trim();
    navigate(`/service/${slug}`, { state: { id: id } });
};
  useEffect(() => {
    const fetchApi = async () => {
      const response = await axios.get(serviceListApi);
      setServicesData(response?.data?.list || []);
    };
    fetchApi();
  }, []);

  // Animation
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  return (
    <div
    
      className="py-sectionSm md:py-sectionMd lg:py-sectionLg bg-no-repeat bg-center bg-cover relative"
      style={{ backgroundImage: `url(${serviceOverviewBg})` }}
    >
      {/* Overlay (optional for darken effect) */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

      <Container>
        <div className="z-10">
          <div className="flex items-center justify-center">
            <SectionTitle data-aos="fade-down" data-aos-duration="1000" text="Our Services" />
          </div>
          <div className="">
            <LargeTitle
              data-aos="fade-down" data-aos-duration="1000"
              className="font-bold w-[80%] md:w-[60%] m-auto text-center pt-2 md:pt-4 text-secondary "
              text="Empower Your Business With Innovative Digital Services"
            />
          </div>

          {/* List of Services */}
          <div data-aos="fade-up" data-aos-duration="500" className="pt-5 sm:pt-6 md:pt-8 lg:pt-10 divide-y divide-white/30">
            {servicesData.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => goSingleService({ name: item.service_title, id: item?.id })}
                  className="md:flex md:justify-between items-center py-3 md:py-8 group cursor-pointer transition-all duration-500"
                >
                  {/* Left side: ID + Icon + Title */}
                  <div className="md:flex items-center gap-2 md:gap-2">
                    {/* ID */}
                    <LargeTitle
                      className="text-secondary transition-all duration-500 group-hover:text-theme min-w-[40px] hidden md:flex"
                      text={item.id}
                    />

                    {/* Service Icon Container - Hidden by default, slides in on hover */}
                    <div className="flex items-center overflow-hidden">
                      <div className="md:w-0 md:h-24 aspect-[5/2] opacity-100 w-[100%] md:opacity-0 transition-all duration-500 ease-in-out md:group-hover:w-48 md:group-hover:h-24 md:group-hover:opacity-100  rounded-2xl">
                        <img
                          src={item?.icon ? `${api}/storage/${item.icon}` : defaultService}
                          alt="Service Icon"
                          className="w-full h-full object-cover md:object-cover group-hover:rounded-2xl rounded-2xl"
                        />
                      </div>
                    </div>


                    {/* Service title */}
                    <ExtraLargeTitle
                      className="text-secondary !text-2xl md:!text-4xl lg:!text-6xl font-bold transition-all duration-500 group-hover:text-theme py-4 md:py-0 pl-2"
                      text={item.service_title}
                    />
                  </div>

                  {/* Right side Arrow button */}
                  <div
                    className="p-2 sm:p-3 md:p-4 rounded-full bg-tertiary bg-opacity-40 
                             text-secondary text-xl md:text-3xl md:rotate-[-30deg] 
                             transition-all duration-500 ease-in-out inline-block
                             group-hover:bg-theme group-hover:rotate-0 group-hover:text-primary"
                  >
                    <IoIosArrowRoundForward />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ServiceOverview;