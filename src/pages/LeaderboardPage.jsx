import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LeaderboardItem from "../components/LeaderboardItem";
import { asyncReceiveLeaderboards } from "../states/leaderboards/action";

function LeaderboardPage() {
  const { leaderboards } = useSelector(
    (state) => ({
      leaderboards: state.leaderboards,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboard-page">
      <div className="leaderboard">
        <h1 className="leaderboard-title">Klasmen Pengguna Aktif</h1>

        <div className="leaderboard-table">
          <div className="leaderboard-header">
            <div className="leaderboard-user-header">Pengguna</div>
            <div className="leaderboard-score-header">Skor</div>
          </div>

          <div className="leaderboard-body">
            {leaderboards.map((leaderboard, index) => (
              <LeaderboardItem
                key={leaderboard.user.id}
                user={leaderboard.user}
                score={leaderboard.score}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeaderboardPage;
