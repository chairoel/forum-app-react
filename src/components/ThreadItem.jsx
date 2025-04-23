import React from "react";
import PropTypes from "prop-types";
import ThreadHeader from "./ThreadHeader";
import ThreadBody from "./ThreadBody";
import ThreadFooter from "./ThreadFooter";
import ThreadMeta from "./ThreadMeta";
import "../styles/thread.css";

const ThreadItem = ({
  title,
  tag,
  body,
  likes,
  dislikes,
  comments,
  createdBy,
  createdAt,
  onClick,
}) => {
  return (
    <div className="thread">
      <ThreadHeader title={title} tag={tag} onClick={onClick} />
      <ThreadBody body={body} />
      <ThreadFooter likes={likes} dislikes={dislikes} comments={comments} />
      <ThreadMeta createdBy={createdBy} createdAt={createdAt} />
    </div>
  );
};

ThreadItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  createdBy: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
};

export default ThreadItem;
