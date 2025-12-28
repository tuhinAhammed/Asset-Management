import React, { useEffect, useState } from 'react'
import Container from '../Layout/Container'
import Breadcrumb from '../Layout/Breadcrumb/Breadcrumb';
import LoadingButton from '../Layout/Button/LoadingButton';
import BlogCard from '../Components/Blogs/BlogCard';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { blogsApi, categoryListApi } from '../Api/Api';
import Search from '../Layout/SearchInput/Search';
import { RxShadowNone } from 'react-icons/rx';
import MidTitle from '../Layout/Title/MidTitle';

const Blogs = () => {
  const [blogData, setBlogData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleItems, setVisibleItems] = useState(9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const [blogsRes, catRes] = await Promise.all([
          axios.get(blogsApi),
          axios.get(categoryListApi),
        ]);

        setBlogData(blogsRes?.data?.list || []);
        setCategoryData(catRes?.data?.list || []);
      } catch (err) { }
      finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  // FILTERING (same as Projects)
  const filteredBlogs = blogData.filter((item) => {
    const matchesSearch = item.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? item.category_id === parseInt(selectedCategory)
      : true;

    return matchesSearch && matchesCategory;
  });

  const handleLoadMore = () => setVisibleItems((prev) => prev + 9);

  // Animation
  useEffect(() => {
    AOS.init({ once: false, mirror: true });
  }, []);

  return (
    <div className="">
      <Breadcrumb title="Blogs" />
      <div className='py-sectionSm md:py-sectionMd lg:py-sectionLg'>
        <Container>

          {/* Search + Category Filter */}
          <div className="md:flex gap-8 justify-center md:justify-between mb-10">
            <Search
              searchTerm={searchTerm}
              handleSearchChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mt-4 md:mt-0 w-full md:w-60"
            >
              <option value="">All Categories</option>
              {categoryData.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className='grid grid-cols-2 md:grid-cols-3 gap-8 justify-center items-center'
          >
            {loading ? (
              [...Array(visibleItems)].map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden bg-white border border-gray-300 rounded-[10px] py-[17px] px-[16px]"
                >
                  <div className="aspect-[14/9] overflow-hidden rounded-[16px] bg-skeletonLoading animate-pulse"></div>
                  <div className="mt-4 space-y-3">
                    <div className="h-4 bg-skeletonLoading rounded animate-pulse w-1/3"></div>
                    <div className="h-5 bg-skeletonLoading rounded animate-pulse w-2/3"></div>
                  </div>
                </div>
              ))
            ) : filteredBlogs.length === 0 ? (
              <div className=" col-span-2 md:col-span-3 py-3 md:py-6">
                <p className='text-4xl text-tertiary md:text-6xl text-center m-auto flex justify-center opacity-[0.6]'>
                <RxShadowNone />
                </p>
                <MidTitle className="text-center pt-4 md:pt-6 font-secondary" text="There have no Blog"/>
                
              </div>
            ) : (
              filteredBlogs.slice(0, visibleItems).map((item) => (
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
              ))
            )}

          </div>

          {filteredBlogs.length > visibleItems && (
            <div className="mt-4 text-center mx-auto">
              <LoadingButton
                className="inline-block"
                loadingTime="1000"
                text="Load More"
                onClick={handleLoadMore}
              />
            </div>
          )}

        </Container>
      </div>
    </div>
  )
}

export default Blogs;
