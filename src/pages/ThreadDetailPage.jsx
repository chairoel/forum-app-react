import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
} from "../states/threadDetail/action";
import ThreadItem from "../components/ThreadItem";
import CommentBox from "../components/CommentBox";
import "../styles/thread.css";
import CommentItem from "../components/CommentItem";
import { asyncAddComment } from "../states/comments/action";

function ThreadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { threadDetail, authUser } = useSelector(
    (state) => ({
      threadDetail: state.threadDetail,
      authUser: state.authUser,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const handleCommentSubmit = async (threadId, { content }) => {
    await dispatch(asyncAddComment(threadId, { content }));
  };

  const handleLikeClick = (value) => {
    if (!authUser) {
      navigate("/login");
      return;
    }

    if (value) {
      dispatch(asyncUpVoteThreadDetail(id));
    } else {
      dispatch(asyncNeutralVoteThreadDetail(id));
    }
  };

  const handleDislikeClick = (value) => {
    if (!authUser) {
      navigate("/login");
      return;
    }

    if (value) {
      dispatch(asyncDownVoteThreadDetail(id));
    } else {
      dispatch(asyncNeutralVoteThreadDetail(id));
    }
  };

  if (!threadDetail) {
    return <div>Loading...</div>;
  }

  const upVotesBy = Array.isArray(threadDetail.upVotesBy)
    ? threadDetail.upVotesBy
    : [];
  const downVotesBy = Array.isArray(threadDetail.downVotesBy)
    ? threadDetail.downVotesBy
    : [];

  const hasUpVoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const hasDownVoted = authUser ? downVotesBy.includes(authUser.id) : false;

  return (
    <div className="thread-detail-container">
      <ThreadItem
        key={threadDetail.id}
        data={{
          id: threadDetail.id,
          title: threadDetail.title,
          body: threadDetail.body,
          likes: upVotesBy.length,
          dislikes: downVotesBy.length,
          comments: threadDetail.comments.length,
          createdAt: threadDetail.createdAt,
          category: threadDetail.category,
          user: threadDetail.owner,
          authUser: authUser,
          isDetail: true,
        }}
        onLikeClick={handleLikeClick}
        onDislikeClick={handleDislikeClick}
        initialLikeActive={hasUpVoted}
        initialDislikeActive={hasDownVoted}
      />

      {authUser ? (
        <CommentBox
          createdBy={authUser.name}
          avatar={authUser.avatar}
          onSubmit={(comment) => {
            handleCommentSubmit(threadDetail.id, comment);
          }}
        />
      ) : (
        <div className="login-prompt">
          <p>
            Silakan{" "}
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              login
            </a>{" "}
            untuk memberikan komentar
          </p>
        </div>
      )}

      <h2 className="comment-title">{`Komentar (${threadDetail.comments.length})`}</h2>

      <div>
        {threadDetail.comments.length > 0 &&
          threadDetail.comments.map((item) => {
            const commentUpVotesBy = Array.isArray(item.upVotesBy)
              ? item.upVotesBy
              : [];
            const commentDownVotesBy = Array.isArray(item.downVotesBy)
              ? item.downVotesBy
              : [];

            return (
              <CommentItem
                key={item.id}
                commentId={item.id}
                user={item.owner}
                createdAt={item.createdAt}
                commentText={item.content}
                likes={commentUpVotesBy.length}
                dislikes={commentDownVotesBy.length}
                upVotesBy={commentUpVotesBy}
                downVotesBy={commentDownVotesBy}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ThreadDetailPage;
