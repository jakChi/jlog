/* eslint-disable react/prop-types */
// import firebase from "firebase/compat/app";
// import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const SignUp = ({ auth, addUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addUser({
          uid: user.uid,
          email: user.email,
        });
        console.log("userCredential: ", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div id="sign-up" className="p-4">
      <fieldset>
        <legend className="text-2xl font-semibold mb-4">
          რეგისტრაცია
        </legend>
        <label className="block mb-2">
          იმეილი:
          <input
            type="email"
            value={email}
            placeholder="some@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md text-black py-1 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-2">
          პასვორდი:
          <input
            type="password"
            value={password}
            placeholder="მინ 6 სიმბოლო"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md text-black py-1 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={signUp}
        >
          რეგისტრაცია
        </button>
      </fieldset>
    </div>
  );
};

export default SignUp;
