import React from "react";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import "../styles/thread.css";

const ThreadFooter = ({ likes, dislikes, comments }) => {
  return (
    <div className="thread-footer">
      <span className="thread-likes">
        <ThumbsUp size={16} />
        {likes}
      </span>
      <span className="thread-dislikes">
        <ThumbsDown size={16} />
        {dislikes}
      </span>
      <span className="thread-comments">
        <MessageCircle size={16} />
        {comments}
      </span>
    </div>
  );
};

export default ThreadFooter;
