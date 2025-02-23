/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";

function UpdateUser(prop) {
  const context = useContext(Context);
  let { getUserData, updateUser } = context;
  const [updateCredentials, setUpdateCredentials] = useState({
    name: "",
    email: "",
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
            email: response.user.email,
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
      [e.target.name]: e.target.value,
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
          email: response2.user.email,
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
    <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 pb-10 pt-16 selection:bg-[#111827] selection:text-white dark:bg-[#776e6e] dark:selection:bg-yellow-500 dark:selection:text-black">
      <div className="mx-auto w-[95%] p-4 sm:w-[85%] md:w-9/12 lg:w-3/5">
        <h1 className="mb-4 text-center text-xl font-semibold text-black dark:text-white">
          Update Your Profile
        </h1>
        <form
          onSubmit={updateHandler}
          className="mx-auto flex h-56 w-full flex-col items-center justify-around rounded-lg bg-white py-2 text-neutral-600 dark:bg-[#111827] dark:text-white sm:w-full md:h-64 md:w-full md:px-4 md:py-8 lg:w-full"
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
              value={updateCredentials.name}
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
              value={updateCredentials.email}
              className="w-9/12 rounded-lg bg-slate-900 p-1 text-white focus-visible:shadow-xl focus-visible:shadow-black focus-visible:outline-none dark:bg-slate-50 dark:text-black"
            />
          </div>
          <button className="rounded-lg bg-[#111827] px-3 py-1 text-white focus-visible:outline-none dark:bg-white dark:text-[#111827]">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
