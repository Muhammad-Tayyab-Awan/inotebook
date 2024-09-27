import { useContext } from "react";
import NotesContext from "../context/notes/NotesContext";
import Noteitem from "./Noteitem";
function Notes() {
  let allNotesContext = useContext(NotesContext);
  let { Notes } = allNotesContext;
  return (
    <>
      <div className="mt-2 mx-auto w-3/5">
        <h2 className="text-2xl font-bold text-center">Add New Note</h2>
        <h2 className="my-2 text-2xl font-bold text-center">All Notes</h2>
        <div className="my-4 flex flex-wrap justify-center items-center gap-8">
          {Notes.map((note) => {
            return <Noteitem key={note._id} note={note} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
