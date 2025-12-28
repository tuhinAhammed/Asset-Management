import React, { useEffect, useState } from 'react'
import SectionTitle from '../../Layout/Title/SectionTitle'
import LargeTitle from '../../Layout/Title/LargeTitle'
import Container from '../../Layout/Container'
import TeamCard from '../Team/TeamCard'
import axios from 'axios'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { teammembers } from '../../Api/Api'

const OurTeams = () => {
    const [loading, setLoading] = useState(true);
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const res = await axios.get(teammembers);
                setTeamMembers(res.data.list); // Your API returns a single array
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
        <div data-aos="fade-up" data-aos-duration="1000" className='py-sectionSm md:py-sectionMd lg:py-sectionLg'>
            <Container>
            <div className='flex items-center justify-center'>
                <SectionTitle text="Our Team" />
            </div>
            <LargeTitle className="font-bold pt-2 md:pt-4 text-primary text-center w-full md:w-[40%] mx-auto" text="What Success Looks From The Back
"/>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8 mt-12 mb-24 items-center'>
                    {
                        teamMembers.map((item) => (
                            <TeamCard key={item.id} {...item} />
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default OurTeams