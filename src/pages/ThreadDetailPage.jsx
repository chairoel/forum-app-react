import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncReceiveThreadDetail } from "../states/threadDetail/action";
import ThreadItem from "../components/ThreadItem";
import CommentBox from "../components/CommentBox";
import "../styles/thread.css";
import CommentItem from "../components/CommentItem";
import { asyncAddComment } from "../states/comments/action";

function ThreadDetailPage() {
  const { id } = useParams();

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

  if (!threadDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="thread-detail-container">
      <ThreadItem
        key={threadDetail.id}
        data={{
          id: threadDetail.id,
          title: threadDetail.title,
          body: threadDetail.body,
          likes: threadDetail.upVotesBy.length,
          dislikes: threadDetail.downVotesBy.length,
          comments: threadDetail.comments.length,
          createdAt: threadDetail.createdAt,
          category: threadDetail.category,
          user: threadDetail.owner,
          isDetail: true,
        }}
      />

      <CommentBox
        createdBy={authUser.name}
        avatar={authUser.avatar}
        onSubmit={(comment) => {
          handleCommentSubmit(threadDetail.id, comment);
        }}
      />

      <h2 className="comment-title">{`Komentar (${threadDetail.comments.length})`}</h2>

      <div>
        {threadDetail.comments.length > 0 &&
          threadDetail.comments.map((item) => {
            return (
              <CommentItem
                key={item.id}
                user={item.owner}
                createdAt={item.createdAt}
                commentText={item.content}
                likes={item.upVotesBy.length}
                dislikes={item.downVotesBy.length}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ThreadDetailPage;
