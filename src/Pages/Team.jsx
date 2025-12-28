import React, { useEffect, useState } from 'react'
import Container from '../Layout/Container'
import { langingPageApi, teammembers } from '../Api/Api';
import Breadcrumb from '../Layout/Breadcrumb/Breadcrumb';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TeamCard from '../Components/Team/TeamCard';
import axios from 'axios';
import MidTitle from '../Layout/Title/MidTitle';
import { RxShadowNone } from 'react-icons/rx';
const Team = () => {
       const [loading, setLoading] = useState(true);
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const res = await axios.get(teammembers);
                setTeamMembers(res.data.list); // Your API returns a single array
                console.log(res);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        AOS.init({
            once: false, // or true, depending on whether you want animation only once
            // other global settings
        });
    }, []);
  return (
    <div>
      <Breadcrumb title="Team" />

        <Container>
        <div className='py-sectionSm md:py-sectionMd lg:py-sectionLg' data-aos="fade-up" data-aos-duration="1000">
            {
                teamMembers?.length < 1 ? <div className=" col-span-2 md:col-span-3 py-3 md:py-6">
                <p className='text-4xl text-tertiary md:text-6xl text-center m-auto flex justify-center opacity-[0.6]'>
                <RxShadowNone />
                </p>
                <MidTitle className="text-center pt-4 md:pt-6 font-secondary" text="There have No Employ"/>
                
              </div>
                :
                <div className="">

                    {
                        <div className='grid md:grid-cols-4 gap-8 mt-12 mb-24 justify-items-center'>
                            {
                                teamMembers.map((item) => (
                                    <TeamCard key={item.id} {...item} />
                                ))
                            }
                        </div>
                    }
                </div>
            }

        </div>
        </Container>
    </div>
  )
}

export default Team