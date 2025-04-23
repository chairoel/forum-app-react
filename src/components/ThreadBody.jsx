import React from "react";
import PropTypes from "prop-types";
import "../styles/thread.css";

const ThreadBody = ({ body }) => {
  return <p className="thread-body">{body}</p>;
};

ThreadBody.propTypes = {
  body: PropTypes.string.isRequired,
};

export default ThreadBody;
