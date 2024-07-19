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
        alert(errorCode);
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div id="sign-in" className="md:p-10 p-3 m-3 border rounded-lg bg-slate-900">
      <fieldset className="b-white text-black dark:b-black dark:text-white">
        <label className="block mb-2">
          იმეილი:
          <input
            type="email"
            placeholder="შენი იმეილი"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md text-black py-1 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-2">
          პასვორდი:
          <input
            type="password"
            placeholder="შენი პასვორდი"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md text-black py-1 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => signInMethod(email, password)}
        >
          შესვლა
        </button>
      </fieldset>
    </div>
  );
};

export default SignIn;
