/* eslint-disable react/prop-types */
import { marked } from "marked";
import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  getDoc,
  arrayRemove,
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

  useEffect(() => {
    const unsub = onSnapshot(doc(props.db, "blogs", props.docId), (doc) => {
      setLikes(doc.data().likes);
      setDislikes(doc.data().dislikes);
    });

    return unsub;
  }, []);

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
      <div className="flex justify-between w-24 mt-4">
        <div className="flex">
          <button
            onClick={() => {
              reactOnPost("like");
            }}
            className={
              likes.includes(props.uid) ? "text-xl border p-1" : null
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
              dislikes.includes(props.uid) ? "text-xl border p-1" : null
            }
          >
            ⬇️ {dislikes.length}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
