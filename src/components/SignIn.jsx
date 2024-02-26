/* eslint-disable react/prop-types */
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const SignIn = ({ auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInMethod = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user signed in: ", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div id="sign-in">
      <fieldset>
        <legend>ავტორიზაციის განყოფილება</legend>
        <label>
          იმეილი:
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          პასვორდი:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="btn" onClick={() => signInMethod(email, password)}>
          შესვლა
        </button>
      </fieldset>
    </div>
  );
};

export default SignIn;
