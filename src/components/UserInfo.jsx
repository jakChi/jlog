import UpdateProf from "./UpdateProf";
import Users from "./Users";

/* eslint-disable react/prop-types */
const UserInfo = ({ user, auth, usersList }) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6">პროფილი</h1>
      <div className="user-info flex flex-col items-center justify-center space-y-6">
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
      <Users data={usersList} currentUser={user} />
    </>
  );
};

export default UserInfo;
