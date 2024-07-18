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
      className="btn text-white font-semibold bg-red-800 py-2 px-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      onClick={signingOut}
    >
      <span className="mr-2">გამოსვლა</span>
    </button>
  );
};

export default SignOut;
