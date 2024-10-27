/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";

function UpdateUser(prop) {
  const context = useContext(Context);
  let { getUserData, updateUser } = context;
  const [updateCredentials, setUpdateCredentials] = useState({
    name: "",
    email: ""
  });
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      document.title = "iNotebook - Update your profile";
      prop.setProgress(40);
      getUserData().then((response) => {
        if (response.success) {
          setUpdateCredentials({
            name: response.user.name,
            email: response.user.email
          });
          prop.setProgress(100);
        } else {
          navigate("/login");
          prop.notify.error(response.error);
        }
      });
    } else {
      prop.notify.error("Please login first!");
      navigate("/login");
    }
  }, []);
  function changehandle(e) {
    setUpdateCredentials({
      ...updateCredentials,
      [e.target.name]: e.target.value
    });
  }
  async function updateHandler(e) {
    e.preventDefault();
    let response = await updateUser(updateCredentials);
    if (response.success) {
      prop.notify.success(response.message);
      let response2 = await getUserData();
      if (response2.success) {
        setUpdateCredentials({
          name: response2.user.name,
          email: response2.user.email
        });
      } else {
        navigate("/login");
        prop.notify.error(response.error);
      }
    } else {
      if (Array.isArray(response.error)) {
        response.error.map((error) => {
          prop.notify.error(error.msg);
        });
      } else {
        prop.notify.error(response.error);
      }
    }
  }
  return (
    <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 dark:bg-[#776e6e] selection:bg-[#111827] dark:selection:bg-yellow-500 dark:selection:text-black selection:text-white pt-16 pb-10">
      <div className="w-[95%] sm:w-[85%] md:w-9/12 lg:w-3/5 mx-auto p-4">
        <h1 className="text-xl font-semibold text-black dark:text-white text-center mb-4">
          Update Your Profile
        </h1>
        <form
          onSubmit={updateHandler}
          className="bg-white w-full dark:bg-[#111827] mx-auto h-56 md:h-64 sm:w-full md:w-full lg:w-full md:px-4 rounded-lg py-2 md:py-8 flex flex-col items-center justify-around dark:text-white text-neutral-600"
        >
          <div className="flex w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
            <label
              htmlFor="name"
              className="text-sm md:text-lg font-semibold w-6 xl:w-auto"
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
              value={updateCredentials.name}
              className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-9/12 dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
            />
          </div>
          <div className="flex w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
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
              required
              autoComplete="username"
              onChange={changehandle}
              value={updateCredentials.email}
              className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-9/12 dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
            />
          </div>
          <button className="bg-[#111827] dark:bg-white dark:text-[#111827] py-1 px-3 text-white rounded-lg focus-visible:outline-none">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
