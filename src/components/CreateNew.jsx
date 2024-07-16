/* eslint-disable react/prop-types */
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { marked } from "marked";

const CreateNew = ({ blogsFunction, user }) => {
  const [editor, setEditor] = useState(false);
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
        reactions: [
          { user: "user1", reaction: "like" },
          { user: "user2", reaction: "dislike" },
        ],
      });

      setInput("");
      setName("");
      setEditor(false);
    } else {
      alert("შეავსე ველები და დაირქვი ფსევდონიმი, თორემ არ შევქმნი!");
    }
  };

  const deletion = () => {
    setInput("");
    setName("");
    setEditor(false);
  };

  return editor ? (
    <div
      id="create-blog"
      className="p-4 mx-auto w-1/2 bg-gray-900 text-white rounded-b-xl"
    >
      <label className="block mb-2">
        სათაური:
        <input
          type="text"
          placeholder="მიუთითე სათაური"
          id="name-input"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoComplete="off"
          className="border border-gray-700 rounded-md py-1 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
        />
      </label>
      <label className="block mb-2">
        ტექსტი:
        <textarea
          id="text-box"
          placeholder="გაგვანდე შენი ფიქრები...😈"
          onChange={handleChange}
          value={input}
          autoComplete="off"
          className="border border-gray-700 rounded-md py-1 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
        ></textarea>
      </label>
      <h4 className="text-lg font-semibold mb-2">შენი ბლოგი გამოჩნდება ასე:</h4>
      <div
        id="blog-preview"
        dangerouslySetInnerHTML={{ __html: marked.parse(input) }}
        className="border border-gray-700 rounded-md p-2 mb-4 bg-gray-800"
      />
      <div id="create-btns">
        <button
          id="create"
          className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={createBlog}
        >
          შეჰქმენ
        </button>
        <button
          id="delete"
          className="btn bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={deletion}
        >
          გააუქმე
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full p-3 mx-auto sm:p-4 sm:w-32 sm:right-14">
      <button
        title="create blog"
        onClick={() => setEditor(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white text-3xl font-extrabold block p-3 py-1 mx-auto rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        +
      </button>
    </div>
  );
};

export default CreateNew;
