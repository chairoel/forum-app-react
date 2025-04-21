import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { MessagesSquare } from "lucide-react";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../states/users/action";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate("/");
  };

  return (
    <section className="register-page">
      <header className="register-page__hero">
        <h1>
          <MessagesSquare size={window.innerHeight * 0.5} />
        </h1>
      </header>
      <article className="register-page__main">
        <h2>Create your account</h2>
        <RegisterInput register={onRegister} />

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
