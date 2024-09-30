import { useState, useContext, useEffect } from "react";
import NotesContext from "../context/notes/NotesContext";
import { useNavigate } from "react-router-dom";
function Signup(props) {
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      props.notify.error(
        "In order to register another account you must have to logout from the current account!"
      );
      navigate("/logout");
    }
    document.title = "iNotebook - Register Now";
    props.setProgress(100);
  }, []);
  let navigate = useNavigate();
  let context = useContext(NotesContext);
  let { signUp } = context;
  const [signupCredentials, setSignupCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [cPassword, setCPassword] = useState("");
  function changehandle(e) {
    setSignupCredentials({
      ...signupCredentials,
      [e.target.name]: e.target.value
    });
  }
  async function handleSumbit(e) {
    e.preventDefault();
    if (cPassword === signupCredentials.password) {
      let response = await signUp(signupCredentials);
      if (response.success) {
        props.notify.success("Registered successfully!");
        props.notify.success("Logged in successfully!");
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
    } else {
      props.notify.error("Password does not match with confirm password");
    }
  }
  return (
    <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 dark:bg-[#776e6e] pt-16 pb-10">
      <div className="w-[95%] sm:w-[85%] md:w-9/12 lg:w-3/5 mx-auto p-4">
        <h1 className="text-xl font-semibold text-black dark:text-white text-center mb-4">
          Register Now to use Our Services
        </h1>
        <form
          onSubmit={handleSumbit}
          className="bg-white w-full dark:bg-[#111827] mx-auto h-96 sm:w-full md:w-full lg:w-full p-4 rounded-lg py-8 flex flex-col items-center justify-around dark:text-white text-neutral-600"
        >
          <div className="flex gap-2 w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
            <label htmlFor="name" className="text-lg font-semibold">
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
              className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-9/12 dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
            />
          </div>
          <div className="flex gap-2 w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
            <label htmlFor="email" className="text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              required
              onChange={changehandle}
              value={signupCredentials.email}
              className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-9/12 dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
            />
          </div>
          <div className="flex gap-2 w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
            <label htmlFor="password" className="text-lg font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              minLength={8}
              placeholder="Enter Password"
              required
              onChange={changehandle}
              value={signupCredentials.password}
              className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-9/12 dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
            />
          </div>
          <div className="flex gap-2 w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
            <label htmlFor="cpassword" className="text-lg font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              minLength={8}
              placeholder="Confirm Password"
              required
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-9/12 dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
            />
          </div>
          <button className="bg-[#111827] dark:bg-white dark:text-[#111827] py-1 px-3 text-white rounded-lg">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
