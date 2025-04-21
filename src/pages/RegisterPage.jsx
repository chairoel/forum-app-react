import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { MessagesSquare } from "lucide-react";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../states/users/action";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    const success = await dispatch(
      asyncRegisterUser({ name, email, password })
    );

    if (success) {
      navigate("/login");
    }
  };

  return (
    <section className="register-page">
      <header className="register-page__hero">
        <h1>
          <MessagesSquare size={window.innerHeight * 0.3} />
        </h1>
      </header>
      <article className="register-page__main">
        <h2>Create your account</h2>
        <RegisterInput register={onRegister} />

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
