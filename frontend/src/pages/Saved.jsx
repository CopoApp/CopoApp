import { useEffect, useState } from "react";
import { getPostById } from "../adapters/post-adapter";
import Navbar from "../components/Navbar";
import ReportCard from "../components/PetCard";

export default function Bookmark() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookmarkedPosts = async () => {
      try {
        const storedIds = JSON.parse(localStorage.getItem("bookmarkedPostIds")) || [];
        const posts = await Promise.all(
          storedIds.map(async (id) => {
            const [post, error] = await getPostById(id);
            if (error) throw error;
            return post;
          })
        );
        setBookmarkedPosts(posts);
      } catch (error) {
        setError("Failed to load bookmarked posts");
      }
    };
    loadBookmarkedPosts();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {bookmarkedPosts.map((post) => (
        <ReportCard key={post.id} reportInformation={post} />
      ))}
      <Navbar />
    </>
  );
}
