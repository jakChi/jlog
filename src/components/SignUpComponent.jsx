/* eslint-disable react/prop-types */
// import "firebaseui/dist/firebaseui.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

const SignUpComponent = ({ auth, db }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update the user profile with username and profile picture
      await updateProfile(user, {
        displayName: userName,
        photoURL: profilePicUrl,
      });

      // add user to db
      await setDoc(doc(db, "users", user.uid), {
        userName,
        profilePicUrl,
        email,
        password,
        
      });

      console.log("User signed up and profile updated");
    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error);
      
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp();
  };

  return (
    <div className="text-black flex flex-col md:p-8 p-3 md:max-w-md w-[90%] mx-auto bg-gradient-to-br from-pink-900 to-blue-800 rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold text-center text-violet-500 mb-6 drop-shadow-md">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">
            Email:
            <input
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 block w-full rounded-md border-pink-500 focus:ring focus:ring-pink-300 focus:outline-none"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="blockfont-semibold">
            Password:
            <input
              type="password"
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 block w-full rounded-md border-purple-500 focus:ring focus:ring-purple-300 focus:outline-none"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">
            Username:
            <input
              type="text"
              placeholder="your user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="mt-1 p-2 block w-full rounded-md border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">
            Profile Picture URL:
            <input
              type="text"
              placeholder="paste picture URL address"
              value={profilePicUrl}
              onChange={(e) => setProfilePicUrl(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border-green-500 focus:ring focus:ring-green-300 focus:outline-none"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-400 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}
    </div>
  );
};

export default SignUpComponent;
