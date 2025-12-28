import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import "./styles.css"
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import img from "../../assets/Testimonial/testimonialMan.webp"
import FemaleImg from "../../assets/Testimonial/testimonialFemale.jpg"
// import CardBox from '../../Layout/CardBox';
import { FaQuoteLeft } from 'react-icons/fa6';
import MinTitle from '../../Layout/Title/MinTitle';
import MidTitle from '../../Layout/Title/MidTitle';
import Container from '../../Layout/Container';
import SectionTitle from '../../Layout/Title/SectionTitle';
import LargeTitle from '../../Layout/Title/LargeTitle';
import ExtraMidTitle from '../../Layout/Title/ExtraMidTitle';
import axios from 'axios';
import { api, testimonialsApi } from '../../Api/Api';
import AOS from 'aos';
import 'aos/dist/aos.css';
export const testimonialData = [
  {
    testimonialImg: FemaleImg,
    testimonialDesc: "Skilled Frontend Developer with expertise in HTML, CSS, and JavaScript. With 3 years of experience, I create responsive and user-friendly interfaces that enhance the user experience. Passionate about modern web design trends and best practices.",
    personName: "Emily Johnson",
    personPosition: "Senior Frontend Developer"
  },
  {
    testimonialImg: img,
    testimonialDesc: "Experienced Backend Developer with a solid background in server-side technologies. Over 5 years of experience in building scalable and efficient APIs using Node.js and Express. Adept at database management and optimization.",
    personName: "Michael Brown",
    personPosition: "Backend Developer"
  },
  {
    testimonialImg: FemaleImg,
    testimonialDesc: "Proficient Full Stack Developer with a focus on MERN stack. Over 4 years of experience in developing end-to-end web applications. Strong skills in React for building dynamic user interfaces and Node.js for server-side logic.",
    personName: "Sophia Davis",
    personPosition: "Full Stack Developer"
  },
  {
    testimonialImg: img,
    testimonialDesc: "Talented Native Mobile Developer with a passion for creating seamless mobile experiences. 3 years of experience in developing high-performance iOS and Android apps using React Native. Committed to delivering user-centric solutions.",
    personName: "Ethan Wilson",
    personPosition: "Mobile Developer"
  },
  {
    testimonialImg: FemaleImg,
    testimonialDesc: "Frontend Specialist with a knack for crafting visually appealing and interactive websites. 4 years of experience in utilizing frameworks like Vue.js and Angular to build robust web applications. Strong advocate for clean and maintainable code.",
    personName: "Olivia Martinez",
    personPosition: "Frontend Specialist"
  },
  {
    testimonialImg: img,
    testimonialDesc: "Seasoned Backend Engineer with extensive experience in microservices architecture and cloud computing. 6 years of experience in designing and implementing scalable backend systems using technologies like Docker, Kubernetes, and AWS.",
    personName: "William Anderson",
    personPosition: "Backend Engineer"
  },
  {
    testimonialImg: FemaleImg,
    testimonialDesc: "Full Stack Web Developer with a passion for innovation and problem-solving. 5 years of experience in building responsive and high-performing web applications using the LAMP stack. Strong background in PHP and MySQL.",
    personName: "Ava Thomas",
    personPosition: "Web Developer"
  },
  {
    testimonialImg: img,
    testimonialDesc: "Expert React Developer with a focus on building reusable components and front-end libraries. 3 years of experience in creating modern web applications that prioritize performance and user experience. Proficient in Redux and Hooks.",
    personName: "Lucas Taylor",
    personPosition: "React Developer"
  },
  {
    testimonialImg: FemaleImg,
    testimonialDesc: "Dedicated Backend Developer with a focus on security and performance. 4 years of experience in developing RESTful APIs and managing databases using PostgreSQL and MongoDB. Skilled in optimizing server-side operations.",
    personName: "Mia Harris",
    personPosition: "Backend Developer"
  },
  {
    testimonialImg: img,
    testimonialDesc: "Versatile Native Mobile Developer with expertise in both iOS and Android development. 5 years of experience in building user-friendly and feature-rich mobile applications. Proficient in Swift, Kotlin, and Flutter.",
    personName: "James Robinson",
    personPosition: "Mobile Developer"
  },
];
const TestimonialOverview = () => {
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
      <div className="pb-sectionSm md:pb-sectionMd lg:pb-sectionLg  bg-secondary md:px-40 relative">
        <Container>
          <div className="pb-4 sm:pb-6 md:pb-12">
            <div className="flex items-center justify-center">
              <SectionTitle data-aos="fade-up" data-aos-duration="1000" text="testimonials" />
            </div>
            <div data-aos="fade-up" data-aos-duration="1000" className="">
            <LargeTitle
              className=" font-bold w-[70%] md:w-[50%] m-auto text-center pt-2 md:pt-4 text-primary animate__animated animate__bounce"
              text="What They’re Talking About Us?"
            />
            </div>

          </div>
          <Swiper
          data-aos="fade-up" data-aos-duration="1000"
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
              testimonialData?.map((item) => {
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
                        <MidTitle text={item?.feedback} className="!text-tertiary font-secondary py-2 h-[180px] sm:h-[180px] lg:h-auto" />
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
        </Container>
      </div>
    </>
  )
}

export default TestimonialOverview