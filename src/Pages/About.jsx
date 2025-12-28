import React, { useEffect, useState } from 'react'
import AboutOurCompany from '../Components/About/AboutOurCompany'
import HowItWork from '../Components/About/HowItWork'
import OurTeams from '../Components/About/Ourteams'
import Breadcrumb from '../Layout/Breadcrumb/Breadcrumb'
import axios from 'axios'
import { bannerApi } from '../Api/Api'
import ServiceOverview from '../Components/Home/ServiceOverview'

const About = () => {
  const [bannerData, setBannerData] = useState([])

  useEffect(() => {
      const fetchApi = async () => {
          const response = await axios.get(bannerApi)
          setBannerData(response.data?.banner?.contents || [])
      }
      fetchApi()
  }, [])



  return (
    <div className="">
      <Breadcrumb title="About Us"  />
      <div className=''>
        <AboutOurCompany bannerData={bannerData}/>
        <HowItWork />
        <ServiceOverview />
        <OurTeams />
      </div>
    </div>
  )
}

export default About