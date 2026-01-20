import React from 'react';
import { 
  FaBuilding, 
  FaHome, 
  FaStore,
  FaWarehouse,
  FaCity,
  FaMapMarkerAlt,
  FaTools,
  FaGlobeAmericas,
  FaDollarSign,
  FaUsers,
  FaChartLine,
  FaArrowRight,
  FaCheckCircle,
  FaCalendarAlt,
  FaClipboardCheck,
  FaAward,
  FaRegBuilding,
  FaRegHospital,
  FaRegChartBar
} from 'react-icons/fa';
import { 
  MdApartment,
  MdBusiness,
  MdRealEstateAgent,
  MdConstruction
} from 'react-icons/md';

const OurBusiness = () => {
  const businesses = [
    {
      icon: <FaBuilding className="h-12 w-12" />,
      title: "Commercial Real Estate",
      description: "Strategic acquisition and management of office buildings, shopping centers, and mixed-use developments in prime urban locations.",
      image: "https://images.unsplash.com/photo-1487956382158-bb926046304a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      link: "/business/commercial",
      features: ["Office Towers", "Shopping Malls", "Business Parks", "Mixed-Use Complexes"],
      stats: "25+ Properties"
    },
    {
      icon: <MdApartment className="h-12 w-12" />,
      title: "Residential Development",
      description: "Premium residential communities featuring luxury apartments, townhouses, and gated villa projects with world-class amenities.",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      link: "/business/residential",
      features: ["Luxury Apartments", "Gated Communities", "Townhouse Projects", "Smart Homes"],
      stats: "15,000+ Units"
    },
    {
      icon: <FaStore className="h-12 w-12" />,
      title: "Retail & Hospitality",
      description: "Development and management of premium retail spaces, hotels, and entertainment destinations that create memorable experiences.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      link: "/business/retail",
      features: ["Luxury Hotels", "Shopping Centers", "Entertainment Hubs", "Food Courts"],
      stats: "40+ Retail Spaces"
    },
    {
      icon: <FaWarehouse className="h-12 w-12" />,
      title: "Industrial & Logistics",
      description: "State-of-the-art warehousing, distribution centers, and industrial parks strategically located near major transportation hubs.",
      image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      link: "/business/industrial",
      features: ["Warehouses", "Distribution Centers", "Manufacturing Facilities", "Logistics Parks"],
      stats: "8M+ sq.ft."
    },
    {
      icon: <FaHome className="h-12 w-12" />,
      title: "Property Management",
      description: "Comprehensive property management services ensuring optimal operations, maintenance, and tenant satisfaction across all asset classes.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      link: "/business/management",
      features: ["Facility Management", "Tenant Services", "Maintenance", "Security"],
      stats: "100+ Managed Properties"
    },
    {
      icon: <FaMapMarkerAlt className="h-12 w-12" />,
      title: "Land Banking",
      description: "Strategic land acquisition and development planning for future residential, commercial, and mixed-use projects.",
      image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      link: "/business/land-banking",
      features: ["Land Acquisition", "Development Planning", "Zoning", "Future Projects"],
      stats: "2,500+ Acres"
    }
  ];

  const services = [
    {
      icon: <FaDollarSign className="h-8 w-8" />,
      title: "Asset Acquisition",
      description: "Strategic property acquisition with comprehensive due diligence"
    },
    {
      icon: <MdConstruction className="h-8 w-8" />,
      title: "Development & Construction",
      description: "End-to-end development from concept to completion"
    },
    {
      icon: <FaChartLine className="h-8 w-8" />,
      title: "Asset Management",
      description: "Maximizing property value through strategic management"
    },
    {
      icon: <FaUsers className="h-8 w-8" />,
      title: "Investment Advisory",
      description: "Expert guidance on real estate investment opportunities"
    },
    {
      icon: <FaGlobeAmericas className="h-8 w-8" />,
      title: "International Portfolio",
      description: "Global real estate investment and management services"
    },
    {
      icon: <FaBuilding className="h-8 w-8" />,
      title: "Sustainability Consulting",
      description: "Green building and sustainable development strategies"
    }
  ];

  const featuredProjects = [
    {
      name: "Marina Bay Towers",
      type: "Mixed-Use Development",
      location: "Downtown Financial District",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      status: "Completed 2023"
    },
    {
      name: "Green Valley Residences",
      type: "Luxury Residential",
      location: "North Hills Estate",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      status: "Under Construction"
    },
    {
      name: "Central Business Plaza",
      type: "Commercial Office",
      location: "Central Business District",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      status: "Planning Phase"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Business Portfolio</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Building tomorrow's landmarks today. We specialize in premium real estate 
              development and strategic asset management across multiple sectors.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">6</div>
                <div className="text-white/80">Business Divisions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">40+</div>
                <div className="text-white/80">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">$5B+</div>
                <div className="text-white/80">Assets Under Management</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Business Divisions */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-theme/10 rounded-full mb-4">
              <FaBuilding className="h-8 w-8 text-theme" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Business Divisions
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Each division operates with specialized expertise while leveraging our 
              collective resources and industry knowledge for maximum impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businesses.map((business, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={business.image} 
                    alt={business.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                    <div className="text-theme">
                      {business.icon}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{business.title}</h3>
                  <p className="text-gray-600 mb-6">{business.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {business.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm font-semibold text-theme">
                      {business.stats}
                    </div>
                  </div>

                  <a 
                    href={business.link}
                    className="inline-flex items-center text-theme font-semibold hover:text-themeDeep transition-colors"
                  >
                    Explore Division
                    <FaArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Services */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Services
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Comprehensive solutions covering every aspect of real estate 
                development and asset management.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="group p-6 rounded-xl border border-gray-200 hover:border-theme hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start mb-4">
                    <div className="p-3 rounded-lg bg-theme/10 mr-4 group-hover:bg-theme/20 transition-colors">
                      <div className="text-theme">
                        {service.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-gray-600 mt-2">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Showcasing our most significant developments that define skylines 
              and transform communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="group">
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="text-white font-semibold text-lg">{project.name}</div>
                    <div className="text-white/80 text-sm">{project.location}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-gray-600 text-sm">{project.type}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === 'Completed 2023' 
                      ? 'bg-green-100 text-green-800'
                      : project.status === 'Under Construction'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Reach */}
        <div className="mb-20">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6">
                  <FaGlobeAmericas className="h-8 w-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Geographic Presence</h2>
                <p className="text-white/90 text-lg mb-8">
                  With developments spanning across major cities and emerging markets, 
                  we combine local expertise with global standards to deliver exceptional results.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">12</div>
                    <div className="text-white/80">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">28</div>
                    <div className="text-white/80">Cities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">150+</div>
                    <div className="text-white/80">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">25M+</div>
                    <div className="text-white/80">Square Feet</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Regional Focus</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>North America</span>
                    <div className="w-32 bg-white/30 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Europe</span>
                    <div className="w-32 bg-white/30 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Asia Pacific</span>
                    <div className="w-32 bg-white/30 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Middle East</span>
                    <div className="w-32 bg-white/30 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Partner With Us
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking to invest in real estate, develop a property, 
            or manage your assets more effectively, we have the expertise to help 
            you achieve your objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-theme hover:bg-themeDeep text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
              Explore Investment Opportunities
            </button>
            <button className="bg-white border border-theme text-theme hover:bg-gray-50 font-bold py-3 px-8 rounded-lg transition duration-300">
              Request Portfolio
            </button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-500 text-sm">
            <span className="flex items-center">
              <FaBuilding className="h-4 w-4 mr-2" />
              Licensed Real Estate Developer
            </span>
            <span className="flex items-center">
              <FaUsers className="h-4 w-4 mr-2" />
              500+ Industry Professionals
            </span>
            <span className="flex items-center">
              <FaChartLine className="h-4 w-4 mr-2" />
              40+ Years Experience
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurBusiness;