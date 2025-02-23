/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Context from "../../context/Context";
function Note(prop) {
  let context = useContext(Context);
  let { fetchNotes } = context;
  let [currNote, setCurrNote] = useState({
    title: "",
    description: "",
    tag: "",
    date: "",
  });
  let [found, setFound] = useState(false);
  let [notesList, setNotesList] = useState([]);
  let [currentIndex, setCurrentIndex] = useState(0);
  let navigate = useNavigate();
  let param = useParams();
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      prop.setProgress(40);
    } else {
      prop.notify.error("Please login first!");
      navigate("/login");
    }
  }, [param.id]);
  useEffect(() => {
    fetchNotes().then((response) => {
      if (response.success) {
        prop.setProgress(100);
        let notes = response.notes;
        setNotesList(notes);
        let foundIndex = notes.findIndex((note) => note._id === param.id);
        if (foundIndex !== -1) {
          setFound(true);
          setCurrentIndex(foundIndex);
          document.title = `iNotebook - ${notes[foundIndex].title}`;
          let date = new Date(notes[foundIndex].date);
          setCurrNote({
            title: notes[foundIndex].title,
            description: notes[foundIndex].description,
            tag: notes[foundIndex].tag,
            date: date.toLocaleString(),
          });
        } else {
          document.title = `iNotebook - No note found!`;
        }
      } else {
        navigate("/login");
        prop.notify.error(response.error);
      }
    });
  }, [param.id]);
  const handleNextNote = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex < notesList.length) {
      navigate(`/note/${notesList[nextIndex]._id}`);
    }
  };
  const handlePrevNote = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      navigate(`/note/${notesList[prevIndex]._id}`);
    }
  };
  return (
    <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 pb-10 pt-16 selection:bg-[#111827] selection:text-white dark:bg-[#776e6e] dark:selection:bg-yellow-500 dark:selection:text-black">
      {found ? (
        <div className="relative mx-auto my-4 min-h-[60vh] w-[95%] rounded-lg border border-black bg-white py-6 text-[#111827] shadow-2xl shadow-black dark:border-white dark:bg-[#111827] dark:text-white md:min-h-[70vh] md:w-3/4 lg:w-3/5">
          <h2 className="mx-auto w-[90%] py-4 text-center text-xl font-semibold md:w-[80%] md:text-2xl">
            {currNote.title}
          </h2>
          <p className="mx-auto w-[90%] py-4 text-justify text-lg md:w-[80%]">
            {currNote.description}
          </p>
          <div className="justify bottom-4 right-[10%] mx-auto flex w-[90%] flex-col items-start justify-center gap-4 py-2 md:absolute md:w-[80%] md:flex-row md:items-center md:justify-around">
            <p>
              Tag:&nbsp;
              <span className="font-bold text-blue-700 dark:text-yellow-500">
                {currNote.tag}
              </span>
            </p>
            <p>
              Date Created:&nbsp;
              <span className="font-bold text-blue-700 dark:text-yellow-500">
                {currNote.date}
              </span>
            </p>
          </div>
          <button
            onClick={handlePrevNote}
            className={`absolute bottom-2 left-2 rounded-lg bg-[#111827] px-3 py-1 font-bold text-white focus-visible:outline-none dark:bg-white dark:text-[#111827] ${
              currentIndex === 0 && "cursor-not-allowed opacity-50"
            }`}
          >
            Prev
          </button>
          <button
            onClick={handleNextNote}
            className={`absolute bottom-2 right-2 rounded-lg bg-[#111827] px-3 py-1 font-bold text-white focus-visible:outline-none dark:bg-white dark:text-[#111827] ${
              currentIndex === notesList.length - 1 &&
              "cursor-not-allowed opacity-50"
            }`}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center py-8 text-2xl font-bold text-red-700 dark:text-red-900">
          No note found
        </div>
      )}
    </div>
  );
}

export default Note;
