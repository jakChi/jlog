/* eslint-disable react/prop-types */
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const SignIn = ({ auth, signUpLink, loadingState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signInMethod = async () => {
    setLoading(true);
    setError(null);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        loadingState(false);
        console.log("user signed in: ", user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInMethod();
    loadingState(true);
  };

  return (
    <div
      id="sign-in"
      className="md:absolute md:top-24 md:right-16 md:p-8 p-3 md:w-1/4 dark:bg-slate-700 bg-slate-200 text-black rounded-xl shadow-2xl"
    >
      <h2 className="text-4xl font-bold text-center text-blue-400 mb-6 drop-shadow-md">
        Sign In
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 font-bold text-black">
            Your Email:
            <input
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md text-black py-1 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="block text-black font-bold">
            Password:
            <input
              type="password"
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md text-black py-1 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="flex items-center my-5">
          <button
            className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSubmit}
            type="submit"
          >
            {loading ? "Entering..." : "Enter"}
          </button>
          <p className="mx-5 text-center text-white">
            {"Don't have an account?  "}
            <button
              onClick={() => signUpLink(true)}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>

      {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}
    </div>
  );
};

export default SignIn;
