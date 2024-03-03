/* eslint-disable react/prop-types */
import { marked } from "marked";

const Blog = (props) => {
  //const [feedBack, setFeedBack] = useState(null); რეაქციები ბლოგებზე

  //time from createdAt prop is object from firestore and here we convert it into standard time fromat
  const date = new Date(props.createdAt.seconds * 1000).toLocaleString(
    "ka-GE",
    {
      dateStyle: "long",
      timeStyle: "short",
      hour12: false,
    }
  );

  return (
    <div id="blog-container">
      <h2 id="blog-name">{props.name}</h2>
      <div
        id="preview-text"
        dangerouslySetInnerHTML={{ __html: marked.parse(props.text) }}
      ></div>
      <h5>{date}</h5>
      <h5>
        ავტორი:{" "}
        <span style={props.authorUid == props.uid ? { color: "lime" } : null}>
          {props.author}
        </span>
      </h5>
    </div>
  );
};

export default Blog;
