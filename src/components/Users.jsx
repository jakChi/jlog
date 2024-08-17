/* eslint-disable react/prop-types */
const Users = ({ data, currentUser }) => {
  return (
    <div id="user-list" className="hidden md:block md:my-12 md:w-1/5 h-max">
      <h2 className="text-xl text-center font-semibold mb-10">Users:</h2>
      <ol>
        {data.length > 0 ? (
          data.map((user, i) => (
            <li
              key={i}
              className={`mb-4 p-3 flex items-center text-lg dark:bg-slate-950 bg-slate-400 rounded-full border ${
                user.status === "online" ? "border-green-500" : "border-red-600"
              } ${user.userName == "admin02" ? "border-purple-600" : null}`}
            >
              <div
                className={`w-16 h-16 mr-3 rounded-full overflow-hidden border-4 ${
                  user.status === "online"
                    ? "border-green-500"
                    : "border-red-600"
                }`}
              >
                <img
                  src={user.profilePicUrl}
                  alt="User's profile avatar"
                  className={`w-full h-full object-cover `}
                />
              </div>
              <span
                className={`text-xl ${
                  user.userName == "admin02" ? "text-purple-600" : null
                }`}
              >
                {user.userName === currentUser.displayName
                  ? "you"
                  : user.userName}
              </span>
            </li>
          ))
        ) : (
          <>
            <li
              id="user-skeleton"
              className={`text-lg mb-4 p-3 flex items-center  dark:bg-slate-950 bg-slate-400 rounded-full border`}
            >
              <div className="w-16 h-16 mr-3 rounded-full bg-slate-500" />

              <div className="w-32 h-8 bg-slate-500 rounded-full" />
            </li>
            <p className="text-center">Loading data...</p>
          </>
        )}
      </ol>
    </div>
  );
};

export default Users;
