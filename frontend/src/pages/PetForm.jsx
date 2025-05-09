import React, { useEffect, useState } from "react";
import "../styles/index.css";
import { createPost, attachPostImages } from "../adapters/post-adapter";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

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
    // The attachPostImages function depends on the creation of a post that has a post id. .then is used once the post promise is fulfilled to try to create the image
    const postPromise = createPost(formData);

    postPromise
      .then((post) => {
        const [postData, error] = post;

        // Only try to attach post images if there are any
        if (fileData.length > 0) {
          // Create new formdata object for the images
          const imageFormData = new FormData();

          // Attach all of the files to the formdata before sending to backend
          fileData.forEach((file) => imageFormData.append("files", file));

          return attachPostImages(postData.id, imageFormData);
        }
      })
      .then(() => {
        console.log(`Post and images created sucessfully!`);
        navigate("/feed");
      })
      .catch((error) => {
        console.error(error);
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

        <label>Color:</label>
        <input
          type="color"
          name="pet_color"
          value={formData.pet_color}
          onChange={handleChange}
        />
        <div
          className="color-box"
          style={{ backgroundColor: formData.color }}
        ></div>

        <label>Weight (kg):</label>
        <input
          type="number"
          name="pet_weight"
          value={formData.pet_weight}
          onChange={handleChange}
          required
        />

        <label>Height (cm):</label>
        <input
          type="number"
          name="pet_height"
          value={formData.pet_height}
          onChange={handleChange}
          required
        />

        <label>Photo:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          name="photo"
          onChange={handleChange}
        />

        <ul>
          {fileData.map((file, index) => (
            <li key={file.name}>
              <button value={index} onClick={handleRemoveImage}>
                X
              </button>
              {file.name}
            </li>
          ))}
        </ul>

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
          required
        />

        <label>Contact Phone Number (Optional):</label>
        <input
          type="text"
          name="contact_phone_number"
          value={formData.contact_phone_number}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
      <Navbar />
    </>
  );
}
