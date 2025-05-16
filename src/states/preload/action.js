import api from "../../utils/api";
import { setAuthUserActionCreator } from "../auth/action";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

function setPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: { isPreload },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
}

export { ActionType, setPreloadActionCreator, asyncPreloadProcess };
