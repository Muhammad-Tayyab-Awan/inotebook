import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";
import { useState, useContext } from "react";
import Context from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
function Noteitem(prop) {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [updatingNote, setUpdateForm] = useState({
    title: "",
    description: "",
    tag: "",
  });
  function handleChange(e) {
    setUpdateForm({ ...updatingNote, [e.target.name]: e.target.value });
  }
  const toggleModal = (e) => {
    setIsOpen(!isOpen);
    setUpdateId(e.target.id);
    setUpdateForm(prop.note);
  };
  let context = useContext(Context);
  let { deleteNote, updateNote } = context;
  async function handleClick(e) {
    let response = await deleteNote(e.target.id);
    if (response.success) {
      prop.notify.success("Note deleted successfully!");
    } else {
      if (response.error === "Token is not valid!") {
        navigate("/login");
        prop.notify.error(response.error);
      } else {
        prop.notify.error(response.error);
      }
    }
  }
  async function handleUpdate(e) {
    e.preventDefault();
    let response = await updateNote(e.target.id, updatingNote);
    if (response.success) {
      prop.notify.success(response.message);
      toggleModal(e);
    } else {
      if (response.error === "Token is not valid!") {
        navigate("/login");
        prop.notify.error(response.error);
      } else {
        prop.notify.error(response.error);
      }
    }
  }
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-[95%] rounded-lg border-2 border-[#111827] bg-white text-[#111827] shadow-lg dark:border-white dark:bg-[#111827] dark:text-white sm:w-[70%]">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
              <h1 className="text-lg font-semibold">Edit Note</h1>
              <button
                className="text-2xl text-gray-500 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
                onClick={toggleModal}
                id={updateId}
              >
                &times;
              </button>
            </div>
            <div>
              <from className="flex w-full flex-col items-center justify-center gap-5 bg-yellow-500 py-4 dark:bg-[#776e6e]">
                <div className="flex w-[90%] flex-col items-center justify-between gap-2 md:flex-row">
                  <label
                    htmlFor="uptitle"
                    className="text-md font-semibold md:text-lg"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="uptitle"
                    name="title"
                    value={updatingNote.title}
                    placeholder="Enter Title"
                    minLength={10}
                    required
                    className="w-full rounded-lg bg-slate-900 p-1 text-white focus-visible:shadow-xl focus-visible:shadow-black focus-visible:outline-none dark:bg-slate-50 dark:text-black md:w-9/12"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex w-[90%] flex-col items-center justify-between gap-2 md:flex-row">
                  <label
                    htmlFor="updescription"
                    className="text-md font-semibold md:text-lg"
                  >
                    Description
                  </label>
                  <textarea
                    placeholder="Enter Description Here..."
                    name="description"
                    id="updescription"
                    required
                    minLength={25}
                    value={updatingNote.description}
                    className="max-h-72 min-h-40 w-full rounded-lg bg-slate-900 p-1 text-white focus-visible:shadow-xl focus-visible:shadow-black focus-visible:outline-none dark:bg-slate-50 dark:text-black md:w-9/12"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex w-[90%] flex-col items-center justify-between gap-2 md:flex-row">
                  <label
                    htmlFor="uptag"
                    className="text-md font-semibold md:text-lg"
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    id="uptag"
                    name="tag"
                    value={updatingNote.tag}
                    placeholder="Enter Tag"
                    className="w-full rounded-lg bg-slate-900 p-1 text-white focus-visible:shadow-xl focus-visible:shadow-black focus-visible:outline-none dark:bg-slate-50 dark:text-black md:w-9/12"
                    onChange={handleChange}
                  />
                </div>
              </from>
            </div>
            <div className="flex justify-end space-x-2 border-t border-gray-200 px-4 py-2">
              <button
                disabled={
                  updatingNote.title.length < 10 ||
                  updatingNote.description.length < 25
                    ? true
                    : false
                }
                className="rounded-lg bg-[#111827] px-2 py-1 font-semibold text-white hover:bg-[#111837] disabled:opacity-50 dark:bg-white dark:text-[#111827] dark:hover:bg-gray-300"
                onClick={handleUpdate}
                id={updateId}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex h-56 w-full flex-col justify-between overflow-y-auto overflow-x-hidden rounded-lg border border-[#111827] bg-white text-[#111827] dark:bg-[#111827] dark:text-white sm:w-[45%] md:w-[45%] lg:w-[45%] xl:w-[30%]">
        <Link
          to={`/note/${prop.note._id}`}
          className="sticky top-0 items-center justify-center bg-[#111827] p-2 text-lg font-semibold text-white dark:bg-white dark:text-[#111827]"
        >
          {prop.note.title}
        </Link>
        <p className="p-2 text-justify text-sm">{prop.note.description}</p>
        <div className="flex w-auto items-center justify-start gap-2 p-1">
          <span className="inline-block rounded-md bg-[#111827] px-2 py-1 text-center font-semibold text-white dark:bg-white dark:text-[#111827]">
            Tag:
          </span>
          <span className="font-bold">{prop.note.tag}</span>
        </div>
        <div className="sticky bottom-0 z-[0] flex w-auto gap-2 self-end rounded-tl-lg bg-[#111827] p-2 dark:bg-white">
          <img
            src={deleteIcon}
            alt="delete"
            className="h-5 cursor-pointer"
            id={prop.note._id}
            onClick={handleClick}
          />
          <img
            src={editIcon}
            alt="edit"
            className="h-5 cursor-pointer"
            id={prop.note._id}
            onClick={toggleModal}
          />
        </div>
      </div>
    </>
  );
}

export default Noteitem;
