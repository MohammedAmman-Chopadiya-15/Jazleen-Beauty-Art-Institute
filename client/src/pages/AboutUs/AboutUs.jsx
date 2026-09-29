import React, { useEffect, useState } from "react";
import styles from "./AboutUs.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader/Loader";

const AboutUs = () => {
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

  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration (in ms)
      once: false, // Animation should happen only once or every time you scroll up/down
      offset: 50, // Offset from the original trigger point
    });
  }, []);

  return (
    <>
      <Helmet>
        <title> About Us | Jazleen Beauty & Art Institute</title>
      </Helmet>
      <Loader isLoading={isLoading} />

      <div className={`${styles.navbarDiv}`}>
        <Navbar />
      </div>{" "}
      <div className={styles.headerImageDiv}>
        <div className={styles.overlaybanner}></div>
        <img
          src="/static/image/extra/4.png"
          alt=""
          className={styles.headerImage}
          data-aos="zoom-out"
        />
        <div className={styles.pageName}>
          <p className={styles.aboutusP}>
            Empowering creativity and excellence in beauty and art{" "}
          </p>
          <h1 className={`${styles.brodiesFont} ${styles.brandNameH1}`}>
            Jazleen Beauty <br />
            <span> & Art Institute</span>
          </h1>
        </div>
      </div>
      <div className={styles.aboutUsContainer}>
        <div className={styles.overlay}>
          <p className={styles.description} data-aos="fade-right">
            We are one of the leading and emerging acting institutes in
            ahmedabad, owned by Production House NETRIX ENTERTAINMENT PVT. LTD.
            NETRIX ENTERTAINMENT PVT. LTD. is Registered with IMPPA (India
            Motion Pictures Producers Association, Mumbai).
          </p>
          <p className={styles.description} data-aos="fade-right">
            Our dedicated team of experienced instructors brings a wealth of
            knowledge and practical experience that students receive a
            well-rounded education encompassing acting techniques, script
            analysis, improvisation and more. We provide a supportive and
            collaborative environment, fostering creativity and self-expression.
            Our state-of-the-art facilities and industry connections offer
            students opportunities to engage with the professional world of
            theatre and film. Whether you're an aspiring actor looking to refine
            your skills or someone seeking personal growth through the
            performing arts, our Acting Institute is the place where dreams take
            centre stage, and talent finds its spotlight
          </p>
          <p className={styles.description} data-aos="fade-right">
            Our institute offers complete training in film acting for adults and
            children. We aim to provide quality education with highly qualified
            and experienced faculty. Our campus has individual rooms for theory,
            practical, and audio-video sessions, and we also have a hostel
            facility for outsider students.
          </p>
          <p className={styles.description} data-aos="fade-right">
            As far as placement is concerned, we have our own production house
            that will give experience to our students in films, albums, short
            films, and documentaries. Join our acting institute today and enter
            the glamorous world of the film industry.
          </p>{" "}
          <p className={styles.description} data-aos="fade-right">
            Jazleen Beauty & Art Institute of acting was established in
            ahmedabad by Kamlesh Kushwaha as a professional acting school for
            actors to learn the craft using modern techniques and methods. Our
            institute is considered the most preferred acting school for
            aspiring actors in Gujarat. Our faculty is handpicked and has
            extensive experience and knowledge of the craft and are adept at
            bringing out the performer within. together!
          </p>{" "}
          <p className={styles.description} data-aos="fade-right">
            Jazleen Beauty & Art Institute is the best acting school that for
            kids and is the epitome of excellence in the field of acting schools
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
