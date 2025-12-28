import React, { useEffect, useState } from "react";
import SectionTitle from "../../Layout/Title/SectionTitle";
import LargeTitle from "../../Layout/Title/LargeTitle";
import ExtraLargeTitle from "../../Layout/Title/ExtraLargeTitle";
import Container from "../../Layout/Container";
import axios from "axios";
import { serviceListApi } from "../../Api/Api";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import statsBg from "../../assets/CompanyStats/statsBg.png";
import shapeLine from "../../assets/CompanyStats/shapeLine.png";
import "animate.css";
import { FaChartLine, FaProjectDiagram, FaSmile } from "react-icons/fa";
import MidTitle from "../../Layout/Title/MidTitle";
import AOS from "aos";
import "aos/dist/aos.css";

const CompanyStats = () => {
  const navigate = useNavigate();

  const leftStats = [
    {
      icon: <FaProjectDiagram />,
      value: "230k",
      title: "Completed Projects",
    },
    {
      icon: <FaSmile />,
      value: "100%",
      title: "Satisfied Customers",
    },
    {
      icon: <FaChartLine />,
      value: "960k",
      title: "SEO & Impressions",
    },
  ];

  const rightStats = [
    {
      icon: <FaProjectDiagram />,
      value: "120k",
      title: "Active Clients",
    },
    {
      icon: <FaSmile />,
      value: "98%",
      title: "Success Rate",
    },
    {
      icon: <FaChartLine />,
      value: "450k",
      title: "Monthly Traffic",
    },
  ];

  // AOS
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 DIRECT VALUES (NO EXTRA LOGIC)
  const initialOffset = 120; // start from bottom (hidden)
  const speed = 0.08;

  return (
    <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg relative">
      <Container>
        <div className="px-4 md:px-6 lg:px-12 py-sectionLg">

          {/* Heading */}
          <p className="text-4xl lg:text-5xl text-center mx-auto lg:w-[60%] font-bold text-primary mb-16">
            <span className="font-normal">Witness, as we</span> Transform Your{" "}
            <span className="font-normal">Land to a</span> Landmark
          </p>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* LEFT STATS */}
            <div className="col-span-2 flex flex-col gap-y-24">
              {leftStats.map((item, index) => (
                <div key={index} className="text-right">
                  <LargeTitle
                    className="text-theme font-semibold"
                    text={item.value}
                  />
                  <MidTitle
                    className="text-primary uppercase !text-sm pt-2"
                    text={item.title}
                  />
                </div>
              ))}
            </div>

            {/* CENTER IMAGE (ONLY REAL FIX HERE) */}
            <div className="col-span-8 flex justify-center mt-12">
              {/* WRAPPER HIDES BOTTOM */}
              <div className="relative h-[620px] overflow-b-hidden">
                <img
                  src={statsBg}
                  alt="Stats"
                  className="max-w-full transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateY(${initialOffset - scrollY * speed}px)`,
                  }}
                />
              </div>
            </div>

            {/* RIGHT STATS */}
            <div className="col-span-2 flex flex-col gap-y-24">
              {rightStats.map((item, index) => (
                <div key={index} className="text-left">
                  <LargeTitle
                    className="text-theme font-semibold"
                    text={item.value}
                  />
                  <MidTitle
                    className="text-primary uppercase !text-sm pt-2"
                    text={item.title}
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default CompanyStats;
