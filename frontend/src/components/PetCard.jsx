import React from "react";

export default function ReportCard({reportInformation}) {
  const {author, status, pet_name, last_seen_location, content} = reportInformation

  
  return (
    <div className="report-card">
      <p className="username" >{author}</p>
      <div className="status-container">
        <p className="status">{status}</p>
      </div>
      {/* <div className="image-container">
        {photo ? (
          <img src={''} alt={''} className="pet-image" />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div> */}
      <h3 className="pet-name">{pet_name}</h3>
      <p className="pet-location">Last Seen: {last_seen_location}</p>
      <p className="pet-description">{content}</p>
    </div>
  );
}
