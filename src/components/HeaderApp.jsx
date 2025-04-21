import React from "react";
import "../styles/header.css";
import PropTypes from "prop-types";
import { Search } from "lucide-react";

const HeaderApp = ({ title = "DICODING FORUM" }) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="header-title">{title}</h1>
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
      </div>
    </header>
  );
};

HeaderApp.propTypes = {
  title: PropTypes.string,
};

export default HeaderApp;
