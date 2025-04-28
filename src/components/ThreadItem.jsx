import React from "react";
import PropTypes from "prop-types";
import ThreadHeader from "./ThreadHeader";
import ThreadBody from "./ThreadBody";
import ThreadFooter from "./ThreadFooter";
import ThreadMeta from "./ThreadMeta";
import "../styles/thread.css";
import { useNavigate } from "react-router-dom";

const ThreadItem = ({ data }) => {
  const {
    id,
    title,
    body,
    likes,
    dislikes,
    comments,
    createdAt,
    category: tag,
    user,
  } = data;

  const navigate = useNavigate();

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <div className="thread">
      <ThreadHeader
        title={title}
        tag={tag}
        onClick={onThreadClick}
        onKeyDown={onThreadPress}
      />
      <ThreadBody body={body} />
      <ThreadFooter likes={likes} dislikes={dislikes} comments={comments} />
      <ThreadMeta createdBy={user?.name} createdAt={createdAt} />
    </div>
  );
};

const userShape = {
  id: PropTypes.string,
  name: PropTypes.string,
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  createdAt: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape),
};

export default ThreadItem;
