import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/reducer";
import isPreLoadReducer from "./preload/reducer";
import authUserReducer from "./auth/reducer";
import leaderboardsReducer from "./leaderboards/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreLoadReducer,
    users: usersReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;
