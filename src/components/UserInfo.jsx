import ThemeSwitch from "./ThemeSwitch";
import UpdateProf from "./UpdateProf";

/* eslint-disable react/prop-types */
const UserInfo = ({ user, auth }) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col items-center justify-around h-2/5 text-xs md:text-base font-semibold relative">
        <div className="rounded-full overflow-hidden border-4 border-blue-500">
          <img
            className="w-24 h-24 object-cover"
            src={user.photoURL}
            alt="profile picture"
          />
        </div>

        <div>
          <h5>
            Username: <span className="text-blue-500">{user.displayName}</span>
          </h5>
          <h5>
            Email: <span className="text-blue-500">{user.email}</span>
          </h5>
          <h5>
            Email{" "}
            <span className="text-blue-500">
              {user.emailVerified ? "is" : "isn't"}
            </span>{" "}
            Verified!
          </h5>
        </div>

        <UpdateProf auth={auth} />
      </div>
      <div className="flex flex-col h-32 justify-between items-center py-3">
        <ThemeSwitch />
        
      </div>
    </div>
  );
};

export default UserInfo;
