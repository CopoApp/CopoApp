import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import CurrentUserContext from "../contexts/current-user-context";
import { getUserPosts } from "../adapters/post-adapter";
import ReportCard from "../components/PetCard";

export default function MyReports() {
  const [userPosts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const loadReports = async () => {
      if (currentUser === null) return console.log(`No user session detected`);
      console.log(`User session detected!`);
      const [posts, error] = await getUserPosts(currentUser.id);
      console.log(posts)
      if (error) setError(error);
      else if (posts) setPosts(posts);
    };
    loadReports();
  }, [currentUser]);

  return (
    <div>
      {userPosts.length > 0
        ? userPosts.map((post) => {
            return <ReportCard key={post.id} reportInformation={post} />;
          })
        : `No posts`}
      <Navbar />
    </div>
  );
}
