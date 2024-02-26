/* eslint-disable react/prop-types */
import { useState } from "react";

const Blog = ({ text, name, createdAt, author }) => {
  const [feedBack, setFeedBack] = useState(null);

  return text ? (
    <div id="blog-container">
      <h2 id="blog-name">{name}</h2>
      <div id="preview-text">{text}</div>
      {!feedBack ? (
        <div id="action-btns">
          <button id="like" className="btn" onClick={() => setFeedBack("✅")}>
            კაია
          </button>
          <button
            id="disklike"
            className="btn"
            onClick={() => setFeedBack("⛔️")}
          >
            გააჯვი
          </button>
        </div>
      ) : null}
      <div id="feedback">{feedBack}</div>
      <h5>{createdAt}</h5>
      <h6>by {author}</h6>
    </div>
  ) : null;
};

export default Blog;
