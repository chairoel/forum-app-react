import React from "react";
import PropTypes from "prop-types";
import "../styles/thread.css";

const ThreadTag = ({ tag }) => {
  return <span className="thread-tag">{`#${tag}`}</span>;
};

ThreadTag.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default ThreadTag;
