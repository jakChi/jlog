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
        !docSnap.data().likes.includes(props.currentUser.uid) &&
        !docSnap.data().dislikes.includes(props.currentUser.uid)
      ) {
        if (type == "like") {
          await updateDoc(docRef, { likes: arrayUnion(props.currentUser.uid) });
          console.log("like reaction added");
        } else if (type == "dislike") {
          await updateDoc(docRef, {
            dislikes: arrayUnion(props.currentUser.uid),
          });
          console.log("dislike reaction added");
        }
      } else {
        if (type == "like") {
          await updateDoc(docRef, { likes: arrayRemove(props.currentUser.uid) });
          console.log("like reaction removed");
        } else if (type == "dislike") {
          await updateDoc(docRef, {
            dislikes: arrayRemove(props.currentUser.uid),
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
        user: props.currentUser.displayName,
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
      {!commPanel ? (
        <div
          id="blog-container"
          className="dark:bg-gray-900 bg-slate-300 dark:text-white text-black shadow-xl rounded-lg p-2 py-5 md:m-auto md:p-10 w-full md:w-4/5 h-max container group transition-all duration-400"
        >
          <div className="flex items-center mb-5">
            <h2 id="blog-name" className="text-xl md:text-4xl font-extrabold ">
              {props.name}
            </h2>
          </div>
          {/* agar mushaobs formateri ratomgac */}
          <div className="text-sm md:text-lg mb-4 overflow-scroll text-pretty">
            <div
              dangerouslySetInnerHTML={{ __html: marked.parse(props.text) }}
            />
          </div>
          <div className="flex justify-between items-center my-5">
            <h5 className="text-xs md:text-base text-gray-500">{date}</h5>
            <div className="flex items-center">
              <h5 className=" text-gray-500 text-xs md:text-base">Author:</h5>
              <div className="mx-3 w-8 md:w-12 h-8 md:h-12 rounded-full overflow-hidden border-2 border-indigo-700">
                <img
                  src={props.currentUser.photoURL}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div id="post-activity" className="flex justify-between w-max mt-4">
            <div className="flex mx-2">
              <button
                onClick={() => {
                  reactOnPost("like");
                }}
                className={
                  likes.includes(props.currentUser.uid)
                    ? "text-xl"
                    : "text-slate-600"
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
                  dislikes.includes(props.currentUser.uid)
                    ? "text-xl"
                    : "text-slate-600"
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
      ) : (
        <div className="dark:bg-gray-900 bg-slate-300 dark:text-white text-black shadow-xl rounded-lg p-2 py-5 md:p-10 md:m-auto w-full md:w-4/5 h-max container group transition-all duration-400">
          <div id="post-part">
            <h2
              id="blog-name"
              className="text-xl md:text-3xl font-extrabold mb-4"
            >
              {props.name}
            </h2>
            <div className="text-sm md:text-lg mb-4 overflow-x-scroll line-clamp-1">
              <div
                dangerouslySetInnerHTML={{ __html: marked.parse(props.text) }}
              />
            </div>
          </div>
          <hr />
          <div id="comment-list" className="m-auto my-10 md:w-2/3">
            <ol>
              {comments.length ? (
                comments.map((comment, i) => (
                  <li
                    key={i}
                    className="w-full my-3 p-2 dark:bg-slate-800 bg-slate-100 dark:text-white text-black rounded-2xl text-xs md:text-sm text-pretty break-words border dark:border-slate-300 border-slate-600"
                  >
                    <span
                      className={`${
                        comment.user === props.userName
                          ? "dark:text-green-600 text-green-800"
                          : "text-orange-700"
                      } font-bold`}
                    >
                      {comment.user}:
                    </span>{" "}
                    {comment.content}
                  </li>
                ))
              ) : (
                <p className="w-full my-1 p-2 dark:bg-slate-800 bg-slate-100 dark:text-white text-black rounded-2xl text-xs border dark:border-slate-300 border-slate-600">
                  {"No comments yet :("}
                </p>
              )}
            </ol>
          </div>
          <div id="input-filed" className="flex justify-around">
            <input
              type="text"
              placeholder="Ready to Fight?"
              className="w-4/5 h-10 p-3 mx-1 text-black rounded-2xl text-xs"
              onChange={(e) => setComInput(e.target.value)}
              value={comInput}
            />
            <div>
              <button
                type="submit"
                className="w-10  dark:bg-slate-700 bg-slate-400 hover:bg-slate-500 h-10 mx-1 p-1 rounded-lg active:bg-slate-300"
                onClick={submitComment}
              >
                📣
              </button>
              <button
                type="submit"
                className="w-10 dark:bg-slate-700 bg-slate-400 hover:bg-slate-500 h-10 mx-1 p-1 rounded-lg active:bg-slate-300"
                onClick={() => setCommPanel(false)}
              >
                ❌
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
