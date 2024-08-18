/* eslint-disable react/prop-types */
import UserInfo from "./UserInfo";
import SignIn from "./SignIn";
import { useState } from "react";
import SignUpComponent from "./SignUpComponent";
import ThemeSwitch from "./ThemeSwitch";
import { BellIcon } from "@heroicons/react/24/solid";

const Navbar = ({ user, auth, setUser, db }) => {
  const [authWindow, setAuthWindow] = useState(false);
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ping, setPing] = useState(true);

  return (
    <nav className="transition-all duration-500 bg-gray-200 dark:bg-gray-800 border border-transparent dark:border-b-yellow-500 border-b-purple-700 fixed top-0 left-0 w-screen h-16 md:h-20 flex justify-between z-30">
      <div className="flex items-center w-1/2 md:w-1/3">
        <header className="mx-5">
          <a
            href="https://github.com/jakChi/jlog"
            rel="noreferrer"
            target="_blank"
            className="text-3xl md:text-5xl font-bold underline dark:text-gray-300 text-gray-700"
          >
            Jlog
          </a>
          <span className="text-sm font-mono font-bold dark:text-gray-300 text-gray-700">
            (3.0.1)
          </span>
        </header>
      </div>

      <div className="w-1/2 md:w-[15%] md:mx-5 flex justify-around">
        {/* am zars mere ping animacia unda gavuketo */}
        <div className="flex items-center relative">
          <div
            className="w-7 h-7 text-red-600 cursor-pointer"
            onClick={() => setPing(false)}
          >
            <div className="absolute top-4 md:top-6 left-0">
              <span className="relative flex h-3 w-3">
                {ping ? (
                  <>
                    <span
                      className={`animate-ping absolute top inline-flex h-full w-full rounded-full bg-sky-400 opacity-75`}
                    ></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  </>
                ) : null}
              </span>
            </div>
            <BellIcon />
          </div>
          <div className="flex items-center">
            <ThemeSwitch />
          </div>
        </div>
        {user !== "Guest" ? (
          <div className="group flex items-center w-max">
            <div className="w-12 md:w-16 h-12 md:h-16 rounded-full overflow-hidden border-2 border-sky-500">
              <img
                className="w-full h-full object-cover cursor-pointer"
                src={user.photoURL}
                alt="profile"
              />
            </div>
            <div className="bg-gray-200 dark:bg-gray-800 absolute -right-full p-4 group-hover:right-0 top-0 sm:w-96 w-[70%] h-screen transition-all duration-300 sm:delay-300">
              <UserInfo user={user} auth={auth} setUser={setUser} db={db} />
            </div>
          </div>
        ) : (
          <div className="w-full flex">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-max h-max md:w-full m-auto p-1 md:py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                setAuthWindow(!authWindow);
                setRegister(false);
              }}
            >
              {loading ? "logging in..." : !authWindow ? "Log in" : "Cancel"}
            </button>
            {authWindow ? (
              register ? (
                <SignUpComponent
                  auth={auth}
                  db={db}
                  loadingState={setLoading}
                />
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
      </div>
    </nav>
  );
};

export default Navbar;
