import { CheckCheckIcon, PersonStanding, Volleyball } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
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
          to="/login"
          className={`nav-item ${isActive("/login") ? "active" : ""}`}
        >
          <div className="nav-icon">
            <PersonStanding />
          </div>
          <span className="nav-label">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
