import React, { useState } from "react";
import "../styles/discussion.css";

const CreateThreadInput = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, category, description });
    alert("Thread berhasil dibuat!");
    setTitle("");
    setCategory("");
    setDescription("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Masukkan judul Thread"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contoh: Teknologi, Pendidikan, Lifestyle"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <textarea
          placeholder="Tuliskan isi threadmu di sini..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Buat</button>
      </form>
    </div>
  );
};

export default CreateThreadInput;
