/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

const SignOut = ({ auth, setUser, db }) => {
  const [alertWindow, setAlertWindw] = useState(false);

  // Sign-out function that updates Firestore before signing out
  const handleSignOut = async () => {
    const user = auth.currentUser;

    if (user) {
      // Update Firestore before signing out
      await setDoc(
        doc(db, "users", user.uid),
        {
          status: "offline",
          lastSignOut: serverTimestamp(),
        },
        { merge: true }
      );

      // Then sign out the user
      await signOut(auth);
      console.log("user signed out!  from SingOut");
      setUser(null);
    }
  };

  return (
    <>
      <button
        className="bg-red-700 hover:bg-red-600 text-white font-semibold  md:m-auto py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setAlertWindw(!alertWindow)}
      >
        {alertWindow ? "Cancel" : "Sign Out"}
      </button>
      {alertWindow ? (
        <div className="absolute flex flex-col bottom-44 md:bottom-32 right-[0.8rem] md:right-[4.5rem] w-60 h-28 dark:bg-slate-700 bg-slate-400 rounded-xl font-extrabold">
          <p className="text-center mt-3">You really wanna go? </p>
          <button
            onClick={handleSignOut}
            className="w-[80%] m-auto p-2 border hover:border-white border-red-700 active:border-red-700 bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
          >
            get me out of here
          </button>
        </div>
      ) : null}
    </>
  );
};

export default SignOut;
