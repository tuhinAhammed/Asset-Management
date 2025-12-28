import React from 'react'
import MinTitle from '../../Layout/Title/MinTitle'
import { MdOutlinePeopleAlt } from "react-icons/md"
import { SlCalender } from 'react-icons/sl'
import ExtraMidTitle from '../../Layout/Title/ExtraMidTitle'
import contactBanner from "../../assets/Contact/contactBanner.png"
import { IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { api } from '../../Api/Api'
import MidTitle from '../../Layout/Title/MidTitle'
import defaultBlog from "../../assets/Blogs/defaultBlog.png"
const BlogCard = ({ blogLink, id, blogTitle, blogCategory, blogDesc, blogDate, blogImage }) => {
    const navigate = useNavigate()
    const date = new Date(blogDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    // Go Single Blog
    const GoSingleBlog = async () => {
        const blogSlug = blogTitle
            .toLowerCase()
            .replace(/[^\w\s]/g, '') // Remove special characters
            .replace(/\s+/g, '-')    // Replace spaces with hyphens
            .replace(/-+/g, '-')     // Replace multiple hyphens with single hyphen
            .trim();
        navigate(`/blog/${blogSlug}`, { state: { blogId: id , slug: blogLink} });
    };
    return (
        <div className='group'>
            <div className="relative">
                <div onClick={GoSingleBlog} className="relative overflow-hidden cursor-pointer">
                    <img
                        src={blogImage ? `${api}/storage/${blogImage}` : defaultBlog}
                        alt=""
                        className="
            w-full 
            object-fill 
            aspect-[5/3]
            transition-transform 
            duration-500 
            ease-in-out 
            transform 
            group-hover:scale-110
        "
                    />
                </div>
                <MinTitle
                    text={blogCategory}
                    className="py-[3px] px-3 rounded-sm bg-theme inline-block text-secondary absolute right-0 top-0"
                />
                <div className="absolute bottom-0 px-2 sm:px-3 md:px-6 py-1 sm:py-2 bg-theme">
                    {/* <SlCalender className='text-secondary' /> */}

                    {/* 🔥 Formatted date */}
                    <div className="text-left leading-tight">
                        <div className="text-xs sm:text-g md:text-2xl font-semibold text-center">{day}</div>
                        <div className="text-xs text-primary font-light text-center">{month}</div>
                    </div>
                </div>
            </div>

            <div className="md:px-2 lg:px-3">
                {/* <div className="flex gap-14 items-center py-2 md:py-3 ">
                    <div className="flex gap-2 items-center">
                        <MdOutlinePeopleAlt className='text-theme' />
                        <MinTitle text={blogPoster} />
                    </div>

                </div> */}


                <ExtraMidTitle
                    onClick={GoSingleBlog}
                    text={blogTitle}
                    className="text-left font-semibold pt-2 md:pt-3 cursor-pointer line-clamp-2 sm:line-clamp-2 lg:line-clamp-3 z-[10]"
                />

                <div className="flex gap-1 md:gap-2 items-center justify-end text-base text-primary group-hover:text-theme duration-300">
                    <MidTitle text="Read More" className="" />
                    <IoIosArrowForward className='group-hover:ml-2 duration-300 mt-[2px]' />
                </div>
            </div>
        </div>
    )
}

export default BlogCard
