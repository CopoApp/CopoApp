import { useEffect, useState } from "react";
import { getAllPosts } from "../adapters/post-adapter";
import UserLink from "../components/UserLink";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import ReportCard from "../components/PetCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReports = async () => {
      const [posts, error] = await getAllPosts();
      if (error) setError(error);
      else if (posts) setPosts(posts);
    };
    loadReports();
  }, []);

  return (
    <>
      {
        posts.map((post) => {
          return <ReportCard key={post.id} reportInformation={post}/>
        })
      }
      <Navbar />
    </>
  );
}
