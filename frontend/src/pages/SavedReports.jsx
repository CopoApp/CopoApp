import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import ReportCard from "../components/PetCard";
import Navbar from "../components/Navbar";

export default function SavedReports() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    async function loadBookmarks() {
      if (!currentUser) {
        console.log("No user logged in");
        return;
      }
      try {
        const response = await fetch(`/api/post/${currentUser.id}/bookmarks`);
        if (!response.ok) {
          throw new Error(`Error fetching bookmarks: ${response.statusText}`);
        }
        const data = await response.json();
        setBookmarkedPosts(data);
      } catch (err) {
        setError(err.message);
      }
    }
    loadBookmarks();
  }, [currentUser]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {bookmarkedPosts.length > 0
        ? bookmarkedPosts.map((post) => (
            <ReportCard key={post.id} reportInformation={post} setBookmarkedPosts={setBookmarkedPosts} />
          ))
        : "No bookmarks found"}
      <Navbar />
    </div>
  );
}
