/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Notes from "./Notes";
import { useEffect } from "react";
function Home(props) {
  useEffect(() => {
    document.title = "iNotebook - Your notes are saved in cloud";
    props.setProgress(100);
  }, []);
  return (
    <div className="min-h-[calc(100vh-9.5rem)] dark:bg-[#776e6e] bg-yellow-500 pt-16 pb-10">
      <Notes notify={props.notify} />
    </div>
  );
}

export default Home;
