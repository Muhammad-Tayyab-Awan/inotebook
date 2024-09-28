import { useState, useContext, useEffect } from "react";
import NotesContext from "../context/notes/NotesContext";
import { useNavigate } from "react-router-dom";
function Signup(props) {
  useEffect(() => {
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
  function changehandle(e) {
    setSignupCredentials({
      ...signupCredentials,
      [e.target.name]: e.target.value
    });
  }
  async function handleSumbit(e) {
    e.preventDefault();
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
  }
  return (
    <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 pt-16 pb-10">
      <div className="w-9/12 mx-auto p-4">
        <h1 className="text-xl font-semibold text-center mb-4">
          Register Now to use Our Services
        </h1>
        <form
          onSubmit={handleSumbit}
          className="mx-auto h-64 w-3/5 p-4 rounded-lg py-8 flex flex-col items-center justify-around"
        >
          <div className="flex gap-2 items-center justify-between w-3/5">
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
              className="p-1 rounded-lg focus-visible:outline-none w-9/12"
            />
          </div>
          <div className="flex gap-2 items-center justify-between w-3/5">
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
              className="p-1 rounded-lg focus-visible:outline-none w-9/12"
            />
          </div>
          <div className="flex gap-2 items-center justify-between w-3/5">
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
              className="p-1 rounded-lg focus-visible:outline-none w-9/12"
            />
          </div>
          <button className="bg-[#111827] py-1 px-3 text-white rounded-lg">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
