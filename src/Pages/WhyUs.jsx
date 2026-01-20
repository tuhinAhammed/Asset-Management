import React from 'react';
import { 
  CheckCircleIcon, 
  BoltIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  LightBulbIcon,
  ClockIcon,
  TrophyIcon 
} from '@heroicons/react/24/outline';

const WhyUs = () => {
  const themeColors = {
    primary: 'bg-primary',
    primaryHover: 'hover:bg-themeDeep',
    primaryLight: 'bg-theme/50',
    primaryText: 'text-blue-600',
    border: 'border-theme',
  };

  const features = [
    {
      icon: <BoltIcon className="h-10 w-10" />,
      title: "Cutting-Edge Technology",
      description: "We leverage the latest technologies and frameworks to deliver future-proof solutions that stay ahead of industry trends.",
      stats: "99.9% Uptime"
    },
    {
      icon: <UserGroupIcon className="h-10 w-10" />,
      title: "Expert Team",
      description: "Our team comprises industry veterans and certified professionals with an average of 10+ years of experience.",
      stats: "50+ Experts"
    },
    {
      icon: <ShieldCheckIcon className="h-10 w-10" />,
      title: "Proven Security",
      description: "Enterprise-grade security protocols and compliance standards ensure your data is always protected.",
      stats: "ISO 27001 Certified"
    },
    {
      icon: <ChartBarIcon className="h-10 w-10" />,
      title: "Measurable Results",
      description: "Data-driven approach with clear KPIs and regular reporting to track progress and ROI.",
      stats: "95% Client Retention"
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "We begin by deeply understanding your business needs and challenges."
    },
    {
      step: "02",
      title: "Strategic Planning",
      description: "Custom roadmap development with clear milestones and deliverables."
    },
    {
      step: "03",
      title: "Execution & Development",
      description: "Agile implementation with continuous testing and quality assurance."
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "Seamless deployment followed by comprehensive maintenance and support."
    },
  ];

  const testimonials = [
    {
      quote: "Their attention to detail and technical expertise transformed our digital presence. Results exceeded expectations.",
      author: "Sarah Johnson",
      role: "CTO, TechVision Inc.",
      rating: 5
    },
    {
      quote: "Professional, reliable, and truly understands business needs. A partner we can trust for the long term.",
      author: "Michael Chen",
      role: "Operations Director, Global Retail",
      rating: 5
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`${themeColors.primary} text-white`}>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Why Choose Us</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Experience the difference with a partner committed to your success, 
              backed by proven expertise and innovative solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Key Differentiators */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-theme/30 rounded-full mb-4">
              <TrophyIcon className="h-8 w-8 text-theme" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We don't just deliver solutions; we build partnerships that drive 
              sustainable growth and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-t-4 text-theme border-t-current`}
              >
                <div className={`p-3 rounded-lg bg-theme/50 inline-flex mb-4`}>
                  <div className={"text-primary"}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className={`text-sm font-semibold text-primary`}>
                  {feature.stats}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Process */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Proven Process
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                A structured approach ensures consistency, quality, and successful 
                project delivery every time.
              </p>
            </div>

            <div className="relative">
              {/* Timeline connector line */}
              <div className="hidden md:block absolute left-0 right-0 top-12 h-0.5 bg-blue-200"></div>
              
              <div className="grid md:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-24 h-24 rounded-full ${themeColors.primary} flex items-center justify-center mb-6 relative z-10`}>
                        <span className="text-white text-2xl font-bold">{step.step}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Benefits of Working With Us
              </h2>
              
              <div className="space-y-6">
                {[
                  "Reduced time-to-market for your products and services",
                  "Cost-effective solutions with transparent pricing",
                  "Scalable architecture that grows with your business",
                  "24/7 dedicated support and maintenance",
                  "Custom solutions tailored to your specific needs",
                  "Continuous innovation and technology updates"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className={`h-6 w-6 ${themeColors.primaryText} mt-1 mr-3 flex-shrink-0`} />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center">
                  <ClockIcon className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-bold text-gray-900">Quick Start Program</h4>
                    <p className="text-gray-600 text-sm">
                      Get started in just 2 weeks with our accelerated onboarding process.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className={`bg-gradient-to-br ${themeColors.primary} to-indigo-700 rounded-2xl p-8 h-full text-white`}>
                <LightBulbIcon className="h-12 w-12 mb-6 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">Innovation Guarantee</h3>
                <p className="text-blue-100 mb-6">
                  We're so confident in our ability to drive innovation that we offer 
                  a 30-day risk-free trial period. Experience our approach firsthand 
                  with no long-term commitment.
                </p>
                <div className="text-4xl font-bold mb-2">30-Day</div>
                <div className="text-blue-200">Risk-Free Trial</div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-100 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our valued clients have to say.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-lg italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${themeColors.primary} rounded-full flex items-center justify-center text-white font-bold mr-4`}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <div className={`${themeColors.primary} rounded-2xl p-8 md:p-12 text-white`}>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
                <div className="text-blue-200">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">12+</div>
                <div className="text-blue-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
                <div className="text-blue-200">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                <div className="text-blue-200">Support Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have transformed their businesses with our solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`${themeColors.primary} ${themeColors.primaryHover} text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105`}>
              Start Your Project
            </button>
            <button className={`bg-white ${themeColors.border} border text-gray-700 hover:bg-gray-50 font-bold py-3 px-8 rounded-lg transition duration-300`}>
              Schedule a Consultation
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            No commitment required for initial consultation
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;