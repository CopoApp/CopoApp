import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createBookmark, deleteBookmark, listBookmarks } from "../adapters/book-adapter.js";
import "../styles/index.css";

export default function ReportCard({ reportInformation, setBookmarkedPosts }) {
  const {
    id,
    author,
    status,
    pet_name,
    last_seen_location,
    content,
    cover_img_src,
  } = reportInformation;

  const { currentUser } = useContext(CurrentUserContext);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const [bookmarks, error] = await listBookmarks(currentUser.id);
        if (error) throw error;

        const bookmarked = bookmarks.some((bookmark) => bookmark.id === id);
        setIsBookmarked(bookmarked);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    if (currentUser) {
      loadBookmarks();
    }
  }, [currentUser, id]);

  const handleBookmarkToggle = async () => {
    try {
      if (isBookmarked) {
        const [result, error] = await deleteBookmark(id);
        if (error) throw error;
  
        setBookmarkedPosts((prev) => prev.filter((post) => post.id !== id));
      } else {
        const [result, error] = await createBookmark(id);
        if (error) throw error;
  
      }
  
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };
  

  return (
    <div className="report-card-container">
      <Link to={`/posts/${id}`} style={{ cursor: "pointer" }} className="report-card">
        <p className="username">{author}</p>
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
      <button
        className={`bookmark-button ${isBookmarked ? "bookmarked" : ""}`}
        onClick={handleBookmarkToggle}
      >
        {isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
      </button>
    </div>
  );
}
