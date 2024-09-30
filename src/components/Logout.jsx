import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotesContext from "../context/notes/NotesContext";
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
    props.setProgress(100);
  }, []);
  let context = useContext(NotesContext);
  let { logoutUser } = context;
  let logoutHandler = () => {
    logoutUser();
    handleClose();
    navigate("/login");
  };
  return (
    <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 dark:bg-[#776e6e] pt-16 pb-10">
      <div className="py-2">
        <div className="flex w-[75%] mx-auto flex-wrap h-auto justify-center items-center">
          <div className="flex justify-center items-center">
            <img src={logoutIcon} alt="logout" />
          </div>
          <div className="flex flex-col justify-center gap-8 items-center">
            <p className="text-2xl font-bold text-[#111827] dark:text-white">
              Thank you for visiting! We hope to see you again soon.
            </p>
            <button
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-xl focus-visible:outline-none"
              onClick={handleShow}
            >
              Logout
            </button>
            {show && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                role="dialog"
                aria-modal="true"
              >
                <div className="bg-white dark:bg-[#111827] dark:text-white max-w-lg mx-auto p-6 rounded-lg shadow-lg w-[90vw]">
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                    <h5 className="text-lg font-semibold">Confirm Logout</h5>
                    <button
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-3xl"
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
                      className="bg-[#111827] hover:bg-[#444b5a] dark:bg-white dark:hover:bg-slate-400 dark:text-[#111827] text-white font-bold py-2 px-4 rounded-xl"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-xl"
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
