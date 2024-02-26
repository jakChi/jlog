/* eslint-disable react/prop-types */

const Blog = ({ text, name, createdAt, author }) => {
  //const [feedBack, setFeedBack] = useState(null); რეაქციები ბლოგებზე

  return text ? (
    <div id="blog-container">
      <h2 id="blog-name">{name}</h2>
      <div id="preview-text">{text}</div>
      {/*!feedBack ? (
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
      ) : null
      <div id="feedback">{feedBack}</div> */}
      <h5>{createdAt}</h5>
      <h5>
        ავტორი: <span>{author}</span>
      </h5>
    </div>
  ) : null;
};

export default Blog;
