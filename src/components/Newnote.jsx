function Newnote() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center">Add New Note</h2>
      <div className="my-4 py-4 flex flex-col justify-center items-center gap-3">
        <div className="flex gap-2 items-center justify-between w-3/5">
          <label htmlFor="title" className="text-lg font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            required
            className="p-1 rounded-lg focus-visible:outline-none w-9/12"
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
            className="p-1 rounded-lg focus-visible:outline-none w-9/12"
          ></textarea>
        </div>
        <button className="bg-[#111827] text-white py-1 px-4 rounded-xl text-lg font-semibold focus-visible:outline-none border border-white">
          Add
        </button>
      </div>
    </>
  );
}

export default Newnote;
