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
    <div id="sign-up">
      <fieldset>
        <legend>სარეგისტრაციო განყოფილება</legend>
        <label>
          იმეილი:
          <input
            type="email"
            value={email}
            placeholder="some@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          პასვორდი:
          <input
            type="password"
            value={password}
            placeholder="მინ 6 სიმბოლო"
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
