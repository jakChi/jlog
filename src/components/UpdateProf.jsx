/* eslint-disable react/prop-types */
import { updateProfile } from "firebase/auth";
import { useState } from "react";

const UpdateProf = ({ auth }) => {
  const [view, setView] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");

  const changeUserName = () => {
    if (userName != "" || userPic != "") {
      updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: userPic,
      })
        .then(() => {
          console.log("profile updated!");
        })
        .catch((error) => {
          console.log("error occured!", error);
        });
      setUserName("");
      alert(
        "პროფილის დეტალები შეცვლილია, შეგიძლია დაარეფრეშო გვერდი სანახავად!"
      );
    } else {
      alert("მიუთითე ფსევდონიმი და პროფილის ფოტო თორემ არ შევცვლი!")
    }
  };

  return (
    <>
      <button onClick={() => setView(true)}>განახლება</button>
      {view ? (
        <>
          <button onClick={() => setView(false)}>გაუქმება</button>
          <div className="update-profile">
            <label>
              ახალი ფსევდონიმი:
              <input
                type="name"
                value={userName}
                placeholder="ვლად-დრაკულა666"
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <label>
              ახალი ფოტო:
              <input
                type="text"
                placeholder="ჩააკოპირე ფოტოს ლინკი"
                onChange={(e) => setUserPic(e.target.value)}
              />
            </label>
            <button onClick={changeUserName}>შეცვლა</button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdateProf;
