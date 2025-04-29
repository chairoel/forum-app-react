import React from "react";
import PropTypes from "prop-types";
import "../styles/thread.css";

const MAX_LENGTH = 268;

const ThreadBody = ({ body, isDetail = false }) => {
  const truncatedBody =
    isDetail || (body || "").length <= MAX_LENGTH
      ? body
      : body.substring(0, MAX_LENGTH) + "...";

  return (
    <div
      className="thread-body"
      dangerouslySetInnerHTML={{ __html: truncatedBody }}
    />
  );
};
ThreadBody.propTypes = {
  body: PropTypes.string.isRequired,
};

export default ThreadBody;
