import { ActionType as ThreadsActionType } from "./action";
import { ActionType as VotesActionType } from "../votes/action";

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ThreadsActionType.RECEIVE_THREADS:
      return action.payload.threads;

    case ThreadsActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];

    case VotesActionType.UPDATE_THREAD_VOTES: {
      const { threadId, userId, voteType } = action.payload;

      return threads.map((thread) => {
        if (thread.id === threadId) {
          const upVotesBy = Array.isArray(thread.upVotesBy)
            ? [...thread.upVotesBy]
            : [];
          const downVotesBy = Array.isArray(thread.downVotesBy)
            ? [...thread.downVotesBy]
            : [];

          const filteredUpVotes = upVotesBy.filter((id) => id !== userId);
          const filteredDownVotes = downVotesBy.filter((id) => id !== userId);

          if (voteType === 1) {
            filteredUpVotes.push(userId);
          } else if (voteType === -1) {
            filteredDownVotes.push(userId);
          }

          return {
            ...thread,
            upVotesBy: filteredUpVotes,
            downVotesBy: filteredDownVotes,
          };
        }
        return thread;
      });
    }

    default:
      return threads;
  }
}

export default threadsReducer;
