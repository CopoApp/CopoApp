import React, { useEffect, useState } from "react";
import "../styles/index.css";
import { createPost, attachPostImages } from "../adapters/post-adapter";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import FileAttachmentButton from "../components/FileAttachmentButton";

const breeds = ["Labrador", "German Shepherd", "Bulldog", "Poodle", "Mixed"]; // example list

export default function PetReportForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status: "Lost",
    title: "",
    content: "",
    contact_email: "",
    contact_phone_number: "",
    pet_name: "",
    pet_height: 0,
    pet_weight: 0,
    pet_breed: "",
    pet_color: "",
    last_seen_location: "",
    last_seen_location_latitude: 0,
    last_seen_location_longitude: 0,
  });
  const [fileData, setFileData] = useState([]);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setFileData([...fileData, files[0]]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // User cannot attach more than five files
    if (fileData.length > 5) return;

    // The attachPostImages function depends on the post id. The post promise must be fulfilled before trying to create the image
    const postPromise = createPost(formData);

    postPromise
      .then((post) => {
        const [postData, error] = post;

        // Only try to attach post images if there are any
        if (fileData.length === 0) return;

        // Create new formdata object for the images
        const imageFormData = new FormData();

        // Attach all of the files to the formdata before sending to backend
        fileData.forEach((file) => imageFormData.append("files", file));
        return attachPostImages(postData.id, imageFormData);
      })
      .then(() => {
        // Yes I am using an emoji
        console.log(`Post created sucessfully! 🎉`);
        navigate("/feed");
      })
      .catch((error) => {
        console.error(`Error while creating post:`, error);
      });
  };

  const handleRemoveImage = (event) => {
    event.preventDefault();
    const removeIndex = Number(event.target.value);
    const updatedFileData = fileData.filter(
      (value, index) => index !== removeIndex
    );
    setFileData(updatedFileData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="pet-form">
        <h2>Report Lost Pet</h2>

        <label>Pet Name:</label>
        <input
          type="text"
          name="pet_name"
          value={formData.pet_name}
          onChange={handleChange}
          required
        />

        <label>Breed:</label>
        <select
          name="pet_breed"
          value={formData.pet_breed}
          onChange={handleChange}
          required
        >
          <option value=""></option>
          {breeds.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <label>Last Seen Location:</label>
        <input
          type="text"
          name="last_seen_location"
          value={formData.last_seen_location}
          onChange={handleChange}
          required
        />

        <div className="color-input-container">
          <label>Color:</label>
          <input
            type="color"
            name="pet_color"
            value={formData.pet_color || '#000000'}
            onChange={handleChange}
          />
        </div>

        <label>Weight (lb):</label>
        <input
          type="number"
          name="pet_weight"
          value={formData.pet_weight}
          onChange={handleChange}
        />

        <label>Height (cm):</label>
        <input
          type="number"
          name="pet_height"
          value={formData.pet_height}
          onChange={handleChange}
        />

        {/* List of files that user attached */}
        <ul>
          {fileData.map((file, index) => (
            <li key={file.name}>
              <button value={index} onClick={handleRemoveImage}>
                Remove Image
              </button>
              {file.name}
            </li>
          ))}
        </ul>

        <p style={{ display: fileData.length > 5 ? "block" : "none" }}>
          You can only upload up to 5 files
        </p>

        <label>Photos:</label>
        <FileAttachmentButton
          fileData={fileData}
          setFileData={setFileData}
          handleChange={handleChange}
        ></FileAttachmentButton>

        <label>Description / Additional Info:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        ></textarea>

        <label>Contact Email (Optional):</label>
        <input
          type="text"
          name="contact_email"
          value={formData.contact_email}
          onChange={handleChange}
        />

        <label>Contact Phone Number (Optional):</label>
        <input
          type="text"
          name="contact_phone_number"
          value={formData.contact_phone_number}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
      <Navbar />
    </>
  );
}
