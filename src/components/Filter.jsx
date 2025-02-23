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
        className="w-[80%] cursor-pointer rounded-lg bg-[#111827] p-2 font-semibold text-white focus-visible:outline-none dark:bg-white dark:text-[#111827] md:w-[45%]"
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
      <div className="flex w-[80%] items-center justify-center text-lg font-semibold text-[#111827] dark:text-white md:w-[45%]">
        {prop.resultFounds === 0 ? "No" : prop.resultFounds}&nbsp;
        {prop.resultFounds > 1 ? "notes" : "note"} found
      </div>
    </>
  );
}

export default Filter;
