import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AddVideo.module.css"; // Import the CSS module
import { useNavigate, useLocation } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Helmet } from "react-helmet-async";

const AddVideo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [originalUrl, setOriginalUrl] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if video details were passed for editing
    if (location.state) {
      const { videoUrl, description, id } = location.state;
      setOriginalUrl(videoUrl);
      setDescription(description);
      setId(id);
      // Store the ID for edit actions
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let videoId;

    console.log(originalUrl);
    // Extract video ID from original URL
    if (originalUrl.includes("/embed/")) {
      videoId = convertEmbedToWatchUrl(originalUrl);
    } else {
      // If it's in the standard format, extract the video ID
      videoId = getYouTubeVideoId(originalUrl);
    }

    console.log(videoId + "  video id");

    if (!videoId) {
      setMessage("Invalid YouTube URL. Please enter a valid URL.");
      return;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    try {
      if (id) {
        // Editing an existing video
        await axios.delete(`https://jazleen-backend.onrender.com/api/deletevideo/${id}/`); // Delete the old video
      }

      // Add the new video
      const response = await axios.post("https://jazleen-backend.onrender.com/api/addvideo/", {
        videoUrl: embedUrl,
        description,
      });

      if (response.data.status === "success") {
        setMessage("Video saved successfully!");
        setOriginalUrl("");
        setDescription("");
        setTimeout(() => {
          setMessage("");
          navigate("/admin-gallery"); // Redirect back to the gallery
        }, 3000);
      } else {
        setMessage("Failed to save video.");
      }
    } catch (error) {
      console.error("Error submitting video:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  function getYouTubeVideoId(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get("v");
    } catch (error) {
      console.error("Error parsing URL:", error);
      return null;
    }
  }

  function convertEmbedToWatchUrl(embedUrl) {
    const videoId = embedUrl.split("/embed/")[1]; // Extract the video ID
    return videoId;
  }

  return (
    <>
      <Helmet>
        <title> Add Gallery Videos | Admin - Jazleen Beauty & Art Institute</title>
      </Helmet>
      <AdminNavbar />
      <div className={styles.addVideoContainer}>
        <h2>{id ? "Edit Video" : "Add Video"}</h2>
        <form className={styles.addVideoForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Youtube Video URL</label>
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            {id ? "Update Video" : "Add Video"}
          </button>
          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </>
  );
};

export default AddVideo;
