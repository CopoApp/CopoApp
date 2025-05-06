import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header>
      <a id="logo" href="/">
        <img
          src="https://avatars.githubusercontent.com/u/209502179?s=200&v=4"
          alt="logo"
        />
      </a>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/learn-more">Learn More</NavLink>
          </li>
          {currentUser ? (
            <>
              <li>
                <NavLink to={`/users/${currentUser.id}`}>
                  {currentUser.username}
                </NavLink>
              </li>
            </>
          ) : (
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
