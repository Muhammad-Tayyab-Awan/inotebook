import { useState, useContext } from "react";
import NotesContext from "../context/notes/NotesContext";

function Newnote(props) {
  let context = useContext(NotesContext);
  let { addNote } = context;
  const [note, setForm] = useState({ title: "", description: "", tag: "" });
  function handleChange(e) {
    setForm({ ...note, [e.target.name]: e.target.value });
  }
  async function handleAdd(e) {
    e.preventDefault();
    let response = await addNote(note);
    if (response.success) {
      props.notify.success("Note added successfully!");
      setForm({ title: "", description: "", tag: "" });
    } else {
      props.notify.error("Not not added!");
    }
  }
  return (
    <>
      <h2 className="text-2xl font-bold text-center">Add New Note</h2>
      <form className="bg-white w-full dark:bg-[#111827] mx-auto h-96 sm:w-full md:w-full lg:w-full px-4 rounded-lg py-8 flex flex-col items-center justify-evenly dark:text-white text-neutral-600">
        <div className="flex gap-2 w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
          <label htmlFor="title" className="text-lg font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            minLength={10}
            value={note.title}
            placeholder="Enter Title"
            required
            className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-9/12 dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
          <label htmlFor="description" className="text-lg font-semibold">
            Description
          </label>
          <textarea
            placeholder="Enter Description Here..."
            name="description"
            id="description"
            minLength={25}
            required
            value={note.description}
            className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-9/12 dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex gap-2 w-[95%] items-center justify-between sm:w-[95%] md:w-[85%] lg:w-[85%] xl:w-[75%]">
          <label htmlFor="tag" className="text-lg font-semibold">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={note.tag}
            placeholder="Enter Tag"
            className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-9/12 dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
            onChange={handleChange}
          />
        </div>
        <button
          disabled={
            note.title.length < 10 || note.description.length < 25
              ? true
              : false
          }
          className="bg-[#111827] dark:bg-white dark:text-[#111827] text-white py-1 px-4 rounded-lg text-lg font-semibold focus-visible:outline-none disabled:opacity-50"
          onClick={handleAdd}
        >
          Add Note
        </button>
      </form>
    </>
  );
}

export default Newnote;
