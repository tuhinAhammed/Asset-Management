import React from 'react'
import Container from '../Layout/Container'
import Banner from '../Components/Home/Banner'
import WhoWeAre from '../Components/Home/WhoWeAre'
import ServiceOverview from '../Components/Home/ServiceOverview'
import CompanyStats from '../Components/Home/CompanyStats'
import ProductOverview from '../Components/Home/ProductOverview'
import WhyUs from '../Components/Home/WhyUs'
import FaqsOverview from '../Components/Home/FaqsOverview'
import TestimonialOverview from '../Components/Home/TestimonialOverview'
import SubBrands from '../Components/Home/SubBrands'
import ContactOverview from '../Components/Home/ContactOverview'
import BlogOverview from '../Components/Home/BlogOverview'
import Strategy from '../Components/Home/Strategy'
import ShortMarque from '../Components/Home/ShortMarque'

const Home = () => {
  return (
    <div className=''>
        <Banner/>
        <WhoWeAre/>
        <ShortMarque/>
        <ServiceOverview/>
        <CompanyStats/>
        {/* <ProductOverview/> */}
        <WhyUs/>
        <FaqsOverview/>
        <TestimonialOverview/>
        <SubBrands/>
        <ContactOverview/>
        <BlogOverview/>
        <Strategy/>
    </div>
  )
}

export default Home