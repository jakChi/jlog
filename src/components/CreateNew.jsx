/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
// import { marked } from "marked";

const CreateNew = ({ blogsFunction, user }) => {
  const [editor, setEditor] = useState(false);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const createBlog = (e) => {
    e.preventDefault();

    if (name && user.displayName) {
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
      setError("Ops! You shoud add title to your post");
    }
  };

  useEffect(() => {
    const errorInterval = setInterval(() => {
      setError(null);
    }, 2000);

    return () => clearInterval(errorInterval);
  }, [error]);

  const cancelPost = () => {
    setInput("");
    setName("");
    setEditor(false);
  };

  return editor ? (
    <div id="create-blog-full" className="w-full m-auto md:mt-20 md:mb-10 p-5">
      <form
        onSubmit={createBlog}
        className="w-full md:w-4/5 md:m-auto p-5 md:p-10 flex flex-col justify-between rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      >
        <div>
          <h1 className="text-center md:text-3xl text-lg font-extrabold mb-5">
            Create Post
          </h1>
          <label className="block mb-2">
            <input
              type="text"
              placeholder="give it a title"
              id="name-input"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoComplete="off"
              autoFocus
              required
              className="rounded-md py-2 px-3 mt-1 md:w-1/2 w-full md:text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 bg-gray-400 placeholder:text-gray-600"
            />
          </label>
          <label className="block mb-2">
            <textarea
              id="text-box"
              onChange={handleChange}
              value={input}
              autoComplete="off"
              className="border border-gray-700 rounded-md py-1 px-3 mt-1 w-full h-[16vh] md:h-[45vh] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 bg-gray-400 placeholder:text-gray-600"
            ></textarea>
          </label>
        </div>

        <div id="create-btns" className="flex">
          <button
            id="create"
            type="submit"
            className="w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={createBlog}
          >
            show it to world
          </button>
          <button
            id="delete"
            className="w-1/2 bg-gray-700 hover:bg-gray-600 text-white font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={cancelPost}
          >
            nah, cancel
          </button>
        </div>
      </form>
      <p className="text-red-700 my-2">{error}</p>
    </div>
  ) : (
    <div className="w-full md:w-2/3 m-auto my-5 md:my-12 flex items-center justify-center">
      <input
        type="text"
        placeholder="what's on your mind"
        className="w-2/3 p-2 md:p-3 rounded-full dark:bg-slate-700 bg-slate-300 border-2 border-green-600 hover:dark:bg-slate-600 hover:bg-slate-200 transition-all"
        onClick={() =>
          user !== "Guest" ? setEditor(true) : alert("you need to Log In first")
        }
      />

      <button
        title="create blog"
        className="md:p-1 p-2 md:px-3 mx-2 border-2 rounded-lg bg-green-600 hover:bg-green-700 text-white sm:text-lg text-sm md:text-lg font-medium"
        onClick={() =>
          user !== "Guest" ? setEditor(true) : alert("you need to Log In first")
        }
      >
        New Post
      </button>
    </div>
  );
};

export default CreateNew;
