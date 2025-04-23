import React from "react";
import PropTypes from "prop-types";
import "../styles/thread.css";
import ThreadTag from "./ThreadTag";

const ThreadHeader = ({ title, tag }) => {
  return (
    <div className="thread-header">
      <ThreadTag tag={tag} />
      <h2 className="thread-title">{title}</h2>
    </div>
  );
};

ThreadHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ThreadHeader;
