import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import { Heading, Box, Flex, Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

export default function SiteHeadingAndNav() {
  const location = useLocation();
  const { pathname } = location;
  const [currentPage, setCurrentPage] = useState('');
  const { currentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') setCurrentPage('');
    if (pathname === '/feed') setCurrentPage('Feed');
    if (pathname === '/reports-log') setCurrentPage('My Reports');
    if (pathname === '/report') setCurrentPage('Report Missing Pet');
    if (pathname.startsWith('/posts/')) setCurrentPage('Report Details');
    if (pathname.includes('/users')) setCurrentPage('Profile');
    if (pathname === '/bookmarks') setCurrentPage('Saved Posts');
    if (pathname === '/sign-up' || pathname === '/login') setCurrentPage('Copo');
  });

  return (
    <>
      <header>
        <Flex
          justify={'center'}
          align={'center'}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img
            id="logo"
            src="https://copoapp-images.s3.us-east-1.amazonaws.com/other/logo"
            alt="Copo Logo"
          />
        </Flex>

        <Flex justify={'center'} width={'100%'}>
          <Heading id="site-heading" weight={'medium'}>
            {currentPage}
          </Heading>
        </Flex>
        <Flex
          id="navbar-buttons"
          display={currentPage === '' ? 'flex' : 'none'}
          width={'100%'}
          justify={'end'}
          gap={'2'}
        >
          {currentUser && pathname === '/' ? (
            <Button className="button" highContrast="true" onClick={() => navigate('/feed')}>
              Enter App
            </Button>
          ) : (
            !currentUser &&
            pathname === '/' && (
              <>
                <Button className="button" highContrast="true" onClick={() => navigate('/login')}>
                  Log In
                </Button>
                <Button className="r" highContrast="true" onClick={() => navigate('/sign-up')}>
                  Sign Up
                </Button>
              </>
            )
          )}
        </Flex>
        <nav></nav>
      </header>
    </>
  );
}
