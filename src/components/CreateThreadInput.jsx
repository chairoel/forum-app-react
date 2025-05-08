import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function CreateThreadInput({ createThread }) {
  const [title, onTitleChange] = useInput("");
  const [category, onCategoryChange] = useInput("");
  const [description, onDescriptionChange] = useInput("");

  return (
    <form className="create-thread-input">
      <input
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="Judul Diskusi"
      />
      <input
        type="text"
        value={category}
        onChange={onCategoryChange}
        placeholder="Kategori"
      />
      <textarea
        value={description}
        onChange={onDescriptionChange}
        placeholder="Isi Diskusi"
      />
      <button
        type="button"
        onClick={() => createThread({ title, category, description })}
      >
        Buat Diskusi
      </button>
    </form>
  );
}

CreateThreadInput.propTypes = {
  createThread: PropTypes.func.isRequired,
};

export default CreateThreadInput;
