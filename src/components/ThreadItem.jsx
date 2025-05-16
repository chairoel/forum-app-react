import React from "react";
import PropTypes from "prop-types";
import ThreadHeader from "./ThreadHeader";
import ThreadBody from "./ThreadBody";
import ThreadFooter from "./ThreadFooter";
import ThreadMeta from "./ThreadMeta";
import "../styles/thread.css";
import { useNavigate } from "react-router-dom";

const ThreadItem = ({
  data,
  onLikeClick,
  onDislikeClick,
  initialLikeActive = false,
  initialDislikeActive = false,
}) => {
  const {
    id,
    title,
    body,
    likes,
    dislikes,
    comments,
    createdAt,
    category,
    user,
    authUser,
    isDetail = false,
  } = data;

  const navigate = useNavigate();

  const onThreadClick = () => {
    handleNavigate();
  };

  const onThreadPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleNavigate();
    }
  };

  const handleNavigate = () => {
    if (!authUser) {
      navigate("/login");
      return;
    }
    navigate(`/threads/${id}`);
  };

  return (
    <div className="thread">
      <ThreadHeader
        isDetail={isDetail}
        title={title}
        tag={category}
        onClick={onThreadClick}
        onKeyDown={onThreadPress}
      />
      <ThreadBody body={body} isDetail={isDetail} />
      <ThreadFooter
        likes={likes}
        dislikes={dislikes}
        comments={comments}
        isDetail={isDetail}
        onLikeClick={onLikeClick}
        onDislikeClick={onDislikeClick}
        initialLikeActive={initialLikeActive}
        initialDislikeActive={initialDislikeActive}
        likesClickable={!!authUser}
        dislikesClickable={!!authUser}
      />
      <ThreadMeta
        avatar={user?.avatar}
        createdBy={user?.name}
        createdAt={createdAt}
      />
    </div>
  );
};

const userShape = {
  id: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
};

ThreadItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    createdAt: PropTypes.number.isRequired,
    user: PropTypes.shape(userShape),
    authUser: PropTypes.object,
    isDetail: PropTypes.bool,
  }).isRequired,
  onLikeClick: PropTypes.func,
  onDislikeClick: PropTypes.func,
  initialLikeActive: PropTypes.bool,
  initialDislikeActive: PropTypes.bool,
};

export default ThreadItem;
