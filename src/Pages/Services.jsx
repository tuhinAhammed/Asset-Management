import React, { useEffect, useState } from 'react'
import ServiceCard from '../Components/Service/ServiceCard'
import ServiceItems from '../Components/Service/ServiceItems'
import LargeTitle from '../Layout/Title/LargeTitle'
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb"
import Container from '../Layout/Container'
import { serviceListApi } from '../Api/Api';
import axios from 'axios';
import LoadingButton from "../Layout/Button/LoadingButton"
import AOS from 'aos';
import 'aos/dist/aos.css';
const Services = () => {
  const [loading, setLoading] = useState(true);
  const [serviceData, setServiceData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(6);
  useEffect(() => {
    const services = async () => {
      setLoading(true);
      try {
        const res = await axios.get(serviceListApi);
        if (typeof import.meta !== 'undefined' && import.meta.env.DEV) {
          console.log(res);
        }
        setServiceData(res.data.list); // Your API returns a single array
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    services();
  }, []);
  // console.log(serviceData);
  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 8);
  };
// Animation
  useEffect(() => {
    AOS.init({
        once: false, // or true, depending on whether you want animation only once
        // other global settings
    });
}, []);
  return (
    <div>
      <Breadcrumb title="Services" />
      <Container>
        {/* <div className="flex items-center justify-between "> */}

        {/* </div> */}
        <div className='py-sectionSm md:py-sectionMd lg:py-sectionLg'>

          {
            <div data-aos="fade-up" data-aos-duration="1000" className='grid md:grid-cols-3 gap-8 justify-center items-center'>
              {loading
                ? [...Array(visibleItems)].map((_, i) => (
                  <div key={i} className="overflow-hidden bg-white border border-gray-300 rounded-[10px] py-[17px] px-[16px]">
                    <div className="aspect-[14/9] overflow-hidden rounded-[16px] bg-skeletonLoading animate-pulse"></div>

                    {/* Fake title block */}
                    <div className="mt-4 space-y-3">
                      <div className="h-4 bg-skeletonLoading rounded animate-pulse w-1/3"></div>
                      <div className="h-5 bg-skeletonLoading rounded animate-pulse w-2/3"></div>
                    </div>
                  </div>
                ))
                : serviceData.slice(0, visibleItems).map((item, index) => (
                  <ServiceCard key={index} item={item} index={index} />
                ))
              }
            </div>
          }
          {serviceData?.length > visibleItems && (
            <div className="mt-4 text-center mx-auto">
              <LoadingButton
                className="inline-block"
                loadingTime="1000"
                text="Load More"
                onClick={handleLoadMore}
              />
            </div>
          )}
        </div>

      </Container>
    </div>
  )
}

export default Services