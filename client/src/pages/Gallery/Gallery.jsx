import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Gallery.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet-async";
import Loader from "../../components/Loader/Loader";

const Gallery = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loader initially set to true

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get("https://jazleen-backend.onrender.com/api/videos/")
      .then((response) => {
        setVideos(response.data);
        setIsLoading(false); // Stop loader after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        setIsLoading(false); // Stop loader even if there's an error
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Gallery | Video Collection | Jazleen Beauty & Art Institute
        </title>
      </Helmet>
      {isLoading && <Loader isLoading={isLoading} />}
      {!isLoading && (
        <>
          <div className={`${styles.navbarDiv}`}>
            <Navbar />
          </div>

          {/* MP4 video right below the navbar */}
          <div className={styles.promoVideoContainer}>
            <video className={styles.promoVideo} autoPlay loop muted>
              <source src="/static/video/promo-video-3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className={styles.galleryContainer}>
            <h1 className={styles.eventGalleryHeading}>
              <img
                src={`/static/image/extra/arrrow-bow.svg`}
                alt="decoration"
                className={`${styles.arrowBowleft} ${styles.arrowBow}`}
              />
              Event Gallery
              <img
                src={`/static/image/extra/arrrow-bow.svg`}
                alt="decoration"
                className={`${styles.arrowBowright} ${styles.arrowBow}`}
              />
            </h1>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <div className={styles.videoGrid}>
              {videos.map((video, index) => (
                <div key={index} className={styles.videoCard}>
                  <iframe
                    src={`${video.videoUrl}?modestbranding=0&showinfo=0&rel=0&iv_load_policy=3&controls=1`}
                    title={`Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p>{video.description}</p>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Gallery;
