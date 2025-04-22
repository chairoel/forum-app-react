import React, { use } from "react";
import PropTypes from "prop-types";
import "../styles/leaderboard.css";
import Avatar from "./Avatar";

function LeaderboardItem({ user, score, rank }) {
  const { name, email } = user;
  return (
    <div className="leaderboard-row">
      <div className="leaderboard-user">
        <Avatar user={user} />
        <div className="leaderboard-user-row">
          <div className="leaderboard-name">{name}</div>
          <div className="leaderboard-subname">{email}</div>
        </div>
      </div>
      <div className={`leaderboard-score ${rank <= 3 ? `rank-${rank}` : ""}`}>
        {score}
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  score: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
};

export default LeaderboardItem;
