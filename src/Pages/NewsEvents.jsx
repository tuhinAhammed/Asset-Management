import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { newsEventsService } from "../Services/newsEventsService";
import Container from "../Layout/Container";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import SectionTitle from "../Layout/Title/SectionTitle";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiArrowRight,
  FiUser,
  FiEye,
  FiGift,
  FiCheckCircle,
} from "react-icons/fi";
import { BiNews } from "react-icons/bi";
import { MdEventNote } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * NEWS & EVENTS PAGE
 * ==================
 * 
 * Features:
 * - Tab-based filtering (News / Events)
 * - Grid-based responsive layout
 * - Professional React icons throughout
 * - Mock/API data switching via environment variable
 * - Click to view full details
 * - Professional corporate design
 * 
 * Environment Variables:
 * - VITE_USE_MOCK_NEWS: Set to 'false' to use real API
 * - VITE_API_BASE_URL: Your backend API URL
 */
const NewsEvents = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("news"); // 'news' or 'events'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        let result;
        if (activeTab === "news") {
          result = await newsEventsService.getAllNews();
        } else {
          result = await newsEventsService.getAllEvents();
        }

        if (result.success) {
          setItems(result.data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab]);

  const breadcrumbData = [
    { label: "Home", path: "/" },
    { label: activeTab === "news" ? "News" : "Events" },
  ];

  const handleViewDetails = (item) => {
    if (activeTab === "news") {
      navigate(`/news/${item.slug}`, { state: { item, type: "news" } });
    } else {
      navigate(`/event/${item.slug}`, { state: { item, type: "event" } });
    }
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbData} />

      {/* Hero Section */}
      <section className="bg-primary py-12 md:py-20">
        <Container>
          <div className="text-center" data-aos="fade-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              {activeTab === "news" ? (
                <BiNews className="text-4xl text-theme" />
              ) : (
                <MdEventNote className="text-4xl text-theme" />
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-secondary mb-4">
              {activeTab === "news" ? "Latest News & Updates" : "Upcoming Events"}
            </h1>
            <p className="text-tertiary text-lg max-w-2xl mx-auto">
              {activeTab === "news"
                ? "Stay informed with the latest insights, trends, and developments in technology and innovation"
                : "Join us at exciting events, expand your network, and learn from industry experts"}
            </p>
          </div>
        </Container>
      </section>

      {/* Tab Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <Container>
          {/* Tabs */}
          <div className="flex gap-4 md:gap-8 mb-12 justify-center border-b border-gray-300">
            <button
              onClick={() => setActiveTab("news")}
              className={`pb-4 px-6 font-bold text-lg transition-all flex items-center gap-2 ${
                activeTab === "news"
                  ? "text-theme border-b-2 border-theme"
                  : "text-tertiary hover:text-theme"
              }`}
            >
              <BiNews className="text-xl" />
              News
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`pb-4 px-6 font-bold text-lg transition-all flex items-center gap-2 ${
                activeTab === "events"
                  ? "text-theme border-b-2 border-theme"
                  : "text-tertiary hover:text-theme"
              }`}
            >
              <MdEventNote className="text-xl" />
              Events
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-theme rounded-full animate-spin"></div>
            </div>
          ) : items.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {items.map((item, index) => (
                <NewsEventCard
                  key={item.id}
                  item={item}
                  type={activeTab}
                  delay={index * 100}
                  onViewDetails={() => handleViewDetails(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-tertiary text-xl">
                No {activeTab === "news" ? "news" : "events"} found.
              </p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

/**
 * NEWS/EVENT CARD COMPONENT
 * Displays individual news or event with professional icons and metadata
 */
const NewsEventCard = ({ item, type, delay, onViewDetails }) => {
  const isFeatured = item.featured;
  const isUrgent = type === "events" && item.status === "upcoming";

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative h-full flex flex-col"
    >
      {/* Featured/Urgent Badge */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-10 bg-theme text-primary px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
          <FiGift className="text-sm" />
          Featured
        </div>
      )}

      {isUrgent && (
        <div className="absolute top-4 right-4 z-10 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
          <FiCheckCircle className="text-sm" />
          Upcoming
        </div>
      )}

      {/* Image */}
      {item.image && (
        <div className="overflow-hidden h-48 bg-gray-200">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Badge */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="bg-theme text-primary px-3 py-1 rounded-full text-xs font-bold">
            {item.category || (type === "news" ? "News" : "Event")}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-theme transition-colors">
          {item.title}
        </h3>

        {/* Meta Info */}
        <div className="text-sm text-tertiary mb-4 space-y-2 flex-grow">
          {type === "news" ? (
            <>
              {item.author && (
                <div className="flex items-center gap-2">
                  <FiUser className="text-theme flex-shrink-0" />
                  <span>{item.author}</span>
                </div>
              )}
              {item.created_at && (
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-theme flex-shrink-0" />
                  <span>
                    {new Date(item.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
              {item.views && (
                <div className="flex items-center gap-2">
                  <FiEye className="text-theme flex-shrink-0" />
                  <span>{item.views.toLocaleString()} views</span>
                </div>
              )}
            </>
          ) : (
            <>
              {item.start_date && (
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-theme flex-shrink-0" />
                  <span>
                    {new Date(item.start_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {item.end_date &&
                      ` - ${new Date(item.end_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}`}
                  </span>
                </div>
              )}
              {item.location && (
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-theme flex-shrink-0" />
                  <span>{item.location}</span>
                </div>
              )}
              {item.venue && (
                <div className="flex items-center gap-2">
                  <FiClock className="text-theme flex-shrink-0" />
                  <span>{item.venue}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Excerpt/Description */}
        <p className="text-tertiary mb-6 line-clamp-2 text-sm">
          {item.excerpt || item.description || item.content}
        </p>

        {/* Button */}
        <button
          onClick={onViewDetails}
          className="w-full bg-theme hover:bg-themeDeep text-primary font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group/btn"
        >
          Read Details
          <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default NewsEvents;
