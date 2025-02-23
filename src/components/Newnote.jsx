/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";

function Newnote(props) {
  let navigate = useNavigate();
  let context = useContext(Context);
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
      if (response.error === "Token is not valid!") {
        navigate("/login");
        props.notify.error(response.error);
      } else {
        props.notify.error(response.error);
      }
    }
  }
  return (
    <>
      <h2 className="py-4 text-center text-2xl font-bold text-black dark:text-white">
        Add New Note
      </h2>
      <form className="mx-auto flex h-96 w-full flex-col items-center justify-evenly rounded-lg bg-white p-2 text-neutral-600 dark:bg-[#111827] dark:text-white sm:w-full md:w-full md:px-4 md:py-8 lg:w-full">
        <div className="flex w-[95%] flex-col items-center justify-between sm:w-[95%] md:w-[85%] md:flex-row md:gap-2 lg:w-[85%] xl:w-[75%]">
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
            className="w-11/12 rounded-lg bg-slate-900 p-1 text-white focus-visible:shadow-xl focus-visible:shadow-black focus-visible:outline-hidden dark:bg-slate-50 dark:text-black md:w-9/12"
            onChange={handleChange}
          />
        </div>
        <div className="flex w-[95%] flex-col items-center justify-between sm:w-[95%] md:w-[85%] md:flex-row md:gap-2 lg:w-[85%] xl:w-[75%]">
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
            className="max-h-32 min-h-32 w-11/12 rounded-lg bg-slate-900 p-1 text-white focus-visible:shadow-xl focus-visible:shadow-black focus-visible:outline-hidden dark:bg-slate-50 dark:text-black md:w-9/12"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex w-[95%] flex-col items-center justify-between sm:w-[95%] md:w-[85%] md:flex-row md:gap-2 lg:w-[85%] xl:w-[75%]">
          <label htmlFor="tag" className="text-lg font-semibold">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={note.tag}
            placeholder="Enter Tag"
            className="w-11/12 rounded-lg bg-slate-900 p-1 text-white focus-visible:shadow-xl focus-visible:shadow-black focus-visible:outline-hidden dark:bg-slate-50 dark:text-black md:w-9/12"
            onChange={handleChange}
          />
        </div>
        <button
          disabled={
            note.title.length < 10 || note.description.length < 25
              ? true
              : false
          }
          className="rounded-lg bg-[#111827] px-4 py-1 text-lg font-semibold text-white focus-visible:outline-hidden disabled:opacity-50 dark:bg-white dark:text-[#111827]"
          onClick={handleAdd}
        >
          Add Note
        </button>
      </form>
    </>
  );
}

export default Newnote;
