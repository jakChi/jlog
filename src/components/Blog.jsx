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
    <div
      id="blog-container"
      className="bg-gray-900 text-white shadow-xl rounded-lg p-6 mb-6"
    >
      <h2 id="blog-name" className="text-3xl font-extrabold mb-4">
        {props.name}
      </h2>
      <div id="preview-text" className="text-lg mb-4">
        <div
          dangerouslySetInnerHTML={{ __html: marked.parse(props.text) }}
        />
      </div>
      <div className="flex justify-between items-center">
        <h5 className="text-sm text-gray-400">{date}</h5>
        <h5 className="text-sm text-gray-400">
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
    </div>
  );
};

export default Blog;
