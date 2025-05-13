import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const location = useLocation();
  const { pathname } = location
  const [currentPage, setCurrentPage] = useState('')
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (pathname === '/') setCurrentPage('')
    if (pathname === '/feed') setCurrentPage('Feed')
    if (pathname === '/reports-log') setCurrentPage('My Reports')
    if (pathname === '/report') setCurrentPage('Report Missing Pet')
    if (pathname.startsWith('/posts/')) setCurrentPage('Report Details')
    if (pathname.includes('/users')) setCurrentPage('Profile')
  })

  return (
    <header>
      <a id="logo" href="/">
        O
      </a>
      <h2>{currentPage}</h2>
      <nav>
        <ul>
          {
          currentUser && pathname === '/' ? (
            <>
              <li>
                <NavLink to={`/feed`}>
                  Home
                </NavLink>
              </li>
            </>
          ) : 
          pathname === '/' && 
          (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/sign-up">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
