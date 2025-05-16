import api from "../../utils/api";

const ActionType = {
  SET_UP_VOTE: "SET_UP_VOTE",
  SET_DOWN_VOTE: "SET_DOWN_VOTE",
  SET_NEUTRAL_VOTE: "SET_NEUTRAL_VOTE",
  UPDATE_COMMENT_VOTES: "UPDATE_COMMENT_VOTES",
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

function updateCommentVotesActionCreator(commentId, userId, voteType) {
  return {
    type: ActionType.UPDATE_COMMENT_VOTES,
    payload: {
      commentId,
      userId,
      voteType,
    },
  };
}

function asyncUpVoteProcess(threadId, commentId) {
  return async (dispatch, getState) => {
    try {
      const { authUser } = getState();
      if (!authUser) {
        alert("Anda harus login terlebih dahulu!");
        return;
      }

      const userId = authUser.id;
      dispatch(updateCommentVotesActionCreator(commentId, userId, 1));

      await api.upVoteComment(threadId, commentId);
      dispatch(setUpVoteActionCreator(true));
    } catch (error) {
      alert(error.message);

      const { authUser } = getState();
      if (authUser) {
        dispatch(updateCommentVotesActionCreator(commentId, authUser.id, 0));
      }
    }
  };
}

function asyncDownVoteProcess(threadId, commentId) {
  return async (dispatch, getState) => {
    try {
      const { authUser } = getState();
      if (!authUser) {
        alert("Anda harus login terlebih dahulu!");
        return;
      }

      const userId = authUser.id;
      dispatch(updateCommentVotesActionCreator(commentId, userId, -1));

      await api.downVoteComment(threadId, commentId);
      dispatch(setDownVoteActionCreator(true));
    } catch (error) {
      alert(error.message);

      const { authUser } = getState();
      if (authUser) {
        dispatch(updateCommentVotesActionCreator(commentId, authUser.id, 0));
      }
    }
  };
}

function asyncNeutralVoteProcess(threadId, commentId) {
  return async (dispatch, getState) => {
    try {
      const { authUser } = getState();
      if (!authUser) {
        alert("Anda harus login terlebih dahulu!");
        return;
      }

      const userId = authUser.id;
      dispatch(updateCommentVotesActionCreator(commentId, userId, 0));

      await api.neutralVoteComment(threadId, commentId);
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
  updateCommentVotesActionCreator,
  asyncUpVoteProcess,
  asyncDownVoteProcess,
  asyncNeutralVoteProcess,
};
