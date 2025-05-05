import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncReceiveThreadDetail } from "../states/threadDetail/action";
import ThreadItem from "../components/ThreadItem";
import CommentBox from "../components/CommentBox";
import "../styles/thread.css";

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
    // Dispatch action untuk mendapatkan data thread berdasarkan id
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const handleCommentSubmit = (comment) => {
    console.log("Komentar baru:", comment);
    // Proses data komentar di sini (misalnya kirim ke server)
    console.log(authUser, "authUser");
  };

  if (!threadDetail) {
    return <div>Loading...</div>; // Menampilkan loading saat data belum ada
  }

  // Kirimkan data threadDetail ke ThreadItem sebagai prop data
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
        onSubmit={handleCommentSubmit}
      />
    </div>
  );
}

export default ThreadDetailPage;
