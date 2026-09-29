import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./AdminNavbar.module.css";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const offCanvasRef = useRef(null); // Reference to the off-canvas menu

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  // Close the off-canvas menu if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        offCanvasRef.current &&
        isOpen &&
        !offCanvasRef.current.contains(event.target)
      ) {
        setIsOpen(false); // Close off-canvas when clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <NavLink to="/" onClick={closeNavbar}>
            <img
              src="/static/image/logo/black-logo-removebg-preview.png"
              width={"50px"}
              className={styles.companyLogo}
              alt="company logo"
            />
          </NavLink>
        </div>
        <div className={styles.hamburger} onClick={toggleNavbar}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.adminnavbarlink} ${
                  isActive ? styles.navLinkActive : ""
                }`
              }
              onClick={closeNavbar}
              style={{ color: "blue" }}
            >
              Back to Website
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-gallery"
              onClick={closeNavbar}
              className={({ isActive }) =>
                `${styles.adminnavbarlink} ${
                  isActive ? styles.navLinkActive : ""
                }`
              }
            >
              Gallery Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-courses"
              onClick={closeNavbar}
              className={({ isActive }) =>
                `${styles.adminnavbarlink} ${
                  isActive ? styles.navLinkActive : ""
                }`
              }
            >
              Courses Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-add-carousel"
              onClick={closeNavbar}
              className={({ isActive }) =>
                `${styles.adminnavbarlink} ${
                  isActive ? styles.navLinkActive : ""
                }`
              }
            >
              Carousel Images Management
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Offcanvas Menu */}
      <div
        ref={offCanvasRef}
        className={`${styles.offcanvasMenu} ${isOpen ? styles.navActive : ""}`}
      >
        {/* Close button */}
        <button className={styles.closeButton} onClick={closeNavbar}>
          &times;
        </button>
        <ul className={styles.offcanvasLinks}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.adminnavbarlink} ${
                  isActive ? styles.navLinkActive : ""
                }`
              }
              onClick={closeNavbar}
              style={{ color: "blue" }}
            >
              Back to Website
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-gallery"
              onClick={closeNavbar}
              className={({ isActive }) =>
                `${styles.adminnavbarlink} ${
                  isActive ? styles.navLinkActive : ""
                }`
              }
            >
              Gallery Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-courses"
              onClick={closeNavbar}
              className={({ isActive }) =>
                `${styles.adminnavbarlink} ${
                  isActive ? styles.navLinkActive : ""
                }`
              }
            >
              Courses Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-add-carousel"
              onClick={closeNavbar}
              activeClassName="active"
              className={({ isActive }) =>
                `${styles.adminnavbarlink} ${
                  isActive ? styles.navLinkActive : ""
                }`
              }
            >
              Carousel Images Management
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminNavbar;
