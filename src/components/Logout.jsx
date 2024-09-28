import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NotesContext from "../context/notes/NotesContext";
function Logout() {
  let context = useContext(NotesContext);
  let { logoutUser } = context;
  let navigate = useNavigate();
  let logoutHandler = () => {
    logoutUser();
    navigate("/login");
  };
  return (
    <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 pt-16 pb-10">
      <button
        className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-4 rounded-full"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
