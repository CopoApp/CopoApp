import React from "react";
import "./thing.css";

export default function ReportCard({ name, location, description, photo }) {
  return (
    <div className="report-card">
      <div className="image-container">
        {photo ? (
          <img src={photo} alt={name} className="pet-image" />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div>
      <h3 className="pet-name">{name}</h3>
      <p className="pet-location">Last Seen: {location}</p>
      <p className="pet-description">{description}</p>
    </div>
  );
}
