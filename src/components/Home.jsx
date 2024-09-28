import Notes from "./Notes";
import { useEffect } from "react";
function Home(props) {
  useEffect(() => {
    props.setProgress(100);
  }, []);
  return (
    <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 pt-16 pb-10">
      <Notes />
    </div>
  );
}

export default Home;
