import { ActionType } from "./action";

function voteCommentsReducer(
  isUpVote = true,
  isDownVote = false,
  isNeutralVote = false,
  action = {}
) {
  switch (action.type) {
    case ActionType.SET_UP_VOTE:
      return {
        isUpVote: action.payload.isUpVote,
        isDownVote: false,
        isNeutralVote: false,
      };

    case ActionType.SET_DOWN_VOTE:
      return {
        isUpVote: false,
        isDownVote: action.payload.isDownVote,
        isNeutralVote: false,
      };

    case ActionType.SET_NEUTRAL_VOTE:
      return {
        isUpVote: false,
        isDownVote: false,
        isNeutralVote: action.payload.isNeutralVote,
      };

    default:
      return {
        isUpVote,
        isDownVote,
        isNeutralVote,
      };
  }
}

export default voteCommentsReducer;
