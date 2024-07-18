import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { SunIcon } from "@heroicons/react/24/solid";

//i dont know about this, it's a ts stuff
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
    <div className="relative">
      <Switch
        checked={darkMode}
        onChange={toggleThemeChange}
        className={classNames(
          !darkMode ? "bg-gray-400" : "bg-yellow-600",
          "relative peer inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={classNames(
            darkMode ? "translate-x-5" : "translate-x-0",
            "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        >
          <span
            className={classNames(
              darkMode
                ? "opacity-0 duration-100 ease-out"
                : "opacity-100 duration-200 ease-in",
              "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
          >
            <SunIcon className="h-3 w-3 text-gray-400" />
          </span>
          <span
            className={classNames(
              darkMode
                ? "opacity-100 duration-200 ease-in"
                : "opacity-0 duration-100 ease-out",
              "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
          >
            <SunIcon className="h-3 w-3 text-yellow-600" />
          </span>
        </span>
      </Switch>
      <p className="absolute -top-10 peer-hover:-top-16 -left-16 w-40 border rounded-xl text-center opacity-0 peer-hover:opacity-100 transition-all duration-300">
        შეცვალე დღისა და ღამის რეჟიმი
      </p>
    </div>
  );
}

export default ThemeSwitch;
