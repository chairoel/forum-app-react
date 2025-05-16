import api from "../../utils/api";

const ActionType = {
  SET_UP_VOTE: "SET_UP_VOTE",
  SET_DOWN_VOTE: "SET_DOWN_VOTE",
  SET_NEUTRAL_VOTE: "SET_NEUTRAL_VOTE",
  UPDATE_THREAD_VOTES: "UPDATE_THREAD_VOTES",
};

function setUpVoteActionCreator(isUpVote) {
  return {
    type: ActionType.SET_UP_VOTE,
    payload: { isUpVote },
  };
}

function setDownVoteActionCreator(isDownVote) {
  return {
    type: ActionType.SET_DOWN_VOTE,
    payload: { isDownVote },
  };
}

function setNeutralVoteActionCreator(isNeutralVote) {
  return {
    type: ActionType.SET_NEUTRAL_VOTE,
    payload: { isNeutralVote },
  };
}

function updateThreadVotesActionCreator(threadId, userId, voteType) {
  return {
    type: ActionType.UPDATE_THREAD_VOTES,
    payload: {
      threadId,
      userId,
      voteType,
    },
  };
}

function asyncUpVoteProcess(threadId) {
  return async (dispatch, getState) => {
    try {
      const { authUser } = getState();
      if (!authUser) {
        alert("Anda harus login terlebih dahulu!");
        return;
      }

      const userId = authUser.id;
      dispatch(updateThreadVotesActionCreator(threadId, userId, 1));

      await api.upVoteThread(threadId);
      dispatch(setUpVoteActionCreator(true));
    } catch (error) {
      alert(error.message);

      const { authUser } = getState();
      if (authUser) {
        dispatch(updateThreadVotesActionCreator(threadId, authUser.id, 0));
      }
    }
  };
}

function asyncDownVoteProcess(threadId) {
  return async (dispatch, getState) => {
    try {
      const { authUser } = getState();
      if (!authUser) {
        alert("Anda harus login terlebih dahulu!");
        return;
      }

      const userId = authUser.id;
      dispatch(updateThreadVotesActionCreator(threadId, userId, -1));

      await api.downVoteThread(threadId);
      dispatch(setDownVoteActionCreator(true));
    } catch (error) {
      alert(error.message);

      const { authUser } = getState();
      if (authUser) {
        dispatch(updateThreadVotesActionCreator(threadId, authUser.id, 0));
      }
    }
  };
}

function asyncNeutralVoteProcess(threadId) {
  return async (dispatch, getState) => {
    try {
      const { authUser } = getState();
      if (!authUser) {
        alert("Anda harus login terlebih dahulu!");
        return;
      }

      const userId = authUser.id;
      dispatch(updateThreadVotesActionCreator(threadId, userId, 0));

      await api.neutralVoteThread(threadId);
      dispatch(setNeutralVoteActionCreator(true));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  setUpVoteActionCreator,
  setDownVoteActionCreator,
  setNeutralVoteActionCreator,
  updateThreadVotesActionCreator,
  asyncUpVoteProcess,
  asyncDownVoteProcess,
  asyncNeutralVoteProcess,
};
