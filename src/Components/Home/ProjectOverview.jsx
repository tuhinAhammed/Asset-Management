import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import Container from "../../Layout/Container";
import { useNavigate } from 'react-router';

import p1 from "../../assets/Projects/asset-1.png";
import p2 from "../../assets/Projects/asset-2.png";
import p3 from "../../assets/Projects/asset-3.png";
import LargeTitle from '../../Layout/Title/LargeTitle';
import MidTitle from '../../Layout/Title/MidTitle';
import MinTitle from '../../Layout/Title/MinTitle';
import PrimaryButton from '../../Layout/Button/PrimaryButton';

const productDataJson = [
  { name: "Dhaka Tower", category: "Commercial", location: "Dhaka - 1007 - Mohammadpur", slug: "/", image: p1 },
  { name: "City Heights", category: "Commercial", location: "Gulshan - Dhaka", slug: "/", image: p2 },
  { name: "Skyline Plaza", category: "Landmark", location: "Banani - Dhaka", slug: "/", image: p3 },
];

const ProjectOverview = () => {
  const navigate = useNavigate();

  const goSingleProject = (name, slug) => {
    const projectSlug = name
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    navigate(`/project/${projectSlug}`, { state: { slug } });
  };

  return (
    <div>
      <style>{`
        .projectSwiper { width: 100%; height: 650px; position: relative; }

        .project-slide { position: relative; width: 100%; height: 100%; overflow: hidden; }

        .project-slide img {
          width: 100%; height: 100%; object-fit: cover;
          transform: scale(1.05); transition: transform 6s ease;
        }

        .swiper-slide-active .project-slide img { transform: scale(1); }

        .project-content {
          position: absolute; top: 50%; left: 80px;
          transform: translateY(-50%); max-width: 420px; color: #fff; z-index: 2;
        }

        .project-category,
        .project-content h2,
        .project-content p,
        .project-btn,
        .project-controls {
          opacity: 0; transform: translateY(20px); transition: all 0.8s ease;
        }

        .swiper-slide-active .project-category { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
        .swiper-slide-active h2 { opacity: 1; transform: translateY(0); transition-delay: 0.35s; }
        .swiper-slide-active p { opacity: 1; transform: translateY(0); transition-delay: 0.5s; }
        .swiper-slide-active .project-btn { opacity: 1; transform: translateY(0); transition-delay: 0.65s; }
        .swiper-slide-active .project-controls { opacity: 1; transform: translateY(0); transition-delay: 0.8s; }

        .project-category { font-size: 14px; letter-spacing: 2px; text-transform: uppercase; opacity: 0.85; }
        .project-content h2 { font-size: 42px; margin: 12px 0; }
        .project-content p { font-size: 15px; line-height: 1.6; opacity: 0.9; }
        .project-btn { margin-top: 22px; padding: 12px 28px; background: #fff; color: #000; border: none; cursor: pointer; font-weight: 500; }

        .project-controls { display: flex; gap: 16px; margin-top: 30px; }
        .project-prev, .project-next { width: 42px; height: 42px; border: 1px solid #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; user-select: none; }

        /* Pagination: always visible & positioned */
        .project-pagination {
          position: absolute;
          bottom: 30px;
          left: 80px;
          display: flex;
          gap: 10px;
          z-index: 10;
        }

        .project-pagination .swiper-pagination-bullet {
          width: 14px; height: 14px; border: 1px solid #fff;
          background: transparent; border-radius: 0; opacity: 1;
        }

        .project-pagination .swiper-pagination-bullet-active { background: #fff; }

        @media (max-width: 1024px) { .project-content { left: 40px; } .project-content h2 { font-size: 36px; } .project-pagination { left: 40px; } }
        @media (max-width: 768px) { .projectSwiper { height: 520px; } .project-content { left: 24px; max-width: 320px; } .project-content h2 { font-size: 30px; } .project-pagination { left: 24px; } }
        @media (max-width: 480px) { .projectSwiper { height: 460px; } .project-content { left: 16px; right: 16px; max-width: 100%; } .project-content h2 { font-size: 24px; } .project-content p { font-size: 14px; } .project-btn { padding: 10px 22px; } .project-pagination { left: 16px; } }
      `}</style>

      <Swiper
        effect="fade"
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        speed={1200}
        loop={true}
        navigation={{ nextEl: '.project-next', prevEl: '.project-prev' }}
        pagination={{ el: '.project-pagination', clickable: true }}
        onSwiper={(swiper) => { setTimeout(() => { swiper.navigation.init(); swiper.navigation.update(); }); }}
        className="projectSwiper"
      >
        {productDataJson.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="project-slide">
              <img src={item.image} alt={item.name} />
              <div className="project-content text-left">
                {/* <span className="project-category text-left">
                  {item.category}</span> */}
                  <MidTitle className="text-left !uppercase" text="Featured Projects"/>
                  <MinTitle className="text-left uppercase" text={item.category}/>
                <LargeTitle className="py-6" text={item.name}/>
                <MidTitle className="text-left" text={item.location}/>
                
                {/* <p>{item.location}</p> */}
                  
                <button className="project-btn my-4 mr-auto" onClick={() => goSingleProject(item.name, item.slug)}>
                  View Project
                  
                </button>

                <div className="project-controls">
                  <div className="project-prev">←</div>
                  <div className="project-next">→</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Pagination OUTSIDE slides, inside Swiper */}
        <div className="project-pagination"></div>
      </Swiper>
    </div>
  );
};

export default ProjectOverview;
