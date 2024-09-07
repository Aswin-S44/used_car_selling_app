import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Import icons from react-icons
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div className="container">
      <div className="new-contact-page">
        <header className="new-contact-header">
          <h1>Contact Us</h1>
          <p>We're here to help you with any questions or concerns.</p>
        </header>

        <div className="new-contact-content">
          <div className="new-contact-form">
            <h2>Get in Touch</h2>
            <form>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                required
              />
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                rows="5"
                required
              ></textarea>
              <button type="submit" className="new-submit-btn">
                Send
              </button>
            </form>
          </div>

          <div className="new-contact-info">
            <h2>Contact Information</h2>
            <div className="new-contact-card">
              <p>
                <FaPhoneAlt className="new-contact-icon" />
                {"  "} +1 234 567 890
              </p>
            </div>
            <div className="new-contact-card">
              <p>
                <FaEnvelope className="new-contact-icon" /> {"  "}{" "}
                support@example.com
              </p>
            </div>
            <div className="new-contact-card">
              <p>
                <FaMapMarkerAlt className="new-contact-icon" />
                {"  "} 1234 Car St, Auto City, AC 12345
              </p>
            </div>
          </div>
        </div>

        <div className="new-contact-map">
          <h2>Our Location</h2>
          <iframe
            title="Google Maps Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.068104519025!2d-122.08385168468157!3d37.38605177982564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5c7bdfb01cf%3A0x8b0627e3a7f85b53!2sGoogleplex!5e0!3m2!1sen!2sus!4v1630868654520!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
