import React, { useEffect, useMemo } from 'react'
import Container from '../../Layout/Container'
import SectionTitle from '../../Layout/Title/SectionTitle'
import LargeTitle from '../../Layout/Title/LargeTitle'
import MidTitle from '../../Layout/Title/MidTitle'
import MinTitle from '../../Layout/Title/MinTitle'
import contactBanner from "../../assets/Contact/contactBanner.png"
import TertiaryButton from '../../Layout/Button/TertiaryButton'
import { FiInfo } from 'react-icons/fi'
import CountUp from 'react-countup'
import founderImg from "../../assets/About/founderImg.png"
import founderSignature from "../../assets/About/founderSignature.png"
import ContactForm from '../Contact/ContactForm'
import { MdOutlineWifiCalling3 } from 'react-icons/md'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux'
import { whoWeAreData, counterData } from '../../Constants/contactOverviewData'
const ContactOverview = () => {
    const landingPageData = useSelector((state) => state.landingPageData?.data);
    const { logo, company_phone } = useMemo(() => ({
        logo: landingPageData?.logo || null,
        company_phone: landingPageData?.company_phone || null
    }), [landingPageData]);

          // Animation
          useEffect(() => {
            AOS.init({
              once: false,
              mirror: true,
            });
          }, []);
    return (
        <Container>
            <div className='py-sectionSm md:py-sectionMd lg:py-sectionLg bg-secondary  ' >
                {/* <div className="absolute inset-0 bg-black/80 pointer-events-none rounded-[2vw]"></div> */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 lg:gap-24 items-center relative">

                    <a href='tel:+8801321210076' target='_blank' data-aos="fade-up" data-aos-duration="1000" className="absolute group px-6 md:px-12 py-4 md:py-8 bg-static flex gap-6 items-center rounded-bl-3xl bottom-0 right-[25%] rounded-lg z-[2]">
                        <div className="icon text-2xl md:text-4xl bg-theme p-3 md:p-4 text-primary rounded-full transform transition-transform duration-300 group-hover:-scale-x-100">
                            <MdOutlineWifiCalling3 />
                        </div>
                        <div className="">
                            <MinTitle className="text-tertiary" text="Call us anytime" />
                            <MidTitle className="text-secondary" text={company_phone} />
                        </div>
                    </a>
                    <div className="md:col-span-5 ">
                        <div className="flex items-center justify-center md:justify-start">
                            <SectionTitle data-aos="fade-right" data-aos-duration="1000" text="Contact us" />

                        </div>
                        <LargeTitle
                        data-aos="fade-right" data-aos-duration="1000"
                            className="font-semibold py-2 md:py-4 text-center md:text-left"
                            text="Get in Touch"
                        />
                        <div data-aos="fade-up" data-aos-duration="1000" className="">
                            <ContactForm />
                        </div>
                    </div>
                    <div className="md:col-span-7 overflow-hidden  ">
                        <div data-aos="fade-left" data-aos-duration="1000"  className="">
                            <img src={contactBanner} className="w-full h-full object-cover rounded-bl-[30%]" />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ContactOverview