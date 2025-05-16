import { ActionType } from "./action";

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;

    case ActionType.CLEAR_THREAD_DETAIL:
      return null;

    case ActionType.ADD_COMMENT_TO_THREAD:
      if (!threadDetail) return threadDetail;

      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };

    case ActionType.UPDATE_THREAD_DETAIL_VOTES: {
      if (!threadDetail) return threadDetail;

      const { userId, voteType } = action.payload;

      const upVotesBy = Array.isArray(threadDetail.upVotesBy)
        ? [...threadDetail.upVotesBy]
        : [];

      const downVotesBy = Array.isArray(threadDetail.downVotesBy)
        ? [...threadDetail.downVotesBy]
        : [];

      const filteredUpVotes = upVotesBy.filter((id) => id !== userId);
      const filteredDownVotes = downVotesBy.filter((id) => id !== userId);

      if (voteType === 1) {
        filteredUpVotes.push(userId);
      } else if (voteType === -1) {
        filteredDownVotes.push(userId);
      }

      return {
        ...threadDetail,
        upVotesBy: filteredUpVotes,
        downVotesBy: filteredDownVotes,
      };
    }

    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
