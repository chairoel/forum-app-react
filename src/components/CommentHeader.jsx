import React from "react";
import PropTypes from "prop-types";
import "../styles/thread.css";
import { postedAt } from "../utils/postedAt";
import Avatar from "./Avatar";

const CommentHeader = ({ avatar, createdBy, createdAt }) => {
  return (
    <div className="thread-meta">
      <div className="thread-author">
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

CommentHeader.propTypes = {
  avatar: PropTypes.string,
  createdBy: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
};

export default CommentHeader;
