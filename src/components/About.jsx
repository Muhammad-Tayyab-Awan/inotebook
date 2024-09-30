import { useEffect } from "react";
function About(props) {
  useEffect(() => {
    props.setProgress(100);
  }, []);
  return (
    <>
      <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-500 dark:bg-[#776e6e] pt-16 pb-10">
        <div className="mx-auto w-[75%] text-[#111827] dark:text-white py-8 px-4">
          <h1 className="text-2xl font-bold mb-4 text-center">
            About iNotebook
          </h1>
          <p className="text-lg mb-4 w-3/4 mx-auto">
            Welcome to <strong>iNotebook</strong>, your go-to platform for
            managing notes in the cloud. Whether you need to jot down ideas,
            create task lists, or store important information, iNotebook makes
            it easy and accessible from anywhere. With secure login, signup, and
            essential note management features like adding, deleting, and
            updating notes, <strong>iNotebook</strong> ensures your data stays
            safe and organized.
          </p>
          <h2 className="text-xl font-bold mb-4 text-center">Why iNotebook?</h2>
          <p className="text-lg mb-4 w-3/4 mx-auto">
            <strong>iNotebook</strong> was designed to be more than just a
            note-taking app—it&apos;s built with a focus on simplicity and user
            experience. Unlike other apps, the clean, intuitive UI allows you to
            navigate effortlessly and focus on what matters most—your notes. No
            unnecessary complexity, just a smooth, fast, and modern design built
            using <strong>React.js</strong> and <strong>Tailwind CSS</strong>.
          </p>
          <h2 className="text-xl font-bold mb-4 text-center">Who We Are?</h2>
          <p className="text-lg mb-4 w-3/4 mx-auto">
            <strong>iNotebook</strong> is the brainchild of Muhammad Tayyab, a
            passionate front-end developer who created this project as part of
            their portfolio. As a developer with expertise in{" "}
            <strong>React.js</strong>,<strong>Tailwind CSS</strong>, and solid
            experience with <strong>Git and GitHub</strong>, Muhammad Tayyab has
            a strong foundation in modern web development technologies like
            <strong>JavaScript</strong>, <strong>HTML</strong>,
            <strong>CSS</strong>, and <strong>C++</strong>, with some knowledge
            of <strong>Python</strong> as well.
          </p>
          <h2 className="text-xl font-bold mb-4 text-center">
            The Vision Behind iNotebook
          </h2>
          <p className="text-lg mb-4 w-3/4 mx-auto">
            The vision behind <strong>iNotebook</strong> is to provide a simple,
            secure, and efficient way for users to manage their notes in the
            cloud. Whether you&apos;re a student, professional, or someone who
            loves staying organized, <strong>iNotebook</strong> offers the tools
            you need to stay productive—without the clutter of extra features.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
