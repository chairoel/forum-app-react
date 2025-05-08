import React from "react";
import PropTypes from "prop-types";
import "../styles/comment.css";
import ThreadFooter from "./ThreadFooter";
import CommentHeader from "./CommentHeader";
import ThreadBody from "./ThreadBody";

const CommentItem = ({ user, createdAt, commentText, likes, dislikes }) => {
  return (
    <div className="comment-container">
      <CommentHeader
        avatar={user?.avatar}
        createdBy={user?.name}
        createdAt={createdAt}
      />
      <ThreadBody body={commentText} isDetail={true} />
      <ThreadFooter likes={likes} dislikes={dislikes} isDetail={true} />
    </div>
  );
};

const userShape = {
  avatar: PropTypes.string,
  name: PropTypes.string,
};

CommentItem.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  createdAt: PropTypes.string.isRequired,
  commentText: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
};

export default CommentItem;
