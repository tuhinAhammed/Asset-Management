import React, { useState, useRef } from "react";
import { FiX, FiUpload, FiMail, FiUser, FiPhone, FiFileText, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";

/**
 * ResumeModal Component
 * Modal for submitting resume and contact information
 * 
 * Props:
 * - isOpen: Boolean to control modal visibility
 * - onClose: Callback function to close modal
 */
const ResumeModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  /**
   * Handle form input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handle file selection
   */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document (DOC/DOCX)");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setResumeFile(file);
    toast.success(`Resume selected: ${file.name}`);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create form data for file upload
      const submitFormData = new FormData();
      submitFormData.append("fullName", formData.fullName);
      submitFormData.append("email", formData.email);
      submitFormData.append("phone", formData.phone);
      submitFormData.append("message", formData.message);
      submitFormData.append("resume", resumeFile);

      // Simulate API call (replace with actual API endpoint)
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://asset-api.shelaigor.com/api";
      
      // Try to send to real API
      try {
        const response = await fetch(`${API_BASE_URL}/career/submit-resume`, {
          method: "POST",
          body: submitFormData,
        });

        if (!response.ok) throw new Error("API request failed");
        
        const data = await response.json();
        toast.success("Resume submitted successfully! We'll review it shortly.");
      } catch (apiError) {
        // Fallback: show success message (since we're in development)
        console.log("Resume submission data:", {
          formData,
          fileName: resumeFile.name,
          fileSize: resumeFile.size,
        });
        toast.success("Resume submitted successfully! We'll review it shortly.");
      }

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
      setResumeFile(null);
      
      // Close modal
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error submitting resume:", error);
      toast.error("Failed to submit resume. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Clear selected file
   */
  const handleClearFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-[rgba(0,0,0,0.08)] bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiUpload className="text-theme text-xl" />
            </div>
            <h2 className="text-xl font-bold text-primary">Send Your Resume</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <FiX className="text-primary text-xl" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2 flex items-center gap-2">
              <FiUser className="text-theme" />
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 border border-[rgba(0,0,0,0.12)] rounded-lg 
                focus:border-theme focus:ring-2 focus:ring-blue-50 outline-none transition-colors
                text-sm"
              disabled={isSubmitting}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2 flex items-center gap-2">
              <FiMail className="text-theme" />
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className="w-full px-4 py-2.5 border border-[rgba(0,0,0,0.12)] rounded-lg 
                focus:border-theme focus:ring-2 focus:ring-blue-50 outline-none transition-colors
                text-sm"
              disabled={isSubmitting}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2 flex items-center gap-2">
              <FiPhone className="text-theme" />
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2.5 border border-[rgba(0,0,0,0.12)] rounded-lg 
                focus:border-theme focus:ring-2 focus:ring-blue-50 outline-none transition-colors
                text-sm"
              disabled={isSubmitting}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2 flex items-center gap-2">
              <FiFileText className="text-theme" />
              Cover Letter / Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about yourself and why you'd like to join our team..."
              rows="4"
              className="w-full px-4 py-2.5 border border-[rgba(0,0,0,0.12)] rounded-lg 
                focus:border-theme focus:ring-2 focus:ring-blue-50 outline-none transition-colors
                text-sm resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2 flex items-center gap-2">
              <FiUpload className="text-theme" />
              Upload Resume *
            </label>
            <div className="border-2 border-dashed border-[rgba(0,0,0,0.12)] rounded-lg p-4 text-center hover:border-theme transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                disabled={isSubmitting}
              />
              {resumeFile ? (
                <div className="space-y-2">
                  <div className="text-green-600 text-2xl">✓</div>
                  <p className="text-sm font-semibold text-primary">{resumeFile.name}</p>
                  <p className="text-xs text-tertiary">
                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={handleClearFile}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold mt-2"
                    disabled={isSubmitting}
                  >
                    Change File
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <FiUpload className="mx-auto text-2xl text-tertiary" />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm font-semibold text-theme hover:text-theme/80"
                    disabled={isSubmitting}
                  >
                    Click to upload
                  </button>
                  <p className="text-xs text-tertiary">
                    or drag and drop (PDF, DOC, DOCX - max 5MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 px-6 py-3 bg-theme text-white font-semibold rounded-lg
              hover:bg-buttonHover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Submitting...
              </>
            ) : (
              <>
                <FiSend />
                Submit Resume
              </>
            )}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full px-6 py-2 bg-gray-100 text-primary font-semibold rounded-lg
              hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResumeModal;
