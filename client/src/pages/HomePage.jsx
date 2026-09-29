import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./HomePage.module.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  faTheaterMasks,
  faCameraRetro,
  faMicrophone,
  faThumbsUp,
  faBookOpenReader,
  faChalkboardTeacher,
  faTrophy,
  faPersonWalking,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
const icons = {
  faTheaterMasks,
  faCameraRetro,
  faPersonWalking,
  faMicrophone,
  faWandMagicSparkles,
};
const HomePage = () => {
  // const [slides, setSlides] = useState([]); // Store the array of slides
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animateClass, setAnimateClass] = useState(""); // State to control animation class
  const [imageAnimateClass, setImageAnimateClass] = useState(""); // State for image animation class
  const [loading, setLoading] = useState(true);
  const [carouselImages, setCarouselImages] = useState([]);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]); // Initialize as an empty array
  // const [slides, setSlides] = useState([]); Initialize as an empty array

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
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration (in ms)
      once: false, // Animation should happen only once or every time you scroll up/down
      offset: 50, // Offset from the original trigger point
    });
  }, []);

  useEffect(() => {
    // Simulate a 5-second loading time
    const loaderTimeout = setTimeout(() => {
      setLoading(false); // Hide the loader after 5 seconds
    }, 4000);

    return () => clearTimeout(loaderTimeout);
  }, []);

  const keywords = ["Acting", "Modeling", "Singing", "Dancing"];

  const keyPoints = [
    {
      text: "Jazleen Beauty & Art Institute is the best place to turn your passion into reality. The best institute for ACHIEVING DREAMS.",
      icon: faThumbsUp,
    },
    {
      text: "The courses offered at Jazleen Beauty & Art Institute not only help individuals learn acting but also give complete knowledge about the film industry and film production.",
      icon: faBookOpenReader,
    },
    {
      text: "Jazleen Beauty & Art Institute offers advanced media courses with A-grade experienced faculty to fulfill your dreams in the field of acting.",
      icon: faChalkboardTeacher,
    },
    {
      text: "Jazleen Beauty & Art Institute not only teaches acting but also grooms individuals to face every challenge of day-to-day life.",
      icon: faTrophy,
    },
  ];

  const slides = [
    {
      slogan: "Dance with us ",
      image: "static/image/home/dancing-home.jpg",
      title: "Dancing : Where Passion Meets Movement!",
      content:
        "Dance is more than just movement; it's an expression of your soul. Join us to learn, grow, and dance with passion!",
    },
    {
      slogan: "Sing with us",
      image: "static/image/home/singing-home.jpeg",
      title: "Unleash Your Voice with Singing !",
      content:
        "Experience the magic of music with us! Learn to play your favorite instruments or master vocal techniques in a vibrant and inspiring community",
    },
    {
      slogan: "Modeling with us",
      image: "static/image/home/modeling-home.jpg",
      title: "Modeling Classes Designed for You!",
      content:
        "Discover the world of modeling and enhance your unique beauty! Our classes cover everything from catwalk techniques to personal branding",
    },
    {
      slogan: "Acting with us",
      image: "static/image/home/acting-home.jpeg",
      title: "Acting Awaits You!",
      content:
        "Ignite your passion for performance in our acting classes. Build confidence, unleash creativity, and master the art of storytelling!",
    },
  ];

  useEffect(() => {
    // Fetch carousel images from the Django API
    axios
      .get("https://jazleen-backend.onrender.com/api/carousel/")
      .then((response) => {
        setCarouselImages(response.data); // Set the carousel images data
      })
      .catch((error) => {
        console.error("Error fetching carousel images:", error);
        setError("Failed to load carousel images"); // Set an error message for the UI
      });
  }, []);

  useEffect(() => {
    // Set up auto-scrolling
    const interval = setInterval(() => {
      if (carouselRef.current) {
        // Scroll the carousel by a set amount (e.g., 300px)
        carouselRef.current.scrollBy({
          left: 300, // Scroll 300px to the right
          behavior: "smooth",
        });
      }
    }, 5000); // Set interval for 3 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  useEffect(() => {
    axios
      .get("https://jazleen-backend.onrender.com/api/data/")
      .then((response) => {
        // setSlides(response.data); // Set the slides data from the response
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data"); // Set an error message for the UI
      });

    const interval = setInterval(() => {
      setAnimateClass(styles.animate); // Trigger text animation
      setImageAnimateClass(styles.slideoutleft); // Trigger image slide-out animation
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length > 0) {
      setAnimateClass(styles.animate); // Trigger animation for text
      setImageAnimateClass(styles.slideinright); // Trigger image slide-in animation
      const timer = setTimeout(() => {
        setAnimateClass(""); // Reset animation class after duration
        setImageAnimateClass(""); // Reset image animation class after duration
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, slides.length]);

  // Function to highlight keywords in the title
  const highlightKeywords = (title) => {
    return title.split(" ").map((word, index) => {
      return keywords.includes(word) ? (
        <span key={index} className={styles.redHighlight}>
          {word}{" "}
        </span>
      ) : (
        word + " "
      );
    });
  };

  const handleCourseClick = (coursename) => {
    navigate(`/courses/${coursename}`);
  };

  return (
    <>
      <Helmet>
        <title> Home | Jazleen Beauty & Art Institute</title>
      </Helmet>
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.overlay}>
            <div className={styles.loader}>
              <h1>Jazleen Beauty & Art Institute</h1>
              <img src="/static/image/logo/black-logo.png" alt="Loading..." />
            </div>
          </div>
        </div>
      ) : (
        <>
          <Helmet>
            <title>
              Welcome to the World of Art & Beauty | Jazleen Beauty & Art
              Institute
            </title>
          </Helmet>
          <div className={`${styles.navbarDiv}`}>
            <Navbar />
          </div>
          <div className={styles.homeFirstCarousel}>
            <div className={styles.imageContainer}>
              {slides.length > 0 && (
                <img
                  src={slides[currentIndex].image}
                  alt={`Slideshow Image ${currentIndex + 1}`}
                  className={`${styles.slideshowImage} ${imageAnimateClass}`}
                />
              )}
            </div>
            <div className={`${styles.container} ${styles.fontstyles}`}>
              {error ? (
                <p className={styles.errorMessage}>{error}</p>
              ) : (
                slides.length > 0 && (
                  <>
                    <p className={`${styles.slogan} ${animateClass}`}>
                      {slides[currentIndex].slogan}
                    </p>
                    <h1 className={`${styles.displayText} ${animateClass}`}>
                      {highlightKeywords(slides[currentIndex].title)}
                    </h1>
                    <p className={`${styles.description} ${animateClass}`}>
                      {slides[currentIndex].content}
                    </p>
                  </>
                )
              )}
            </div>
          </div>

          {/* Content Div */}
          <div className={styles.contentDiv}>
            {/* Jazleen Beauty & Art Institute Text Section */}
            <div className={styles.brandName}>
              <span
                className={`${styles.brandNameH1} ${styles.brodiesFont}`}
                data-aos="zoom-in"
              >
                Jazleen Beauty & Art Institute
              </span>
            </div>
            <div
              className={`${styles.textSection} ${styles.fontstyles}`}
              data-aos="fade-up"
            >
              <h2 className={styles.instituteHeading} data-aos="fade-up">
                <img
                  src={`/static/image/extra/dimond.svg`}
                  alt="decoration"
                  className={`${styles.arrowBowleft} ${styles.arrowBow}`}
                />
                Welcome to the Best Acting Institute of Ahmedabad
                <img
                  src={`/static/image/extra/dimond.svg`}
                  alt="decoration"
                  className={`${styles.arrowBowright} ${styles.arrowBow}`}
                />
              </h2>
              <p className={styles.instituteDescription} data-aos="fade-up">
                If you are looking for the best acting institute in
                ahmedabad-gujarat, then look no further.{" "}
                <span className={`${styles.spanHighlight}`}>
                  Jazleen Beauty & Art Institute
                </span>{" "}
                is a leading acting school in ahmedabad. We provide structured
                courses designed to teach individuals the skills and techniques
                required to become proficient actors. We offer it at various
                levels, from beginners to advanced and cater to individuals of
                all ages who have an interest in pursuing a career in acting or
                simply want to improve their acting skills as a hobby.{" "}
                <span className={styles.spanHighlight}>
                  Jazleen Beauty & Art Institute
                </span>{" "}
                is widely regarded as the premier acting institute in ahmedabad,
                known for its excellence in nurturing and honing the talents of
                aspiring actors. With a strong focus on practical training and
                industry-relevant curriculum, the institute has produced
                numerous successful actors who have made their mark in the
                entertainment world. It boasts state-of-the-art facilities,
                experienced faculty and a supportive learning environment that
                empowers students to explore their creativity and develop their
                acting skills to the fullest.{" "}
                <span className={styles.spanHighlight}>
                  Jazleen Beauty & Art Institute
                </span>{" "}
                's commitment to quality education and its impressive track
                record make it the top choice for those seeking a promising
                career in acting in Ahmedabad.
              </p>
            </div>

            {/* Key Points Section */}
            <div className={styles.cardsContainer} data-aos="fade-up">
              <div className={styles.cardsContainerHeadingDiv}>
                <h1 className={styles.cardsContainerHeading}>
                  <img
                    src={`/static/image/extra/arrrow-bow.svg`}
                    alt="decoration"
                    className={`${styles.arrowBowleft} ${styles.arrowBow}`}
                  />
                  Key Points
                  <img
                    src={`/static/image/extra/arrrow-bow.svg`}
                    alt="decoration"
                    className={`${styles.arrowBowright} ${styles.arrowBow}`}
                  />
                </h1>
              </div>
              {keyPoints.map((point, index) => (
                <div key={index} className={styles.card} data-aos="fade-up">
                  <FontAwesomeIcon icon={point.icon} className={styles.icon} />
                  <p>{point.text}</p>
                </div>
              ))}
            </div>

            {/* MP4 video right below the navbar */}
            <div className={styles.promoVideoContainer} data-aos="zoom-in">
              <video className={styles.promoVideo} autoPlay loop muted>
                <source
                  src="/static/video/Orange Simple Dance Party Youtube Thumbnails (1) (online-video-cutter.com).mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div
                className={`${styles.brodiesFont} ${styles.promovideoHeading}`}
              >
                Jazleen Beauty <br /> & Art Institute
              </div>
            </div>

            {/* <img
              className={styles.bannerImageNew}
              src="/static/image/extra/1.png"
              alt="extraaaaaaaaaaaaa"
              style={{ padding: "20px" }}
              width={"400px"}
            /> */}

            <div className={styles.coursesCardsContainer}>
              <div className={styles.cardsContainerHeadingDiv}>
                <h1 className={styles.cardsContainerHeading}>
                  <img
                    src={`/static/image/extra/arrrow-bow.svg`}
                    alt="decoration"
                    className={`${styles.arrowBowleft} ${styles.arrowBow}`}
                  />
                  Our Courses
                  <img
                    src={`/static/image/extra/arrrow-bow.svg`}
                    alt="decoration"
                    className={`${styles.arrowBowright} ${styles.arrowBow}`}
                  />
                </h1>
              </div>

              {courseData.map((course, index) => (
                <div key={index} className={styles.cardCoursesOuter}>
                  <div
                    onClick={() => handleCourseClick(course.category)}
                    className={styles.cardCourses}
                    style={{ "--hover-image": `url(${course.card_image})` }}
                    data-aos="fade-up"
                  >
                    <FontAwesomeIcon
                      icon={icons[course.card_icon]}
                      className={styles.iconCourses}
                    />
                    <h3 className={` ${styles.borderedText}`}>
                      {course.category}
                    </h3>
                    <p className={`${styles.underborderedText}`}>
                      {course.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.aboutOwnerDiv}>
              <div>
                <video className={styles.instituteVideo} autoPlay loop muted>
                  <source
                    src="/static/video/Dream of Bollywood Glamour.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className={styles.aboutOwnerDetails} data-aos="fade-up">
                <h1
                  className={`${styles.brodiesFont}  ${styles.aboutOwnerDetailsHeading}`}
                >
                  Shaheen Khan
                  <img
                    src="/static/image/extra/quote.svg"
                    alt="Shaheen Khan"
                    className={styles.quote}
                  />
                </h1>
                <p>
                  Jazleen Beauty & Art Institute is the most sought bridal
                  makeup artist based in Ahmedabad, having 20 years of
                  experience. <br /> We generally travels to wedding location
                  for bridal makeup but also have a makeup studio at Ahmedabad.
                  We travels across India for destination wedding makeup.
                  Jazleen Beauty & Art Institute also has her own makeup and
                  hair academy where she conducts professional Makeup, Hair and
                  skin courses with more than 300 students have passed from the
                  academy in last 3 years. Shaheen Khan, being an entrepreneur
                  is proud owner of Jazleen Beauty & Art Institute, the most
                  creative and recommended Makeover studio of Ahmedabad.
                </p>
              </div>
            </div>

            {/* Display carousel */}
            <div className={styles.carouselContainer}>
              {error ? (
                <p className={styles.errorMessage}>{error}</p>
              ) : (
                <div ref={carouselRef} className={styles.carousel}>
                  {carouselImages.map((image) => (
                    <div key={image.id} className={styles.carouselItem}>
                      <img
                        src={`${image.url}`}
                        alt={`Carousel Image ${image.id}`}
                        className={styles.carouselImage}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Supporting Institute */}
            <div className={styles.supportingInstitute}>
              <div className={styles.instituteLogo}>
                <a href="https://sitarehumzameenke.com/" target="_blank">
                  <img
                    src="/static/image/logo/sitare-hum-zameen-ke-logo.png"
                    alt="Sitare Hum Zameen Ke Logo"
                    className={styles.sitarezameenkelogo}
                  />
                </a>
              </div>
              <div className={styles.instituteInfo}>
                <h2>Sitare Hum Zameen Ke</h2>
                <p>
                  "Sitare Hum Zameen Ke" is a proud supporter of the Jazleen
                  Beauty and Art Institute. The institute is dedicated to
                  nurturing young talent in various artistic fields.
                </p>
                <div className={styles.sitarezameenkeLink}>
                  {" "}
                  <a href="https://sitarehumzameenke.com/" target="_blank">
                    {" "}
                    Click to visit the website
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default HomePage;
