import React, { useState } from "react";
import PropTypes from "prop-types";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import "../styles/thread.css";
import ThreadActionItem from "./ThreadActionItem";

const ThreadFooter = ({
  likes = 0,
  dislikes = 0,
  comments = 0,
  isDetail = false,
  onLikeClick,
  onDislikeClick,
  likesClickable = true,
  dislikesClickable = true,
  initialLikeActive = false,
  initialDislikeActive = false,
  likeColor = "#4caf50",
  dislikeColor = "#f44336",
}) => {
  const [isLikeActive, setIsLikeActive] = useState(initialLikeActive);
  const [isDislikeActive, setIsDislikeActive] = useState(initialDislikeActive);

  const handleLikeClick = () => {
    if (likesClickable) {
      setIsLikeActive((prev) => !prev);

      if (!isLikeActive && isDislikeActive) {
        setIsDislikeActive(false);
      }

      if (onLikeClick) {
        onLikeClick(!isLikeActive);
      }
    }
  };

  const handleDislikeClick = () => {
    if (dislikesClickable) {
      setIsDislikeActive((prev) => !prev);

      if (!isDislikeActive && isLikeActive) {
        setIsLikeActive(false);
      }

      if (onDislikeClick) {
        onDislikeClick(!isDislikeActive);
      }
    }
  };

  return (
    <div className="thread-footer">
      <ThreadActionItem
        icon={ThumbsUp}
        count={likes}
        onClick={handleLikeClick}
        isClickable={likesClickable}
        isActive={isLikeActive}
        activeColor={likeColor}
      />
      <ThreadActionItem
        icon={ThumbsDown}
        count={dislikes}
        onClick={handleDislikeClick}
        isClickable={dislikesClickable}
        isActive={isDislikeActive}
        activeColor={dislikeColor}
      />
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
  onLikeClick: PropTypes.func,
  onDislikeClick: PropTypes.func,
  likesClickable: PropTypes.bool,
  dislikesClickable: PropTypes.bool,
  initialLikeActive: PropTypes.bool,
  initialDislikeActive: PropTypes.bool,
  likeColor: PropTypes.string,
  dislikeColor: PropTypes.string,
};

export default ThreadFooter;
