import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Container from "../Layout/Container";
import LargeTitle from "../Layout/Title/LargeTitle";
// import Line from "../Layout/Line";
import MidTitle from "../Layout/Title/MidTitle";
import MinTitle from "../Layout/Title/MinTitle";
import axios from "axios";
import { api, singleProject } from "../Api/Api";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import PrimaryButton from "../Layout/Button/PrimaryButton";

const SingleProject = () => {
    const [loading, setLoading] = useState(true);
    const [projectData, setProjectData] = useState([]);
    const navigate = useNavigate()
    const location = useLocation();
    const slug = location?.state?.slug;
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${singleProject}${slug}`);
                console.log(response);
                setProjectData(response?.data?.single || []);
                setLoading(false);
                if(response.data.status === 404){
                    navigate("/error")

                }
            } catch (err) {
                setLoading(false);
            }
        };
        fetchApi();
    }, []);
    const {
        availability,
        created_at,
        description,
        id,
        image,
        price,
        product_name,
        live_link,
        status
    } = projectData
    if (!projectData) {
        return <p>Project not found.</p>; // If no project found, show an error message
    }
    const project = setProjectData
    return (
        <div className="">
            <Breadcrumb title={product_name} />
            <div className="py-sectionSm md:py-sectionMd lg:py-sectionMd">
                <Container>
                    <div className="">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 md:gap-y-12 lg:gap-x-20 !relative ">

                            {/* Left Side Info */}
                            <div className="md:col-span-1 md:sticky md:top-0 md:h-[250px]">
                                <div className="flex gap-6 justify-center md:justify-start">
                                    {availability === "in-stock" ? (
                                        <MidTitle
                                            className=" font-medium text-green-500 px-4  py-1 rounded-full bg-green-500 bg-opacity-[0.2] inline-block"
                                            text="In Stock"
                                        />
                                    ) : (
                                        <MidTitle
                                            className=" font-medium text-red-500 px-4  py-1 rounded-full bg-red-500 bg-opacity-[0.2] inline-block"
                                            text="Out Of Stock"
                                        />
                                    )}
                                    {/* <div className="">
                                        {loading ? (
                                            <div className="h-2 md:h-7  w-12 md:w-20 lg:w-40 rounded-full bg-skeletonLoading animate-pulse"></div>
                                        ) : (
                                            <div
                                                className=""
                                            >
                                                <MidTitle
                                                    className=" font-normal text-theme cursor-pointer px-4  py-1 rounded-full bg-theme bg-opacity-[0.2] inline-block"
                                                    text={price}
                                                />
                                            </div>
                                        )}
                                    </div> */}
                                </div>
                                <LargeTitle className="py-3 md:py-6 font-semibold font-secondary text-primary" text={product_name} />

                                <div className="">
                                    <MidTitle
                                        className="font-primary font-semibold"
                                        text={`Project Description :`}
                                    />
                                    <MidTitle
                                        className="font-primary pt-2"
                                        text={`${description}`}
                                    />
                                </div>
                                <a href={live_link} target="_blank" >
                                    <PrimaryButton className="mt-3 md:mt-6" text="Live Peeview" />
                                </a>
                            </div>
                            <div className="md:col-span-2 ">
                                <img
                                    src={`${api}/storage/${image}`}
                                    alt={product_name}
                                    className=" border-2 border-theme border-opacity-[0.4] w-full h-full"
                                />
                            </div>


                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default SingleProject;
