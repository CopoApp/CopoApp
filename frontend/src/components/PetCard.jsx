import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";


export default function ReportCard({ reportInformation }) {
  const {id, 
    author,
    status,
    pet_name,
    last_seen_location,
    content,
    cover_img_src,
  } = reportInformation;

  return (
    <Link to={`/posts/${id}`} style={{ cursor: 'pointer' }} className="report-card">
      <p className="username" >{author}</p>
      <div className="status-container">
        <p className="status">{status}</p>
      </div>
      <div className="image-container">
        {cover_img_src ? (
          <img src={cover_img_src} alt={"Pet image"} className="pet-image" />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div>
      <h3 className="pet-name">{pet_name}</h3>
      <p className="pet-location">Last Seen: {last_seen_location}</p>
      <p className="pet-description">{content}</p>
    </Link>
  );
}
