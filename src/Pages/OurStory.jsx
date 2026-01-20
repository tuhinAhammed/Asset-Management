import React, { useEffect } from 'react';
import { Link } from 'react-router';
import AOS from "aos";
import "aos/dist/aos.css";
import Container from '../Layout/Container';
const OurStory = () => {
    const values = [
        { title: "Integrity", desc: "We believe in transparency and ethical practices in everything we do." },
        { title: "Innovation", desc: "Constantly pushing boundaries to deliver cutting-edge solutions." },
        { title: "Excellence", desc: "Committed to the highest standards in quality and service." },
        { title: "Collaboration", desc: "Fostering teamwork and partnerships for shared success." },
        { title: "Sustainability", desc: "Building solutions that are environmentally and socially responsible." },
        { title: "Customer Focus", desc: "Putting our clients' needs at the center of our operations." },
    ];
    // Animation
    useEffect(() => {
        AOS.init({
            once: false,
            mirror: true,
        });
    }, []);
    return (
        <>
                    <div className="bg-gradient-to-r from-blue-600 to-theme text-white">
                        <div className="container mx-auto px-4 py-16 md:py-24">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">Our Story</h1>
                            <p className="text-xl md:text-2xl text-blue-100  text-center">
                                From humble beginnings to becoming a trusted partner for businesses worldwide.
                                Our journey is one of passion, innovation, and unwavering commitment.
                            </p>
                        </div>
                    </div>
            <Container>
                <div className=" bg-gray-50">
                    {/* Hero Section */}

                    <div className="container mx-auto px-4 py-12">
                        {/* Foundation Section */}
                        <div className="mb-20">
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                                <div data-aos="fade-right" data-aos-duration="1000">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-1 bg-theme mr-4"></div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Foundation</h2>
                                    </div>
                                    <p className="text-gray-700 text-lg mb-4">
                                        Founded in 2010, our company began with a simple vision: to create technology
                                        solutions that genuinely improve people's lives. What started as a small team
                                        of passionate innovators has grown into an industry leader.
                                    </p>
                                    <p className="text-gray-600 mb-6">
                                        Our foundation was built on the principle that technology should be accessible,
                                        intuitive, and impactful. From our first product launch to our current portfolio
                                        of solutions, we've maintained our commitment to excellence and customer satisfaction.
                                    </p>
                                    <div className="flex space-x-4">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-theme">500+</div>
                                            <div className="text-gray-600">Projects Delivered</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-theme">50+</div>
                                            <div className="text-gray-600">Countries Served</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative" data-aos="fade-left" data-aos-duration="1000">
                                    <img
                                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                                        alt="Team collaboration in modern office"
                                        className="rounded-lg shadow-2xl w-full h-64 md:h-96 object-cover"
                                    />
                                    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-theme opacity-20 rounded-lg"></div>
                                    <div className="absolute -top-4 -right-4 w-32 h-32 bg-indigo-600 opacity-10 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Who We Are Section */}
                        <div className="mb-20 bg-white rounded-2xl shadow-lg p-8 md:p-12">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex items-center mb-8" data-aos="fade-right" data-aos-duration="1000">
                                    <div className="w-12 h-1 bg-green-600 mr-4"></div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 " >Who We Are</h2>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-gray-700 text-lg" data-aos="fade-right" data-aos-duration="1000">
                                        We are a diverse team of thinkers, creators, and problem-solvers united by a
                                        common goal: to drive innovation forward. Our culture is built on collaboration,
                                        continuous learning, and a shared passion for making a difference.
                                    </p>
                                    <p className="text-gray-600" data-aos="fade-left" data-aos-duration="1000">
                                        With expertise spanning multiple industries and technologies, we bring
                                        comprehensive solutions to complex challenges. Our team includes seasoned
                                        professionals, visionary leaders, and emerging talents who all contribute
                                        to our collective success.
                                    </p>
                                    <p className="text-gray-600" data-aos="fade-left" data-aos-duration="1000">
                                        We believe in fostering an inclusive environment where every voice is heard
                                        and every idea is valued. This collaborative spirit enables us to deliver
                                        exceptional results for our clients while maintaining a workplace where
                                        people love to work.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mission and Vision Section */}
                        <div className="mb-20">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="order-2 md:order-1" data-aos="fade-right" data-aos-duration="1000">
                                    <img
                                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                                        alt="Team meeting discussing strategy"
                                        className="rounded-lg shadow-2xl w-full h-64 md:h-96 object-cover"
                                    />
                                </div>
                                <div className="order-1 md:order-2" data-aos="fade-left" data-aos-duration="1000">
                                    <div className="mb-8">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-1 bg-red-600 mr-4"></div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Mission</h2>
                                        </div>
                                        <p className="text-gray-700 text-lg">
                                            To empower businesses with innovative technology solutions that drive growth,
                                            enhance efficiency, and create lasting value. We strive to be the trusted
                                            partner that helps organizations navigate digital transformation successfully.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center mb-4" >
                                            <div className="w-12 h-1 bg-purple-600 mr-4"></div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Vision</h2>
                                        </div>
                                        <p className="text-gray-700 text-lg">
                                            To be the global leader in transformative technology solutions, recognized
                                            for our commitment to innovation, sustainability, and positive societal impact.
                                            We envision a future where technology seamlessly enhances every aspect of
                                            business and daily life.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Values Section */}
                        <div className="mb-20">
                            <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="1000">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
                                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                                    These core principles guide our decisions, shape our culture, and define how we work.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {values.map((value, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-theme"
                                        data-aos="fade-up" data-aos-duration="1000"
                                    >
                                        <div className="flex items-center mb-4" data-aos="fade-up" data-aos-duration="1000">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                                <span className="text-theme font-bold">{index + 1}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                                        </div>
                                        <p className="text-gray-600">{value.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="bg-gradient-to-r from-blue-600 to-theme rounded-2xl p-8 md:p-12 text-white text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Journey</h2>
                            <p className="text-xl mb-8 max-w-2xl mx-auto">
                                Interested in learning more about our story or partnering with us?
                                Let's build something amazing together.
                            </p>
                            <Link to="/contact">
                                <button className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
                                    Get in Touch
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default OurStory;