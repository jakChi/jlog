import SignOut from "./SignOut";
import ThemeSwitch from "./ThemeSwitch";
import UpdateProf from "./UpdateProf";

/* eslint-disable react/prop-types */
const UserInfo = ({ user, auth, setUser }) => {
  return (
    <div className="h-full flex flex-col justify-between ">
      <div className="flex flex-col items-center justify-around h-1/2 text-center relative">
        <div className="rounded-full overflow-hidden border-4 border-blue-500">
          <img
            className="w-24 h-24 object-cover"
            src={user.photoURL}
            alt="პროფილის ფოტო"
          />
        </div>
        <h5 className="text-xs font-semibold">
          უნიკალური: <span className="text-blue-500">{user.uid}</span>
        </h5>
        <h5 className="text-xs font-semibold">
          ფსევდონიმი:{" "}
          <span className="text-blue-500">
            {user.displayName ? user.displayName : "არაა მითითებული!"}
          </span>
        </h5>
        <h5 className="text-xs font-semibold">
          იმეილი: <span className="text-blue-500">{user.email}</span>
        </h5>
        <h5 className="text-xs font-semibold">
          იმელი{" "}
          <span className="text-blue-500">
            {user.emailVerified ? "" : "არაა"}
          </span>{" "}
          ვერიფიცირებული!
        </h5>
        <UpdateProf auth={auth} />
      </div>
      <div className="flex flex-col h-32 justify-between items-center py-3">
        <ThemeSwitch />
        <SignOut auth={auth} setUser={setUser} />
      </div>
    </div>
  );
};

export default UserInfo;
