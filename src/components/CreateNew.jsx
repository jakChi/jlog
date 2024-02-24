/* eslint-disable react/prop-types */
import { useState } from "react";

const CreateNew = ({ active, hideComponent, sendBlog }) => {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const createBlog = () => {
    if (name && input) {
      const date = new Date().toLocaleString("ka-GE", {
        dateStyle: "long",
        timeStyle: "short",
        hour12: false,
      });

      sendBlog({ text: input, name: name, createdAt: date });

      setInput("");
      setName("");
      hideComponent();
    } else {
      alert("you should give content to your blog!");
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
