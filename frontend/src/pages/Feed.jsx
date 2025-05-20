import { useEffect, useState } from 'react';
import { getAllPosts } from '../adapters/post-adapter';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ReportCard from '../components/PetCard';
import FilterByBorough from '../components/FilterByBorough';
import FilterByStatus from '../components/FilterByStatus';
import { Flex } from '@radix-ui/themes';
import { Section } from '@radix-ui/themes';
import { Container, Card, Box, Heading } from '@radix-ui/themes';

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
      else if (posts) setPosts(posts);
    };
    loadReports();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesBorough = selectedBorough === 'All' || post.last_seen_location === selectedBorough;
    const matchesStatus = selectedStatus === 'All' || post.status === selectedStatus;
    return matchesBorough && matchesStatus;
  });

  return (
    <>
      <Container
        className="reports-list-container"
        size={'2'}
        pb={'100px'}
        pt={'30px'}
        pl={'4'}
        pr={'4'}
      >
        <Flex direction={'column'} gap={'10px'}>
          <Card>
            <Heading>Filters</Heading>
            <Flex gap={'3'} direction={'column'}>
              <FilterByBorough
                arrayOfPosts={posts}
                selectedBorough={selectedBorough}
                onChange={setSelectedBorough}
              />

              <FilterByStatus
                selectedStatus={selectedStatus}
                onChange={setSelectedStatus}
                arrayOfPosts={posts}
              />
            </Flex>
          </Card>

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
        </Flex>
      </Container>
      <Navbar />
    </>
  );
}
