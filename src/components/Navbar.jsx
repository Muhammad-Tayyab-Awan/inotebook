import { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import closeIcon from "../assets/close.svg";
const Navbar = (prop) => {
  let navigate = useNavigate();
  let context = useContext(Context);
  let { getUserData, isLoggedIn, sideBar, setSideBar } = context;
  const [isOpen, setIsOpen] = useState(false);
  let date = new Date();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : date.getHours() < 17 && date.getHours() > 6
        ? false
        : true,
  );
  const [loggedInUser, setLoggedInUser] = useState({
    name: "",
    email: "",
    joinedOn: "",
  });
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    toast(`Switched to ${darkMode ? "Light" : "Dark"} mode`, {
      icon: `${darkMode ? "☀" : "🌙"}`,
      style: {
        borderRadius: "10px",
        background: `${!darkMode ? "#fff" : "#333"}`,
        color: `${!darkMode ? "#333" : "#fff"}`,
      },
    });
  };
  async function toggleSideBar() {
    let response = await getUserData();
    if (response.success) {
      let { name, email, date } = response.user;
      let formatDate = new Date(date);
      formatDate = formatDate.toLocaleString(formatDate);
      setLoggedInUser({ name: name, email: email, joinedOn: formatDate });
      setSideBar(!sideBar);
    } else {
      navigate("/login");
      prop.notify.error(response.error);
    }
  }
  const [display, setDisplay] = useState(true);
  useEffect(() => {
    window.location.pathname.startsWith("/verify") && setDisplay(false);
  }, []);
  return (
    <nav
      className={`fixed left-0 top-0 z-10 w-full bg-white shadow-md selection:bg-[#111827] selection:text-white dark:bg-gray-900 dark:selection:bg-yellow-500 dark:selection:text-black ${
        !display && "hidden"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="flex items-baseline text-3xl font-bold">
              <span className="dark:text-gray-200">i</span>
              <span className="text-purple-500">Notebook</span>
            </h1>
          </div>
          <div className="hidden items-center space-x-4 md:flex">
            <NavLink
              to="/"
              className={(e) => {
                return e.isActive
                  ? "rounded-md bg-slate-500 px-3 py-2 text-sm font-bold text-gray-200 hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-400"
                  : "rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-950 dark:text-gray-200 dark:hover:text-gray-50";
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={(e) => {
                return e.isActive
                  ? "rounded-md bg-slate-500 px-3 py-2 text-sm font-bold text-gray-200 hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-400"
                  : "rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-950 dark:text-gray-200 dark:hover:text-gray-50";
              }}
            >
              About
            </NavLink>
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className={(e) => {
                    return e.isActive
                      ? "rounded-md bg-slate-500 px-3 py-2 text-sm font-bold text-gray-200 hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-400"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-950 dark:text-gray-200 dark:hover:text-gray-50";
                  }}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={(e) => {
                    return e.isActive
                      ? "rounded-md bg-slate-500 px-3 py-2 text-sm font-bold text-gray-200 hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-400"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-950 dark:text-gray-200 dark:hover:text-gray-50";
                  }}
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <button
                onClick={toggleSideBar}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-950 focus-visible:outline-none dark:text-gray-200 dark:hover:text-gray-50"
              >
                Account
              </button>
            )}
            <div
              className={`absolute bg-orange-500 opacity-90 dark:bg-slate-400 ${
                sideBar && isLoggedIn ? "right-0" : "-right-full"
              } top-0 h-screen rounded-bl-xl rounded-tl-xl p-4 shadow-lg shadow-black md:w-1/3 lg:w-1/4`}
            >
              <button
                title="Close"
                onClick={toggleSideBar}
                className="absolute left-1 top-1 rounded-full bg-white transition hover:bg-slate-300 focus-visible:outline-none"
              >
                <img src={closeIcon} alt="close" className="h-6 w-6" />
              </button>
              <div className="flex h-full w-full flex-col items-center justify-start py-2">
                <h3 className="text-lg font-semibold text-white">Account</h3>
                <div className="m-3 flex w-full flex-col items-center justify-start font-semibold">
                  <div className="my-3" title="Name">
                    {loggedInUser.name}
                  </div>
                  <div className="my-3" title="Email">
                    {loggedInUser.email}
                  </div>
                  <div className="my-3" title="Joined On">
                    {loggedInUser.joinedOn}
                  </div>
                </div>
                <NavLink
                  onClick={toggleSideBar}
                  to="/logout"
                  className="my-2 rounded-md bg-slate-100 px-2 py-1 font-bold text-black hover:bg-slate-300 focus-visible:outline-none"
                >
                  Logout
                </NavLink>
                <NavLink
                  onClick={toggleSideBar}
                  to="/updateuser"
                  className="my-2 rounded-md bg-slate-100 px-2 py-1 font-bold text-black hover:bg-slate-300 focus-visible:outline-none"
                >
                  Update User
                </NavLink>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="rounded-md px-3 py-2 text-gray-800 focus:outline-none dark:text-gray-200"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 384 512"
                  stroke="currentColor"
                >
                  <path
                    fill="#FFD43B"
                    d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 512 512"
                  stroke="currentColor"
                >
                  <path
                    fill="#111827"
                    d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-white hover:bg-gray-700 focus:outline-none dark:bg-white dark:text-black dark:hover:bg-slate-200"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <NavLink
              to="/"
              className={(e) => {
                return e.isActive
                  ? "block rounded-md bg-slate-500 px-3 py-2 text-center text-base font-extrabold text-gray-200 hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-400"
                  : "block rounded-md px-3 py-2 text-center text-base font-medium text-gray-800 hover:text-gray-950 dark:text-gray-200 dark:hover:text-gray-50";
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={(e) => {
                return e.isActive
                  ? "block rounded-md bg-slate-500 px-3 py-2 text-center text-base font-extrabold text-gray-200 hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-400"
                  : "block rounded-md px-3 py-2 text-center text-base font-medium text-gray-800 hover:text-gray-950 dark:text-gray-200 dark:hover:text-gray-50";
              }}
            >
              About
            </NavLink>
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className={(e) => {
                    return e.isActive
                      ? "block rounded-md bg-slate-500 px-3 py-2 text-center text-base font-extrabold text-gray-200 hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-400"
                      : "block rounded-md px-3 py-2 text-center text-base font-medium text-gray-800 hover:text-gray-950 dark:text-gray-200 dark:hover:text-gray-50";
                  }}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={(e) => {
                    return e.isActive
                      ? "200 block rounded-md bg-slate-500 px-3 py-2 text-center text-base font-extrabold text-gray-200 hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-400"
                      : "block rounded-md px-3 py-2 text-center text-base font-medium text-gray-800 hover:text-gray-950 dark:text-gray-200 dark:hover:text-gray-50";
                  }}
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <button
                onClick={toggleSideBar}
                className="block w-full rounded-md px-3 py-2 text-center text-base font-medium text-gray-800 hover:text-gray-950 focus-visible:outline-none dark:text-gray-200 dark:hover:text-gray-50"
              >
                Account
              </button>
            )}
            <div
              className={`absolute bg-orange-500 opacity-90 dark:bg-slate-400 ${
                sideBar && isLoggedIn ? "right-0" : "-right-full"
              } top-[0] h-screen rounded-bl-xl rounded-tl-xl p-4 shadow-lg shadow-black`}
            >
              <button
                title="Close"
                onClick={toggleSideBar}
                className="absolute left-1 top-1 rounded-full bg-white transition hover:bg-slate-300 focus-visible:outline-none"
              >
                <img src={closeIcon} alt="close" className="h-6 w-6" />
              </button>
              <div className="flex h-full w-full flex-col items-center justify-start py-2">
                <h3 className="text-lg font-semibold text-white">Account</h3>
                <div className="m-3 flex w-full flex-col items-center justify-start font-semibold">
                  <div className="my-3" title="Name">
                    {loggedInUser.name}
                  </div>
                  <div className="my-3" title="Email">
                    {loggedInUser.email}
                  </div>
                  <div className="my-3" title="Joined On">
                    {loggedInUser.joinedOn}
                  </div>
                </div>
                <NavLink
                  onClick={toggleSideBar}
                  to="/logout"
                  className="my-2 rounded-md bg-slate-100 px-2 py-1 font-bold text-black hover:bg-slate-300 focus-visible:outline-none"
                >
                  Logout
                </NavLink>
                <NavLink
                  onClick={toggleSideBar}
                  to="/updateuser"
                  className="my-2 rounded-md bg-slate-100 px-2 py-1 font-bold text-black hover:bg-slate-300 focus-visible:outline-none"
                >
                  Update User
                </NavLink>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="flex w-full items-center justify-center rounded-md px-3 py-2 focus-visible:outline-none"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 384 512"
                  stroke="currentColor"
                >
                  <path
                    fill="#FFD43B"
                    d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 512 512"
                  stroke="currentColor"
                >
                  <path
                    fill="#111827"
                    d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
