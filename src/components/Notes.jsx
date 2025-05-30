/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import Noteitem from "./Noteitem";
import Newnote from "./Newnote";
import Filter from "./Filter";
function Notes(props) {
  let dailyLimit = 50;
  let navigate = useNavigate();
  let context = useContext(Context);
  let { Notes, fetchNotes, filter } = context;
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetchNotes().then((response) => {
        if (!response.success) {
          navigate("/login");
          props.notify.error("Client Side Tempering Found!");
        } else {
          props.setProgress(100);
        }
      });
    } else {
      props.notify.error("Please login first!");
      navigate("/login");
    }
  }, []);
  let todaysDate = new Date();
  let allNotes = Notes;
  let notesAddedToday = allNotes.filter((note) => {
    let noteDate = new Date(note.date);
    return (
      noteDate.toLocaleString(noteDate).split(",")[0] ===
      todaysDate.toLocaleString(todaysDate).split(",")[0]
    );
  });
  return (
    <>
      <div className="mx-auto w-[95%] p-4 sm:w-[85%] md:w-9/12 lg:w-3/5">
        {notesAddedToday.length < dailyLimit ? (
          <Newnote notify={props.notify} />
        ) : (
          <div className="flex items-center justify-center py-8 text-2xl font-bold text-red-700 dark:text-red-900">
            You have exceeded daily limit of adding notes
          </div>
        )}
      </div>
      <div className="mx-auto w-[95%] p-4 sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[85%]">
        <h2 className="my-2 text-center text-2xl font-bold text-black dark:text-white">
          All Notes
        </h2>
        <div className="mx-auto my-4 flex w-3/4 flex-col items-center justify-evenly md:w-1/2 md:flex-row">
          {Notes.length > 0 && (
            <Filter
              Notes={Notes}
              resultFounds={
                filter === "All"
                  ? Notes.length
                  : Notes.filter((note) => {
                      return note.tag === filter;
                    }).length
              }
            />
          )}
        </div>
        <div className="my-4 flex flex-wrap items-baseline justify-center gap-3">
          {Notes.length > 0 ? (
            filter === "All" ? (
              Notes.map((note) => {
                return (
                  <Noteitem key={note._id} note={note} notify={props.notify} />
                );
              })
            ) : (
              Notes.filter((note) => {
                return note.tag === filter;
              }).map((note) => {
                return (
                  <Noteitem key={note._id} note={note} notify={props.notify} />
                );
              })
            )
          ) : (
            <div className="flex items-center justify-center py-8 text-2xl font-bold text-red-700 dark:text-red-900">
              No Notes Found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Notes;
