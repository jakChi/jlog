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
    <>
      <button onClick={() => setView(true)}>დეტალების შეცვლა</button>
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
