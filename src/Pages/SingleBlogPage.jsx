import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../Layout/Container";
import LargeTitle from "../Layout/Title/LargeTitle";
import MidTitle from "../Layout/Title/MidTitle";
import MinTitle from "../Layout/Title/MinTitle";
import axios from "axios";
import { api, singleBlogApi } from "../Api/Api";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import defaultBlog from "../assets/Blogs/defaultBlog.png"

const SingleBlogPage = () => {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);

  const location = useLocation();
  const { blogId, slug } = location?.state

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${singleBlogApi}${slug}`);
        setBlogData(response?.data?.single || []);
        console.log(response);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);
  // ✔ the blog is always at index 0
  const blog = blogData[0];
  const date = new Date(blog?.created_at);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });

  return (
    <div>
      <Breadcrumb title={blog?.title} />

      <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 md:gap-y-12 lg:gap-x-20 relative ">

            {/* Left Side Info */}
            <div className="md:col-span-1  md:sticky top-24 md:h-[250px]">
              <LargeTitle className="font-semibold text-center md:text-left" text="See Blog Details" />

              {/* Date */}
              <div className="flex gap-3 md:gap-4 justify-center md:justify-start py-2 md:py-4">
                <div className="font-medium text-green-500 px-4  py-1 rounded-full bg-green-500 bg-opacity-[0.2] inline-block my-2 md:my-6">
                  {day} - {month}
                </div>
                {
                  blog?.category?.name && 
                <div className="font-medium text-theme px-4  py-1 rounded-full bg-theme bg-opacity-[0.2] inline-block my-2 md:my-6">
                {blog?.category.name}
              </div>
                }
              </div>
              <div className="">
                <MidTitle
                  className="font-primary font-semibold "
                  text={`Title :`}
                />
                <MidTitle
                  className="font-primary font-secondary "
                  text={`${blog?.title}`}
                />
              </div>

              {/* <div className="text-xs text-primary font-light text-center">
                
              </div> */}

              {/* <MidTitle text={`Blog Category: ${blog.blogCategory}`} /> */}
              {/* <MidTitle text={`Author: ${blog.author}`} className="py-2" /> */}
            </div>

            {/* Right Side Blog Content */}
            <div className="md:col-span-2  ">
              <img
                src={blog?.image ? `${api}/storage/${blog?.image}` : defaultBlog}
                alt={blog?.title}
                className="w-full rounded-md border border-opacity-40"
              />

              <div className="mt-6 md:mt-8 lg:mt-12">
                <MidTitle className="font-secondary" text={blog?.description} />
              </div>
            </div>

          </div>
        </Container>
      </div>
    </div>
  );
};

export default SingleBlogPage;
