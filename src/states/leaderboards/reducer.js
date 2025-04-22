import { ActionType } from "./action";

/**
 * @TODO: Define the reducer for the leaderboards state
 */
function leaderboardsReducer(leaderboards = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return action.payload.leaderboards;

    default:
      return leaderboards;
  }
}

export default leaderboardsReducer;
