import React, { useState } from "react";
import PrimaryInput from "../../Layout/Input/PrimaryInput";
import TextareaInput from "../../Layout/Input/TextareaInput";
import LoadingButton from "../../Layout/Button/LoadingButton";
import { toast } from "react-toastify";
import { appointmentCreateApi, toastr_position } from "../../Api/Api";
import { FaCalendarCheck, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaFileSignature } from "react-icons/fa";
import { MdHome, MdBusiness, MdAttachMoney, MdTimeline } from "react-icons/md";
import { GiFlexibleLamp } from "react-icons/gi";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    preferred_contact_method: "call",
    terms_conditions: "",
    status: "requested",
    purpose_of_property: "residential",
    property_type: "apartment",
    required_area: "",
    city: "",
    location: "",
    road: "",
    additional_requirements: "",
    estimated_budget: "",
    budget_flexibility: "fixed",
    purchase_rent_timeline: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Terms and Conditions Text
  const termsText = `
    1. By submitting this appointment request, you agree to our terms of service.
    2. Our team will contact you within 24-48 hours during business days.
    3. All information provided will be kept confidential.
    4. Appointment scheduling is subject to availability.
    5. You may cancel or reschedule your appointment up to 24 hours in advance.
    6. We respect your privacy and will not share your information with third parties.
    7. For urgent matters, please contact us directly via phone.
  `;

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    
    if (!formData.required_area.trim()) {
      newErrors.required_area = "Required area is needed";
    }
    
    if (!formData.estimated_budget.trim()) {
      newErrors.estimated_budget = "Estimated budget is required";
    }
    
    if (!formData.purchase_rent_timeline.trim()) {
      newErrors.purchase_rent_timeline = "Timeline is required";
    }
    
    if (!isTermsAccepted) {
      newErrors.terms = "You must accept the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly", {
        position: toastr_position,
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submitData = {
        ...formData,
        terms_conditions: termsText
      };
      
      const response = await appointmentCreateApi(submitData);
      
      if (response.status === 200 || response.status === "success") {
        toast.success("Appointment request submitted successfully!", {
          position: toastr_position,
          autoClose: 3000,
        });
        
        // Reset form
        setFormData({
          full_name: "",
          phone: "",
          email: "",
          preferred_contact_method: "call",
          terms_conditions: "",
          status: "requested",
          purpose_of_property: "residential",
          property_type: "apartment",
          required_area: "",
          city: "",
          location: "",
          road: "",
          additional_requirements: "",
          estimated_budget: "",
          budget_flexibility: "fixed",
          purchase_rent_timeline: "",
        });
        setIsTermsAccepted(false);
        setErrors({});
        
      } else if (response.status === 400 && response.errors) {
        const serverErrors = {};
        Object.keys(response.errors).forEach(key => {
          if (response.errors[key] && response.errors[key][0]) {
            serverErrors[key] = response.errors[key][0];
          }
        });
        setErrors(serverErrors);
        
        toast.error("Please check your inputs", {
          position: toastr_position,
          autoClose: 3000,
        });
      }
      
    } catch (error) {
      console.error("Appointment submission error:", error);
      toast.error("Failed to submit appointment. Please try again.", {
        position: toastr_position,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FaCalendarCheck className="text-2xl text-theme" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Schedule an Appointment
          </h2>
        </div>
        <p className="text-gray-600">
          Fill out the form below and our team will contact you to schedule your appointment.
        </p>
      </div>

      {/* Form Sections */}
      <div className="space-y-8">
        {/* Personal Information Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaFileSignature className="text-lg text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <PrimaryInput
                value={formData.full_name}
                onChange={handleChange}
                type="text"
                placeholder="Enter your full name"
                name="full_name"
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs pt-[2px]">{errors.full_name}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <PrimaryInput
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Enter your phone number"
                name="phone"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs pt-[2px]">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <PrimaryInput
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                name="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs pt-[2px]">{errors.email}</p>
              )}
            </div>

            {/* Contact Method */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Preferred Contact Method *
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleChange("preferred_contact_method", "call")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-md border ${
                    formData.preferred_contact_method === "call"
                      ? "border-theme bg-theme bg-opacity-10 text-theme"
                      : "border-gray-300 text-gray-700 hover:border-theme"
                  }`}
                >
                  <FaPhoneAlt />
                  <span className="text-sm">Call</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("preferred_contact_method", "whatsapp")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-md border ${
                    formData.preferred_contact_method === "whatsapp"
                      ? "border-green-500 bg-green-50 text-green-600"
                      : "border-gray-300 text-gray-700 hover:border-green-500"
                  }`}
                >
                  <FaWhatsapp />
                  <span className="text-sm">WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("preferred_contact_method", "email")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-md border ${
                    formData.preferred_contact_method === "email"
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-300 text-gray-700 hover:border-blue-500"
                  }`}
                >
                  <FaEnvelope />
                  <span className="text-sm">Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Property Requirements Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MdHome className="text-xl text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-800">Property Requirements</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Purpose of Property */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Purpose of Property *
              </label>
              <div className="relative">
                <select
                  value={formData.purpose_of_property}
                  onChange={(e) => handleChange("purpose_of_property", e.target.value)}
                  className="w-full text-base font-medium rounded-md px-3 sm:px-3 md:px-4 lg:px-5 py-3 sm:py-3 md:py-3 lg:py-3 bg-primary bg-opacity-[0.09] text-primary focus-visible:outline-[0.5px] outline-theme border-none appearance-none pr-10"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="office">Office</option>
                  <option value="investment">Investment</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Property Type *
              </label>
              <div className="relative">
                <select
                  value={formData.property_type}
                  onChange={(e) => handleChange("property_type", e.target.value)}
                  className="w-full text-base font-medium rounded-md px-3 sm:px-3 md:px-4 lg:px-5 py-3 sm:py-3 md:py-3 lg:py-3 bg-primary bg-opacity-[0.09] text-primary focus-visible:outline-[0.5px] outline-theme border-none appearance-none pr-10"
                >
                  <option value="apartment">Apartment</option>
                  <option value="floor">Floor</option>
                  <option value="plot">Plot</option>
                  <option value="duplex">Duplex</option>
                  <option value="others">Others</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Required Area */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Required Area *
              </label>
              <PrimaryInput
                value={formData.required_area}
                onChange={handleChange}
                type="text"
                placeholder="e.g., 1500 sq.ft."
                name="required_area"
              />
              {errors.required_area && (
                <p className="text-red-500 text-xs pt-[2px]">{errors.required_area}</p>
              )}
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                City *
              </label>
              <PrimaryInput
                value={formData.city}
                onChange={handleChange}
                type="text"
                placeholder="Enter city"
                name="city"
              />
              {errors.city && (
                <p className="text-red-500 text-xs pt-[2px]">{errors.city}</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <PrimaryInput
                value={formData.location}
                onChange={handleChange}
                type="text"
                placeholder="Enter preferred location"
                name="location"
              />
              {errors.location && (
                <p className="text-red-500 text-xs pt-[2px]">{errors.location}</p>
              )}
            </div>

            {/* Road */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Road (Optional)
              </label>
              <PrimaryInput
                value={formData.road}
                onChange={handleChange}
                type="text"
                placeholder="Specific road or area"
                name="road"
              />
            </div>
          </div>
        </div>

        {/* Budget and Timeline Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MdAttachMoney className="text-xl text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-800">Budget & Timeline</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Estimated Budget */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Estimated Budget *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  value={formData.estimated_budget}
                  onChange={(e) => handleChange("estimated_budget", e.target.value)}
                  className="inline-block text-base font-medium rounded-md md:rounded-md lg:rounded-md pl-8 pr-3 sm:px-3 md:px-4 lg:px-5 py-3 sm:py-3 md:py-3 lg:py-3 bg-primary bg-opacity-[0.09] text-primary focus-visible:outline-[0.5px] outline-theme w-full"
                  placeholder="Enter your budget"
                  type="text"
                />
              </div>
              {errors.estimated_budget && (
                <p className="text-red-500 text-xs pt-[2px]">{errors.estimated_budget}</p>
              )}
            </div>

            {/* Budget Flexibility */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Budget Flexibility *
              </label>
              <div className="flex gap-2">
                {[
                  { value: "fixed", label: "Fixed", icon: <MdBusiness /> },
                  { value: "slightly_negotiable", label: "Slightly Negotiable", icon: <GiFlexibleLamp /> },
                  { value: "fully_flexible", label: "Fully Flexible", icon: <GiFlexibleLamp /> },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange("budget_flexibility", option.value)}
                    className={`flex flex-col items-center justify-center gap-1 p-3 rounded-md border ${
                      formData.budget_flexibility === option.value
                        ? "border-theme bg-theme bg-opacity-10 text-theme"
                        : "border-gray-300 text-gray-700 hover:border-theme flex-1"
                    }`}
                  >
                    {option.icon}
                    <span className="text-xs text-center">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Purchase/Rent Timeline *
              </label>
              <div className="relative">
                <MdTimeline className="absolute left-3 top-3 text-gray-500" />
                <PrimaryInput
                  value={formData.purchase_rent_timeline}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g., Within 1 month, 3-6 months"
                  name="purchase_rent_timeline"
                />
              </div>
              {errors.purchase_rent_timeline && (
                <p className="text-red-500 text-xs pt-[2px]">{errors.purchase_rent_timeline}</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Requirements */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Additional Requirements</h3>
            <span className="text-sm text-gray-500">(Optional)</span>
          </div>
          <TextareaInput
            value={formData.additional_requirements}
            onChange={handleChange}
            placeholder="Any specific requirements or preferences..."
            name="additional_requirements"
            className="!h-[100px] md:!h-[120px]"
          />
        </div>

        {/* Terms and Conditions */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Terms & Conditions</h4>
            <div className="text-sm text-gray-600 bg-white p-3 rounded max-h-32 overflow-y-auto whitespace-pre-line">
              {termsText}
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="termsAccept"
              checked={isTermsAccepted}
              onChange={(e) => {
                setIsTermsAccepted(e.target.checked);
                if (errors.terms) {
                  setErrors(prev => ({ ...prev, terms: "" }));
                }
              }}
              className="mt-1 h-4 w-4 text-theme focus:ring-theme border-gray-300 rounded"
            />
            <label htmlFor="termsAccept" className="text-sm text-gray-700">
              I have read and agree to the terms and conditions above *
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs pt-1">{errors.terms}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <LoadingButton
            loadingTime="2000"
            isLoading={isSubmitting}
            className="!w-full !justify-center py-4 text-lg"
            text={isSubmitting ? "Submitting..." : "Schedule Appointment"}
            onClick={handleSubmit}
            icon={<FaCalendarCheck />}
            disabled={isSubmitting}
          />
          
          <p className="text-center text-sm text-gray-500 mt-3">
            We'll contact you within 24 hours to confirm your appointment
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;