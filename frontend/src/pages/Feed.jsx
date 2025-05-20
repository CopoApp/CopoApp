import { useEffect, useState } from 'react';
import { getAllPosts } from '../adapters/post-adapter';
// import UserLink from "../components/UserLink";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ReportCard from '../components/PetCard';

import { Flex } from '@radix-ui/themes';
import { Section } from '@radix-ui/themes';
import { Container } from '@radix-ui/themes';

export default function Feed() {
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
          {posts.map((post) => {
            return (
              <ReportCard
                key={post.id}
                reportInformation={post}
                onClick={() => navigate(`/posts/${post.id}`)}
              />
            );
          })}
        </Flex>
      </Container>
      <Navbar />
    </>
  );
}
