/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Context from "../../context/Context";
function Note(prop) {
  let context = useContext(Context);
  let { fetchNotes } = context;
  let [indNote, setIndNote] = useState({
    title: "",
    description: "",
    tag: "",
    date: ""
  });
  let [found, setFound] = useState(false);
  let navigate = useNavigate();
  let param = useParams();
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      prop.setProgress(100);
    } else {
      prop.notify.error("Please login first!");
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    fetchNotes().then((response) => {
      let foundNotes = response.notes.filter((note) => {
        return note._id === param.id;
      });
      if (foundNotes.length > 0) {
        setFound(true);
        document.title = `iNotebook - ${foundNotes[0].title}`;
        let date = new Date(foundNotes[0].date);
        setIndNote({
          title: foundNotes[0].title,
          description: foundNotes[0].description,
          tag: foundNotes[0].tag,
          date: date.toLocaleString(date)
        });
      } else {
        document.title = `iNotebook - No note found!`;
      }
    });
  }, []);
  return (
    <div className="min-h-[calc(100vh-9.5rem)] dark:bg-[#776e6e] bg-yellow-500 pt-16 pb-10">
      {found ? (
        <div className="mx-auto bg-white dark:bg-[#111827] text-[#111827] dark:text-white min-h-[60vh] md:min-h-[70vh] w-[95%] md:w-3/4 lg:w-3/5 py-6 my-4 rounded-lg shadow-2xl shadow-black">
          <h2 className="text-xl md:text-2xl font-semibold text-center py-4">
            {indNote.title}
          </h2>
          <p className="text-lg w-[90%] md:w-[80%] mx-auto py-4 text-justify">
            {indNote.description}
          </p>
          <div className="flex flex-col justify-center items-start justify md:flex-row md:justify-around md:items-center w-[90%] md:w-[80%] mx-auto py-2 gap-4">
            <p>
              Tag:&nbsp;<span className="font-bold">{indNote.tag}</span>
            </p>
            <p>
              Date Created:&nbsp;
              <span className="font-bold">{indNote.date}</span>
            </p>
          </div>
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
