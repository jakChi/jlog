/* eslint-disable react/prop-types */
// import firebase from "firebase/compat/app";
// import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const SignUp = ({ auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("userCredential: ", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div id="sign-up">
      <fieldset>
        <legend>სარეგისტრაციო განყოფილება</legend>
        <label>
          იმეილი:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          პასვორდი:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="btn" onClick={signUp}>
          რეგისტრაცია
        </button>
      </fieldset>
    </div>
  );
};

export default SignUp;
