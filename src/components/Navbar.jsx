/* eslint-disable react/prop-types */
import UserInfo from "./UserInfo";

const Navbar = ({ userPic, user, auth, setUser }) => {
  return (
    <nav className="bg-gray-200 dark:bg-gray-800 fixed top-0 left-0 w-screen h-16 sm:h-20 flex justify-between">
      <header className="px-5 py-4">
        <a
          href="https://github.com/jakChi/jlog"
          rel="noreferrer"
          target="_blank"
          className="text-2xl sm:text-5xl font-bold"
        >
          Jlog
        </a>
      </header>
      <div className="group">
        <img
          className="w-10 sm:w-16 h-10 sm:h-16 m-3 sm:m-2 rounded-full border-2 border-sky-500 object-cover cursor-pointer"
          src={userPic}
          alt="პროფილის ფოტო"
        />
        <div className="bg-gray-200 dark:bg-gray-800 absolute -right-full group-hover:right-0 top-0 w-60 h-screen transition-all duration-300 sm:delay-300">
          <UserInfo user={user} auth={auth} setUser={setUser} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
