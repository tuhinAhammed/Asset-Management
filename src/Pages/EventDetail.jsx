import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { newsEventsService } from "../Services/newsEventsService";
import Container from "../Layout/Container";
import Breadcrumb from "../Layout/Breadcrumb/Breadcrumb";
import {
  FiArrowLeft,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * EVENT DETAIL PAGE
 * =================
 * Display full event details with registration info
 */
const EventDetail = () => {
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
    const loadEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to get from location state first
        if (location.state?.item) {
          setItem(location.state.item);
        } else {
          // Otherwise fetch from service
          const result = await newsEventsService.getEventBySlug(slug);
          if (result.success && result.data) {
            setItem(result.data);
          } else {
            setError("Event not found");
          }
        }
      } catch (err) {
        console.error("Error loading event:", err);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
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
        <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Events" }]} />
        <section className="py-20 bg-secondary">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">
                {error || "Not Found"}
              </h1>
              <button
                onClick={() => navigate("/news-events")}
                className="bg-theme text-primary px-6 py-3 rounded-lg font-bold hover:bg-themeDeep transition-colors inline-flex items-center gap-2"
              >
                <FiArrowLeft />
                Back to Events
              </button>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  const breadcrumbData = [
    { label: "Home", path: "/" },
    { label: "Events", path: "/news-events" },
    { label: item.title },
  ];

  const isUpcoming = item.status === "upcoming";
  const eventDate = item.start_date
    ? new Date(item.start_date)
    : null;
  const isEventPassed = eventDate && eventDate < new Date();

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
            Back to Events
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
                  {item.category || "Event"}
                </span>
                {isUpcoming && (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <FiCheckCircle className="text-sm" />
                    Upcoming
                  </span>
                )}
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
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="md:col-span-2">
              <article data-aos="fade-up">
                {item.description && (
                  <div className="mb-8 p-6 bg-lightThemeBg border-l-4 border-theme rounded">
                    <p className="text-lg text-primary font-semibold">
                      {item.description}
                    </p>
                  </div>
                )}

                <div className="text-tertiary leading-relaxed whitespace-pre-wrap mb-12">
                  {item.content}
                </div>

                {/* Agenda Section (if available) */}
                {item.agenda && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-primary mb-6">
                      Event Agenda
                    </h3>
                    <div className="space-y-4">
                      {item.agenda.map((agendaItem, idx) => (
                        <div
                          key={idx}
                          className="p-4 border-l-4 border-theme bg-quaternary rounded"
                          data-aos="fade-up"
                          data-aos-delay={idx * 100}
                        >
                          <p className="text-sm text-theme font-bold">
                            {agendaItem.time}
                          </p>
                          <p className="text-primary font-semibold">
                            {agendaItem.title}
                          </p>
                          {agendaItem.speaker && (
                            <p className="text-tertiary text-sm">
                              By {agendaItem.speaker}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </div>

            {/* Sidebar - Event Details */}
            <aside className="md:col-span-1" data-aos="fade-left">
              <div className="sticky top-24 space-y-6">
                {/* Event Card */}
                <div className="bg-primary text-secondary p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-6">Event Details</h3>

                  {/* Date */}
                  {item.start_date && (
                    <div className="mb-6 pb-6 border-b border-gray-600">
                      <div className="flex items-start gap-3">
                        <FiCalendar className="text-theme text-xl flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-tertiary text-sm">Dates</p>
                          <p className="font-bold">
                            {new Date(item.start_date).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                          {item.end_date && (
                            <p className="text-tertiary text-sm">
                              to{" "}
                              {new Date(item.end_date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {item.location && (
                    <div className="mb-6 pb-6 border-b border-gray-600">
                      <div className="flex items-start gap-3">
                        <FiMapPin className="text-theme text-xl flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-tertiary text-sm">Location</p>
                          <p className="font-bold">{item.location}</p>
                          {item.venue && (
                            <p className="text-tertiary text-sm">
                              {item.venue}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Attendees */}
                  {item.attendee_limit && (
                    <div className="mb-6 pb-6 border-b border-gray-600">
                      <div className="flex items-start gap-3">
                        <FiUsers className="text-theme text-xl flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-tertiary text-sm">Max Attendees</p>
                          <p className="font-bold">{item.attendee_limit}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Speakers */}
                  {item.speaker_count && (
                    <div className="mb-6 pb-6 border-b border-gray-600">
                      <div className="flex items-start gap-3">
                        <FiClock className="text-theme text-xl flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-tertiary text-sm">Speakers</p>
                          <p className="font-bold">{item.speaker_count}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Registration Button */}
                  <button
                    disabled={isEventPassed}
                    className={`w-full py-3 px-6 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                      isEventPassed
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-theme text-primary hover:bg-themeDeep"
                    }`}
                  >
                    <FiCheckCircle />
                    {isEventPassed ? "Event Passed" : "Register Now"}
                  </button>

                  {item.registration_url && !isEventPassed && (
                    <a
                      href={item.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-tertiary text-sm mt-3 hover:text-theme transition-colors"
                    >
                      Visit Registration Page →
                    </a>
                  )}
                </div>

                {/* Category Info */}
                {item.category && (
                  <div className="bg-quaternary p-6 rounded-lg">
                    <h4 className="font-bold text-primary mb-2">Category</h4>
                    <p className="text-tertiary">{item.category}</p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      {!isEventPassed && (
        <section className="py-12 bg-primary text-secondary">
          <Container>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Don't Miss This Event!</h2>
              <p className="text-tertiary mb-6 max-w-2xl mx-auto">
                Register now to secure your spot and get updates about the event
              </p>
              <button className="bg-theme text-primary px-8 py-3 rounded-lg font-bold hover:bg-themeDeep transition-colors inline-flex items-center gap-2">
                <FiCheckCircle />
                Register Now
              </button>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
};

export default EventDetail;