import api from "../../utils/api";
import { addCommentToThreadActionCreator } from "../threadDetail/action";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  ADD_COMMENT: "ADD_COMMENT",
};

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
}

function asyncAddComment(threadId, { content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment(threadId, { content });
      dispatch(addCommentActionCreator(comment));
      dispatch(addCommentToThreadActionCreator(comment));
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, addCommentActionCreator, asyncAddComment };
