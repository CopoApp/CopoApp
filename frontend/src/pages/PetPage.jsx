import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PetPage() {
  const { id } = useParams();
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await fetch(`/api/pets/${id}`);
        if (!response.ok) throw new Error("Failed to fetch pet data");
        const data = await response.json();
        setPetData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };
    fetchPetData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!petData) return <p>No data available</p>;

  return (
    <div className="pet-page p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">{petData.pet_name}</h1>
      <p>Status: {petData.status}</p>
      <p>Last Seen: {petData.last_seen_location}</p>
      <p>Height: {petData.pet_height} cm</p>
      <p>Weight: {petData.pet_weight} kg</p>
      <p>Breed: {petData.pet_breed}</p>
      <p>Color: {petData.pet_color}</p>
      <p>Description: {petData.content}</p>
      <p>Contact Email: {petData.contact_email}</p>
      <p>Contact Phone: {petData.contact_phone_number}</p>
    </div>
  );
}
