import { useContext } from "react";
import NotesContext from "../context/notes/NotesContext";
function Home() {
  let allNotesContext = useContext(NotesContext);
  let { Notes, Setter } = allNotesContext;
  return (
    <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 pt-16 pb-10">
      <div className="mt-2 mx-auto w-3/5">
        <h2 className="text-2xl font-bold text-center">Add New Note</h2>
        <h2>All Notes</h2>
        <ul>
          {Notes.map((note) => {
            return <li key={note._id}>{note.title}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Home;
