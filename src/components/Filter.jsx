import { useContext } from "react";
import Context from "../context/Context";
function Filter(prop) {
  let context = useContext(Context);
  let { setFilter } = context;
  function tagsGen(notes) {
    let copyOfTags = [];
    notes = notes.filter((note, idx) => {
      copyOfTags.push(note.tag);
      return copyOfTags.indexOf(note.tag) === idx;
    });
    let tags = notes.map((note) => {
      return note.tag;
    });
    return tags;
  }
  function changeHandler(e) {
    setFilter(e.target.value);
  }
  return (
    <>
      <select
        onInput={changeHandler}
        name="filter"
        id="filter"
        className="bg-[#111827] text-white p-2 dark:bg-white dark:text-[#111827] rounded-lg w-[80%] md:w-[45%] focus-visible:outline-none font-semibold cursor-pointer"
      >
        <option key={"All"} value={"All"} className="font-semibold">
          All
        </option>
        {tagsGen(prop.Notes).map((tag) => {
          return (
            <option key={tag} value={tag} className="font-semibold">
              {tag}
            </option>
          );
        })}
      </select>
      <div className="flex justify-center items-center text-lg font-semibold w-[80%] md:w-[45%] text-[#111827] dark:text-white">
        {prop.resultFounds === 0 ? "No" : prop.resultFounds}&nbsp;
        {prop.resultFounds > 1 ? "notes" : "note"} found
      </div>
    </>
  );
}

export default Filter;
