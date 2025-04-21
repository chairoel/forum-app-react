import { CheckCheckIcon, LogIn, LogOut, Volleyball } from "lucide-react";
import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = ({ authUser, signOut }) => {
  const { id = "", photo = "", name = "" } = authUser || {};

  const location = useLocation();

  const isActive = (path) => {
    if (
      path === "/" &&
      (location.pathname === "/" || location.pathname === "/threads")
    ) {
      return true;
    }
    return location.pathname === path;
  };

  const handleAuthClick = (e) => {
    if (authUser) {
      e.preventDefault();
      signOut();
    }
  };

  return (
    <div className="bottom-navigation">
      <div className="nav-container">
        <Link to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
          <div className="nav-icon">
            <Volleyball />
          </div>
          <span className="nav-label">Threads</span>
        </Link>

        <Link
          to="/leaderboards"
          className={`nav-item ${isActive("/leaderboards") ? "active" : ""}`}
        >
          <div className="nav-icon">
            <CheckCheckIcon />
          </div>
          <span className="nav-label">Leaderboards</span>
        </Link>

        <Link
          to={"/login"}
          onClick={handleAuthClick}
          className={`nav-item ${isActive("/login") ? "active" : ""}`}
        >
          <div className="nav-icon">{authUser ? <LogOut /> : <LogIn />}</div>
          <span className="nav-label">{authUser ? "Logout" : "Login"}</span>
        </Link>
      </div>
    </div>
  );
};

const authUserShape = {
  id: PropTypes.string,
  name: PropTypes.string,
  photo: PropTypes.string,
};

BottomNavigation.propTypes = {
  authUser: PropTypes.shape(authUserShape),
  signOut: PropTypes.func.isRequired,
};

BottomNavigation.defaultProps = {
  authUser: null,
};

export default BottomNavigation;
