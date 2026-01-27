import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../Layout/Container";
import LargeTitle from "../Layout/Title/LargeTitle";
import MidTitle from "../Layout/Title/MidTitle";
import MinTitle from "../Layout/Title/MinTitle";
import { FaLink, FaImage, FaInfoCircle, FaArrowLeft } from "react-icons/fa";
import { MdDateRange, MdCategory, MdCheckCircle } from "react-icons/md";
import axios from "axios";
import { api, singleProject } from "../Api/Api";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import PrimaryButton from "../Layout/Button/PrimaryButton";
import LoadingSpinner from "../Layout/ProductCard/LoadingSpinner";


const SingleProject = () => {
    const [loading, setLoading] = useState(true);
    const [projectData, setProjectData] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const { slug } = location.state || {};

    useEffect(() => {
        const fetchProjectData = async () => {
            if (!slug) {
                navigate("/projects");
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(`${singleProject}${slug}`);
                console.log("Project API Response:", response.data);
                
                if (response.data.status === 404) {
                    navigate("/error");
                    return;
                }
                
                setProjectData(response.data.product || null);
            } catch (err) {
                console.error("Error fetching project:", err);
                navigate("/error");
            } finally {
                setLoading(false);
            }
        };
        fetchProjectData();
    }, [slug, navigate]);

    // Handle navigation back
    const handleBack = () => {
        navigate("/projects");
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "Not specified";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Get primary info
    const primaryInfo = projectData?.info?.find(item => item.info_type === "primary");

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading project details..." />
            </div>
        );
    }

    if (!projectData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
                    <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
                    <PrimaryButton onClick={handleBack} text="Back to Projects" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Back Button */}
            <div className="bg-white border-b">
                <Container>
                    <div className="py-4">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 text-gray-600 hover:text-theme transition-colors group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Back to Projects</span>
                        </button>
                    </div>
                </Container>
            </div>

            {/* Breadcrumb */}
            <div className="border-b">
                <Container>
                    <Breadcrumb 
                        title={projectData.name} 
                        links={[
                            { name: "Home", path: "/" },
                            { name: "Projects", path: "/projects" }
                        ]}
                    />
                </Container>
            </div>

            <div className="py-8 md:py-12">
                <Container>
                    {/* Project Status Badge */}
                    <div className="mb-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${projectData.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                {projectData.status === "active" ? (
                                    <>
                                        <MdCheckCircle className="text-green-600" />
                                        Active Project
                                    </>
                                ) : (
                                    "Inactive"
                                )}
                            </span>
                            
                            {projectData.category && (
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                                    <MdCategory />
                                    {projectData.category.name || "Uncategorized"}
                                </span>
                            )}
                            
                            {projectData.created_at && (
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold">
                                    <MdDateRange />
                                    Created: {formatDate(projectData.created_at)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
                        {/* Left Column - Project Details */}
                        <div className="lg:col-span-2">
                            {/* Project Title */}
                            <div className="mb-8">
                                <LargeTitle 
                                    className="font-bold text-gray-900 leading-tight"
                                    text={projectData.name}
                                />
                                <p className="text-gray-600 mt-2 text-lg">
                                    {projectData.slug}
                                </p>
                            </div>

                            {/* Main Project Image */}
                            <div className="mb-8">
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                                    {projectData.thumbnail ? (
                                        <img
                                            src={`${api}/storage/${projectData.thumbnail}`}
                                            alt={projectData.name}
                                            className="w-full h-auto max-h-[500px] object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                            <FaImage className="text-gray-400 text-6xl" />
                                            <span className="sr-only">No image available</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Project Description */}
                            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border border-gray-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <FaInfoCircle className="text-theme text-2xl" />
                                    <h2 className="text-2xl font-bold text-gray-900">Project Description</h2>
                                </div>
                                
                                <div className="prose max-w-none">
                                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                        {projectData.description || "No description available for this project."}
                                    </p>
                                </div>

                                {/* Primary Info Section */}
                                {primaryInfo && (
                                    <div className="mt-8 pt-8 border-t border-gray-200">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            {primaryInfo.info_type === "primary" ? "Key Information" : primaryInfo.info_type}
                                        </h3>
                                        <div className="bg-blue-50 rounded-lg p-6">
                                            <p className="text-blue-800 text-lg">
                                                {primaryInfo.info_details}
                                            </p>
                                            {primaryInfo.icon && (
                                                <div className="mt-4">
                                                    <img 
                                                        src={`${api}/storage/${primaryInfo.icon}`} 
                                                        alt="Info icon"
                                                        className="h-12 w-auto"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Gallery Section */}
                            {projectData.gallery && projectData.gallery.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {projectData.gallery.map((item, index) => (
                                            <div 
                                                key={item.id}
                                                className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                                                    activeImage === index 
                                                    ? 'border-theme ring-2 ring-theme ring-opacity-30' 
                                                    : 'border-transparent hover:border-gray-300'
                                                }`}
                                                onClick={() => setActiveImage(index)}
                                            >
                                                {item.file_type === "image" && item.path ? (
                                                    <img
                                                        src={`${api}/storage/${item.path}`}
                                                        alt={item.title || `Gallery image ${index + 1}`}
                                                        className="w-full h-48 object-cover"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
                                                        <FaImage className="text-gray-400 text-3xl mb-2" />
                                                        <span className="text-gray-500 text-sm">{item.title || "Image"}</span>
                                                    </div>
                                                )}
                                                {item.title && (
                                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                                        <p className="text-white text-sm font-medium truncate">
                                                            {item.title}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-6 space-y-8">
                                {/* Project Actions Card */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Project Actions</h3>
                                    
                                    {projectData.live_link && (
                                        <a
                                            href={projectData.live_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full"
                                        >
                                            <PrimaryButton
                                                className="w-full justify-center mb-4"
                                                text={
                                                    <span className="flex items-center gap-2">
                                                        <FaLink />
                                                        View Live Demo
                                                    </span>
                                                }
                                            />
                                        </a>
                                    )}

                                    <button
                                        onClick={() => window.print()}
                                        className="w-full py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Print Details
                                    </button>
                                </div>

                                {/* Project Information Card */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Project Information</h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                Project ID
                                            </h4>
                                            <p className="text-lg font-mono text-gray-800">
                                                #{projectData.id.toString().padStart(3, '0')}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                Category ID
                                            </h4>
                                            <p className="text-lg text-gray-800">
                                                #{projectData.product_category_id}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                Slug
                                            </h4>
                                            <p className="text-lg text-gray-800 font-mono break-all">
                                                {projectData.slug}
                                            </p>
                                        </div>

                                        {projectData.updated_at && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                    Last Updated
                                                </h4>
                                                <p className="text-lg text-gray-800">
                                                    {formatDate(projectData.updated_at)}
                                                </p>
                                            </div>
                                        )}

                                        {/* Info Items Count */}
                                        {projectData.info && projectData.info.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                    Additional Info
                                                </h4>
                                                <p className="text-lg text-gray-800">
                                                    {projectData.info.length} information items
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Gallery Stats Card */}
                                {projectData.gallery && projectData.gallery.length > 0 && (
                                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Gallery Stats</h3>
                                        <div className="flex items-center justify-between">
                                            <div className="text-center">
                                                <p className="text-3xl font-bold text-theme">
                                                    {projectData.gallery.length}
                                                </p>
                                                <p className="text-sm text-gray-600">Total Images</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-3xl font-bold text-blue-600">
                                                    {projectData.gallery.filter(g => g.file_type === "image").length}
                                                </p>
                                                <p className="text-sm text-gray-600">Images</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Contact/CTA Card */}
                                <div className="bg-gradient-to-br from-theme to-theme-dark rounded-xl shadow-lg p-6 text-white">
                                    <h3 className="text-xl font-bold mb-4">Need a Similar Project?</h3>
                                    <p className="mb-6 opacity-90">
                                        Contact us to discuss your project requirements and get a customized solution.
                                    </p>
                                    <button
                                        onClick={() => navigate("/contact")}
                                        className="w-full py-3 px-4 bg-white text-theme rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                    >
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Back to Top Button */}
                    <div className="lg:hidden mt-8">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <FaArrowLeft className="rotate-90" />
                            Back to Top
                        </button>
                    </div>
                </Container>
            </div>

            {/* Floating Action Button (Mobile) */}
            <div className="fixed bottom-6 right-6 lg:hidden">
                <button
                    onClick={() => navigate("/contact")}
                    className="bg-theme text-white p-4 rounded-full shadow-xl hover:bg-theme-dark transition-colors"
                >
                    <FaLink className="text-xl" />
                    <span className="sr-only">Contact Us</span>
                </button>
            </div>
        </div>
    );
};

export default SingleProject;