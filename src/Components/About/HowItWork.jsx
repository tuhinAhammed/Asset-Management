import React, { useEffect, useState } from 'react'
import SectionTitle from '../../Layout/Title/SectionTitle'
import LargeTitle from '../../Layout/Title/LargeTitle'
// import HowItworkCard from './HowItworkCard'
import Container from '../../Layout/Container'
import ServiceOverview from '../Home/ServiceOverview'
import AOS from 'aos';
import 'aos/dist/aos.css';
const howitWOrk = [
    {
        id: "01",
        title: "Project Planning",
        items: ["Project Research", "Competitive Analysis", "Define Flow"],
        image: "/Shape-1.png"
    },
    {
        id: "02",
        title: "Design & Development",
        items: ["UI/UX Design", "Frontend Development", "Backend Development"],
        image: "/Shape-2.png"
    },
    {
        id: "03",
        title: "Testing & Launch",
        items: ["Quality Assurance", "User Testing", "Deployment"],
        image: "/Shape-3.png"
    }
]
const HowItWork = () => {
    useEffect(() => {
        AOS.init({
          once: false, // or true, depending on whether you want animation only once
          // other global settings
        });
      }, []);
    return (
        <div data-aos="fade-up" data-aos-duration="1000" className="relative bg-[url('/How-it-work2.jpg')] bg-cover bg-center bg-no-repeat py-sectionSm md:py-sectionMd lg:py-sectionLg">
            <div className='flex items-center justify-center'>
                <SectionTitle text="How It Works" />
            </div>
            <LargeTitle className="font-bold pt-2 md:pt-4 text-secondary text-center" text="Our Approach Is To Create
"/>
            <Container>
                {
                    <div className='grid md:grid-cols-3  mt-12 mb-24 items-center gap-4 sm:gap-6 md:gap-12 '>
                        {
                            howitWOrk.map((item, index) => (
                                    <div
                                    key={index}
                                        className={`relative  rounded-2xl p-8 transition-all duration-500 ease-out  hover:bg-theme px-8 md:px-12 py-12 sm:py-16 md:py-24 bg-transparent group`}
                                    >
                                        {/* Background accent layer */}
                                        <div
                                            className={`absolute inset-0 bg-secondary/10 transition-all duration-500 rounded-2xl' 
                                                `}
                                        />
                                        {/* <div className="absolute inset-0 bg-black/30 pointer-events-none"></div> */}

                                        {/* Card number badge */}
                                        <div className="absolute top-6 right-6 z-20 bg-primary w-12 h-12 rounded-full border-2 border-slate-500 flex items-center justify-center text-secondary group-hover:text-theme font-semibold text-lg">
                                                {item.id}
                                        </div>

                                        {/* Content container */}
                                        <div className=" ">
                                            {/* Title */}
                                            <h2 className="text-secondary group-hover:text-primary text-2xl font-bold mb-8">{item.title}</h2>

                                            {/* Menu items */}
                                            <div className="grid grid-cols-1 gap-4">
                                                {item.items.map(
                                                    (item, index) => (
                                                        <div

                                                            key={index}
                                                            className="px-6 py-2 rounded-full border-[1px] border-tertiary group-hover:border-theme group-hover:bg-themeDeep text-secondary group-hover:text-primary text-center text-sm font-medium  transition-colors duration-300"
                                                        >
                                                            {item}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                    </div>
                            ))
                        }
                    </div>
                }
                
            </Container>
        </div>
    )
}

export default HowItWork