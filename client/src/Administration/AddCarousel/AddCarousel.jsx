import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AddCarousel.module.css"; // Add custom styles
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Helmet } from "react-helmet-async";

const AddCarousel = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [carouselImages, setCarouselImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch carousel images from the Django API
    axios
      .get("https://jazleen-backend.onrender.com/api/carousel/")
      .then((response) => {
        setCarouselImages(response.data.reverse()); // Reverse to show the latest added image first
      })
      .catch((error) => {
        console.error("Error fetching carousel images:", error);
        setError("Failed to load carousel images"); // Set an error message for the UI
      });
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files); // Update selected files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append each selected file to FormData
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    try {
      const response = await axios.post(
        "https://jazleen-backend.onrender.com/api/carousel/add/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(`Images added successfully.`);
      setSelectedFiles([]); // Clear the selected files from the state

      // Clear the file input field
      document.querySelector('input[type="file"]').value = "";

      // Add new images to the carousel and reverse order to show latest first
      setCarouselImages([...response.data.reverse(), ...carouselImages]);
    } catch (error) {
      setMessage("Error adding images");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (confirmed) {
      try {
        await axios.delete(`https://jazleen-backend.onrender.com/api/carousel/delete/${id}/`);
        setCarouselImages(carouselImages.filter((image) => image.id !== id));
      } catch (error) {
        setMessage("Error deleting image");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title> Add Carousel Images | Admin - Jazleen Beauty & Art Institute</title>
      </Helmet>
      <AdminNavbar />
      <div className={styles.adminContainer}>
        <h1 className={styles.adminHeading}>Add Images to Carousel</h1>
        <form className={styles.carouselForm} onSubmit={handleSubmit}>
          <label className={styles.fileLabel}>
            Select Images:
            <input
              className={styles.fileInput}
              type="file"
              multiple
              onChange={handleFileChange}
              required
            />
          </label>
          <button className={styles.submitButton} type="submit">
            Add Images
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.carouselContainer}>
          {carouselImages.map((image) => (
            <div key={image.id} className={styles.carouselItem}>
              <img
                src={`${image.url}`}
                alt={`Carousel Image ${image.id}`}
                className={styles.carouselImage}
              />
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(image.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddCarousel;
