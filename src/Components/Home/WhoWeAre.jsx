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
import AOS from 'aos';
import 'aos/dist/aos.css';
import ExtraMidTitle from '../../Layout/Title/ExtraMidTitle'
const WhoWeAre = () => {
    const whoWeAreData = [
        {
            title: "Digital Solutions",
            icon: <FaAward />,
            desc: "On the other hand, we denounce",
        },
        {
            title: "Expert & Dedicated Team Members",
            icon: <GrUserExpert />,
            desc: "On the other hand, we denounce",
        },
    ]
    const counterData = [
        {
            title: "Years of Experience",
            value: "25"
        },

    ]
    // Animation
    useEffect(() => {
        AOS.init({
            once: false, // or true, depending on whether you want animation only once
            // other global settings
        });
    }, []);
    return (
        <div className='py-sectionSm  md:py-sectionMd lg:py-sectionLg'>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 items-center">
                    <div data-aos="fade-up" data-aos-duration="1000" className="col-span-5">
                        <img src={whoWeAre} className="w-full h-full object-cover" />
                    </div>


                    <div className="col-span-7">
                        <div className="flex flex-col items-center md:items-start">
                        </div>
                        <ExtraMidTitle className="text-primary font-normal opacity-[0.8] text-center lg:text-left font-primary " text="Our real estate portfolio is a mark of distinction. Featuring the country's most selective developments, we promise investors and buyers an unmatched level of service. Our success is built on strong standards and a keen eye for detail, embodying luxury and excellence." />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default WhoWeAre