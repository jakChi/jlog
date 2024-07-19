import { useState, useEffect } from "react";
import "./global.css";
import CreateNew from "./components/CreateNew";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
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
  //const [userList, setUserList] = useState([]);

  // users stuff

  // const getUsers = async () => {
  //   const docRef = collection(db, "users");
  //   const userSnapshot = await getDocs(docRef);
  //   setUserList(userSnapshot.docs.map((doc) => doc.data()));
  //   console.log("userList has called ", userList);
  // };

  // parameters are provided from CreateNew component
  const blogToDb = async (data) => {
    //send data to firestore
    const docRef = doc(db, "blogs", data.docId);

    try {
      await setDoc(
        docRef,
        {
          name: data.name,
          text: data.text,
          createdAt: data.createdAt,
          author: data.author,
          authorUid: data.authorUid,
          likes: data.likes,
          dislikes: data.dislikes,
          comments: data.comments,
          docId: data.docId,
        },
        { merge: true }
      );

      console.log("document added, ID: ", data.DocId);
     
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

    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        
        posts.push(doc.data());
      });
      console.log("Current posts are: ", posts);
      setBlogList(posts);
    });

    return unsubscribe;

  }, []);

  // async function addFieldsToExistingDocuments() {
  //   try {
  //     const querySnapshot = await getDocs(
  //       collection(db, "blogs")
  //     );

  //     querySnapshot.forEach(async (docSnapshot) => {
  //       const docRef = doc(db, "blogs", docSnapshot.id);

  //       // Add new fields with default values
  //       const newFields = {
  //         comments: [{}]
  //       };

  //       // Update the document
  //       await updateDoc(docRef, newFields);
  //       console.log(`Updated document: ${docSnapshot.id}`);
  //     });

  //     console.log("All documents have been updated.");
  //   } catch (error) {
  //     console.error("Error updating documents: ", error);
  //   }
  // }

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
            {/* <button onClick={addFieldsToExistingDocuments}>update all</button> */}
            <CreateNew blogsFunction={blogToDb} user={user} />
            <BlogList blogsData={blogList} user={user} db={db} />
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
