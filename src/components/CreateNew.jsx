/* eslint-disable react/prop-types */
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { marked } from "marked";

const CreateNew = ({ active, hideComponent, blogsFunction, user }) => {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const createBlog = () => {
    if (name && input && user.displayName) {
      //send blog-data to app.jsx
      blogsFunction({
        text: input,
        name: name,
        createdAt: Timestamp.fromDate(new Date()),
        author: user.displayName,
        authorUid: user.uid,
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
          placeholder="მიუთითე სათაური"
          id="name-input"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoComplete="nogodpleaseno"
        />
      </label>
      <label>
        ტექსტი:
        <textarea
          id="text-box"
          placeholder="გაგვანდე შენი ფიქრები...😈"
          onChange={handleChange}
          value={input}
          autoComplete="off"
        ></textarea>
      </label>
      <h4>შენი ბლოგი გამოჩნდება ასე:</h4>
      <div
        id="blog-preview"
        dangerouslySetInnerHTML={{ __html: marked.parse(input) }}
      ></div>
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
