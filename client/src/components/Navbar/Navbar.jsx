import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure Bootstrap JS is imported
import styles from "./Navbar.module.css";
import axios from "axios";

const Navbar = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch data from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `https://jazleen-backend.onrender.com/api/allcourses/`
        );
        setCourseData(response.data); // Set the course data from the response
      } catch (err) {
        setError(
          err.response ? err.response.data.error : "Error fetching course data"
        );
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchCourses();
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${styles.fontstyles} navbar navbar-expand-lg`}
    >
      <div className="container-fluid">
        <NavLink className={styles.logo} to="/admin-login">
          <img
            src="/static/image/logo/black-logo-removebg-preview.png"
            alt="Company Logo"
            className={styles.logoImg}
          />
        </NavLink>

        <button
          className={`${styles.icon} navbar-toggler`}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className={`navbar-toggler-icon`}></span>
        </button>

        <div
          className={`offcanvas offcanvas-end ${styles.offcanvasDivOuter}`}
          tabIndex="-1"
          id="offcanvasNavbar"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className={`offcanvas-body ${styles.offcanvasDiv}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${styles.navLink} ${
                      isActive ? styles.navbarLinkActive : ""
                    }`
                  }
                  exact
                  to="/"
                >
                  <i className={`fas fa-home ${styles.icon}`}></i> HOME
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className={`nav-link dropdown-toggle ${styles.navLink}`}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className={`fas fa-book ${styles.icon}`}></i> COURSES
                </NavLink>
                <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
                  {/* Render course categories dynamically */}
                  {loading ? (
                    <li>Loading...</li>
                  ) : error ? (
                    <li>Error: {error}</li>
                  ) : (
                    courseData.map((course, index) => (
                      <li key={index}>
                        <NavLink
                          className={({ isActive }) =>
                            `dropdown-item ${styles.dropdownItem} ${
                              isActive ? styles.navLinkActive : ""
                            }`
                          }
                          to={`/courses/${course.category}`}
                        >
                          {course.category.charAt(0).toUpperCase() +
                            course.category.slice(1)}
                        </NavLink>
                      </li>
                    ))
                  )}
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${styles.navLink} ${
                      isActive ? styles.navbarLinkActive : ""
                    }`
                  }
                  to="/gallery"
                >
                  <i className={`fas fa-images ${styles.icon}`}></i> GALLERY
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${styles.navLink} ${
                      isActive ? styles.navbarLinkActive : ""
                    }`
                  }
                  to="/about-us"
                >
                  <i className={`fas fa-info-circle ${styles.icon}`}></i> ABOUT
                  US
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${styles.navLink} ${
                      isActive ? styles.navbarLinkActive : ""
                    }`
                  }
                  to="/contact-us"
                >
                  <i className={`fas fa-envelope ${styles.icon}`}></i> CONTACT
                  US
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
