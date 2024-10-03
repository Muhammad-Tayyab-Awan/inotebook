/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import Noteitem from "./Noteitem";
import Newnote from "./Newnote";
function Notes(props) {
  let navigate = useNavigate();
  let context = useContext(Context);
  let { Notes, fetchNotes } = context;
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetchNotes();
    } else {
      props.notify.error("Please login first!");
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="w-[95%] sm:w-[85%] md:w-9/12 lg:w-3/5 mx-auto p-4">
        <Newnote notify={props.notify} />
      </div>
      <div className="w-[95%] sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[85%] mx-auto p-4">
        <h2 className="my-2 text-2xl font-bold text-center text-black dark:text-white">
          All Notes
        </h2>
        <div className="my-4 flex flex-wrap justify-center items-baseline gap-3">
          {Notes.length > 0 ? (
            Notes.map((note) => {
              return (
                <Noteitem key={note._id} note={note} notify={props.notify} />
              );
            })
          ) : (
            <div>No Notes Found</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Notes;
