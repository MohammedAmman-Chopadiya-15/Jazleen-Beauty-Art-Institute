import React, { useEffect, useRef,useState } from "react";
import styles from "./ContactUs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader/Loader";

const ContactUs = () => {
  
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadData = async () => {
      // Simulate a data fetching process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false); // Set loading to false after fetching
    };

    loadData();
  }, []);

  const form = useRef();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      offset: 30,
    });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    const contactNumber = form.current.user_contact.value;

    if (contactNumber.length !== 10 || !/^\d+$/.test(contactNumber)) {
      alert("Please enter a valid 10-digit contact number.");
      return;
    }

    emailjs
      .sendForm(
        "service_w00x9je", // Your EmailJS service ID
        "template_r4kj68c", // Your EmailJS template ID
        form.current,
        "Eh-HlcFQvqh4rFJa9" // Your EmailJS public key
      )
      .then(
        () => {
          // Success alert
          alert("Your message has been sent successfully!");
          form.current.reset(); // Clear form after successful submission
        },
        (error) => {
          // Enhanced error logging
          alert("Failed to send message. Please try again.");
          console.log("EmailJS Error:", error);
        }
      );
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Jazleen Beauty & Art Institute</title>
      </Helmet>
      <Loader isLoading={isLoading} />

      <div className={`${styles.navbarDiv}`}>
        <Navbar />
      </div>

      <div className={styles.headerImageDiv}>
        <div className={styles.overlay}></div>
        <img
          src="/static/image/extra/contact-us-banner-2.png"
          alt=""
          className={styles.headerImage}
          data-aos="fade-up"
        />
        <div className={styles.pageName}>
          Get in touch with Jazleen Beauty & Art Institute to start your journey
          towards beauty and art excellence!
        </div>
      </div>
      <div className={styles.contactContainer}>
        <div className={styles.contactLeft}>
          <div className={styles.contactLeftContentDiv} data-aos="fade-right">
            <h2 className={styles.getintouchHeading}>GET IN TOUCH WITH US</h2>
            <p className={styles.contactInfo}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
              <span className={styles.contactDetailsStrong}>Our Location:</span>
            </p>
            <p className={styles.contactDetails}>
              6, Blue Star Complex Third floor <br /> Nr. Old High Court Under
              Bridge
              <br /> Nr. Sardar Patel Stadium Road, Navrangpura, <br />
              Ahmedabad , Gujarat 380014
            </p>
            <p className={styles.contactInfo}>
              <FontAwesomeIcon icon={faPhone} />{" "}
              <span className={styles.contactDetailsStrong}>Phone Number:</span>
            </p>
            <p className={styles.contactDetails}>
              9664707804 <br />
              9265016616
            </p>
            <p className={styles.contactInfo}>
              <FontAwesomeIcon icon={faEnvelope} />{" "}
              <span className={styles.contactDetailsStrong}>
                Email Address:
              </span>
            </p>
            <p className={styles.contactDetails}>
              <a href="mailto:jazleenartinstitute@gmail.com">
                jazleenartinstitute@gmail.com
              </a>
            </p>
            <p className={styles.contactInfo}>
              <img
                className={styles.whatsappsvg}
                src="/static/image/extra/whatsapp.svg"
                alt="whatsapp-icon"
              />{" "}
              <span className={styles.contactDetailsStrong}>WhatsApp:</span>
            </p>
            <p className={styles.contactDetails}>
              <a
                href="https://wa.me/919664707804" // Your WhatsApp number in international format (without spaces or special characters)
                target="_blank"
                rel="noopener noreferrer"
              >
                9664707804 <br />
                Click here to chat with us on WhatsApp
              </a>
            </p>
          </div>
        </div>

        <div className={styles.contactRight}>
          <div className={styles.motivationalText} data-aos="fade-left">
            <FontAwesomeIcon
              icon={faComments}
              className={styles.motivationalIcon}
            />
            <br />
            We would love to hear from you! Whether you have questions,
            feedback, or just want to say hello, feel free to reach out. Fill in
            the form below, and we’ll get back to you as soon as possible!
          </div>
          <form
            ref={form}
            onSubmit={sendEmail}
            className={styles.formDiv}
            data-aos="fade-up"
          >
            <input
              placeholder="Your Name"
              type="text"
              name="user_name"
              required
            />
            <input
              placeholder="Your Email"
              type="email"
              name="user_email"
              required
            />
            <input
              placeholder="Your Contact No."
              type="text"
              name="user_contact"
              required
              pattern="\d{10}"
              title="Contact number must be exactly 10 digits"
            />

            <textarea
              placeholder="Your Message"
              name="message"
              rows="5"
              required
            />
            <input type="submit" value="Send" className={styles.submitButton} />
          </form>
        </div>
        {/* Map Section */}
        <div className={styles.mapContainer} data-aos="zoom-in">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.550449358421!2d72.5634897753144!3d23.040272779161423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848ac1d03f5b%3A0x8e93484850d068e9!2sBlue%20Star%20Complex!5e0!3m2!1sen!2sin!4v1729089327803!5m2!1sen!2sin"
            className={styles.mapContainerStyle}
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
