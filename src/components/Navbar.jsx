/* eslint-disable react/prop-types */
import UserInfo from "./UserInfo";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { useState } from "react";
import SignUpComponent from "./SignUpComponent";

const Navbar = ({ user, auth, setUser, db }) => {
  const [authWindow, setAuthWindow] = useState(false);
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <nav className="bg-gray-200 dark:bg-gray-800 fixed top-0 left-0 w-screen h-16 sm:h-20 flex justify-between z-30">
      <header className="px-5 py-4">
        <a
          href="https://github.com/jakChi/jlog"
          rel="noreferrer"
          target="_blank"
          className="text-2xl sm:text-5xl font-bold"
        >
          Jlog
        </a>
      </header>
      {user !== "Guest" ? (
        <div className="flex justify-between">
          <SignOut auth={auth} setUser={setUser} />
          <div className="group mx-10">
            <img
              className="w-10 sm:w-16 h-10 sm:h-16 m-3 sm:m-2 rounded-full border-2 border-sky-500 object-cover cursor-pointer"
              src={user.photoURL}
              alt="პროფილის ფოტო"
            />
            <div className="bg-gray-200 dark:bg-gray-800 absolute -right-full p-2  group-hover:right-0 top-0 sm:w-96 w-fit h-screen transition-all duration-300 sm:delay-300">
              <UserInfo user={user} auth={auth} setUser={setUser} />
            </div>
          </div>
        </div>
      ) : (
        <div className="md:w-1/3 flex">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold md:w-1/3 md:m-auto py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => {
              setAuthWindow(!authWindow);
              setRegister(false);
            }}
          >
            {loading ? "logging in..." : !authWindow ? "Log in" : "Cancel"}
          </button>
          {authWindow && !loading ? (
            register ? (
              <SignUpComponent auth={auth} db={db} loadingState={setLoading} />
            ) : (
              <SignIn
                auth={auth}
                signUpLink={setRegister}
                loadingState={setLoading}
              />
            )
          ) : null}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
