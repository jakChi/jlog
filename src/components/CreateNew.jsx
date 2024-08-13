/* eslint-disable react/prop-types */
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
// import { marked } from "marked";

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
        likes: [],
        dislikes: [],
        comments: [],
        docId: `${user.displayName}_${Timestamp.fromDate(new Date())}`,
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
      className="p-5 md:h-max md:w-1/2 md:fixed md:z-30 md:top-40 md:left-1/4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    >
      <label className="block mb-2">
        <input
          type="text"
          placeholder="მიუთითე სათაური"
          id="name-input"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoComplete="off"
          className="border border-gray-700 rounded-md py-2 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 bg-gray-400 placeholder:text-gray-600"
        />
      </label>
      <label className="block mb-2">
        <textarea
          id="text-box"
          placeholder="გაგვანდე შენი ფიქრები...😈"
          onChange={handleChange}
          value={input}
          autoComplete="off"
          className="border border-gray-700 rounded-md py-1 px-3 mt-1 w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 bg-gray-400 placeholder:text-gray-600"
        ></textarea>
      </label>
      {/* <h4 className="text-lg font-semibold mb-2">შენი ბლოგი გამოჩნდება ასე:</h4>
      <div
        id="blog-preview"
        dangerouslySetInnerHTML={{ __html: marked.parse(input) }}
        className="border border-gray-700 rounded-md p-2 mb-4 bg-gray-800"
      /> */}
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
    <div className="relative sm:fixed top-5 sm:z-30 mx-auto w-fit  sm:left-44">
      <button
        title="create blog"
        onClick={() => setEditor(true)}
        className="bg-green-600 hover:bg-green-500 text-white sm:text-lg text-sm font-medium block p-5 py-2 w-full rounded-lg focus:outline-none transition-colors duration-300"
      >
        დაწერე რამე
      </button>
    </div>
  );
};

export default CreateNew;
