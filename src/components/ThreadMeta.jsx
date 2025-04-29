import React from "react";
import PropTypes from "prop-types";
import "../styles/thread.css";
import { postedAt } from "../utils/postedAt";
import Avatar from "./Avatar";

const ThreadMeta = ({ avatar, createdBy, createdAt }) => {
  return (
    <div className="thread-meta">
      <div className="thread-author">
        <p style={{ marginRight: "8px" }}>Dibuat oleh</p>
        <Avatar
          user={{ name: createdBy, avatar }}
          style={{ width: "20px", height: "20px", marginRight: "4px" }}
        />
        <p>{createdBy}</p>
      </div>
      <span className="thread-time">{postedAt(createdAt)}</span>
    </div>
  );
};

ThreadMeta.propTypes = {
  avatar: PropTypes.string,
  createdBy: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
};

export default ThreadMeta;
