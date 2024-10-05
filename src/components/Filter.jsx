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
        className="bg-[#111827] text-white p-2 dark:bg-white dark:text-[#111827] rounded-lg w-auto focus-visible:outline-none font-semibold"
      >
        <option key={"All"} value={"All"}>
          All
        </option>
        {tagsGen(prop.Notes).map((tag) => {
          return (
            <option key={tag} value={tag}>
              {tag}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Filter;
