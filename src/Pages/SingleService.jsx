import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Container from "../Layout/Container";
import MidTitle from "../Layout/Title/MidTitle";
import ExtraMidTitle from "../Layout/Title/ExtraMidTitle";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import LargeTitle from "../Layout/Title/LargeTitle";
import MinTitle from "../Layout/Title/MinTitle";
import TertiaryButton from "../Layout/Button/TertiaryButton";
import axios from "axios";
import { api, singleServiceApi } from "../Api/Api";
import defaultService from "../assets/Service/defaultService.png"
export const staticServices = [
    {
        id: 1,
        service_title: "Software & Web Development",
        slug: "software-web-development",
        items: [
            {
                title: "POS Software",
                description: "A complete Point-of-Sale system for retail and restaurant businesses with billing, inventory, and real-time sales tracking."
            },
            {
                title: "University/College/School Management Software",
                description: "A full academic and administrative management system for students, teachers, exams, and results."
            },
            {
                title: "HRM Software",
                description: "Manage employee records, payroll, attendance, and performance efficiently with an intelligent HRM platform."
            },
            {
                title: "Other Software Services",
                description: "Subscription-based custom software solutions tailored to business needs with 24/7 support."
            }
        ]
    },

    {
        id: 2,
        service_title: "Website Development",
        slug: "website-development",
        items: [
            {
                title: "E-commerce Single Vendor Website",
                description: "A full-featured online store for a single seller with payments and order management."
            },
            {
                title: "E-commerce Multivendor Website",
                description: "A platform where multiple sellers can manage products, orders, and sales with a powerful admin panel."
            },
            {
                title: "University Website",
                description: "A modern academic website with student portals, faculty sections, course details, and event management."
            },
            {
                title: "Company Website",
                description: "Professional company websites to showcase services, teams, portfolios, and testimonials."
            },
            {
                title: "Association Website",
                description: "Websites for associations with membership features, events, announcements, and community tools."
            },
            {
                title: "Brand Website",
                description: "Custom brand websites focused on identity, recognition, and customer engagement."
            },
            {
                title: "Blogging Website",
                description: "SEO-friendly blogging platforms for publishing and managing articles efficiently."
            },
            {
                title: "OTT Platform",
                description: "Feature-rich OTT platforms with video streaming, subscriptions, and secure content management."
            }
        ]
    },

    {
        id: 3,
        service_title: "Apps Development",
        slug: "apps-development",
        items: [
            {
                title: "Android Apps",
                description: "Fully optimized Android applications with modern UI/UX and smooth performance."
            },
            {
                title: "iOS Apps",
                description: "High-quality iOS apps built for iPhone and iPad with flawless performance."
            },
            {
                title: "Windows Apps",
                description: "Desktop applications for business, productivity, and education tailored for Windows."
            },
            {
                title: "Cross-Platform Apps (Flutter)",
                description: "Apps for Android, iOS, and Windows using a single Flutter codebase for high efficiency."
            }
        ]
    },

    {
        id: 4,
        service_title: "Digital Marketing",
        slug: "digital-marketing",
        items: [
            {
                title: "Social Media Marketing (SMM)",
                description: "Grow your brand with targeted promotion on Facebook, Instagram, LinkedIn, and TikTok."
            },
            {
                title: "Search Engine Optimization (SEO)",
                description: "Increase visibility and organic traffic with powerful SEO strategies."
            },
            {
                title: "Pay-Per-Click (PPC) Advertising",
                description: "Run high-ROI Google Ads and social campaigns with precise targeting."
            },
            {
                title: "Content Marketing",
                description: "Create engaging and valuable content including blogs, articles, and social posts."
            },
            {
                title: "Email Marketing",
                description: "Automated and personalized email campaigns to boost engagement and conversions."
            },
            {
                title: "Affiliate & Influencer Marketing",
                description: "Collaborate with affiliates and influencers to expand brand reach and credibility."
            },
            {
                title: "Analytics & Reporting",
                description: "Track performance with advanced analytics and optimize your strategies."
            }
        ]
    },

    {
        id: 5,
        service_title: "Photoshoot & Cinematography",
        slug: "photoshoot-cinematography",
        items: [
            {
                title: "Product Photography & Videography",
                description: "Professional visuals showcasing product quality, features, and brand identity."
            },
            {
                title: "Wedding Photography & Cinematography",
                description: "Cinematic wedding coverage capturing memories beautifully."
            },
            {
                title: "Reels & Short Content Creation",
                description: "Engaging social media reels and short-form content for all platforms."
            },
            {
                title: "Event Coverage",
                description: "High-quality photography and videography for corporate, cultural, and personal events."
            },
            {
                title: "Creative Content Production",
                description: "Creative visual content tailored for branding, marketing, or personal projects."
            }
        ]
    }
];


const SingleService = () => {
    const { slug } = useParams(); // <-- get slug from URL
    const [loading, setLoading] = useState(true);
    const [serviceData, setServiceData] = useState([]);
    const location = useLocation();
    console.log(location);
    const id = location?.state?.id;
    useEffect(() => {
        const services = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${singleServiceApi}${slug}`);
                console.log(res);
                setServiceData(res.data.single); // Your API returns a single array
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        services();
    }, []);
    // Find service by slug
    const service = staticServices.find((s) => s.slug === slug);

    if (!service) {
        return (
            <Container>
                <div className="py-20 text-center">
                    <MidTitle text="Service Not Found" />
                </div>
            </Container>
        );
    }

    return (
        <>
            <Breadcrumb title={serviceData.service_title} />
            <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg">
                <Container>
                    <div className="">
                        <div
                            className={`p-6 sm:p-6 md:p-8 lg:p-12 bg-theme bg-opacity-[0.2] grid grid-cols-1 md:grid-cols-3 rounded-xl gap-8 sm:gap-12 md:gap-24 items-center `}
                        >
                            <div className="md:col-span-2">
                                <LargeTitle
                                    className="w-full lg:w-[600px] font-bold"
                                    text={serviceData.service_title
                                    }
                                />
                                <MidTitle
                                    className="pt-3 sm:pt-3 md:pt-4 lg:pt-8 w-full font-secondary line-clamp-2"
                                    text={serviceData.short_description}
                                />
                                <TertiaryButton className="pm-3 sm:mt-3 md:mt-4 lg:mt-8" text="Contact Us" slug="contact" />
                            </div>
                            <div className="md:col-span-1 img">
                                <div className="relative w-full aspect-[4/4]  md:max-h-80 overflow-hidden rounded-xl">
                                    <img
                                        src={serviceData.icon ? `${api}/storage/${serviceData.icon}` : defaultService}
                                        alt={serviceData.service_title || "Service"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Items as Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-sectionSm md:pt-sectionMd lg:pt-sectionLg">
                            {service.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg p-4 sm:p-5 md:p-6 shadow-md hover:shadow-lg transition border-[1px] border-borderColor"
                                >
                                    <MidTitle text={item.title} className="text-xl mb-3" />
                                    <p className="text-gray-600 fontsecondary">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default SingleService;
