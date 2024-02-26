import UpdateProf from "./UpdateProf";

/* eslint-disable react/prop-types */
const UserInfo = ({ user, auth }) => {
  return (
    <>
      <h2>პროფილი</h2>
      <div className="user-info">
        <h5>
          უნიკალური: <span>{user.userId}</span>
        </h5>
        <h5>
          ფსევდონიმი:{" "}
          <span>{user.userName ? user.userName : "არაა მითითებული!"}</span>
        </h5>
        <h5>
          იმეილი: <span>{user.userEmail}</span>
        </h5>
        <h5>
          იმელი <span>{user.emailVerif ? "" : "არაა"}</span> ვერიფიცირებული!
        </h5>
        <div>
          <img src={user.userPic} alt="პროფილის ფოტო"></img>
        </div>
        <UpdateProf auth={auth} />
      </div>
    </>
  );
};

export default UserInfo;
