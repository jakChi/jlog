/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth";
import { useState } from "react";

const SignOut = ({ auth, setUser }) => {
  const [loading, setLoading] = useState(false);

  const signingOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        setLoading(false);
        console.log("user signed out!  from SingOut");
      })
      .catch((error) => {
        console.log("signing out error!!!! error: ", error);
      });
  };
  return (
    <button
      className="bg-red-700 hover:bg-red-600 text-white font-semibold  md:m-auto py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={signingOut}
    >
      {loading ? "Signing Out" : "Sign Out"}
    </button>
  );
};

export default SignOut;
