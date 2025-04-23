import React from "react";
import PropTypes from "prop-types";
import "../styles/thread.css";

const ThreadTag = ({ tag, onClick, isSelected }) => {
  return (
    <span
      className={`thread-tag ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {`#${tag}`}
    </span>
  );
};

ThreadTag.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default ThreadTag;
