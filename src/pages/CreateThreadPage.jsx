import React from "react";
import CreateThreadHeader from "../components/CreateThreadHeader";
import CreateThreadInput from "../components/CreateThreadInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncAddThread } from "../states/threads/action";

function CreateThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCreateThread = async ({ title, body, category }) => {
    const success = await dispatch(asyncAddThread({ title, body, category }));

    if (success) {
      navigate("/");
    }
  };

  return (
    <>
      <CreateThreadHeader />
      <CreateThreadInput createThread={onCreateThread} />
    </>
  );
}

export default CreateThreadPage;
