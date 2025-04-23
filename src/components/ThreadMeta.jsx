import React from "react";
import PropTypes from "prop-types";
import "../styles/thread.css";

const ThreadMeta = ({ createdBy, createdAt }) => {
  return (
    <div className="thread-meta">
      <span className="thread-author">{`Dibuat oleh ${createdBy}`}</span>
      <span className="thread-time">{`${createdAt} hari lalu`}</span>
    </div>
  );
};

ThreadMeta.propTypes = {
  createdBy: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
};

export default ThreadMeta;
