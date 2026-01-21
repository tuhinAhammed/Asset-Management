import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { newsEventsService } from "../Services/newsEventsService";
import Container from "../Layout/Container";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import { FiArrowLeft, FiUser, FiCalendar, FiEye, FiShare2 } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * NEWS DETAIL PAGE
 * ================
 * Display full news article with details
 */
const NewsDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to get from location state first
        if (location.state?.item) {
          setItem(location.state.item);
        } else {
          // Otherwise fetch from service
          const result = await newsEventsService.getNewsBySlug(slug);
          if (result.success && result.data) {
            setItem(result.data);
          } else {
            setError("News article not found");
          }
        }
      } catch (err) {
        console.error("Error loading news:", err);
        setError("Failed to load news article");
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [slug, location.state]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-theme rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="w-full">
        <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "News" }]} />
        <section className="py-20 bg-secondary">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">{error || "Not Found"}</h1>
              <button
                onClick={() => navigate("/news-events")}
                className="bg-theme text-primary px-6 py-3 rounded-lg font-bold hover:bg-themeDeep transition-colors inline-flex items-center gap-2"
              >
                <FiArrowLeft />
                Back to News
              </button>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  const breadcrumbData = [
    { label: "Home", path: "/" },
    { label: "News", path: "/news-events" },
    { label: item.title },
  ];

  return (
    <div className="w-full">
      <Breadcrumb items={breadcrumbData} />

      {/* Back Button */}
      <section className="bg-secondary py-4 border-b border-gray-200">
        <Container>
          <button
            onClick={() => navigate("/news-events")}
            className="text-theme hover:text-primary transition-colors font-bold flex items-center gap-2"
          >
            <FiArrowLeft />
            Back to News
          </button>
        </Container>
      </section>

      {/* Hero Section */}
      {item.image && (
        <section className="relative h-96 bg-gray-300 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <Container>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-secondary">
              <div className="flex gap-2 mb-4">
                <span className="bg-theme text-primary px-3 py-1 rounded-full text-sm font-bold">
                  {item.category || "News"}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-secondary mb-4">
                {item.title}
              </h1>
            </div>
          </Container>
        </section>
      )}

      {/* Content Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Meta Information */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-quaternary rounded-lg">
              {item.author && (
                <div data-aos="fade-up">
                  <div className="flex items-center gap-2 text-tertiary text-sm mb-1">
                    <FiUser className="text-theme" />
                    Author
                  </div>
                  <p className="text-primary font-bold">{item.author}</p>
                </div>
              )}
              {item.created_at && (
                <div data-aos="fade-up" data-aos-delay="100">
                  <div className="flex items-center gap-2 text-tertiary text-sm mb-1">
                    <FiCalendar className="text-theme" />
                    Published
                  </div>
                  <p className="text-primary font-bold">
                    {new Date(item.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
              {item.views && (
                <div data-aos="fade-up" data-aos-delay="200">
                  <div className="flex items-center gap-2 text-tertiary text-sm mb-1">
                    <FiEye className="text-theme" />
                    Views
                  </div>
                  <p className="text-primary font-bold">
                    {item.views.toLocaleString()}
                  </p>
                </div>
              )}
              <div data-aos="fade-up" data-aos-delay="300">
                <div className="flex items-center gap-2 text-tertiary text-sm mb-1">
                  <FiShare2 className="text-theme" />
                  Share
                </div>
                <button className="text-theme font-bold hover:text-primary transition-colors">
                  Share Article
                </button>
              </div>
            </div>

            {/* Main Content */}
            <article
              className="prose prose-lg max-w-none"
              data-aos="fade-up"
            >
              {item.excerpt && (
                <div className="mb-8 p-6 bg-lightThemeBg border-l-4 border-theme rounded">
                  <p className="text-lg text-primary font-semibold italic">
                    {item.excerpt}
                  </p>
                </div>
              )}

              <div className="text-tertiary leading-relaxed whitespace-pre-wrap">
                {item.content}
              </div>
            </article>

            {/* Related Articles (Optional) */}
            {item.category && (
              <div className="mt-16 pt-12 border-t border-gray-300">
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Related Articles
                </h3>
                <p className="text-tertiary">
                  More articles in {item.category} category coming soon...
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-secondary">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-tertiary mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to get the latest news and updates
              delivered to your inbox
            </p>
            <div className="flex gap-4 justify-center flex-col md:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg text-primary flex-grow md:flex-grow-0"
              />
              <button className="bg-theme text-primary px-8 py-3 rounded-lg font-bold hover:bg-themeDeep transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default NewsDetail;