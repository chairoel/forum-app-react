import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/reducer";
import isPreLoadReducer from "./preload/reducer";
import authUserReducer from "./auth/reducer";
import leaderboardsReducer from "./leaderboards/reducer";
import threadsReducer from "./threads/reducer";
import threadDetailReducer from "./threadDetail/reducer";
import commentsReducer from "./comments/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreLoadReducer,
    users: usersReducer,
    leaderboards: leaderboardsReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
    }),
});

export default store;
