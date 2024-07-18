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
            "ფსევდონიმი შეცვლილია, შეგიძლია დაარეფრეშო გვერდი ცვლილების სანახავად!"
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
            "პროფილის ფოტო შეცვლილია, შეგიძლია დაარეფრეშო გვერდი ცვლილების სანახავად!"
          );
        })
        .catch((error) => {
          console.log("error occured!", error);
        });
    } else {
      alert("მიუთითე ფსევდონიმი და პროფილის ფოტო თორემ არ შევცვლი!");
    }
  };

  return (
    <div className="transition-all duration-300">
      <button
        onClick={() => setView(true)}
        className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
      >
        დეტალების შეცვლა
      </button>
      {view && (
        <div className="absolute top-full right-0 transition-all duration-1000">
          <button
            onClick={() => setView(false)}
            className="btn bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg ml-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            გაუქმება
          </button>
          <div className="update-profile">
            <label className="block mb-2">
              ახალი ფსევდონიმი:
              <input
                type="name"
                value={userName}
                placeholder="ვლად-დრაკულა666"
                onChange={(e) => setUserName(e.target.value)}
                className="border border-gray-300 rounded-md py-1 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block mb-2">
              ახალი ფოტო:
              <input
                type="text"
                placeholder="ჩააკოპირე ფოტოს ლინკი"
                onChange={(e) => setUserPic(e.target.value)}
                className="border border-gray-300 rounded-md py-1 px-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <button
              onClick={changeUserName}
              className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              შეცვლა
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProf;
