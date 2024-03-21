/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth";

const SignOut = ({ auth, setUser }) => {
  const signingOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("user signed out!  from SingOut");
      })
      .catch((error) => {
        console.log("signing out error!!!! error: ", error);
      });
  };
  return (
    <button
      className="btn bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-500 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      onClick={signingOut}
    >
      <span className="mr-2">გამოსვლა</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 inline-block "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </button>
  );
};

export default SignOut;
