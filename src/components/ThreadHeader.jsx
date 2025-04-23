import React from "react";
import PropTypes from "prop-types";
import "../styles/thread.css";

const ThreadHeader = ({ title }) => {
  return (
    <div className="thread-header">
      <span className="thread-tag">#redux</span>
      <h2 className="thread-title">{title}</h2>
    </div>
  );
};

ThreadHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ThreadHeader;
