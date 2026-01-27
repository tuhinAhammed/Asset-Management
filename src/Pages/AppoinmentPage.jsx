import React, { useState } from "react";
import Container from "../Layout/Container";
import LargeTitle from "../Layout/Title/LargeTitle";
import SectionTitle from "../Layout/Title/SectionTitle";
import MinTitle from "../Layout/Title/MinTitle";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import { FaCalendarAlt, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaUsers, FaCheckCircle } from "react-icons/fa";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import AppointmentForm from "../Components/Appointment/AppointmentForm";
import PrimaryButton from "../Layout/Button/PrimaryButton";
import SecondaryButton from "../Layout/Button/SecondaryButton";

const AppointmentPage = () => {
  const [activeTab, setActiveTab] = useState("form");

  const appointmentFeatures = [
    {
      icon: <FaCheckCircle className="text-2xl text-green-500" />,
      title: "Expert Consultation",
      description: "Get professional advice from our experienced real estate experts."
    },
    {
      icon: <FaUsers className="text-2xl text-blue-500" />,
      title: "Personalized Service",
      description: "Tailored solutions based on your specific requirements and preferences."
    },
    {
      icon: <FaClock className="text-2xl text-purple-500" />,
      title: "Flexible Timing",
      description: "Schedule appointments at your convenience, including weekends."
    },
    {
      icon: <MdOutlineRealEstateAgent className="text-2xl text-orange-500" />,
      title: "Property Viewing",
      description: "Arrange site visits to properties that match your criteria."
    }
  ];

  const contactInfo = [
    {
      icon: <FaPhoneAlt className="text-lg" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: <FaEnvelope className="text-lg" />,
      title: "Email Us",
      details: "appointments@realestate.com",
      action: "mailto:appointments@realestate.com"
    },
    {
      icon: <FaMapMarkerAlt className="text-lg" />,
      title: "Visit Office",
      details: "123 Business Street, City, State 12345",
      action: "https://maps.google.com"
    },
    {
      icon: <FaClock className="text-lg" />,
      title: "Business Hours",
      details: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      action: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <Container>
          <Breadcrumb 
            title="Book Appointment" 
            links={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" }
            ]}
          />
        </Container>
      </div>



      <div className="py-8 md:py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs for different views */}
              <div className="mb-8">
                <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("form")}
                    className={`flex-1 py-3 px-4 text-center font-medium text-lg ${
                      activeTab === "form"
                        ? "text-theme border-b-2 border-theme"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`flex-1 py-3 px-4 text-center font-medium text-lg ${
                      activeTab === "info"
                        ? "text-theme border-b-2 border-theme"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Process & Benefits
                  </button>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                  {activeTab === "form" ? (
                    <div>
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          Fill out the Appointment Form
                        </h2>
                        <p className="text-gray-600">
                          Please provide detailed information so we can better assist you. Fields marked with * are required.
                        </p>
                      </div>
                      <AppointmentForm />
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Our Appointment Process & Benefits
                      </h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            How It Works
                          </h3>
                          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                            <li className="pl-2">Fill out the appointment request form with your details</li>
                            <li className="pl-2">Our team will review your requirements within 24 hours</li>
                            <li className="pl-2">We'll contact you via your preferred method to confirm details</li>
                            <li className="pl-2">Schedule a convenient time for your consultation</li>
                            <li className="pl-2">Receive personalized advice and property recommendations</li>
                          </ol>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            What You Get
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {appointmentFeatures.map((feature, index) => (
                              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0">
                                  {feature.icon}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Why Choose Us
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center gap-2">
                              <FaCheckCircle className="text-green-500" />
                              <span>10+ years of real estate experience</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <FaCheckCircle className="text-green-500" />
                              <span>Extensive property portfolio</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <FaCheckCircle className="text-green-500" />
                              <span>Transparent pricing and no hidden fees</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <FaCheckCircle className="text-green-500" />
                              <span>Personalized service for each client</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      q: "How soon will I hear back after submitting the form?",
                      a: "We typically respond within 24 hours on business days. For urgent matters, please call us directly."
                    },
                    {
                      q: "What should I prepare for the appointment?",
                      a: "Please have your ID, proof of income, and any specific property requirements or preferences ready."
                    },
                    {
                      q: "Can I reschedule my appointment?",
                      a: "Yes, you can reschedule by contacting us at least 24 hours before your scheduled appointment."
                    },
                    {
                      q: "Is there any fee for the consultation?",
                      a: "No, our initial consultation is completely free. We only charge fees when transactions are completed."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-8">
                {/* Contact Info Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FaPhoneAlt className="text-theme" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          {info.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{info.title}</h4>
                          {info.action ? (
                            <a
                              href={info.action}
                              className="text-theme hover:text-theme-dark transition-colors"
                            >
                              {info.details}
                            </a>
                          ) : (
                            <p className="text-gray-600">{info.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Tips Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Quick Tips for Better Results
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-500 text-white rounded-full p-1 mt-1">
                        <FaCheckCircle className="text-xs" />
                      </div>
                      <span className="text-sm text-gray-700">Be specific about your budget range</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-500 text-white rounded-full p-1 mt-1">
                        <FaCheckCircle className="text-xs" />
                      </div>
                      <span className="text-sm text-gray-700">Mention preferred locations and neighborhoods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-500 text-white rounded-full p-1 mt-1">
                        <FaCheckCircle className="text-xs" />
                      </div>
                      <span className="text-sm text-gray-700">Specify property size and amenities needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-500 text-white rounded-full p-1 mt-1">
                        <FaCheckCircle className="text-xs" />
                      </div>
                      <span className="text-sm text-gray-700">Note any special requirements (pets, parking, etc.)</span>
                    </li>
                  </ul>
                </div>


                {/* Emergency Contact */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <FaPhoneAlt className="text-red-600 text-xl" />
                    </div>
                    <h3 className="text-lg font-bold text-red-900">
                      Urgent Assistance
                    </h3>
                  </div>
                  <p className="text-red-700 text-sm mb-3">
                    Need immediate help with a property emergency?
                  </p>
                  <a
                    href="tel:+15551234567"
                    className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaPhoneAlt />
                    Emergency Hotline
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Trusted by Thousands of Clients
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We've helped clients find their perfect properties across various cities and budgets
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-theme mb-2">1,500+</div>
                <div className="text-gray-600">Properties Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-theme mb-2">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-theme mb-2">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-theme mb-2">24/7</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-theme to-theme-dark text-white py-12">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Perfect Property?
            </h2>
            <p className="text-lg opacity-90 mb-6">
              Our team of experts is ready to help you every step of the way. Book your appointment today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SecondaryButton text="Book Appointment Now" slug="appointment-form"/>
              {/* <button
                onClick={() => setActiveTab("form")}
                className="px-8 py-3 bg-white text-theme rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                
              </button> */}
              <a
                href="tel:+15551234567"
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-theme transition-colors"
              >
                Call Us Directly
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AppointmentPage;