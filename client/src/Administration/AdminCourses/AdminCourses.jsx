import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminCourses.module.css"; // Import the CSS Module
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Helmet } from "react-helmet-async";

function AdminCourses() {
  const [categories, setCategories] = useState([
    "acting",
    "modeling",
    "dancing",
    "singing",
  ]); // Categories
  const [category, setSelectedCategory] = useState("");
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [selectedImageURLs, setSelectedImageURLs] = useState([]);
  const [showAddCategoryDialog, setShowAddCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategoryToDelete] = useState("");

  const [newDetails, setNewDetails] = useState({
    description: [""],
    help_line: "",
    images: [],
    goals: [""],
    actorCategories: [""],
    images_names: [],
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState([]); // Initialize as an empty array

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
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchCourses();
  }, []);

  // Fetch category details when category is selected
  useEffect(() => {
    if (category) {
      axios
        .get(`https://jazleen-backend.onrender.com/api/admincourses/${category}/`)
        .then((response) => {
          setCategoryDetails(response.data);
          setNewDetails({
            description: response.data.description || [""],
            help_line: response.data.help_line || "",
            images: response.data.image || [], // Use the names directly
            goals: response.data.goals || [""],
            actorCategories: response.data.actorCategories || [""],
            images_names: response.data.image || [""],
          });
        })
        .catch((error) => {
          console.error("Error fetching category details:", error);
        });
    }
  }, [category]);

  const handleDeleteCategory = async (category) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `https://jazleen-backend.onrender.com/api/deletecategory/${category}/`
        );
        if (response.status === 200) {
          alert("Category deleted successfully!");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting category", error);
        alert("Failed to delete category.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle form submission to update category
  const handleSubmit = () => {
    const formData = new FormData();
    newDetails.description.forEach((desc) => {
      formData.append("description", desc); // Appending descriptions
    });
    newDetails.goals.forEach((goal) => {
      formData.append("goals", goal); // Appending goals
    });
    newDetails.actorCategories.forEach((actorCategory) => {
      formData.append("actorCategories", actorCategory); // Appending actor categories
    });
    newDetails.images.forEach((image) => {
      formData.append("images", image); // Appending images
    });
    newDetails.images.forEach((image) => {
      formData.append("images_names", image); // Appending images
    });
    formData.append("help_line", newDetails.help_line);
    axios
      .post(
        `https://jazleen-backend.onrender.com/api/admincourses/update/${category}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        alert("Category updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };

  // Add a new field for description or goals
  const addField = (field) => {
    setNewDetails((prevDetails) => ({
      ...prevDetails,
      [field]: [...prevDetails[field], ""],
    }));
  };

  // Handle input changes for arrays
  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...newDetails[field]];
    updatedArray[index] = value;
    setNewDetails((prevDetails) => ({
      ...prevDetails,
      [field]: updatedArray,
    }));
  };

  const handleHelpLineChange = (value) => {
    setNewDetails((prevDetails) => ({
      ...prevDetails,
      help_line: value, // Update only the help_line field while keeping the rest intact
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    const newImageURLs = files.map((file) => URL.createObjectURL(file)); // Generate URLs for image preview

    setNewDetails((prevDetails) => ({
      ...prevDetails,
      images: [...prevDetails.images, ...files], // Append new files to the images array
      images_names: [
        ...prevDetails.images_names,
        ...files.map((file) => file.name),
      ], // Append new file names to images_names
    }));

    setSelectedImageURLs([...selectedImageURLs, ...newImageURLs]); // Append all selected image URLs for preview
  };

  const removeField = (field, index) => {
    const updatedArray = [...newDetails[field]];
    updatedArray.splice(index, 1); // Remove the item at the specified index
    setNewDetails((prevDetails) => ({
      ...prevDetails,
      [field]: updatedArray,
    }));
  };

  const removeImage = (index) => {
    const updatedImages = [...newDetails.images]; // Copy the current images array
    if (updatedImages && updatedImages[index]) {
      const deletedImageName =
        updatedImages[index].name || updatedImages[index]; // Get the image name (depending on if it's an object or string)
      setNewDetails((prevDetails) => ({
        ...prevDetails,
        images: updatedImages.filter((_, i) => i !== index), // Remove the image from the array
        images_names: [...prevDetails.images_names, deletedImageName], // Append the deleted image name
      }));
    } else {
      console.error("images or images_names are not defined correctly");
    }
  };

  // Function to handle adding a new category
  const handleAddCategory = () => {
    const newCategoryData = {
      category: newCategoryName,
      card_icon: "faTheaterMasks", // Set default values for icon, image, etc.
      card_image: "/static/image/home/cards/default-card.jpeg",
      image: [],
      help_line: "",
      heading: `Best ${newCategoryName} Classes In Ahmedabad`,
      description: [],
      actorCategories: [],
      goals: [],
    };

    const csrfToken = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("csrftoken="))
      ?.split("=")[1];

    axios
      .post(
        "https://jazleen-backend.onrender.com/api/admincategory/addcategory/",
        newCategoryData,
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      )
      .then(() => {
        setCategories([...categories, newCategoryName]);
        setShowAddCategoryDialog(false);
        setNewCategoryName("");
        alert("New category added successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
      });
  };

  return (
    <>
      <Helmet>
        <title> Add Courses | Admin - Jazleen Beauty & Art Institute</title>
      </Helmet>
      <AdminNavbar />
      <div className={styles.container}>
        <h1 className={styles.formHeading}>Course Management</h1>

        {/* Button to add new category */}
        <button
          className={styles.addCategoryButton}
          onClick={() => setShowAddCategoryDialog(true)}
        >
          Add New Category
        </button>

        {/* Dialog for adding a new category */}
        {showAddCategoryDialog && (
          <div className={styles.dialogOverlay}>
            <div className={styles.dialog}>
              <div className={styles.dialogHeader}>
                <h2 className={styles.dialogTitle}>Add New Category</h2>
              </div>

              <div className={styles.dialogBody}>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className={styles.inputField}
                />
              </div>
              <div className={styles.dialogFooter}>
                <button onClick={handleAddCategory} className={styles.okButton}>
                  Ok
                </button>
                <button
                  onClick={() => setShowAddCategoryDialog(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <select
          className={styles.select}
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={category}
        >
          <option value="">Select a category</option>
          {courseData.map((course, index) => (
            <option key={course.category} value={course.category}>
              {course.category.charAt(0).toUpperCase() +
                course.category.slice(1)}
            </option>
          ))}
        </select>

        {categoryDetails && (
          <div className={styles.formContainer}>
            <h2 className={styles.formHeading}>Category : {category}</h2>
            <button
              className={styles.deleteCategoryButton}
              onClick={(e) => handleDeleteCategory(categoryDetails.id)}
              disabled={loading || !category}
            >
              {loading ? "Deleting..." : "Delete Category"}
            </button>
            {/* Edit description */}
            <label className={styles.label}>Description</label>
            {newDetails.description.map((desc, index) => (
              <div key={index} className={styles.textAreaOuterDiv}>
                <textarea
                  type="text"
                  value={desc}
                  className={styles.inputField}
                  onChange={(e) =>
                    handleArrayChange("description", index, e.target.value)
                  }
                  rows={"4"}
                />
                <div className={`${styles.deleteButtonTextArea}`}>
                  <button
                    className={`${styles.deleteButton}`}
                    onClick={() => removeField("description", index)}
                  >
                    <i class="fa-regular fa-square-minus"></i>
                  </button>
                </div>
              </div>
            ))}
            <button
              className={styles.addButton}
              onClick={() => addField("description")}
            >
              Add Description
            </button>

            {/* help line */}
            <label className={styles.label}>Help Line Text</label>
            <textarea
              value={newDetails.help_line}
              className={`${styles.inputField} ${styles.helpLineText}`}
              rows="4"
              onChange={(e) => handleHelpLineChange(e.target.value)}
            ></textarea>

            {/* Edit images */}
            <label className={styles.label}>Images (select files)</label>
            <input
              type="file"
              className={styles.fileInput}
              multiple
              onChange={handleFileChange}
            />
            <div className={styles.uploadedImagesContainer}>
              {selectedImageURLs.length > 0 && (
                <div>
                  <label className={styles.label}>
                    Selected Images Preview
                  </label>
                  <div className={styles.imagePreviewContainer}>
                    {selectedImageURLs.map((imageURL, index) => (
                      <div key={index} className={styles.previewImageWrapper}>
                        <img
                          src={imageURL}
                          alt={`Selected Preview ${index}`}
                          className={styles.selectedImagePreview}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.uploadedImagesContainer}>
              {newDetails.images.length > 0 && (
                <div>
                  <label className={styles.label}>Uploaded Images</label>
                  {newDetails.images.map((image, index) => (
                    <div key={index} className={styles.uploadedImage}>
                      <span>
                        {typeof image === "string" ? image : image.name}
                      </span>
                      <button
                        className={styles.uploadedImageDelete}
                        onClick={() => removeImage(index)}
                      >
                        <i class="fa-regular fa-square-minus"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Edit goals */}
            <label className={styles.label}>Goals</label>
            {newDetails.goals.map((goal, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={goal}
                  className={styles.inputField}
                  onChange={(e) =>
                    handleArrayChange("goals", index, e.target.value)
                  }
                />
                <button
                  className={styles.deleteButton}
                  onClick={() => removeField("goals", index)}
                >
                  <i class="fa-regular fa-square-minus"></i>
                </button>
              </div>
            ))}
            <button
              className={styles.addButton}
              onClick={() => addField("goals")}
            >
              Add Goal
            </button>

            {/* Edit actor categories */}
            <label className={styles.label}>Actor Categories</label>
            {newDetails.actorCategories.map((actorCategory, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={actorCategory}
                  className={styles.inputField}
                  onChange={(e) =>
                    handleArrayChange("actorCategories", index, e.target.value)
                  }
                />
                <button
                  className={styles.deleteButton}
                  onClick={() => removeField("actorCategories", index)}
                >
                  <i class="fa-regular fa-square-minus"></i>
                </button>
              </div>
            ))}
            <button
              className={styles.addButton}
              onClick={() => addField("actorCategories")}
            >
              Add Actor Category
            </button>

            <button className={styles.submitButton} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminCourses;
