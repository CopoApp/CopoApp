import React from 'react';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import user_placeholder from '../pages/Assets/user_placeholder.svg';
import { useNavigate } from 'react-router-dom';
import MissingImage from './MissingImage';

import { Box, Flex } from '@radix-ui/themes';
import { Heading } from '@radix-ui/themes';
import { Badge } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';
import { Card } from '@radix-ui/themes';
import { AspectRatio } from '@radix-ui/themes';
import { IconButton } from '@radix-ui/themes';
import { BookmarkIcon } from '@radix-ui/react-icons';

export default function ReportCard({ reportInformation }) {
  const navigate = useNavigate();
  const { id, author, author_user_id, status, pet_name, last_seen_location, content, images } =
    reportInformation;
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const checkStatus = () => {
    if (status === 'Found') return 'green';
    if (status === 'Lost') return 'red';
    if (status === 'Searching') return 'blue';
  };

  const trimContentPreview = () => {
    return content.split(' ').slice(0, 10).join(' ');
  };

  return (
    <Card className="report-card-container" size={'2'}>
      <Flex direction={'column'} gap={'2'} onClick={() => navigate(`/posts/${id}`)}>
        <Flex justify={'between'}>
          <Flex gap={'3'} align={'center'}>
            <Box className="profile-pic-container">
              <img
                className="post-author-profile-picture"
                style={{ width: '50px' }}
                src={
                  currentUser?.id === author_user_id && currentUser?.profile_pic
                    ? currentUser?.profile_pic
                    : user_placeholder
                }
                alt="profile picture"
              />
            </Box>
            <Heading className="username" size={'5'}>
              {author}
            </Heading>
          </Flex>
          <Badge className="status" color={checkStatus()} size={'3'}>
            {status}
          </Badge>
        </Flex>
        {images?.length > 0 ? (
          <AspectRatio ratio={16 / 9}>
            <img
              src={images[0].img_src}
              alt={'Pet image'}
              className="pet-image"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </AspectRatio>
        ) : (
          <MissingImage />
        )}
        <Heading size={'4'}>{pet_name}</Heading>
        <Heading size={'3'} weight={'medium'}>{`Last Seen: ${last_seen_location}`}</Heading>
        <Text>{content ? trimContentPreview() : 'No Description Provided'}</Text>
      </Flex>
      <Flex justify={'end'} pt={'2'}>
        <IconButton>
          <BookmarkIcon width={'20px'} height={'20px'} />
        </IconButton>
      </Flex>
    </Card>
  );
}
