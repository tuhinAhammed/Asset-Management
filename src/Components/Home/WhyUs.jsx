import React, { useEffect } from 'react'
import Container from '../../Layout/Container'
import SectionTitle from '../../Layout/Title/SectionTitle'
import LargeTitle from '../../Layout/Title/LargeTitle'
import MidTitle from '../../Layout/Title/MidTitle'
import MinTitle from '../../Layout/Title/MinTitle'
import whoWeAre from "../../assets/About/whoWeAre.png"
import TertiaryButton from '../../Layout/Button/TertiaryButton'
import { FiInfo } from 'react-icons/fi'
import { FaAward } from 'react-icons/fa'
import { GrUserExpert } from 'react-icons/gr'
import CountUp from 'react-countup'
import founderImg from "../../assets/About/founderImg.png"
import founderSignature from "../../assets/About/founderSignature.png"
import { BsBarChartFill } from 'react-icons/bs'
import AOS from 'aos';
import 'aos/dist/aos.css';
const WhyUs = () => {
    const whoWeAreData = [
        {
            title: "Quality Services",
            icon: <FaAward className="text-4xl " />,
            desc: "Parturient montes nascetur ridiculus mus is maecenas venenatis, neque.",
        },
        {
            title: "Professional Experts",
            icon: <GrUserExpert className="text-4xl " />,
            desc: "Parturient montes nascetur ridiculus mus is maecenas venenatis, neque.",
        },
        {
            title: "99% Success Rates",
            icon: <BsBarChartFill className="text-4xl " />,
            desc: "Parturient montes nascetur ridiculus mus is maecenas venenatis, neque.",
        }
    ];
    const counterData = [
        {
            title: "Years of Experience",
            value: "25"
        },

    ]
      // Animation
  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
    });
  }, []);
    return (
        <div className=' py-sectionSm md:py-0 bg-static mt-24' >
            {/* <div className="absolute inset-0 bg-black/80 pointer-events-none rounded-[2vw]"></div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-14 lg:gap-24 items-center">
                <div className="overflow-hidden order-2 md:order-1">
                    <img src={whoWeAre} className="order-1 md:order-2 w-full h-full object-cover rounded-br-[30%]" />
                </div>
                <div className=" order-1 md:order-2">
                <Container>
                    <div className="">
                    <div className="flex flex-col items-center md:items-start">
                        <SectionTitle  data-aos="fade-left" data-aos-duration="1000" text="Why choose us" />
                    </div>
                        <LargeTitle  data-aos="fade-left" data-aos-duration="1000" className="font-bold pt-2 md:pt-4 text-secondary text-center md:text-left" text="We Optimize Your Funnel For Higher Conversions" />
                        <MidTitle  data-aos="fade-left" data-aos-duration="1000" className="text-secondary text-center md:text-left opacity-[0.8] font-secondary py-4 sm:py-6 md:py-10" text="The primary goal of business market is to help organizations improve their performance." />
                        <div  data-aos="fade-up" data-aos-duration="1000" className="">
                            <div className="pt-4 md:pt-0">
                                <div className=" grid grid-cols-1 gap-2 md:gap-2">
                                    {
                                        whoWeAreData.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 md:gap-6 group hover:bg-tertiary hover:bg-opacity-[0.2] md:p-4 transition-transform dutation-500">
                                                <p
                                                    className="text-xl md:text-3xl lg:text-5xl text-theme transform transition-transform duration-300 group-hover:-scale-x-100"
                                                >
                                                    {item.icon}
                                                </p>

                                                <div>
                                                    <MidTitle text={item.title} className="font-bold !text-2xl text-secondary" />
                                                    <MidTitle text={item.desc} className="text-tertiary opacity-80 pt-2" />
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>

                </div>
            </div>
        </div>
    )
}

export default WhyUs