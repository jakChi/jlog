import { signOut, getAuth } from "firebase/auth";

const signingOut = () => {
  const auth = getAuth();

  signOut(auth)
    .then(() => {
      console.log(" user signed out!");
    })
    .catch((error) => {
      console.log("signing out error!!!! error: ", error);
    });
};

const SignOut = () => {
  return (
    <button className="btn" onClick={signingOut}>
      გამოსვლა
    </button>
  );
};

export default SignOut;
