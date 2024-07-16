/* eslint-disable react/prop-types */
import { marked } from "marked";
import { useState } from "react";

const Blog = (props) => {
  const [likes, setLikes] = useState(null);
  const [dislikes, setDislikes] = useState(null);
  const [reacted, setReacted] = useState(false);

  //time from createdAt prop is object from firestore and here we convert it into standard time fromat
  const date = new Date(props.createdAt.seconds * 1000).toLocaleString(
    "ka-GE",
    {
      dateStyle: "long",
      timeStyle: "short",
      hour12: false,
    }
  );

  /// აქ უნდა დავუმატო დატას აფდეით ფუნქცია ფაიერსთორიდან  
  function reactOnPost(type) {
    type && !reacted ? setLikes(likes + 1) : setDislikes(likes + 1);
  }

  return (
    <div
      id="blog-container"
      className="bg-gray-900 text-white shadow-xl rounded-lg p-10 mb-5 mx-auto w-3/4 container group transition-all duration-400"
    >
      <h2 id="blog-name" className="text-2xl font-extrabold mb-4">
        {props.name}
      </h2>
      <div className="text-lg mb-4 line-clamp-2 group-hover:line-clamp-none">
        <div dangerouslySetInnerHTML={{ __html: marked.parse(props.text) }} />
      </div>
      <div className="flex justify-between items-end">
        <h5 className="text-xs text-gray-400">{date}</h5>
        <h5 className="text-xs text-gray-400">
          ავტორი:{" "}
          <span
            className={
              props.authorUid === props.uid ? "text-green-400" : "text-gray-400"
            }
          >
            {props.author}
          </span>
        </h5>
      </div>
      <div className="flex justify-between w-16 mt-4">
        <div>
          <button
            onClick={() => {
              reactOnPost(true);
              setReacted(!reacted);
            }}
            className={`${reacted ? "text-2xl" : "text-l"}`}
          >
            ⬆️
          </button>
          <p>{likes}</p>
        </div>
        <div>
          <button
            onClick={() => { reactOnPost(false);  setReacted(!reacted)}}
            className={`${reacted ? "text-2xl" : "text-l"}`}
          >
            ⬇️
          </button>
          <p>{dislikes}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
