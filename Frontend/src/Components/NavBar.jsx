import { Link } from "react-router-dom";
import "./NavBar.css";

export function NavbarComponent({isLoggedIn, currentUser}) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Side: Brand Logo */}
        <Link to="/" className="navbar-brand">
          BlogApp
        </Link>

        {/* Right Side: Navigation Links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/blogs" className="nav-link">
            Explore
          </Link>

          <Link to="/blogs/new" className="nav-link">
            Write
          </Link>

          <Link to="/users" className="nav-link">
            Users
          </Link>

          <Link to="/users/search" className="nav-link">
            Search
          </Link>

          <Link to={isLoggedIn ? `/users/${currentUser?.id}/profile` : "/login"} className="nav-link nav-link-login">
            {isLoggedIn ? "Profile" : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
