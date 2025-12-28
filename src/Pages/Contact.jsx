import React, { useEffect, useState } from 'react'
import Container from '../Layout/Container'
import { teammembers } from '../Api/Api';
import Breadcrumb from '../Layout/Breadcrumb/Breadcrumb';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TeamCard from '../Components/Team/TeamCard';
import axios from 'axios';
import LargeTitle from '../Layout/Title/LargeTitle';
import ExtraMidTitle from '../Layout/Title/ExtraMidTitle';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { MdAddCall } from 'react-icons/md';
import Location from "../Components/Contact/Location"
import ContactForm from "../Components/Contact/ContactForm"
import SectionTitle from '../Layout/Title/SectionTitle';
import { useSelector } from 'react-redux';

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const { logo, company_phone , company_email , company_address} = useSelector(
    (state) => state.landingPageData?.data || {}
  );

  useEffect(() => {
    AOS.init({
      once: false, // or true, depending on whether you want animation only once
      // other global settings
    });
  }, []);
  const contactData = [
    {
      sub: "Location",
      title: `${company_address}`,
      icon: <FaLocationDot />
    },
    {
      sub: "Mail",
      title: `${company_email}`,
      icon: <IoMdMail />
    },
    {
      sub: "Number",
      title: `${company_phone}`,
      icon: <MdAddCall />
    },
  ]
  return (
    <div>
      <Breadcrumb title="Contact" />

      <Container>
        <div className='grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 py-sectionSm md:py-sectionMd lg:py-sectionLg' data-aos="fade-up" data-aos-duration="1000">
          {
            contactData.map((item, index) => {
              return (
                <div className="py-4 sm:py-8 md:py-16 lg:py-24 hover:bg-primary group duration-500 rounded-3xl">
                  <p className="text-center text-[40px] sm:text-[40px] md:text-[50px] lg:text-[70px] text-theme flex justify-center group-hover:text-secondary transform transition-transform duration-300 group-hover:-scale-x-100">{item.icon}</p>
                  <LargeTitle className="text-center !text-3xl py-2 md:py-4 font-semibold group-hover:text-secondary duration-300" text={item.sub} />
                  <ExtraMidTitle className="text-center !normal-case text-tertiary group-hover:text-secondary duration-300" text={item.title} />
                </div>
              )
            })
          }

        </div>
        <div className="grid md:grid-cols-2 gap-12 sm:gap-12 md:gap-14 items-center pb-sectionSm md:pb-sectionMd lg:pb-sectionLg">
          <div className="rounded-[50%] ovverflow-hidden">
            <Location />
          </div>
          <div className="">
            <div className="flex items-center justify-center md:justify-start">
              <SectionTitle data-aos="fade-left" data-aos-duration="1000" text="Contact us" />

            </div>
            <LargeTitle
              data-aos="fade-left" data-aos-duration="1000"
              className="text-left font-semibold py-2 md:py-4 text-center md:text-left"
              text="Book An Appointment"
            />
            <div className="" data-aos="fade-left" data-aos-duration="1000" >
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Contact