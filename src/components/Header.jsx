import { SunIcon, MoonIcon, HomeIcon } from "@heroicons/react/24/solid";
import { useDarkMode } from "../context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <header className="flex flex-col z-99 md:flex-row items-center justify-between p-4 mx-4 my-4 md:rounded-xl bg-white/50 dark:bg-black/50 md:shadow-lg md:backdrop-blur-xl md:border md:border-gray-200 md:dark:border-gray-600 w-full max-w-6xl mx-auto space-y-4 md:space-y-0 md:sticky md:top-0">
      <h1 className="text-2xl font-bold dark:text-white text-center md:text-left w-full md:w-auto">
        Food Listing
      </h1>
      <div className="w-full md:w-1/3 flex justify-center">
        <SearchBar />
      </div>
      <div className="flex gap-4 w-full md:w-auto justify-center md:justify-end">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 md:shadow-lg"
          aria-label="Go to Home"
        >
          <HomeIcon className="w-5 h-5 text-gray-600 dark:text-white" />
        </button>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 md:shadow-lg"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <SunIcon className="w-5 h-5 text-yellow-500" />
          ) : (
            <MoonIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
