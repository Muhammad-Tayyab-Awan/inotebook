/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import logoutIcon from "../assets/logout.svg";
function Logout(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      props.notify.error("Please login first!");
      navigate("/login");
    }
    document.title = "iNotebook - Logout";
    props.setProgress(100);
  }, []);
  let context = useContext(Context);
  let { logoutUser } = context;
  let logoutHandler = () => {
    logoutUser();
    handleClose();
    navigate("/login");
  };
  return (
    <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 pb-10 pt-16 selection:bg-[#111827] selection:text-white dark:bg-[#776e6e] dark:selection:bg-yellow-500 dark:selection:text-black">
      <div className="py-2">
        <div className="mx-auto flex h-auto w-[75%] flex-wrap items-center justify-center">
          <div className="flex items-center justify-center">
            <img src={logoutIcon} alt="logout" />
          </div>
          <div className="flex flex-col items-center justify-center gap-8">
            <p className="text-2xl font-bold text-[#111827] dark:text-white">
              Thank you for visiting! We hope to see you again soon.
            </p>
            <button
              className="rounded-xl bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-500 focus-visible:outline-none"
              onClick={handleShow}
            >
              Logout
            </button>
            {show && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                role="dialog"
                aria-modal="true"
              >
                <div className="mx-auto w-[90vw] max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-[#111827] dark:text-white">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
                    <h5 className="text-lg font-semibold">Confirm Logout</h5>
                    <button
                      className="text-3xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      aria-label="Close"
                      onClick={handleClose}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="my-4 text-lg">
                    <p>Are you sure you want to log out?</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      className="rounded-xl bg-[#111827] px-4 py-2 font-bold text-white hover:bg-[#444b5a] dark:bg-white dark:text-[#111827] dark:hover:bg-slate-400"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      className="rounded-xl bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-500"
                      onClick={() => {
                        handleClose();
                        logoutHandler();
                        props.notify.success("Logged out successfully");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
