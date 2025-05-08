import React from "react";
import { useNavigate } from "react-router-dom";

export default function PetCard({ reportInformation }) {
  const { id, author, status, pet_name, last_seen_location, content } = reportInformation;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pet/${id}`);
  };

  return (
    <div 
      className="report-card cursor-pointer p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition" 
      onClick={handleClick}
    >
      <p className="username">{author}</p>
      <div className="status-container">
        <p className="status">{status}</p>
      </div>
      <h3 className="pet-name">{pet_name}</h3>
      <p className="pet-location">Last Seen: {last_seen_location}</p>
      <p className="pet-description">{content}</p>
    </div>
  );
}
