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
import BlogList from "./components/BlogList";
import Navbar from "./components/Navbar";

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
  const [user, setUser] = useState(true);
  const [blogList, setBlogList] = useState([]);
  const [userList, setUserList] = useState([]);

  //get data from blogs firestore db and
  async function getBlogs(dataBase) {
    try {
      const q = query(
        collection(dataBase, "blogs"),
        orderBy("createdAt", "desc")
      );
      const blogSnapshot = await getDocs(q);
      setBlogList(blogSnapshot.docs.map((doc) => doc.data()));
      console.log("bloglist has called!", blogList);
    } catch (e) {
      console.log("something bad happened!");
      console.error(e);
    }
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
        reactions: data.reactions
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
        getBlogs(db);
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
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen w-full transition-all">
      {user ? (
        <div>
          <Navbar
            userPic={user.photoURL}
            user={user}
            setUser={setUser}
            auth={auth}
          />
          <main className="w-full mt-16 sm:mt-20">
            <CreateNew blogsFunction={blogToDb} user={user} />
            <BlogList blogsData={blogList} user={user} />
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
    </div>
  );
};

export default App;
