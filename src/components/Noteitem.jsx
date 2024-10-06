import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";
import { useState, useContext } from "react";
import Context from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
function Noteitem(prop) {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [updateId, setUpateId] = useState("");
  const [updatingNote, setUpdateForm] = useState({
    title: "",
    description: "",
    tag: ""
  });
  function handleChange(e) {
    setUpdateForm({ ...updatingNote, [e.target.name]: e.target.value });
  }
  const toggleModal = (e) => {
    setIsOpen(!isOpen);
    setUpateId(e.target.id);
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
          <div className="bg-white dark:bg-[#111827] rounded-lg shadow-lg w-[95%] sm:w-[70%] border-2 border-[#111827] dark:border-white text-[#111827] dark:text-white">
            <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
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
              <from className="py-4 flex flex-col justify-center items-center gap-5 w-full bg-yellow-500 dark:bg-[#776e6e]">
                <div className="flex flex-col md:flex-row gap-2 items-center justify-between w-[90%]">
                  <label
                    htmlFor="uptitle"
                    className="text-md md:text-lg font-semibold"
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
                    className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-full md:w-9/12 dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-center justify-between w-[90%]">
                  <label
                    htmlFor="updescription"
                    className="text-md md:text-lg font-semibold"
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
                    className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-full md:w-9/12 min-h-40 max-h-72 dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-center justify-between w-[90%]">
                  <label
                    htmlFor="uptag"
                    className="text-md md:text-lg font-semibold"
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    id="uptag"
                    name="tag"
                    value={updatingNote.tag}
                    placeholder="Enter Tag"
                    className="p-1 rounded-lg focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-black w-full md:w-9/12 dark:text-black dark:bg-slate-50 bg-slate-900 text-white"
                    onChange={handleChange}
                  />
                </div>
              </from>
            </div>
            <div className="px-4 py-2 border-t border-gray-200 flex justify-end space-x-2">
              <button
                disabled={
                  updatingNote.title.length < 10 ||
                  updatingNote.description.length < 25
                    ? true
                    : false
                }
                className="bg-[#111827] dark:bg-white dark:hover:bg-gray-300 text-white dark:text-[#111827] font-semibold px-2 py-1 rounded-lg hover:bg-[#111837] disabled:opacity-50"
                onClick={handleUpdate}
                id={updateId}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="dark:bg-[#111827] bg-white dark:text-white text-[#111827] flex flex-col rounded-lg border border-[#111827] justify-between w-full sm:w-[45%] md:w-[45%] lg:w-[45%] xl:w-[30%] h-56 overflow-y-auto overflow-x-hidden">
        <Link
          to={`/note/${prop.note._id}`}
          className="dark:bg-white bg-[#111827] text-white dark:text-[#111827] text-lg font-semibold justify-center items-center p-2 sticky top-0"
        >
          {prop.note.title}
        </Link>
        <p className="p-2 text-justify text-sm">{prop.note.description}</p>
        <div className="w-auto p-1 flex justify-start items-center gap-2">
          <span className="bg-[#111827] dark:bg-white text-white dark:text-[#111827] font-semibold py-1 px-2 text-center rounded-md inline-block">
            Tag:
          </span>
          <span className="font-bold">{prop.note.tag}</span>
        </div>
        <div className="flex gap-2 self-end sticky bottom-0 z-[0] p-2 w-auto bg-[#111827] dark:bg-white rounded-tl-lg">
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
