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
    <div
      id="create-blog"
      className="md:m-10 p-5 md:h-[70vh] md:rounded-3xl md:w-1/3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    >
      <form
        onSubmit={createBlog}
        className="h-[95%] flex flex-col justify-between"
      >
        <div>
          <h1 className="text-center md:text-3xl text-lg font-extrabold ">
            Create Post
          </h1>
          <label className="block mb-2">
            <input
              type="text"
              placeholder="give it title"
              id="name-input"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoComplete="off"
              required
              className="border border-gray-700 rounded-md py-2 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 bg-gray-400 placeholder:text-gray-600"
            />
          </label>
          <label className="block mb-2">
            <textarea
              id="text-box"
              placeholder="what's on your mind??😈"
              onChange={handleChange}
              value={input}
              autoComplete="off"
              className="border border-gray-700 rounded-md py-1 px-3 mt-1 w-full md:h-[45vh] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 bg-gray-400 placeholder:text-gray-600"
            ></textarea>
          </label>
        </div>

        <div id="create-btns">
          <button
            id="create"
            type="submit"
            className="btn bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={createBlog}
          >
            show it to world
          </button>
          <button
            id="delete"
            className="btn bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={cancelPost}
          >
            nah, cancel
          </button>
        </div>
      </form>
      <p className="text-red-700 my-2">{error}</p>
    </div>
  ) : (
    <button
      title="create blog"
      onClick={() => setEditor(true)}
      className="p-1 md:p-2 md:fixed md:top-5 md:left-44 md:z-30 md:rounded-lg bg-green-600 hover:bg-green-700 text-white sm:text-lg text-sm font-medium"
    >
      Create New Post
    </button>
  );
};

export default CreateNew;
