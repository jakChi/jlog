/* eslint-disable react/prop-types */
import { useState } from "react";

const CreateNew = ({ active, hideComponent, blogsFunction, user }) => {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const createBlog = () => {
    if (name && input && user) {
      const date = new Date().toLocaleString("ka-GE", {
        dateStyle: "long",
        timeStyle: "short",
        hour12: false,
      });

      //send blog-data to app.jsx
      blogsFunction({
        text: input,
        name: name,
        createdAt: date,
        author: user.displayName,
      });

      setInput("");
      setName("");
      hideComponent();
    } else {
      alert("შეავსე ველები და დაირქვი ფსევდონიმი, თორემ არ შევქმნი!");
    }
  };

  const deletion = () => {
    setInput("");
    setName("");
    hideComponent();
  };

  return active ? (
    <div id="create-blog">
      <label>
        სათაური:
        <input
          type="text"
          id="name-input"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        ტექსტი:
        <textarea
          id="text-box"
          onChange={handleChange}
          value={input}
        ></textarea>
      </label>
      <div id="create-btns">
        <button id="create" className="btn" onClick={createBlog}>
          შეჰქმენ
        </button>
        <button id="delete" className="btn" onClick={deletion}>
          გააუქმე
        </button>
      </div>
    </div>
  ) : null;
};

export default CreateNew;
