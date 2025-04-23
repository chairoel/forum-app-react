import React, { useState } from "react";
import "../styles/header.css";
import PropTypes from "prop-types";
import { Search } from "lucide-react";
import { useLocation } from "react-router";

const HeaderApp = ({ title = "DICODING FORUM", authUser, onSearch }) => {
  const { id = "", photo = "", name = "" } = authUser || {};
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="header-title">{title}</h1>
        {authUser && location.pathname === "/" && (
          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
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
  onSearch: PropTypes.func,
};

HeaderApp.defaultProps = {
  authUser: null,
  onSearch: null,
};

export default HeaderApp;
