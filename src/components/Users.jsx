/* eslint-disable react/prop-types */
const Users = ({ data, currentUser }) => {
  return (
    <div id="user-list" className="md:my-12 my-3 md:w-1/5 w-full h-max">
      <ol className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible border border-transparent border-b-slate-500 md:border-b-transparent">
        {data.length > 0 ? (
          data.map((user, i) => (
            <li
              key={i}
              className={`m-2 mb-4 md:p-3 w-max md:w-full flex items-center text-lg dark:bg-slate-950 bg-slate-400 rounded-full border ${
                user.status === "online" ? "dark:border-green-500 border-green-700" : "border-red-600"
              }`}
            >
              <div
                className={`w-12 md:w-16 h-12 md:h-16 md:mr-3 rounded-full overflow-hidden border-2 md:border-4 ${
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
              <span className={`text-xl hidden md:inline`}>
                {user.userName === currentUser.displayName
                  ? "you"
                  : user.userName}
              </span>
            </li>
          ))
        ) : (
          <div>
            <ol className="flex flex-row md:flex-col overflow-x-auto">
              <li
                id="user-skeleton"
                className={`text-lg m-2 mb-4 md:p-3 w-max flex items-center  dark:bg-slate-950 bg-slate-400 rounded-full border`}
              >
                <div className="w-12 md:w-16 h-12 md:h-16 md:mr-3 rounded-full bg-slate-500" />

                <div className="w-32 h-8 bg-slate-500 rounded-full hidden md:flex" />
              </li>
              <li
                id="user-skeleton"
                className={`text-lg m-2 mb-4 md:p-3 w-max flex items-center  dark:bg-slate-950 bg-slate-400 rounded-full border`}
              >
                <div className="w-12 md:w-16 h-12 md:h-16 md:mr-3 rounded-full bg-slate-500" />

                <div className="w-32 h-8 bg-slate-500 rounded-full hidden md:flex" />
              </li>
              <li
                id="user-skeleton"
                className={`text-lg m-2 mb-4 md:p-3 w-max flex items-center  dark:bg-slate-950 bg-slate-400 rounded-full border`}
              >
                <div className="w-12 md:w-16 h-12 md:h-16 md:mr-3 rounded-full bg-slate-500" />

                <div className="w-32 h-8 bg-slate-500 rounded-full hidden md:flex" />
              </li>
              <li
                id="user-skeleton"
                className={`text-lg m-2 mb-4 md:p-3 w-max flex items-center  dark:bg-slate-950 bg-slate-400 rounded-full border`}
              >
                <div className="w-12 md:w-16 h-12 md:h-16 md:mr-3 rounded-full bg-slate-500" />

                <div className="w-32 h-8 bg-slate-500 rounded-full hidden md:flex" />
              </li>
              <li
                id="user-skeleton"
                className={`text-lg m-2 mb-4 md:p-3 w-max flex items-center  dark:bg-slate-950 bg-slate-400 rounded-full border`}
              >
                <div className="w-12 md:w-16 h-12 md:h-16 md:mr-3 rounded-full bg-slate-500" />

                <div className="w-32 h-8 bg-slate-500 rounded-full hidden md:flex" />
              </li>
              <li
                id="user-skeleton"
                className={`text-lg m-2 mb-4 md:p-3 w-max flex items-center  dark:bg-slate-950 bg-slate-400 rounded-full border`}
              >
                <div className="w-12 md:w-16 h-12 md:h-16 md:mr-3 rounded-full bg-slate-500" />

                <div className="w-32 h-8 bg-slate-500 rounded-full hidden md:flex" />
              </li>
             
            </ol>
            <p className="text-center">Loading users...</p>
          </div>
        )}
      </ol>
    </div>
  );
};

export default Users;
