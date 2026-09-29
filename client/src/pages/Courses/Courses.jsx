import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet-async";
import styles from "./Courses.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Carousel } from "react-bootstrap"; // Import Carousel component from react-bootstrap
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader/Loader"; // Import Loader component

const Courses = () => {
  const { category } = useParams(); // Get category from the URL
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration (in ms)
      once: false, // Animation should happen only once or every time you scroll up/down
      offset: 50, // Offset from the original trigger point
    });
  }, []);

  useEffect(() => {
    // Fetch data based on the category
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `https://jazleen-backend.onrender.com/api/courses/${category}/`
        );
        setCourseData(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.error : "Error fetching course data"
        );
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchCourses();
  }, [category]);

  if (loading) {
    // Full-screen video while loading
    return <Loader isLoading={loading} />;
  }

  if (error) {
    return <div>{error}</div>; // Ensure that error is a string or valid JSX
  }

  if (!courseData || !Array.isArray(courseData) || courseData.length === 0) {
    return <div>No courses available.</div>;
  }

  const getNextImageIndex = (currentIndex, length) => {
    return (currentIndex + 1) % length; // Get next index in a circular fashion
  };

  return (
    <>
      <Helmet>
        <title>
          Welcome to the World of Art & Beauty | Jazleen Beauty & Art Institute
        </title>
      </Helmet>
      <div className={`${styles.navbarDiv}`}>
        <Navbar />
      </div>

      <div>
        {courseData.map((course, index) => (
          <div key={index}>
            {/* Display Course Images as a Full-Screen Carousel */}
            <div className={styles.carouselContainer}>
              <Carousel fade>
                {/* Check if course.image exists and has images */}
                {Array.isArray(course.image) && course.image.length > 0 ? (
                  course.image.map((img, i) => {
                    const nextImgIndex = getNextImageIndex(
                      i,
                      course.image.length
                    );
                    const nextImgSrc = `${
                      course.image[nextImgIndex] ||
                      "/static/image/courses/default-carousel-image.jpeg"
                    }`;

                    return (
                      <Carousel.Item key={i}>
                        <div className={styles.overlay}></div>
                        <img
                          className={styles.carouselImage}
                          src={
                            `${img}` ||
                            "https://res.cloudinary.com/dn1jrdglw/image/upload/v1729589668/default-carousel-image_autqtx.jpg"
                          }
                          alt={`Course ${course.category} image ${i + 1}`}
                          style={{ height: "90vh", objectFit: "cover" }}
                        />
                        <div className={styles.categoryName}>
                          {course.category}
                        </div>
                        <div className={styles.nextImagePreview}>
                          <img
                            src={nextImgSrc}
                            alt={`Next preview image`}
                            style={{
                              width: "150px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      </Carousel.Item>
                    );
                  })
                ) : (
                  <Carousel.Item>
                    {/* Display only one default image if no images are available */}
                    <div className={styles.overlay}></div>
                    <img
                      className="d-block w-100"
                      src="/static/image/courses/default-carousel-image.jpeg"
                      alt="Default course image"
                      style={{ height: "90vh", objectFit: "cover" }}
                    />
                    <div className={styles.categoryName}>{course.category}</div>
                  </Carousel.Item>
                )}
              </Carousel>
            </div>

            {/* Other Course Details */}
            <div className={styles.coursesContainer}>
              <div className={styles.descriptionDiv}>
                <h2 className={styles.heading}>
                  <img
                    src={`/static/image/extra/dimond.svg`}
                    alt="decoration"
                    className={`${styles.arrowBowleft} ${styles.arrowBow}`}
                  />
                  {course.heading}
                  <img
                    src={`/static/image/extra/dimond.svg`}
                    alt="decoration"
                    className={`${styles.arrowBowright} ${styles.arrowBow}`}
                  />
                </h2>
                {Array.isArray(course.description) &&
                course.description.length > 0 ? (
                  <ul>
                    {course.description.map((desc, i) => (
                      <li
                        key={i}
                        className={styles.descriptionLi}
                        data-aos="fade-right"
                      >
                        {desc}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>No course description available.</div>
                )}
              </div>

              {/* Additional Course Sections */}
              <div className={styles.helplineDiv} data-aos="fade-up">
                <h2 className={styles.heading}>
                  <img
                    src={`/static/image/extra/arrrow-bow.svg`}
                    alt="decoration"
                    className={`${styles.arrowBowleft} ${styles.arrowBow}`}
                  />
                  Our associations can help you reach your goals
                  <img
                    src={`/static/image/extra/arrrow-bow.svg`}
                    alt="decoration"
                    className={`${styles.arrowBowright} ${styles.arrowBow}`}
                  />
                </h2>
                <p>{course.help_line || "No help line available."}</p>
              </div>

              <div className={styles.goalsDiv} data-aos="fade-up">
                <h2 className={styles.heading}>
                  <img
                    src={`/static/image/extra/arrrow-bow.svg`}
                    alt="decoration"
                    className={`${styles.arrowBowleft} ${styles.arrowBow}`}
                  />
                  Goals
                  <img
                    src={`/static/image/extra/arrrow-bow.svg`}
                    alt="decoration"
                    className={`${styles.arrowBowright} ${styles.arrowBow}`}
                  />
                </h2>
                {Array.isArray(course.goals) && course.goals.length > 0 ? (
                  <ul>
                    {course.goals.map((goal, i) => (
                      <li key={i}>
                        <img
                          src="/static/image/extra/goal.png"
                          className={styles.goalIcon}
                          alt="goal icon"
                        />
                        {goal}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>No goals available.</div>
                )}
              </div>

              <div className={styles.actorCategoriesDiv} data-aos="fade-up">
                <h2 className={styles.heading}>
                  <img
                    src={`/static/image/extra/arrrow-bow.svg`}
                    alt="decoration"
                    className={`${styles.arrowBowleft} ${styles.arrowBow}`}
                  />
                  Many of our {course.category} students are
                  <img
                    src={`/static/image/extra/arrrow-bow.svg`}
                    alt="decoration"
                    className={`${styles.arrowBowright} ${styles.arrowBow}`}
                  />
                </h2>
                {Array.isArray(course.actorCategories) &&
                course.actorCategories.length > 0 ? (
                  <ul>
                    {course.actorCategories.map((actorCat, i) => (
                      <li key={i}>{actorCat}</li>
                    ))}
                  </ul>
                ) : (
                  <div>No actor categories available.</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Courses;
