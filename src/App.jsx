import { useState, useEffect } from "react";
import "./App.css";
import CreateNew from "./components/CreateNew";
import Blog from "./components/Blog";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";

const App = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [blogs, setBlogs] = useState([{}]);
  const [signedIn, setSignedIn] = useState(true);

  const firebaseConfig = {
    apiKey: "AIzaSyAawNCaqR1mwc1UvSwhAJlWYk6AGj9Z1rg",
    authDomain: "jlog-87f4e.firebaseapp.com",
    projectId: "jlog-87f4e",
    storageBucket: "jlog-87f4e.appspot.com",
    messagingSenderId: "970917105404",
    appId: "1:970917105404:web:8a26333558d226e94b1179",
    measurementId: "G-68YN66RM03",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  //get data from blogs firestore db and
  useEffect(() => {
    async function getBlogs(dataBase) {
      const blogsRef = collection(dataBase, "blogs");
      const blogSnapshot = await getDocs(blogsRef);
      console.log(blogSnapshot);
      const blogList = blogSnapshot.docs.map((doc) => doc.data());

      setBlogs(blogList);
      console.log("bloglist has called!");
    }
    getBlogs(db);
  }, []);

  //send blogs data to firestore
  const blogToDb = async (data) => {
    setBlogs([...blogs, data]);

    try {
      const doc = await addDoc(collection(db, "blogs"), {
        name: data.name,
        text: data.text,
        createdAt: data.createdAt,
      });
      console.log("document added, ID: ", doc.id);
    } catch (e) {
      console.error("couldn't add blog to db: ", e);
    }
  };

  return (
    <>
      {signedIn ? (
        <div id="app-container">
          <nav>
            <header>Jlog</header>
            <div id="nav-buttons">
              <button
                id="create-btn"
                className="btn"
                onClick={() => setShowCreate(true)}
              >
                ახალი ბლოგი
              </button>
              <SignOut />
            </div>
          </nav>
          <main>
            <CreateNew
              active={showCreate}
              hideComponent={() => setShowCreate(false)}
              sendBlog={blogToDb}
            />
            <div id="blogs">
              {blogs ? (
                blogs.map((blog, i) => (
                  <Blog
                    text={blog.text}
                    name={blog.name}
                    createdAt={blog.createdAt}
                    key={i}
                  />
                ))
              ) : (
                <p>there are no blogs yet!</p>
              )}
            </div>
          </main>
        </div>
      ) : (
        <SignIn userIn={() => setSignedIn(true)} />
      )}
    </>
  );
};

export default App;
