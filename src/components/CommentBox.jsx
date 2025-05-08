import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/comment.css";
import Avatar from "./Avatar";

const CommentBox = ({ avatar, createdBy, onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ content: comment });
    }
    setComment("");
  };

  return (
    <div className="comment-box">
      <div className="user-info">
        <Avatar user={{ name: createdBy, avatar }} />
        <span>{createdBy}</span>
      </div>

      <textarea
        className="comment-textarea"
        value={comment}
        onChange={handleChange}
        placeholder="Tulis komentar Anda..."
      />

      <button className="submit-btn" onClick={handleSubmit}>
        Balas
      </button>
    </div>
  );
};

CommentBox.propTypes = {
  avatar: PropTypes.string,
  createdBy: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CommentBox;
