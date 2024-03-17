import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const ThemeSwitchN = () => {
  //const [theme, setTheme] = useLocalStorage("theme", "light");

  // useEffect(() => {
  //   document.body.classList.remove("light", "dark");
  //   document.body.classList.add(theme);
  // }, [theme]);

  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = () => {
    // setTheme(darkMode ? "light" : "dark");
    setDarkMode(!darkMode); 
  };

  return (
    <button onClick={handleThemeChange}>
      {darkMode ? "light" : "dark"}
    </button>
  );
};

export default ThemeSwitchN;
