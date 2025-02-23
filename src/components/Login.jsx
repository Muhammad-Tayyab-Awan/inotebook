/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import eyeIcon from "../assets/eye.svg";
import eyeCrossIcon from "../assets/eyecross.svg";
function Login(props) {
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      props.notify.error("You already logged in!");
      navigate("/");
    }
    document.title = "iNotebook - Login Now";
    props.setProgress(100);
  }, []);
  let [passShow, setPassShow] = useState(false);
  let context = useContext(Context);
  let navigate = useNavigate();
  let { loginUser } = context;
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  function changehandle(e) {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let response = await loginUser(loginCredentials);
    if (response.success) {
      props.notify.success("Logged in successfully");
      navigate("/");
    } else {
      if (Array.isArray(response.errors)) {
        response.errors.map((err) => {
          props.notify.error(err.msg);
        });
      } else {
        props.notify.error(response.error);
      }
    }
  }
  return (
    <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 pb-10 pt-16 selection:bg-[#111827] selection:text-white dark:bg-[#776e6e] dark:selection:bg-yellow-500 dark:selection:text-black">
      <div className="mx-auto w-[95%] p-4 sm:w-[85%] md:w-9/12 lg:w-3/5">
        <h1 className="mb-4 text-center text-xl font-semibold text-black dark:text-white">
          Login Now to use Our Services
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex h-60 w-full flex-col items-center justify-around rounded-lg bg-white py-2 text-neutral-600 dark:bg-[#111827] dark:text-white sm:w-full md:h-72 md:w-full md:px-4 md:py-8 lg:w-full"
        >
          <div className="flex w-[95%] items-center justify-between gap-2 sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
            <label
              htmlFor="email"
              className="w-6 text-sm font-semibold md:text-lg xl:w-auto"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="username"
              required
              onChange={changehandle}
              value={loginCredentials.email}
              className="w-9/12 rounded-lg bg-slate-900 p-1 text-white focus-visible:shadow-xl focus-visible:shadow-black focus-visible:outline-hidden dark:bg-slate-50 dark:text-black"
            />
          </div>
          <div className="flex w-[95%] items-center justify-between gap-2 sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
            <label
              htmlFor="password"
              className="w-6 text-sm font-semibold md:text-lg xl:w-auto"
            >
              Password
            </label>
            <div className="relative flex w-9/12">
              <input
                type={passShow ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                minLength={8}
                placeholder="Enter Password"
                required
                onChange={changehandle}
                value={loginCredentials.password}
                className="w-full rounded-lg bg-slate-900 p-1 text-white focus-visible:shadow-xl focus-visible:shadow-black focus-visible:outline-hidden dark:bg-slate-50 dark:text-black"
              />
              <img
                onClick={() => {
                  setPassShow(!passShow);
                }}
                src={passShow ? eyeCrossIcon : eyeIcon}
                alt="Show Password"
                className="absolute right-[.5rem] top-[.25rem] h-6 w-6"
              />
            </div>
          </div>
          <button className="rounded-lg bg-[#111827] px-3 py-1 text-white dark:bg-white dark:text-[#111827]">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
