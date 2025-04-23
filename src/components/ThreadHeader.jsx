import React from "react";
import PropTypes from "prop-types";
import "../styles/thread.css";
import ThreadTag from "./ThreadTag";

const ThreadHeader = ({ title, tag, onClick }) => {
  return (
    <div className="thread-header">
      <ThreadTag tag={tag} />
      <h2
        className="thread-title"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        {title}
      </h2>
    </div>
  );
};

ThreadHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ThreadHeader.defaultProps = {
  onClick: () => {},
};

export default ThreadHeader;
