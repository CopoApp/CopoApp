import { Flex, Heading, Button } from '@radix-ui/themes';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <>
      <Flex justify={'center'} pt={'20px'}>
        <Flex
          direction={'column'}
          width={'fit-content'}
          gap={'1'}
          justify={'center'}
          align={'center'}
        >
          <Heading>Seems like you are lost...</Heading>
          <CrossCircledIcon width={'50%'} height={'50%'} />
          <Button onClick={goHome}>Take me home</Button>
        </Flex>
      </Flex>
    </>
  );
}
