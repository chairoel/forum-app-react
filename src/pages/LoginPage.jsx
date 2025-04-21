import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { MessagesSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetAuthUser } from "../states/auth/action";

function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state);

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <header className="login-page__hero">
        <h1>
          <MessagesSquare size={window.innerHeight * 0.3} />
        </h1>
      </header>
      <article className="login-page__main">
        <h2>
          <strong>Login</strong>
        </h2>

        <LoginInput login={onLogin} />
        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
