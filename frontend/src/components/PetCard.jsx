import React, { useState } from "react";

export default function ReportCard({ reportInformation }) {
  const { id, author, status, pet_name, last_seen_location, content, photo } = reportInformation;
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    if (!bookmarked) {
      saveBookmark(id);
      console.log("Your bookmark is saved")
    } else {
      removeBookmark(id);
      console.log("you removed your saved bookmark")
    }
  };

  return (
    <div className="report-card" style={{ margin: "20px", padding: "20px" }}>
      <p className="username">{author}</p>
      <div className="status-container">
        <p className="status">{status}</p>
      </div>
      {/*<div className="image-container">
        {photo ? (
          <img src={''} alt={''} className="pet-image" />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div>*/}
      <h3 className="pet-name">{pet_name}</h3>
      <p className="pet-location">Last Seen: {last_seen_location}</p>
      <p className="pet-description">{content}</p>
      <button className="bookmark-button" onClick={handleBookmark}>
        <img
          src={bookmarked ? "../pages/assets/bookmarked.png" : "../paged/assets/bookmark.png"}
          alt="Bookmark"
          className="bookmark-icon"
        />
      </button>
    </div>
  );
}

function saveBookmark(id) {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  if (!bookmarks.includes(id)) {
    bookmarks.push(id);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
}

function removeBookmark(id) {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const updatedBookmarks = bookmarks.filter((bookmarkId) => bookmarkId !== id);
  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
}
