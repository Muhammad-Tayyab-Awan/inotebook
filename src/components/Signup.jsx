/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import eyeIcon from "../assets/eye.svg";
import eyeCrossIcon from "../assets/eyecross.svg";
function Signup(props) {
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      props.notify.error(
        "In order to register another account you must have to logout from the current account!",
      );
      navigate("/logout");
    }
    document.title = "iNotebook - Register Now";
    props.setProgress(100);
  }, []);
  let [passShow, setPassShow] = useState(false);
  let [cPassShow, setcPassShow] = useState(false);
  let navigate = useNavigate();
  let context = useContext(Context);
  let { signUp } = context;
  const [signupCredentials, setSignupCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [cPassword, setCPassword] = useState("");
  function changehandle(e) {
    setSignupCredentials({
      ...signupCredentials,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (cPassword === signupCredentials.password) {
      let response = await signUp(signupCredentials);
      if (response.success) {
        props.notify.success("Registered successfully!");
        navigate("/login");
      } else {
        if (Array.isArray(response.errors)) {
          response.errors.map((err) => {
            props.notify.error(err.msg);
          });
        } else {
          props.notify.error(response.error);
        }
      }
    } else {
      props.notify.error("Password does not match with confirm password");
    }
  }
  return (
    <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 pb-10 pt-16 selection:bg-[#111827] selection:text-white dark:bg-[#776e6e] dark:selection:bg-yellow-500 dark:selection:text-black">
      <div className="mx-auto w-[95%] p-4 sm:w-[85%] md:w-9/12 lg:w-3/5">
        <h1 className="mb-4 text-center text-xl font-semibold text-black dark:text-white">
          Register Now to use Our Services
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex h-72 w-full flex-col items-center justify-around rounded-lg bg-white py-2 text-neutral-600 dark:bg-[#111827] dark:text-white sm:w-full md:h-96 md:w-full md:px-4 md:py-8 lg:w-full"
        >
          <div className="flex w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
            <label
              htmlFor="name"
              className="w-6 text-sm font-semibold md:text-lg xl:w-auto"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              required
              minLength={8}
              onChange={changehandle}
              value={signupCredentials.name}
              className="w-9/12 rounded-lg bg-slate-900 p-1 text-white focus-visible:shadow-xl focus-visible:shadow-black focus-visible:outline-none dark:bg-slate-50 dark:text-black"
            />
          </div>
          <div className="flex w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
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
              required
              autoComplete="username"
              onChange={changehandle}
              value={signupCredentials.email}
              className="w-9/12 rounded-lg bg-slate-900 p-1 text-white focus-visible:shadow-xl focus-visible:shadow-black focus-visible:outline-none dark:bg-slate-50 dark:text-black"
            />
          </div>
          <div className="flex w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
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
                minLength={8}
                placeholder="Enter Password"
                required
                autoComplete="new-password"
                onChange={changehandle}
                value={signupCredentials.password}
                className="w-full rounded-lg bg-slate-900 p-1 text-white focus-visible:shadow-xl focus-visible:shadow-black focus-visible:outline-none dark:bg-slate-50 dark:text-black"
              />
              <img
                onClick={() => {
                  setPassShow(!passShow);
                }}
                src={passShow ? eyeCrossIcon : eyeIcon}
                alt="Show Password"
                className="absolute right-[.45rem] top-[.41rem] h-5 w-5 md:right-[.5rem] md:top-[.25rem] md:h-6 md:w-6"
              />
            </div>
          </div>
          <div className="flex w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
            <label
              htmlFor="cpassword"
              className="w-6 text-sm font-semibold md:text-lg xl:w-auto"
            >
              Confirm Password
            </label>
            <div className="relative flex w-9/12">
              <input
                type={cPassShow ? "text" : "password"}
                id="cpassword"
                name="cpassword"
                minLength={8}
                placeholder="Confirm Password"
                required
                autoComplete="new-password"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                className="w-full rounded-lg bg-slate-900 p-1 text-white focus-visible:shadow-xl focus-visible:shadow-black focus-visible:outline-none dark:bg-slate-50 dark:text-black"
              />
              <img
                onClick={() => {
                  setcPassShow(!cPassShow);
                }}
                src={cPassShow ? eyeCrossIcon : eyeIcon}
                alt="Show Password"
                className="absolute right-[.45rem] top-[.41rem] h-5 w-5 md:right-[.5rem] md:top-[.25rem] md:h-6 md:w-6"
              />
            </div>
          </div>
          <button className="rounded-lg bg-[#111827] px-3 py-1 text-white dark:bg-white dark:text-[#111827]">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
