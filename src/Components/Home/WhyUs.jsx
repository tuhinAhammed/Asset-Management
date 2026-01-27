import React, { useEffect } from 'react'
import Container from '../../Layout/Container'
import SectionTitle from '../../Layout/Title/SectionTitle'
import LargeTitle from '../../Layout/Title/LargeTitle'
import MidTitle from '../../Layout/Title/MidTitle'
import { FaAward, FaChartLine, FaUsers, FaLightbulb, FaShieldAlt, FaHandshake, FaBuilding, FaGlobe } from 'react-icons/fa'
import { MdTrendingUp, MdVerified, MdSupportAgent } from 'react-icons/md'
import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import CountUp from 'react-countup'
import AOS from 'aos';
import 'aos/dist/aos.css';
import SecondaryButton from '../../Layout/Button/SecondaryButton'
import TertiaryButton from '../../Layout/Button/TertiaryButton'
import PrimaryButton from '../../Layout/Button/PrimaryButton'
import { Link } from 'react-router'

const WhyUs = () => {
    const featuresData = [
        {
            title: "25+ Years Experience",
            icon: <FaChartLine className="text-3xl" />,
            desc: "Decades of proven track record in real estate development and asset management",
            stats: "500+ Projects"
        },
        {
            title: "Industry Leadership",
            icon: <HiOutlineBuildingOffice className="text-3xl" />,
            desc: "Recognized as a premier developer with award-winning projects across multiple sectors",
            stats: "15+ Awards"
        },
        {
            title: "Global Expertise",
            icon: <FaGlobe className="text-3xl" />,
            desc: "International portfolio spanning 12+ countries with local market knowledge",
            stats: "28 Cities"
        },
        {
            title: "Comprehensive Services",
            icon: <FaBuilding className="text-3xl" />,
            desc: "End-to-end solutions from land acquisition to property management",
            stats: "6 Business Units"
        },
        {
            title: "Risk Management",
            icon: <FaShieldAlt className="text-3xl" />,
            desc: "Robust risk assessment and mitigation strategies ensuring investment security",
            stats: "99% Success Rate"
        },
        {
            title: "Dedicated Support",
            icon: <MdSupportAgent className="text-3xl" />,
            desc: "24/7 client support and transparent communication throughout the partnership",
            stats: "500+ Professionals"
        }
    ];

    const statsData = [
        {
            value: 25,
            suffix: "+",
            title: "Years Excellence",
            delay: 1
        },
        {
            value: 15,
            suffix: "B+",
            title: "Assets Managed",
            delay: 1.2
        },
        {
            value: 150,
            suffix: "+",
            title: "Projects",
            delay: 1.4
        },
        {
            value: 98,
            suffix: "%",
            title: "Satisfaction",
            delay: 1.6
        }
    ];

    const coreValues = [
        { title: "Integrity", desc: "Transparent and ethical practices in all operations" },
        { title: "Innovation", desc: "Embracing cutting-edge technology and sustainable practices" },
        { title: "Excellence", desc: "Uncompromising quality in every project detail" },
        { title: "Partnership", desc: "Building lasting relationships beyond transactions" }
    ];

    useEffect(() => {
        AOS.init({
            once: false,
            mirror: true,
            duration: 1000
        });
    }, []);

    return (
        <div className='py-sectionSm md:py-section relative bg-white overflow-hidden' >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 to-white pointer-events-none"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-theme/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-themeDeep/5 rounded-full blur-3xl"></div>

            <Container>
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16 md:mb-20 max-w-4xl mx-auto">
                        <div
                            data-aos="fade-up"
                            data-aos-duration="800"
                            className="inline-flex items-center gap-3 bg-theme/10 px-6 py-2 rounded-full mb-6"
                        >
                            <MdVerified className="text-theme" />
                            <span className="text-theme font-semibold">Why Partner With Us</span>
                        </div>

                        <LargeTitle
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            className="font-bold text-gray-900 mb-6"
                            text="Building Trust Through Excellence"
                        />

                        <MidTitle
                            data-aos="fade-up"
                            data-aos-duration="1200"
                            className="text-gray-600 text-xl leading-relaxed"
                            text="As your strategic partner in real estate development and asset management, we combine decades of expertise with innovative solutions to deliver exceptional value and sustainable growth."
                        />
                    </div>

                    {/* Stats Banner */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1400"
                        className="mb-16 md:mb-20"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                            {statsData.map((stat, index) => (
                                <div
                                    key={index}
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay={stat.delay * 100}
                                    className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="text-center">
                                        <div className="text-4xl md:text-5xl font-bold text-theme mb-2">
                                            <CountUp
                                                end={stat.value}
                                                suffix={stat.suffix}
                                                duration={3}
                                                className="font-bold"
                                            />
                                        </div>
                                        <div className="text-gray-600 font-semibold">{stat.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mb-16 md:mb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuresData.map((feature, index) => (
                                <div
                                    key={index}
                                    data-aos="fade-up"
                                    data-aos-duration="800"
                                    data-aos-delay={(index % 3) * 100}
                                    className="group"
                                >
                                    <div className="h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:border-theme/30">
                                        {/* Icon Container */}
                                        <div className="mb-6">
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-theme/10 to-themeDeep/10 group-hover:from-theme/20 group-hover:to-themeDeep/20 transition-all duration-500">
                                                <div className="text-theme">
                                                    {feature.icon}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-theme transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {feature.desc}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="text-theme font-semibold text-sm tracking-wide">
                                                {feature.stats}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Core Values */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1200"
                        className="mb-16 md:mb-20"
                    >
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
                            <p className="text-gray-600 max-w-2xl mx-auto">Fundamental principles that guide every decision and action</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {coreValues.map((value, index) => (
                                <div
                                    key={index}
                                    data-aos="fade-up"
                                    data-aos-duration="800"
                                    data-aos-delay={index * 100}
                                    className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 hover:border-theme transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-3 h-3 bg-theme rounded-full"></div>
                                        <h4 className="text-lg font-bold text-gray-900">{value.title}</h4>
                                    </div>
                                    <p className="text-gray-600">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1400"
                        className="bg-gradient-to-r from-theme to-themeDeep rounded-3xl overflow-hidden"
                    >
                        <div className="p-8 md:p-12 text-white">
                            <div className="">
                                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                            Ready to Start Your Next Project?
                                        </h3>
                                        <p className="text-white/90 mb-6">
                                            Join hundreds of satisfied clients who trust us with their real estate investments.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* <PrimaryButton className="!bg-white !text-primary font-bold" text="Schedule Appoinment" slug="appointment-form" /> */}
                                            <Link
                                                to="/appointment-form"
                                                className="inline-block bg-white text-theme hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                                            >
                                                Schedule Appointment
                                            </Link>

                                            <Link
                                                to="/projects"
                                                className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 border border-white/20"
                                            >
                                                View Projects
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <FaHandshake className="text-xl" />
                                                <div>
                                                    <div className="font-semibold">Strategic Partnership</div>
                                                    <div className="text-white/80 text-sm">Tailored solutions for your specific needs</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <MdTrendingUp className="text-xl" />
                                                <div>
                                                    <div className="font-semibold">Proven Results</div>
                                                    <div className="text-white/80 text-sm">Consistent delivery of promised outcomes</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FaShieldAlt className="text-xl" />
                                                <div>
                                                    <div className="font-semibold">Risk Mitigation</div>
                                                    <div className="text-white/80 text-sm">Comprehensive protection for your investment</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default WhyUs