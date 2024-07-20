/* eslint-disable react/prop-types */
import { marked } from "marked";
import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  getDoc,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const Blog = (props) => {
  //time from createdAt prop is object from firestore and here we convert it into standard time fromat
  const date = new Date(props.createdAt.seconds * 1000).toLocaleString(
    "ka-GE",
    {
      dateStyle: "long",
      timeStyle: "short",
      hour12: false,
    }
  );

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [comments, setComments] = useState([{}]);
  const [commPanel, setCommPanel] = useState(false);

  // updating data realtime from server
  useEffect(() => {
    const unsub = onSnapshot(doc(props.db, "blogs", props.docId), (doc) => {
      setLikes(doc.data().likes);
      setDislikes(doc.data().dislikes);
      setComments(doc.data().comments);
    });

    return unsub;
  }, []);

  //reactions
  async function reactOnPost(type) {
    const docRef = doc(props.db, "blogs", props.docId);
    const docSnap = await getDoc(docRef);

    try {
      if (
        !docSnap.data().likes.includes(props.uid) &&
        !docSnap.data().dislikes.includes(props.uid)
      ) {
        if (type == "like") {
          await updateDoc(docRef, { likes: arrayUnion(props.uid) });
          console.log("like reaction added");
        } else if (type == "dislike") {
          await updateDoc(docRef, {
            dislikes: arrayUnion(props.uid),
          });
          console.log("dislike reaction added");
        }
      } else {
        if (type == "like") {
          await updateDoc(docRef, { likes: arrayRemove(props.uid) });
          console.log("like reaction removed");
        } else if (type == "dislike") {
          await updateDoc(docRef, {
            dislikes: arrayRemove(props.uid),
          });
          console.log("dislike reaction removed");
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  //comments
  const [comInput, setComInput] = useState("");

  async function submitComment() {
    try {
      const newComment = {
        user: props.userName,
        content: comInput,
        createdAt: Timestamp.fromDate(new Date()),
      };
      const docRef = doc(props.db, "blogs", props.docId);

      await updateDoc(docRef, { comments: arrayUnion(newComment) });

      setComInput(""); // when and if only comment is added to the db input field is cleared.
      console.log("comment added succesfully!");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col md:flex-row my-5 relative">
      <div
        id="blog-container"
        className="bg-gray-900 text-white shadow-xl md:rounded-lg rounded-t-lg p-2 py-5 md:p-10 w-full md:w-3/5 h-max container group transition-all duration-400"
      >
        <h2 id="blog-name" className="text-xl md:text-3xl font-extrabold mb-4">
          {props.name}
        </h2>
        <div className="text-sm md:text-lg mb-4 line-clamp-2 group-hover:line-clamp-none">
          <div dangerouslySetInnerHTML={{ __html: marked.parse(props.text) }} />
        </div>
        <div className="flex justify-between items-end">
          <h5 className="text-xs text-gray-400">{date}</h5>
          <h5 className="text-xs text-gray-400">
            ავტორი:{" "}
            <span
              className={
                props.authorUid === props.uid
                  ? "text-green-400"
                  : "text-gray-400"
              }
            >
              {props.author}
            </span>
          </h5>
        </div>
        <div id="post-activity" className="flex justify-between w-max mt-4">
          <div className="flex mx-2">
            <button
              onClick={() => {
                reactOnPost("like");
              }}
              className={
                likes.includes(props.uid) ? "text-xl" : "text-slate-600"
              }
            >
              ⬆️ {likes.length}
            </button>
          </div>
          <div className="flex">
            <button
              onClick={() => {
                reactOnPost("dislike");
              }}
              className={
                dislikes.includes(props.uid) ? "text-xl" : "text-slate-600"
              }
            >
              ⬇️ {dislikes.length}
            </button>
          </div>
          <button className="m-4" onClick={() => setCommPanel(true)}>
            💬 {comments.length}
          </button>
        </div>
      </div>
      <div id="comments-panel" className=" md:w-1/3 md:mx-10">
        <button
          onClick={() => setCommPanel(true)}
          className="text-xl md:text-3xl absolute bottom-6 right-6 md:relative md:m-5"
        >
          {commPanel ? null : "💬"}
        </button>
        <div
          className={`${
            commPanel ? "flex" : "hidden"
          }  w-full md:p-5 p-2 h-max md:min-h-40 min-h-2 bg-gray-900 rounded-b-lg md:rounded-lg flex-col justify-around`}
        >
          <div id="input-filed" className="flex">
            <input
              type="text"
              placeholder="დატოვებ კომენტარს? "
              className="w-4/5 h-10 p-3 mx-1 text-black rounded-2xl"
              onChange={(e) => setComInput(e.target.value)}
              value={comInput}
            />
            <button
              type="submit"
              className="w-10 bg-slate-700 h-10 mx-1 p-1 rounded-lg active:bg-slate-600"
              onClick={submitComment}
            >
              📣
            </button>
            <button
              type="submit"
              className="w-10 bg-slate-700 h-10 mx-1 p-1 rounded-lg active:bg-slate-600"
              onClick={() => setCommPanel(false)}
            >
              ❌
            </button>
          </div>
          <div id="comment-list">
            <ol>
              {comments.length ? (
                comments.map((comment, i) => (
                  <li
                    key={i}
                    className="my-3 p-2 bg-slate-800 rounded-2xl text-sm"
                  >
                    <span className="text-green-400">{comment.user}:</span>{" "}
                    {comment.content}
                  </li>
                ))
              ) : (
                <p className="text-xs m-3">ჯერ არაა კომენტარები...</p>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
