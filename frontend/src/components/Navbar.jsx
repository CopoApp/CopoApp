import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { NavLink, useParams } from "react-router-dom";

/* a heck load of imports for the images */
import bookmarkIcon from "../pages/Assets/saved.png";
import feedIcon from "../pages/Assets/feed.png";
import profileIcon from "../pages/Assets/profile.png";
import myReportsIcon from "../pages/Assets/made.png";
import newIcon from "../pages/Assets/create.png";

const Navbar = () => {
  // if (!userId) return <></>;
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <nav className="navbar">
      <NavLink
        to="/feed"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
      <img src={feedIcon} alt="Feed" className="nav-icon" />
      <span className="nav-text">Feed</span>
      </NavLink>

      <NavLink
        to="/reports-log"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
      <img src={myReportsIcon} alt="My Reports" className="nav-icon" />
      <span className="nav-text">My Reports</span>
      </NavLink>

      <NavLink
        to="/report"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
      <img src={newIcon} alt="New" className="nav-icon" />
      <span className="nav-text">New</span>
      </NavLink>

      <NavLink
        to={currentUser ? `/users/${currentUser.id}` : ``}
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
      <img src={profileIcon} alt="Profile" className="nav-icon" />
      <span className="nav-text">Profile</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
