import React from "react";
import PropTypes from "prop-types";
import "../styles/comment.css";
import ThreadFooter from "./ThreadFooter";
import CommentHeader from "./CommentHeader";
import ThreadBody from "./ThreadBody";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  asyncUpVoteProcess,
  asyncDownVoteProcess,
  asyncNeutralVoteProcess,
} from "../states/voteComments/action";
import { shallowEqual } from "react-redux";

const CommentItem = ({
  user,
  createdAt,
  commentText,
  commentId,
  likes = 0,
  dislikes = 0,
  upVotesBy = [],
  downVotesBy = [],
}) => {
  const { id: threadId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authUser } = useSelector(
    (state) => ({
      authUser: state.authUser,
    }),
    shallowEqual
  );

  const hasUpVoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const hasDownVoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const handleLikeClick = (value) => {
    if (!authUser) {
      navigate("/login");
      return;
    }

    if (value) {
      dispatch(asyncUpVoteProcess(threadId, commentId));
    } else {
      dispatch(asyncNeutralVoteProcess(threadId, commentId));
    }
  };

  const handleDislikeClick = (value) => {
    if (!authUser) {
      navigate("/login");
      return;
    }

    if (value) {
      dispatch(asyncDownVoteProcess(threadId, commentId));
    } else {
      dispatch(asyncNeutralVoteProcess(threadId, commentId));
    }
  };

  return (
    <div className="comment-container">
      <CommentHeader
        avatar={user?.avatar}
        createdBy={user?.name}
        createdAt={createdAt}
      />
      <ThreadBody body={commentText} isDetail={true} />
      <ThreadFooter
        likes={likes}
        dislikes={dislikes}
        isDetail={true}
        onLikeClick={handleLikeClick}
        onDislikeClick={handleDislikeClick}
        initialLikeActive={hasUpVoted}
        initialDislikeActive={hasDownVoted}
        likesClickable={!!authUser}
        dislikesClickable={!!authUser}
      />
    </div>
  );
};

const userShape = {
  avatar: PropTypes.string,
  name: PropTypes.string,
};

CommentItem.propTypes = {
  user: PropTypes.shape(userShape),
  createdAt: PropTypes.string.isRequired,
  commentText: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  likes: PropTypes.number,
  dislikes: PropTypes.number,
  upVotesBy: PropTypes.array,
  downVotesBy: PropTypes.array,
};

export default CommentItem;
