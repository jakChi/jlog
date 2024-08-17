import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";


function ThemeSwitch() {
  const [darkMode, setDarkMode] = useState(localStorage.theme !== "dark");

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      console.log("added dark class");
    } else {
      //document.documentElement.classList.remove("dark");
      console.log("no dark class in local storage");
    }
  }, [darkMode]);

  //change theme
  const toggleThemeChange = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", null);
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="w-10 md:w-16 h-10 md:h-16 cursor-pointer">
      <i
        onClick={toggleThemeChange}
        className="w-full h-full flex items-center justify-center "
      >
        {darkMode ? (
          <MoonIcon className="h-7 w-7 text-violet-800" />
        ) : (
          <SunIcon className="h-10 w-10 text-yellow-400" />
        )}
      </i>
    </div>
  );
}

export default ThemeSwitch;
