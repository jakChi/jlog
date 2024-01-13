import { useState } from "react";

const Blog = ({ text, name, key }) => {
  const [feedBack, setFeedBack] = useState(null);

  return text ? (
    <div id="blog-container">
      <h2 id="blog-name">
        {name} {key}
      </h2>
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
    </div>
  ) : null;
};

export default Blog;
