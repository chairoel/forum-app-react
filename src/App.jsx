import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { asyncPreloadProcess } from "./states/preload/action";
import BottomNavigation from "./components/BottomNavigation";
import HeaderApp from "./components/HeaderApp";
import { asyncUnsetAuthUser } from "./states/auth/action";
import LeaderboardPage from "./pages/LeaderboardPage";
import HomePage from "./pages/HomePage";
import ThreadDetailPage from "./pages/ThreadDetailPage";

function App() {
  // const { authUser = null, isPreload = false } = useSelector(
  //   (states) => states
  // );

  const { isPreload, authUser } = useSelector(
    (state) => (
      {
        isPreload: state.isPreload,
        authUser: state.authUser,
      },
      shallowEqual
    )
  );

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // Update pencarian
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Loading />
      <HeaderApp authUser={authUser} onSearch={handleSearch} />
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/*" element={<></>} />
            <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/leaderboards" element={<LeaderboardPage />} />
            <Route path="/threads/:id" element={<ThreadDetailPage />} />
          </Routes>
        </main>
        <footer>
          <BottomNavigation authUser={authUser} signOut={onSignOut} />
        </footer>
      </div>
    </>
  );
}

export default App;
