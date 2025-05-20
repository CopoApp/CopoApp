import { useEffect, useState } from 'react';
import { getAllPosts } from '../adapters/post-adapter';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ReportCard from '../components/PetCard';
import FilterByBorough from '../components/FilterByBorough';
import FilterByStatus from '../components/FilterByStatus';
import { getBorough } from '../utils/boroughMapper';

export default function Feed() {
  const [selectedBorough, setSelectedBorough] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadReports = async () => {
      const [posts, error] = await getAllPosts();
      if (error) setError(error);
      else if (posts) {
        // Add borough property to each post based on last_seen_location

        const processedPosts = posts.map((post) => ({
          ...post,
          borough: getBorough(post.last_seen_location),
        }));
        setPosts(processedPosts);
      }
    };
    loadReports();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesBorough = selectedBorough === 'All' || post.borough === selectedBorough;
    const matchesStatus = selectedStatus === 'All' || post.status === selectedStatus;
    return matchesBorough && matchesStatus;
  });

  return (
    <>
      <FilterByBorough selectedBorough={selectedBorough} onChange={setSelectedBorough} />

      <FilterByStatus
        selectedStatus={selectedStatus}
        onChange={setSelectedStatus}
        arrayOfPosts={posts}
      />

      {error && <p>{error}</p>}

      {filteredPosts.length === 0 ? (
        <p>
          No posts found in {selectedBorough} with status {selectedStatus}.
        </p>
      ) : (
        filteredPosts.map((post) => (
          <ReportCard
            key={post.id}
            reportInformation={post}
            onClick={() => navigate(`/posts/${post.id}`)}
          />
        ))
      )}

      <Navbar />
    </>
  );
}
