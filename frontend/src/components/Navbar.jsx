import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { NavLink, useParams } from "react-router-dom";


const Navbar = () => {
  // if (!userId) return <></>;
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <nav className="navbar">
      <NavLink
        to="/feed"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <span className="nav-icon">🏠</span>
        <span className="nav-text">Feed</span>
      </NavLink>

      <NavLink
        to="/reports-log"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <span className="nav-icon">📋</span>
        <span className="nav-text">My Reports</span>
      </NavLink>

      <NavLink
        to="/report"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <span className="nav-icon">➕</span>
        <span className="nav-text">New</span>
      </NavLink>

      <NavLink
        to={ currentUser ?`/users/${currentUser.id}` : ``}
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <span className="nav-icon">👤</span>
        <span className="nav-text">Profile</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
