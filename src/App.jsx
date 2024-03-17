import { useState, useEffect } from "react";
import "./global.css";
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
  const [user, setUser] = useState(true);
  const [blogList, setBlogList] = useState([]);
  const [userList, setUserList] = useState([]);

  const [darkMode, setDarkMode] = useState(localStorage.theme);

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");

      console.log("added dark class");
    } else {
      document.documentElement.classList.remove("dark");
      console.log("removed dark class");
    }
  }, [darkMode]);

  //change theme
  const toggleThemeChange = () => {
    setDarkMode(!darkMode);
    darkMode
      ? localStorage.setItem("theme", "dark")
      : localStorage.setItem("theme", null);
  };

  //get data from blogs firestore db and
  async function getBlogs(dataBase) {
    const q = query(
      collection(dataBase, "blogs"),
      orderBy("createdAt", "desc")
    );
    const blogSnapshot = await getDocs(q);
    setBlogList(blogSnapshot.docs.map((doc) => doc.data()));
    console.log("bloglist has called!", blogList);
  }

  const getUsers = async () => {
    const docRef = collection(db, "users");
    const userSnapshot = await getDocs(docRef);
    setUserList(userSnapshot.docs.map((doc) => doc.data()));
    console.log("userList has called ", userList);
  };

  const blogToDb = async (data) => {
    //send data to firestore
    try {
      const doc = await addDoc(collection(db, "blogs"), {
        name: data.name,
        text: data.text,
        createdAt: data.createdAt,
        author: data.author,
        authorUid: data.authorUid,
      });
      console.log("document added, ID: ", doc.id);
      getBlogs(db);
    } catch (e) {
      console.error("couldn't add blog to db: ", e);
    }
  };

  const usersToDb = async (data) => {
    try {
      const doc = await addDoc(collection(db, "users"), {
        uid: data.uid,
        email: data.email,
      });
      console.log("doc/user added: ", doc.id);
    } catch (e) {
      console.error("couldn't add current user: ", e);
    }
  };

  // when user authentification changes this listenner gets called
  const monitorAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth.currentUser);
        console.log("auth state listener got called!");
      } else {
        setUser(null);
        console.log("User is not logged in!");
      }
    });
  };

  //gets blogs for the first time of app load
  useEffect(() => {
    monitorAuthState();
    getBlogs(db);
    getUsers();
  }, []);

  return (
    <>
      {user ? (
        <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen">
          <nav className="bg-gray-200 dark:bg-gray-800">
            <header className="py-4 px-8">
              <a
                href="https://github.com/jakChi/jlog"
                rel="noreferrer"
                target="_blank"
                className="text-lg font-bold"
              >
                Jlog
              </a>
            </header>
            <div className="flex justify-between items-center px-8 py-2">
              <button
                onClick={() => setShowCreate(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                ახალი ბლოგი
              </button>
              <SignOut auth={auth} setUser={setUser} />
              <button
                onClick={toggleThemeChange}
                aria-label="toggle dark mode"
                className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                {darkMode ? "light" : "dark"}
              </button>
            </div>
          </nav>
          <main className="flex">
            <div className="flex-1 p-4">
              <CreateNew
                active={showCreate}
                hideComponent={() => setShowCreate(false)}
                blogsFunction={blogToDb}
                user={user}
              />
              <BlogList blogsData={blogList} user={user} />
            </div>
            <div className="w-1/4 p-4">
              <UserInfo user={user} auth={auth} usersList={userList} />
            </div>
          </main>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-4">
            მოგესალმები ბლოგთა სამფლობელოში!
          </h1>
          <SignIn auth={auth} />
          <SignUp auth={auth} addUser={usersToDb} />
        </div>
      )}
    </>
  );
};

export default App;
