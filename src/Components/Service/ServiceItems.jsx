import { useEffect, useState } from 'react';
import Container from '../../Layout/Container'
import ServiceCard from './ServiceCard'
import { serviceListApi } from '../../Api/Api';
import axios from 'axios';
import LoadingButton from "../../Layout/Button/LoadingButton"
const servicesItems = [
    {
        id: 1,
        image: "/Project1-550x550.jpg",
        icon: "ri-smartphone-line",
        number: "01",
        title: "App Development",
    },
    {   
        id: 2,
        image: "/Project2-550x550.jpg",
        icon: "ri-global-line",
        number: "02",
        title: "Web Development",
    },
    {
        id: 3,
        image: "/Project3-550x550.jpg",
        icon: "ri-bar-chart-line",
        number: "03",
        title: "Digital Marketing",
    },
    {
        id: 4,
        image: "/Project4-550x550.jpg",
        icon: "ri-cloud-line",
        number: "04",
        title: "Cloud Services",
    },
    {
        id: 5,
        image: "/Project5-550x550.jpg",
        icon: "ri-shield-check-line",
        number: "05",
        title: "Cyber Security",
    },
    {
        id: 6,
        image: "/Project6-550x550.jpg",
        icon: "ri-ai-line",
        number: "06",
        title: "AI Solutions",
    },
]
const ServiceItems = () => {
    const [loading, setLoading] = useState(true);
    const [serviceData, setServiceData] = useState([]);
    const [visibleItems, setVisibleItems] = useState(8);
    useEffect(() => {
        const services = async () => {
            setLoading(true);
            try {
                const res = await axios.get(serviceListApi);
                setServiceData(res.data.list); // Your API returns a single array
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        services();
    }, []);
    console.log(serviceData);
    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + 8);
      };
  return (
    <div className='py-sectionSm md:py-sectionMd lg:py-sectionLg'>

            {
                <div className='grid md:grid-cols-3 gap-8 justify-items-center'>
                    {
                        servicesItems.slice(0, visibleItems).map((item) => (    
                            <ServiceCard key={item.id} item={item}  />
                        ))
                    }
                </div>
            }
            {servicesItems?.length > visibleItems && (
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
  )
}

export default ServiceItems