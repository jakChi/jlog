import UpdateProf from "./UpdateProf";
import SignOut from "./SignOut";

/* eslint-disable react/prop-types */
const UserInfo = ({ user, auth, setUser, db }) => {
  return (
    <div className="h-[90%] flex flex-col justify-between">
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
            ID: <span className="text-blue-500">{user.uid}</span>{" "}
          </h5>
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
      <SignOut auth={auth} setUser={setUser} db={db} />
    </div>
  );
};

export default UserInfo;
