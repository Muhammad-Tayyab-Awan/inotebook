import { useState, useContext } from "react";
import NotesContext from "../context/notes/NotesContext";

function Newnote() {
  let context = useContext(NotesContext);
  let { addNote } = context;
  const [note, setForm] = useState({ title: "", description: "", tag: "" });
  function handleChange(e) {
    setForm({ ...note, [e.target.name]: e.target.value });
  }
  function handleAdd(e) {
    e.preventDefault();
    addNote(note);
    setForm({ title: "", description: "", tag: "" });
  }
  return (
    <>
      <h2 className="text-2xl font-bold text-center">Add New Note</h2>
      <form className="my-4 py-4 flex flex-col justify-center items-center gap-3">
        <div className="flex gap-2 items-center justify-between w-3/5">
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
            className="p-1 rounded-lg focus-visible:outline-none w-9/12"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 items-baseline justify-between w-3/5">
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
            className="p-1 rounded-lg focus-visible:outline-none w-9/12"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex gap-2 items-center justify-between w-3/5">
          <label htmlFor="tag" className="text-lg font-semibold">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={note.tag}
            placeholder="Enter Tag"
            className="p-1 rounded-lg focus-visible:outline-none w-9/12"
            onChange={handleChange}
          />
        </div>
        <button
          disabled={
            note.title.length < 10 || note.description.length < 25
              ? true
              : false
          }
          className="bg-[#111827] text-white py-1 px-4 rounded-xl text-lg font-semibold focus-visible:outline-none disabled:opacity-50 border border-white"
          onClick={handleAdd}
        >
          Add Note
        </button>
      </form>
    </>
  );
}

export default Newnote;
