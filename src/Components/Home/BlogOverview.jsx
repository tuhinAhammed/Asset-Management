import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import Container from '../../Layout/Container'
import SectionTitle from '../../Layout/Title/SectionTitle'
import LargeTitle from '../../Layout/Title/LargeTitle'
import BlogCard from '../Blogs/BlogCard'
// import QuaternaryButton from '../../Layout/Button/QuaternaryButton'
import ViewAllButton from '../../Layout/Button/ViewAllButton'
// import Line from '../../Layout/Line'
import { useNavigate } from 'react-router';
import { blogsApi } from '../../Api/Api';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
const BlogOverview = () => {
    const [blogData, setBlogData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await axios.get(blogsApi);
            console.log(response);
            setBlogData(response?.data?.list || []);
        };
        fetchApi();
    }, []);
    const sortedBlogData = [...blogData].sort((a, b) => new Date(b.blogDate) - new Date(a.blogDate))
    // Animation
    useEffect(() => {
        AOS.init({
            once: false,
            mirror: true,
        });
    }, []);
    return (
        <div className='py-sectionSm md:py-sectionMd lg:py-sectionLg'>
            <Container>
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <SectionTitle data-aos="fade-up" data-aos-duration="1000" text="FROM THE BLOG" />
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000" className="">
                        <LargeTitle
                            className=" font-bold w-[80%] md:w-[60%] m-auto text-center pt-2 md:pt-3 text-primary "
                            text="News & articles"
                        />

                    </div>
                    {/* <Line className="m-auto" /> */}
                </div>

                <div data-aos="fade-up" data-aos-duration="1000" className="py-3  md:mt-0">
                    <div className="flex justify-end items-center ">
                        <ViewAllButton
                            text="See More Blog"
                            className="text-xl uppercase font-bold text-theme !text-center !m-auto group"
                            link="/blogs"
                        />
                    </div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 500000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            375: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        modules={[FreeMode, Pagination, Autoplay]}
                        className="mySwiper"
                    >
                        {sortedBlogData.slice(0, 10).map((item, index) => (
                            <SwiperSlide key={index} className='bg-[#eee] shadow-xl py-4'>
                                <BlogCard
                                    key={item.id}
                                    id={item.id}
                                    blogLink={item.slug}
                                    blogTitle={item.title}
                                    blogCategory={item.blogCategory}
                                    blogDesc={item.description}
                                    blogDate={item.created_at}
                                    blogImage={item.image}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* <div className="blogPost grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
                        {sortedBlogData.slice(0, 3).map((item) => (
                            <BlogCard
                                key={item.id}
                                blogLink={item.blogLink}
                                blogSub={item.blogSub}
                                blogCategory={item.blogCategory}
                                blogDesc={item.blogDesc}
                                blogDate={item.blogDate}
                                blogPoster={item.blogPoster}
                            />
                        ))}
                    </div > */}
                </div>


            </Container>
        </div>
    )
}

export default BlogOverview


