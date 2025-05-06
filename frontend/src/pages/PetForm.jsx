import React, { useState } from "react";

const breeds = ["Labrador", "German Shepherd", "Bulldog", "Poodle", "Mixed"]; // example list

export default function PetReportForm() {
  const [formData, setFormData] = useState({
    petName: "",
    breed: "",
    lastSeen: "",
    color: "#000000",
    weight: "",
    height: "",
    photo: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = new FormData();
    for (let key in formData) {
      body.append(key, formData[key]);
    }

    try {
      const res = await fetch("/api/pets", {
        method: "POST",
        body,
      });

      if (res.ok) {
        alert("Pet report submitted!");
        // optionally reset form
      } else {
        alert("Failed to submit.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <h2>Report Lost Pet</h2>

      <label>Pet Name:</label>
      <input
        type="text"
        name="petName"
        value={formData.petName}
        onChange={handleChange}
        required
      />

      <label>Breed:</label>
      <select
        name="breed"
        value={formData.breed}
        onChange={handleChange}
        required
      >
        <option value="">Select breed</option>
        {breeds.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <label>Last Seen Location:</label>
      <input
        type="text"
        name="lastSeen"
        value={formData.lastSeen}
        onChange={handleChange}
        required
      />

      <label>Color:</label>
      <input
        type="color"
        name="color"
        value={formData.color}
        onChange={handleChange}
      />
      <div
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: formData.color,
          border: "1px solid #ccc",
        }}
      ></div>

      <label>Weight (kg):</label>
      <input
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        required
      />

      <label>Height (cm):</label>
      <input
        type="number"
        name="height"
        value={formData.height}
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
        name="description"
        value={formData.description}
        onChange={handleChange}
      ></textarea>

      <button type="submit">Submit</button>
    </form>
  );
}
