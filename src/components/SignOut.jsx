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
    <button className="btn" onClick={signingOut}>
      გამოსვლა
    </button>
  );
};

export default SignOut;
