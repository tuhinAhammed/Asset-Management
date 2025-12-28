
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import "./styles.css"
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import img from "../assets/Testimonial/testimonialMan.webp"
import FemaleImg from "../assets/Testimonial/testimonialFemale.jpg"
// import CardBox from '../Layout/CardBox';
import { FaQuoteLeft } from 'react-icons/fa6';
import MinTitle from '../Layout/Title/MinTitle';
import MidTitle from '../Layout/Title/MidTitle';
import Container from '../Layout/Container';
import SectionTitle from '../Layout/Title/SectionTitle';
import LargeTitle from '../Layout/Title/LargeTitle';
import ExtraMidTitle from '../Layout/Title/ExtraMidTitle';
import axios from 'axios';
import { api, testimonialsApi } from '../Api/Api';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Breadcrumb from '../Layout/Breadcrumb/Breadcrumb';

const Testimonials = () => {
  const [loading, setLoading] = useState(true);
  const [testimonialData, setTestimonialData] = useState([]);

  useEffect(() => {
    const fetchFaq = async () => {
      setLoading(true);
      try {
        const res = await axios.get(testimonialsApi);
        setTestimonialData(res.data.list); // Your API returns a single array
        setLoading(false);
        console.log(res);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchFaq();
  }, []);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
      // Animation
      useEffect(() => {
        AOS.init({
          once: false,
          mirror: true,
        });
      }, []);
  return (
    <>
<Breadcrumb title="Testimonials" />
      <style>{`
                .swiper {
                    width: 100%;
                    height: 100%;
                }
                
                .swiper-slide {
                    text-align: center;
                    font-size: 18px;
                    background: transparent;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .swiper-slide img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .autoplay-progress {
                    position: absolute;
                    right: 16px;
                    bottom: 36px;
                    z-index: 10;
                    width: 48px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    color: var(--theme-color);
                }

                .autoplay-progress svg {
                    --progress: 0;
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 10;
                    width: 100%;
                    height: 100%;
                    stroke-width: 4px;
                    stroke: var(--theme-color);
                    fill: none;
                    stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
                    stroke-dasharray: 125.6;
                    transform: rotate(-90deg);
                }

                .swiper-pagination-bullet {
                    background: var(--theme-color);
                }
            `}</style>
      <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg  bg-secondary md:px-40 relative" data-aos="fade-up" data-aos-duration="1000">
        <Container>
          <div className="pb-4 sm:pb-6 md:pb-12">
            <div className="flex items-center justify-center">
              <SectionTitle text="testimonials" />
            </div>
            <div  className="">
            <LargeTitle
              className=" font-bold w-[70%] md:w-[50%] m-auto text-center pt-2 md:pt-4 text-primary "
              text="What They’re Talking About Us?"
            />
            </div>

          </div>
          {
             testimonialData?.length < 1 ? <MidTitle className="text-center" text="Testimonial is Empty"/>
             :
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className=""
          >
            {
              testimonialData.map((item) => {
                const { testimonialImg, testimonialDesc, personName, personPosition } = item
                return (

                  <SwiperSlide className='!bg-transparent ' key={personName}>
                    {/* <CardBox className={` !p-6 lg:!p-10`}> */}
                    <div className="inner grid grid-cols-1 lg:grid-cols-4 gap-100 lg:gap-10 py-[20px]">
                      <div className="overflow-hidden rounded-full mx-auto lg:ml-0 lg:rounded-lg lg:col-span-1">
                        <img
                          src={`${api}/storage/${item.image}`}
                          alt="img"
                          className="rounded-lg aspect-[4/4] max-h-[80px] md:max-h-full"
                        />
                      </div>
                      <div className="desc lg:col-span-3 text-left">
                        <FaQuoteLeft className='text-theme text-[40px] lg:text-[80px] leading-none' />
                        <ExtraMidTitle text={item?.feedback} className="!text-tertiary font-secondary py-2 h-[130px] sm:h-[180px] lg:h-auto" />
                        <MidTitle text={item?.name
                        } className="text-theme" />
                        <MinTitle text={item?.profession
                        } />
                      </div>

                    </div>
                    {/* </CardBox> */}
                  </SwiperSlide>
                )
              })
            }

            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
          }
        </Container>
      </div>
    </>
  )
}

export default Testimonials