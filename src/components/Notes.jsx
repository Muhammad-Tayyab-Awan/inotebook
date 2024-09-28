import { useContext, useEffect } from "react";
import NotesContext from "../context/notes/NotesContext";
import Noteitem from "./Noteitem";
import Newnote from "./Newnote";
function Notes() {
  let context = useContext(NotesContext);
  let { Notes, fetchNotes } = context;
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div className="mt-2 mx-auto w-3/5">
        <Newnote />
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
