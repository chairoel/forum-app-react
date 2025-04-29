import React, { use } from "react";
import "../styles/leaderboard.css";
import PropTypes from "prop-types";

const Avatar = ({ user, style }) => {
  const { name, avatar } = user;
  return (
    <img src={avatar} alt={name} className="leaderboard-avatar" style={style} />
  );
};

Avatar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
};

export default Avatar;
