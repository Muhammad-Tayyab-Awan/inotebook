import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";
import { useState, useContext } from "react";
import NotesContext from "../context/notes/NotesContext";
function Noteitem(prop) {
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
  let context = useContext(NotesContext);
  let { deleteNote, updateNote } = context;
  async function handleClick(e) {
    let response = await deleteNote(e.target.id);
    if (response.success) {
      prop.notify.success("Note deleted successfully!");
    } else {
      prop.notify.error(response.error);
    }
  }
  async function handleUpdate(e) {
    e.preventDefault();
    let response = await updateNote(e.target.id, updatingNote);
    if (response.success) {
      prop.notify.success(response.message);
      toggleModal(e);
    } else {
      prop.notify.error(response.error);
    }
  }
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg w-96 border-2 border-[#111827]">
            <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <h1 className="text-lg font-semibold">Edit Note</h1>
              <button
                className="text-2xl text-gray-500 hover:text-gray-900"
                onClick={toggleModal}
                id={updateId}
              >
                &times;
              </button>
            </div>
            <div>
              <from className="py-4 flex flex-col justify-center items-center gap-3 w-full bg-yellow-500">
                <div className="flex gap-2 items-center justify-between w-[90%]">
                  <label htmlFor="uptitle" className="text-lg font-semibold">
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
                    className="p-1 rounded-lg focus-visible:outline-none w-9/12"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2 items-baseline justify-between w-[90%]">
                  <label
                    htmlFor="updescription"
                    className="text-lg font-semibold"
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
                    className="p-1 rounded-lg focus-visible:outline-none w-9/12"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex gap-2 items-center justify-between w-[90%]">
                  <label htmlFor="uptag" className="text-lg font-semibold">
                    Tag
                  </label>
                  <input
                    type="text"
                    id="uptag"
                    name="tag"
                    value={updatingNote.tag}
                    placeholder="Enter Tag"
                    className="p-1 rounded-lg focus-visible:outline-none w-9/12"
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
                className="bg-[#111827] text-white px-2 py-1 rounded-lg hover:bg-[#111837] disabled:opacity-50"
                onClick={handleUpdate}
                id={updateId}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-red-500 px-2 py-4 flex flex-col rounded-lg border border-[#111827] justify-evenly">
        <h3 className="text-xl font-semibold justify-center items-center">
          {prop.note.title}
        </h3>
        <p>{prop.note.description}</p>
        <span>{prop.note.tag}</span>
        <div className="flex gap-2 self-end">
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
