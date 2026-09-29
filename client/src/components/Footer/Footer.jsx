import React from "react";
import styles from "./Footer.module.css";
import { Link, useParams, NavLink } from "react-router-dom";

const Footer = () => {
  const { username } = useParams();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.linksDivs}>
          <span className={`pt-2 ${styles.logo}`}>
            <p>
              <span className={styles.keepInTouch}>Let's Keep In Touch!</span>{" "}
              <br /> Find us on any of these platforms.
            </p>

            <img
              src="/static/image/logo/camera-footer-1.png"
              alt="Company Logo"
              className={styles.logoImg}
            />
          </span>
          <div className={styles.linksSection}>
            <h4 className={`${styles.cousesLink}`}>Courses</h4>
            <div
              className={`row text-center d-flex justify-content-center ${styles.coursesLinks}`}
            >
              <div className="col-md pt-2">
                <h6 className={styles.linkColumn}>
                  <Link to={`/courses/acting`} className={styles.link}>
                    Acting
                  </Link>
                </h6>
              </div>
              <div className="col-md pt-2">
                <h6 className={styles.linkColumn}>
                  <Link to={`/courses/modeling`} className={styles.link}>
                    {" "}
                    Modeling
                  </Link>
                </h6>
              </div>

              <div className="col-md pt-2">
                <h6 className={styles.linkColumn}>
                  <Link to={`/courses/dancing`} className={styles.link}>
                    {" "}
                    Dancing
                  </Link>
                </h6>
              </div>

              <div className="col-md pt-2">
                <h6 className={styles.linkColumn}>
                  <Link to={`/courses/singing`} className={styles.link}>
                    {" "}
                    Singing
                  </Link>
                </h6>
              </div>

              <div className="col-md pt-2">
                <h6 className={styles.linkColumn}>
                  <Link
                    to={`/courses/Make Up & Hair Styles`}
                    className={styles.link}
                  >
                    {" "}
                    Make Up & Hair Styles
                  </Link>
                </h6>
              </div>
            </div>
          </div>
          <div className={styles.linksSection}>
            <h4 className={`${styles.cousesLink}`}>Useful Links</h4>
            <div
              className={`row text-center d-flex justify-content-center ${styles.coursesLinks}`}
            >
              <div className="col-md pt-2">
                <h6 className={styles.linkColumn}>
                  <Link to={`/about-us`} className={styles.link}>
                    About us
                  </Link>
                </h6>
              </div>
              <div className="col-md pt-2">
                <h6 className={styles.linkColumn}>
                  <Link to={`/gallery`} className={styles.link}>
                    {" "}
                    Gallery
                  </Link>
                </h6>
              </div>

              <div className="col-md pt-2">
                <h6 className={styles.linkColumn}>
                  <Link to={`/contact-us`} className={styles.link}>
                    {" "}
                    Contact Us
                  </Link>
                </h6>
              </div>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Section: Social */}
        <section className={styles.socialLinks}>
          <a
            href="https://www.instagram.com/jazleen_institute/profilecard/?igsh=cHo1ZHI5d2J1NDZu"
            target="_blank"
            rel="noreferrer"
            className={`${styles.socialLink} ${styles.instagram}`}
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://youtube.com/@jazleenartinstitute?si=HxyS66Vw8p56GR80"
            className={`${styles.socialLink} ${styles.youtube}`}
            rel="noreferrer"
            target="_blank"
          >
            <i className="fab fa-youtube"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/jazleen-institute-691500333/"
            className={`${styles.socialLink} ${styles.linkedin}`}
            rel="noreferrer"
            target="_blank"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://wa.me/919664707804" // Your WhatsApp number in international format (without spaces or special characters)
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialLink} ${styles.linkedin}`}
          >
            <img
              className={styles.whatsappsvg}
              src="/static/image/extra/whatsapp-colored.svg"
              alt="whatsapp-icon"
            />
          </a>
        </section>
        {/* Section: Social */}
      </div>
      {/* Grid container */}

      {/* Copyright */}
      <div className={styles.copyright}>
        © 2024 Copyright :{" "}
        <a className={`${styles.link} ${styles.indiameterLink}`} href="#">
          Jazleen Beauty & Art Institute
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
