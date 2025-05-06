import { NavLink } from "react-router-dom";

const Navbar = ({ userId }) => {
  // if (!userId) return <></>;
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
        to={`/users/${userId}`}
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <span className="nav-icon">👤</span>
        <span className="nav-text">Profile</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
