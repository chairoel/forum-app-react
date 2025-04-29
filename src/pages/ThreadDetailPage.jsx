import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncReceiveThreadDetail } from "../states/threadDetail/action";
import ThreadItem from "../components/ThreadItem";

function ThreadDetailPage() {
  const { id } = useParams();

  // Ambil data threadDetail dan authUser dari Redux store
  const { threadDetail, authUser } = useSelector((state) => ({
    threadDetail: state.threadDetail,
    authUser: state.authUser,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch action untuk mendapatkan data thread berdasarkan id
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return <div>Loading...</div>; // Menampilkan loading saat data belum ada
  }

  // Kirimkan data threadDetail ke ThreadItem sebagai prop data
  return (
    <div className="thread-detail-page">
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
    </div>
  );
}

export default ThreadDetailPage;
