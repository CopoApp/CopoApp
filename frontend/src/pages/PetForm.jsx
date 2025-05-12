import React, { useState } from "react";
import "../styles/index.css";
import { createPost } from "../adapters/post-adapter";
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


  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
  
    
    if (type === "file") {
      // To Do - Send image file to firebase
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const [post, error] = await createPost(formData)
      console.log(`Post Id-${post.id} created successfully`)
      navigate('/feed')
    } catch (error) {
      console.error(error)
    }
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
        accept="image/*"
        name="photo"
        onChange={handleChange}
      />

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
