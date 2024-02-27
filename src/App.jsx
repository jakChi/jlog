import { useState, useEffect } from "react";
import "./App.css";
import CreateNew from "./components/CreateNew";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import BlogList from "./components/BlogList";
import UserInfo from "./components/UserInfo";

const firebaseConfig = {
  apiKey: "AIzaSyAawNCaqR1mwc1UvSwhAJlWYk6AGj9Z1rg",
  authDomain: "jlog-87f4e.firebaseapp.com",
  projectId: "jlog-87f4e",
  storageBucket: "jlog-87f4e.appspot.com",
  messagingSenderId: "970917105404",
  appId: "1:970917105404:web:8a26333558d226e94b1179",
  measurementId: "G-68YN66RM03",
};

const App = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(); //amis inicializeba aq mchirdeba ro sawyisi gverdi gavxsna
  const db = getFirestore(app);

  //app state
  const [showCreate, setShowCreate] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  //get data from blogs firestore db and
  useEffect(() => {
    async function getBlogs(dataBase) {
      const q = query(
        collection(dataBase, "blogs"),
        orderBy("createdAt", "desc")
      );
      const blogSnapshot = await getDocs(q);
      const blogList = blogSnapshot.docs.map((doc) => doc.data());
      setBlogs(blogList);
      console.log("bloglist has called!");
    }
    getBlogs(db);
  }, []);

  const blogToDb = async (data) => {
    //set the state
    setBlogs([...blogs, data]);

    //send data to firestore
    try {
      const doc = await addDoc(collection(db, "blogs"), {
        name: data.name,
        text: data.text,
        createdAt: data.createdAt,
        author: data.author,
      });
      console.log("document added, ID: ", doc.id);
    } catch (e) {
      console.error("couldn't add blog to db: ", e);
    }
  };

  useEffect(() => {
    //app checks on the first render if user is logged in or not
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth.currentUser);
        console.log("auth state listener got called!");
      } else {
        console.log("User is not logged in!");
      }
    });
  }, [user, auth]);

  return (
    <>
      {user ? (
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
              <SignOut auth={auth} setUser={setUser} />
            </div>
          </nav>
          <main>
            <div id="left-pane">
              <CreateNew
                active={showCreate}
                hideComponent={() => setShowCreate(false)}
                blogsFunction={blogToDb}
                user={user}
              />
              <BlogList blogsData={blogs} user={user} />
            </div>
            <div id="right-pane">
              <UserInfo user={user} auth={auth} />
            </div>
          </main>
        </div>
      ) : (
        <>
          <h1>მოგესალმები ბლოგთა სამფლობელოში!</h1>
          <SignIn auth={auth} />
          <SignUp auth={auth} />
        </>
      )}
    </>
  );
};

export default App;
