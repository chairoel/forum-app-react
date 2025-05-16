import { ActionType as ThreadDetailActionType } from "./action";
import { ActionType as VotesActionType } from "../votecomments/action";

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ThreadDetailActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;

    case ThreadDetailActionType.CLEAR_THREAD_DETAIL:
      return null;

    case ThreadDetailActionType.ADD_COMMENT_TO_THREAD:
      if (!threadDetail) return threadDetail;

      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };

    case ThreadDetailActionType.UPDATE_THREAD_DETAIL_VOTES: {
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

    case VotesActionType.UPDATE_COMMENT_VOTES: {
      if (!threadDetail) return threadDetail;

      const { commentId, userId, voteType } = action.payload;

      const updatedComments = threadDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          const upVotesBy = Array.isArray(comment.upVotesBy)
            ? [...comment.upVotesBy]
            : [];

          const downVotesBy = Array.isArray(comment.downVotesBy)
            ? [...comment.downVotesBy]
            : [];

          const filteredUpVotes = upVotesBy.filter((id) => id !== userId);
          const filteredDownVotes = downVotesBy.filter((id) => id !== userId);

          if (voteType === 1) {
            filteredUpVotes.push(userId);
          } else if (voteType === -1) {
            filteredDownVotes.push(userId);
          }

          return {
            ...comment,
            upVotesBy: filteredUpVotes,
            downVotesBy: filteredDownVotes,
          };
        }
        return comment;
      });

      return {
        ...threadDetail,
        comments: updatedComments,
      };
    }

    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
