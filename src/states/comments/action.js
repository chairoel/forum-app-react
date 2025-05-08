import api from "../../utils/api";

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
    try {
      const comment = await api.createComment(threadId, { content });
      dispatch(addCommentActionCreator(comment));
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };
}

export { ActionType, addCommentActionCreator, asyncAddComment };
