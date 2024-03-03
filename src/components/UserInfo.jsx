import UpdateProf from "./UpdateProf";
import Users from "./Users";

/* eslint-disable react/prop-types */
const UserInfo = ({ user, auth, usersList }) => {
  return (
    <>
      <h1>პროფილი</h1>
      <div className="user-info">
        <div>
          <img src={user.photoURL} alt="პროფილის ფოტო"></img>
        </div>
        <h5>
          უნიკალური: <span>{user.uid}</span>
        </h5>
        <h5>
          ფსევდონიმი:{" "}
          <span>
            {user.displayName ? user.displayName : "არაა მითითებული!"}
          </span>
        </h5>
        <h5>
          იმეილი: <span>{user.email}</span>
        </h5>
        <h5>
          იმელი <span>{user.emailVerified ? "" : "არაა"}</span> ვერიფიცირებული!
        </h5>
        <UpdateProf auth={auth} />
      </div>
      <Users data={usersList} currentUser={user}/>
    </>
  );
};

export default UserInfo;
