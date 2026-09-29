import React from "react";
import styles from "./Loader.module.css"; // Create this CSS module

const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}>
          <img
            src="/static/image/logo/black-logo.png"
            alt="Loading..."
            className={styles.image}
          />
          <div className={styles.spinner}></div>
        </div>
      </div>
    )
  );
};

export default Loader;
