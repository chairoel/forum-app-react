import React from "react";
import CreateThreadHeader from "../components/CreateThreadHeader";
import CreateThreadInput from "../components/CreateThreadInput";

function CreateThreadPage() {
  const createThread = ({ title, category, description }) => {
    console.log("Diskusi berhasil dibuat:", { title, category, description });
    alert("Diskusi berhasil dibuat!");
  };

  return (
    <>
      <CreateThreadHeader />
      <CreateThreadInput createThread={createThread} />
    </>
  );
}

export default CreateThreadPage;
