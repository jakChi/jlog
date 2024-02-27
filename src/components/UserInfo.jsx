import UpdateProf from "./UpdateProf";

/* eslint-disable react/prop-types */
const UserInfo = ({ user, auth }) => {
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
        <UpdateProf auth={auth}/>
      </div>
    </>
  );
};

export default UserInfo;
