import React from "react";
import PropTypes from "prop-types";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import "../styles/thread.css";

const ThreadFooter = ({
  likes = 0,
  dislikes = 0,
  comments = 0,
  isDetail = false,
}) => {
  return (
    <div className="thread-footer">
      <span className="thread-likes">
        <ThumbsUp size={16} style={{ marginRight: "4px" }} />
        {likes}
      </span>
      <span className="thread-dislikes">
        <ThumbsDown size={16} style={{ marginRight: "4px" }} />
        {dislikes}
      </span>
      {!isDetail && (
        <span className="thread-comments">
          <MessageCircle size={16} style={{ marginRight: "4px" }} />
          {comments}
        </span>
      )}
    </div>
  );
};

ThreadFooter.propTypes = {
  likes: PropTypes.number,
  dislikes: PropTypes.number,
  comments: PropTypes.number,
  isDetail: PropTypes.bool,
};

export default ThreadFooter;
