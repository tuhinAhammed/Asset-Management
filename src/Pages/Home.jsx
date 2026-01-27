import React from 'react'
import Container from '../Layout/Container'
import Banner from '../Components/Home/Banner'
import WhoWeAre from '../Components/Home/WhoWeAre'
import ServiceOverview from '../Components/Home/ServiceOverview'
import CompanyStats from '../Components/Home/CompanyStats'
import ProjectOverview from '../Components/Home/ProjectOverview'
import WhyUs from '../Components/Home/WhyUs'
import FaqsOverview from '../Components/Home/FaqsOverview'
import TestimonialOverview from '../Components/Home/TestimonialOverview'
import SubBusiness from '../Components/Home/SubBusiness'
import ContactOverview from '../Components/Home/ContactOverview'
import BlogOverview from '../Components/Home/BlogOverview'
import Strategy from '../Components/Home/Strategy'
import ShortMarque from '../Components/Home/ShortMarque'

const Home = () => {
  return (
    <div className=''>
        <Banner/>
        <WhoWeAre/>
        {/* <ShortMarque/> */}
        {/* <ServiceOverview/> */}
        <CompanyStats/>
        <SubBusiness/>
        <ProjectOverview/>
        <WhyUs/>
        {/* <FaqsOverview/> */}
        {/* <TestimonialOverview/> */}
        <ContactOverview/>
        {/* <BlogOverview/> */}
        {/* <Strategy/> */}
    </div>
  )
}

export default Home