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
    date: ""
  });
  let [found, setFound] = useState(false);
  let [notesList, setNotesList] = useState([]);
  let [currentIndex, setCurrentIndex] = useState(0);
  let navigate = useNavigate();
  let param = useParams();
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      prop.setProgress(100);
    } else {
      prop.notify.error("Please login first!");
      navigate("/login");
    }
  }, [param.id]);
  useEffect(() => {
    fetchNotes().then((response) => {
      if (response.success) {
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
            date: date.toLocaleString()
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
    <div className="min-h-[calc(100vh-9.5rem)] dark:bg-[#776e6e] bg-yellow-500 pt-16 pb-10">
      {found ? (
        <div className="mx-auto bg-white dark:bg-[#111827] text-[#111827] dark:text-white min-h-[60vh] md:min-h-[70vh] w-[95%] md:w-3/4 lg:w-3/5 py-6 my-4 rounded-lg shadow-2xl shadow-black relative">
          <h2 className="text-xl w-[90%] md:w-[80%] md:text-2xl font-semibold text-center py-4 mx-auto">
            {currNote.title}
          </h2>
          <p className="text-lg w-[90%] md:w-[80%] mx-auto py-4 text-justify">
            {currNote.description}
          </p>
          <div className="flex flex-col justify-center items-start justify md:flex-row md:justify-around md:items-center w-[90%] md:w-[80%] mx-auto py-2 gap-4">
            <p>
              Tag:&nbsp;<span className="font-bold">{currNote.tag}</span>
            </p>
            <p>
              Date Created:&nbsp;
              <span className="font-bold">{currNote.date}</span>
            </p>
          </div>
          <button
            onClick={handlePrevNote}
            className={`px-3 py-1 font-bold absolute bottom-2 left-2 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-lg ${
              currentIndex === 0 && "opacity-50 cursor-not-allowed"
            }`}
          >
            Prev
          </button>
          <button
            onClick={handleNextNote}
            className={`px-3 py-1 font-bold absolute bottom-2 right-2 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-lg ${
              currentIndex === notesList.length - 1 &&
              "opacity-50 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="text-2xl flex justify-center items-center py-8 text-red-700 font-bold dark:text-red-900">
          No note found
        </div>
      )}
    </div>
  );
}

export default Note;
