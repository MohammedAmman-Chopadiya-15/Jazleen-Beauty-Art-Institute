// AdminGallery.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminGallery.module.css";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Helmet } from "react-helmet-async";

const AdminGallery = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("https://jazleen-backend.onrender.com/api/videos/");
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
    }
  };

  const deleteVideo = async (videoUrl) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (confirmed) {
      try {
        await axios.delete(
          `https://jazleen-backend.onrender.com/api/deletevideo/${videoUrl}/`
        );
        fetchVideos();
      } catch (error) {
        console.error("Error deleting video:", error);
        setError("Failed to delete video");
      }
    }
  };

  const editVideo = (video) => {
    // Redirect to the add-video page with the video details
    navigate(`/admin/add-video`, {
      state: {
        videoUrl: video.videoUrl,
        description: video.description,
        id: video.id,
      },
    });
  };

  return (
    <>
     <Helmet>
        <title> Event Gallery | Admin - Jazleen Beauty & Art Institute</title>
      </Helmet>
      <AdminNavbar />
      <div className={styles.galleryContainer}>
        <h1>Event Gallery</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <Link to="/admin/add-video" className={styles.addButton}>
          Add Video
        </Link>
        <table className={styles.videoTable}>
          <thead>
            <tr>
              <th>Video</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id}>
                <td>
                  <iframe
                    width="200"
                    height="150"
                    src={`${video.videoUrl}`}
                    title={video.description}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </td>
                <td>{video.description}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => editVideo(video)}
                  >
                    Edit
                  </button>

                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteVideo(video.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminGallery;
