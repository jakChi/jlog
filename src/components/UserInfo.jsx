/* eslint-disable react/prop-types */
const UserInfo = ({ user }) => {
  return (
    <div>
      <h5>user id: {user.userId}</h5>
      <h5>email: {user.userEmail}</h5>
      <h5>email verified: {user.emailVerif ? "true" : "false"}</h5>
    </div>
  );
};

export default UserInfo;
