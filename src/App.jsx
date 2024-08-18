import { useState, useEffect } from "react";
import "./global.css";
import CreateNew from "./components/CreateNew";

// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  limit,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { getPerformance } from "firebase/performance";

import BlogList from "./components/BlogList";
import Navbar from "./components/Navbar";
import Users from "./components/Users";

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

  // Initialize Performance Monitoring and get a reference to the service
  const perf = getPerformance(app);

  //app state
  const [user, setUser] = useState(true);
  const [blogList, setBlogList] = useState([]);
  const [userList, setUserList] = useState([]);

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

  // when user authentification changes this listenner gets called
  const monitorAuthState = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(auth.currentUser);
        console.log("auth state listener got called!");

        //user is signed in update users collection
        await setDoc(
          doc(db, "users", user.uid),
          {
            lastSignIn: serverTimestamp(),
            status: "online",
          },
          { merge: true }
        );
      } else {
        setUser(null);
        console.log("User is not logged in!");
      }
    });
  };

  //gets blogs for the first time of app load
  useEffect(() => {
    monitorAuthState();

    const postsQ = query(
      collection(db, "blogs"),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const usersQ = query(
      collection(db, "users"),
      orderBy("lastSignIn", "desc")
    );

    const postsObserver = onSnapshot(postsQ, (postSnapshot) => {
      setBlogList(postSnapshot.docs.map((doc) => doc.data()));
    });

    const usersObserver = onSnapshot(usersQ, (userSnapshot) => {
      setUserList(userSnapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      postsObserver();
      usersObserver();
    };
  }, [user]);

  //this function can change all the documents at the same time
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
    <div className="bg-gray-100 text-black dark:bg-black dark:text-white min-h-screen w-full transition-all duration-300">
      <div>
        <Navbar
          user={user ? user : "Guest"}
          setUser={setUser}
          auth={auth}
          db={db}
        />
        <main className="w-full md:w-[90%] md:mt-20 md:m-auto mt-16 flex flex-col md:flex-row ">
          {/* <button onClick={addFieldsToExistingDocuments}>update all</button> */}
          {user ? <Users data={userList} currentUser={user} /> : null}
          <div className="w-full md:w-4/5">
            <CreateNew blogsFunction={blogToDb} user={user ? user : "Guest"} />
            <BlogList
              blogsData={blogList}
              user={user ? user : "Guest"}
              usersData={userList}
              db={db}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
