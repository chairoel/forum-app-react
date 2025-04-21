import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { asyncPreloadProcess } from "./states/preload/action";
import BottomNavigation from "./components/BottomNavigation";
import HeaderApp from "./components/HeaderApp";
import { asyncUnsetAuthUser } from "./states/auth/action";

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Loading />
      <HeaderApp authUser={authUser} />
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/*" element={<></>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
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
