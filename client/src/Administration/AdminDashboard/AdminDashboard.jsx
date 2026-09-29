import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css"; // Assuming you are using CSS modules
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard | Admin - Jazleen Beauty & Art Institute</title>
      </Helmet>
      <div className={styles.dashboardContainer}>
        <div className={styles.logoContainer}>
          <img
            src="/static/image/logo/black-logo-removebg-preview.png"
            alt="Company Logo"
            className={styles.companyLogo}
          />
        </div>
        <h1 className={styles.dashboardHeading}>Admin Dashboard</h1>

        <div className={styles.linkContainer}>
          <Link to="/admin-gallery" className={styles.dashboardLink}>
            Manage Gallery
          </Link>
          <Link to="/admin-courses" className={styles.dashboardLink}>
            Manage Courses
          </Link>
          <Link to="/admin-add-carousel" className={styles.dashboardLink}>
            Manage Carousel Images
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
