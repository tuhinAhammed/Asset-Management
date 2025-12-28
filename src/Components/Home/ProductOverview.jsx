import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Container from "../../Layout/Container";
import { Mousewheel, Pagination } from 'swiper/modules';
import { api, productListApi } from "../../Api/Api";
import axios from "axios";
import TertiaryButton from '../../Layout/Button/TertiaryButton';
import { FiInfo } from 'react-icons/fi';
import SectionTitle from '../../Layout/Title/SectionTitle';
import LargeTitle from '../../Layout/Title/LargeTitle';
import MidTitle from '../../Layout/Title/MidTitle';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router';

const ProductOverview = () => {
  const [projectData, setProjectData] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchApi = async () => {
      const response = await axios.get(productListApi);
      setProjectData(response?.data?.list || []);
    };
    fetchApi();
  }, []);

  // Animation
  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
    });
  }, []);
  const GoSingleProject = async ({ name, id, slug }) => {

    console.log(name);
    const projectSlug = name
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-')    // Replace spaces with hyphens
      .replace(/-+/g, '-')     // Replace multiple hyphens with single hyphen
      .trim();
    navigate(`/project/${projectSlug}`, { state: { slug: slug } });
  };
  return (
    <Container>

      <div className="w-full h-screen overflow-hidden md:py-sectionLg">
        <div className="flex items-center justify-center">
          <SectionTitle
            data-aos="fade-down"
            data-aos-duration="1000"
            text="Recent Product"
          />
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <LargeTitle
            className="md:pb-8 font-bold w-[80%] md:w-[60%] m-auto text-center pt-2 md:pt-4 text-primary animate__animated animate__bounce"
            text="We Have Complete 1000+ Awards Winning Projects"
          />
        </div>

        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={0}
          mousewheel={{ releaseOnEdges: true }}   // ✅ FIX ADDED
          pagination={{ clickable: true }}
          modules={[Mousewheel, Pagination]}
          className="mySwiper h-full"
          breakpoints={{
            0: { direction: "horizontal" },
            768: { direction: "vertical" },
          }}
        >
          {projectData.map((item, index) => (
            <SwiperSlide key={index} className="h-full">
              <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center h-full md:py-10">

                  {/* LEFT CONTENT */}
                  <div className="flex flex-col items-start p-6 md:p-0 h-full md:pl-12 justify-center bg-[#1A1A34]">
                    <h1
                      className="text-3xl md:text-5xl font-bold text-secondary"
                    >
                      {item.product_name}
                    </h1>

                    <div >
                      <MidTitle
                        className="text-secondary max-w-xl py-4 md:py-6 text-left md:pr-12"
                        text={item.description}
                      />
                    </div>
                    <div onClick={() => GoSingleProject({ name: item.product_name, id: item.id, slug: item.slug })} className="">
                      <TertiaryButton
                        icon={<FiInfo />}
                        slug=""
                        text="Get Started"
                      />
                    </div>
                  </div>

                  {/* RIGHT IMAGE */}

                  <div className="">
                    <div className="w-full md:w-3/4 aspect-[4/3]">
                      <img
                        src={`${api}/storage/${item.image}`}
                        alt={item.product_name}
                        className="w-full h-full object-contain shadow-lg rounded-lg"
                      />
                    </div>
                  </div>

                </div>
              </Container>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default ProductOverview;
