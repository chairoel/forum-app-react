import React from "react";
import PropTypes from "prop-types";
import "../styles/thread.css";
import { postedAt } from "../utils/postedAt";

const ThreadMeta = ({ createdBy, createdAt }) => {
  return (
    <div className="thread-meta">
      <span className="thread-author">{`Dibuat oleh ${createdBy}`}</span>
      <span className="thread-time">{postedAt(createdAt)}</span>
    </div>
  );
};

ThreadMeta.propTypes = {
  createdBy: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
};

export default ThreadMeta;
