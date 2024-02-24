/* eslint-disable react/prop-types */
// import firebase from "firebase/compat/app";
// import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";

const SignIn = ({ userIn }) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  let user = null;

  //specify localized auth method
  auth.languageCode = "ge";

  //Specify additional custom OAuth provider parameters that you want to send with the OAuth request
  // provider.setCustomParameters({
  //   login_hint: "user@example.com",
  // });

  // google sign in popup
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // console.log("token: ", token);

        // The signed-in user info.
        user = result.user;
        console.log("user: ", user);

        //send if user is signed in or not to the app.jsx
        userIn();

        // IdP data available using getAdditionalUserInfo(result)
      })
      .catch((error) => {
        // Handle Errors here. For a list of error codes have a look at https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPopup.
        const errorCode = error.code;
        console.log("errorCode: ", errorCode);

        const errorMessage = error.message;
        console.log("errorMessage: ", errorMessage);

        // The email of the user's account used.
        const email = error.customData.email;
        console.log("email: ", email);

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("credential: ", credential);
      });
  };

  return (
    <>
      <h1>მოგესალმები ბლოგთა სამფლობელოში!</h1>
      <button className="btn" onClick={signInWithGoogle}>ავტორიზაცია</button>
    </>
  );
};

export default SignIn;
