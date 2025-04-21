import React from "react";
import "../styles/header.css";
import PropTypes from "prop-types";
import { Search } from "lucide-react";

const HeaderApp = ({ title = "DICODING FORUM", authUser }) => {
  const { id = "", photo = "", name = "" } = authUser || {};

  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="header-title">{title}</h1>
        {authUser && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Cari diskusi..."
              className="search-input"
            />
            <button className="search-button">
              <Search size={16} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const authUserShape = {
  id: PropTypes.string,
  name: PropTypes.string,
  photo: PropTypes.string,
};

HeaderApp.propTypes = {
  authUser: PropTypes.shape(authUserShape),
  title: PropTypes.string,
};

HeaderApp.defaultProps = {
  authUser: null,
};

export default HeaderApp;
