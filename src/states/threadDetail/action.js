import api from "../../utils/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  ADD_COMMENT_TO_THREAD: "ADD_COMMENT_TO_THREAD",
  UPDATE_THREAD_DETAIL_VOTES: "UPDATE_THREAD_DETAIL_VOTES",
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentToThreadActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT_TO_THREAD,
    payload: { comment },
  };
}

function updateThreadDetailVotesActionCreator(userId, voteType) {
  return {
    type: ActionType.UPDATE_THREAD_DETAIL_VOTES,
    payload: {
      userId,
      voteType,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert("Anda harus login terlebih dahulu!");
      return;
    }

    const userId = authUser.id;
    dispatch(updateThreadDetailVotesActionCreator(userId, 1));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(updateThreadDetailVotesActionCreator(userId, 0));
    }
  };
}

function asyncDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert("Anda harus login terlebih dahulu!");
      return;
    }

    const userId = authUser.id;
    dispatch(updateThreadDetailVotesActionCreator(userId, -1));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(updateThreadDetailVotesActionCreator(userId, 0));
    }
  };
}

function asyncNeutralVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert("Anda harus login terlebih dahulu!");
      return;
    }

    const userId = authUser.id;
    dispatch(updateThreadDetailVotesActionCreator(userId, 0));

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(updateThreadDetailVotesActionCreator(userId, 0));
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentToThreadActionCreator,
  updateThreadDetailVotesActionCreator,
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
};
