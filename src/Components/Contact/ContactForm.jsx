import React, { useState } from "react";
import PrimaryInput from "../../Layout/Input/PrimaryInput";
import TextareaInput from "../../Layout/Input/TextareaInput";
import LoadingButton from "../../Layout/Button/LoadingButton";
import LargeTitle from "../../Layout/Title/LargeTitle";
import MinTitle from "../../Layout/Title/MinTitle";
import axios from "axios";
import { contactSubmitApi, toastr_position } from "../../Api/Api";
import { toast } from "react-toastify";
import { GrSend } from "react-icons/gr";

const ContactForm = ({ translations }) => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setStatus("");
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(contactSubmitApi, {
        name: formData.name,
        subject: formData.subject,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      
      console.log("Full API Response:", response);
      
      // Check if the inner data has status 400 (error)
      if (response.data.status === 400 && response.data.errors) {
        console.log("Validation errors found:", response.data.errors);
        
        // Map backend field names to frontend field names
        const serverErrors = response.data.errors;
        const mappedErrors = {};
        
        // Map each backend field to frontend field
        if (serverErrors.name) mappedErrors.name = serverErrors.name[0];
        if (serverErrors.email) mappedErrors.email = serverErrors.email[0];
        if (serverErrors.phone) mappedErrors.phone = serverErrors.phone[0];
        if (serverErrors.subject) mappedErrors.subject = serverErrors.subject[0];
        if (serverErrors.message) mappedErrors.message = serverErrors.message[0];
        
        console.log("Mapped errors:", mappedErrors);
        setErrors(mappedErrors);
        
        toast.error("Please check your inputs and try again.", {
          position: `${toastr_position}`,
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        
        setStatus("Please fill the required Field");
        
      } 
      // Check if success
      else if (response.data.status === 200 || response.data.status === "success") {
        setStatus("Message sent successfully!");
        
        toast.success("Message sent successfully!", {
          position: `${toastr_position}`,
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Reset form
        setFormData({
          name: "",
          subject: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});
      }
      else {
        // Handle unexpected response
        setStatus("Failed to send message.");
        toast.error("Something went wrong. Please try again.", {
          position: `${toastr_position}`,
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      
    } catch (error) {
      console.error("Network or server error:", error);
      
      // This will only catch network errors or 5xx server errors
      setStatus("Failed to send message.");
      toast.error("Network error. Please try again later.", {
        position: `${toastr_position}`,
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <div>
        <MinTitle
          className={`py-2 md:py-3 lg:py-4 pb-5 text-center font-medium ${
            status && status.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
          text={status}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 md:gap-3 lg:gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 lg:gap-4">
          <div>
            <PrimaryInput
              onChange={handleChange}
              type="text"
              placeholder="Your Name *"
              value={formData.name}
              name="name"
              className="!border-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs pt-[2px]">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <PrimaryInput
              onChange={handleChange}
              type="email"
              placeholder="Email *"
              value={formData.email}
              name="email"
              className="!border-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs pt-[2px]">{errors.email}</p>
            )}
          </div>

          <div>
            <PrimaryInput
              onChange={handleChange}
              type="number"
              placeholder="Phone"
              value={formData.phone}
              name="phone"
              className=" !border-none "
            />
            {errors.phone && (
              <p className="text-red-500 text-xs pt-[2px]">{errors.phone}</p>
            )}
          </div>

          <div>
            <PrimaryInput
              onChange={handleChange}
              type="text"
              placeholder="Subject"
              value={formData.subject}
              name="subject"
              className="!border-none"
            />
            {errors.subject && (
              <p className="text-red-500 text-xs pt-[2px]">{errors.subject}</p>
            )}
          </div>
        </div>

        <div>
          <TextareaInput
            onChange={handleChange}
            placeholder="Message *"
            value={formData.message}
            name="message"
            className="!border-none"
          />
          {errors.message && (
            <p className="text-red-500 text-xs pt-[2px]">{errors.message}</p>
          )}
        </div>
      </div>

      <div className="text-left mt-2">
        <LoadingButton
          loadingTime="2000"
          icon={<GrSend />}
          className="!uppercase !inline-block text-center"
          text="Send Message"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ContactForm;