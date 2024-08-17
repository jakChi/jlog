/* eslint-disable react/prop-types */
import { updateProfile } from "firebase/auth";
import { useState } from "react";

const UpdateProf = ({ auth }) => {
  const [view, setView] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");

  const changeUserName = () => {
    if (userName != "") {
      updateProfile(auth.currentUser, {
        displayName: userName,
      })
        .then(() => {
          setUserName(""); // input field gets cleared
          setView(false); // if user types photo link then input fields will close
          alert(
            "Username has Changed, Refresh the page to see it"
          );
          console.log("profile updated!");
        })
        .catch((error) => {
          console.log("error occured!", error);
        });
    } else if (userPic != "") {
      updateProfile(auth.currentUser, {
        photoURL: userPic,
      })
        .then(() => {
          setUserPic(""); // input field gets cleared after change
          setView(false); // if user types photo link then input fields will close
          console.log("profile updated!");
          alert(
            "Profile picture has Changed! Refresh the page to see it"
          );
        })
        .catch((error) => {
          console.log("error occured!", error);
        });
    } else {
      alert("Add Username or Profile picture first");
    }
  };

  return (
    <div>
      {view ? (
        <div className="absolute top-full right-0 md:p-10 p-3 py-7 transition-all duration-300 dark:bg-slate-900 bg-slate-300 dark:text-white text-black rounded-3xl">
          <div className="update-profile">
            <label className="block mb-2">
              New Username:
              <input
                type="name"
                value={userName}
                placeholder="drakula-666"
                onChange={(e) => setUserName(e.target.value)}
                className="border border-gray-300 text-black rounded-md py-1 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block mb-2">
              New Profile Picture
              <input
                type="text"
                placeholder="paste new URL"
                onChange={(e) => setUserPic(e.target.value)}
                className="border border-gray-300 text-black rounded-md py-1 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <button
              onClick={changeUserName}
              className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Do it!
            </button>
            <button
              onClick={() => setView(false)}
              className="btn bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg ml-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setView(true)}
          className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
        >
          Change User Info
        </button>
      )}
    </div>
  );
};

export default UpdateProf;
