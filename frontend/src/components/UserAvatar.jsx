import { useContext } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import user_placeholder from '../pages/Assets/user_placeholder.svg';
import { Box } from '@radix-ui/themes';

export default function UserAvatar() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  return (
    <Box className="profile-pic-container">
      <img
        className="post-author-profile-picture"
        style={{ width: '50px' }}
        src={currentUser?.profile_pic ? currentUser?.profile_pic : user_placeholder}
        alt="profile picture"
      />
    </Box>
  );
}
