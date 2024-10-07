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
    password: ""
  });
  function changehandle(e) {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value
    });
  }
  async function handleSumbit(e) {
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
    <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 dark:bg-[#776e6e] selection:bg-[#111827] dark:selection:bg-yellow-500 dark:selection:text-black selection:text-white pt-16 pb-10">
      <div className="w-[95%] sm:w-[85%] md:w-9/12 lg:w-3/5 mx-auto p-4">
        <h1 className="text-xl font-semibold text-center text-black dark:text-white mb-4">
          Login Now to use Our Services
        </h1>
        <form
          onSubmit={handleSumbit}
          className="bg-white w-full dark:bg-[#111827] mx-auto h-60 md:h-72 sm:w-full md:w-full lg:w-full md:px-4 rounded-lg py-2 md:py-8 flex flex-col items-center justify-around dark:text-white text-neutral-600"
        >
          <div className="flex gap-2 w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
            <label
              htmlFor="email"
              className="text-sm md:text-lg font-semibold w-6 xl:w-auto"
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
              className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-9/12 dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
            />
          </div>
          <div className="flex gap-2 w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
            <label
              htmlFor="password"
              className="text-sm md:text-lg font-semibold w-6 xl:w-auto"
            >
              Password
            </label>
            <div className="w-9/12 flex relative">
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
                className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-full dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
              />
              <img
                onClick={() => {
                  setPassShow(!passShow);
                }}
                src={passShow ? eyeCrossIcon : eyeIcon}
                alt="Show Password"
                className="h-6 w-6 absolute top-[.25rem] right-[.5rem]"
              />
            </div>
          </div>
          <button className="bg-[#111827] dark:bg-white dark:text-[#111827] py-1 px-3 text-white rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
