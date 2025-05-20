import { useContext } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import {
  AvatarIcon,
  HomeIcon,
  Pencil2Icon,
  PersonIcon,
  CardStackIcon,
  DrawingPinIcon,
  BookmarkIcon,
} from '@radix-ui/react-icons';
import { Box, Flex } from '@radix-ui/themes';
import NavBarButton from './NavBarButton';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  return (
    <>
      <Flex id="navbar">
        <NavBarButton icon={HomeIcon} text={'Feed'} handleClick={() => navigate('/feed')} />
        <NavBarButton
          icon={CardStackIcon}
          text={'My Reports'}
          handleClick={() => navigate('/reports-log')}
        />
        <NavBarButton
          icon={Pencil2Icon}
          text={'New Report'}
          handleClick={() => navigate('/report')}
        />
        <NavBarButton
          icon={BookmarkIcon}
          text={'Bookmarks'}
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          handleClick={() => navigate('/bookmarks')}
        />
        <NavBarButton
          icon={PersonIcon}
          text={'Profile'}
          handleClick={() => navigate(`/users/${currentUser.id}`)}
        />
      </Flex>
    </>
  );
};

export default Navbar;
