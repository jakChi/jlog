import { useState } from "react";
import "./App.css";
import CreateNew from "./components/CreateNew";
import Blog from "./components/Blog";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const App = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [blogs, setBlogs] = useState([{}]);

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
  async function getBlogs(dataBase) {
    const blog = collection(dataBase, "blogs");
    const blogSnapshot = await getDocs(blog);
    const blogList = blogSnapshot.docs.map((doc) => doc.data());
    setBlogs(blogList);
    setDataRetrieved(true);
    console.log("bloglist has called!");
  }

  //send blogs data to firestore
  const blogToDb = async (data) => {
    await addDoc(collection(db, "blogs"), {
      name: data.name,
      text: data.text,
    });

    getBlogs(db);
    console.log("blog added " + data.name);
  };

  return (
    <>
      <div id="app-container">
        <nav>
          <header>Jlog</header>
          <div id="nav-buttons">
            <button
              id="create"
              className="btn"
              onClick={() => setShowCreate(true)}
            >
              ახალი ბლოგი
            </button>
          </div>
        </nav>
        <main>
          {!dataRetrieved ? (
            <button onClick={() => getBlogs(db)}>გაჩითე ბლოგები</button>
          ) : null}
          <CreateNew
            active={showCreate}
            hideComponent={() => setShowCreate(false)}
            sendBlog={blogToDb}
          />
          <div id="blogs">
            {blogs.map((blog, i) => (
              <Blog text={blog.text} name={blog.name} key={i} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
