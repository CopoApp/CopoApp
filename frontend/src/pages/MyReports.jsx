import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import CurrentUserContext from '../contexts/current-user-context';
import { getUserPosts } from '../adapters/post-adapter';
import ReportCard from '../components/PetCard';
import { Container, Flex, Heading } from '@radix-ui/themes';
import { EyeClosedIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

export default function MyReports() {
  const [userPosts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  // Redirects user if not logged in
  if (!currentUser) navigate('/');

  useEffect(() => {
    // Redurects user if not logged in
    if (!currentUser) navigate('/');
    const loadReports = async () => {
      if (currentUser === null) return console.log(`No user session detected`);
      console.log(`User session detected!`);
      const [posts, error] = await getUserPosts(currentUser.id);
      if (error) setError(error);
      else if (posts) setPosts(posts);
    };
    loadReports();
  }, [currentUser]);

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
          {userPosts.length > 0 ? (
            userPosts.map((post) => {
              return <ReportCard key={post.id} reportInformation={post} />;
            })
          ) : (
            <Flex direction={'column'} justify={'center'} align={'center'}>
              <Flex gap={'30px'}>
                <EyeClosedIcon width={'15vw'} height={'15vh'}></EyeClosedIcon>
                <EyeClosedIcon width={'15vw'} height={'15vh'}></EyeClosedIcon>
              </Flex>
              <Heading align={'center'}>You haven't made any reports</Heading>
            </Flex>
          )}
        </Flex>
      </Container>
      <Navbar />
    </>
  );
}
