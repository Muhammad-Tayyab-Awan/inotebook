import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import { useState } from "react";
import NotesContext from "./context/notes/NotesContext.jsx";

function App() {
  let allNotes = [
    {
      _id: "66f64b9e16298ff630625c1e",
      user: "66f527080578d6f9ddaaf73e",
      title: "This is The title of notes",
      description: "descriptio of notes",
      tag: "General",
      date: "2024-09-27T06:07:26.788Z",
      __v: 0
    },
    {
      _id: "66f64ba416298ff630625c20",
      user: "66f527080578d6f9ddaaf73e",
      title: "This is The title of notes",
      description: "descriptio of notes",
      tag: "General",
      date: "2024-09-27T06:07:32.426Z",
      __v: 0
    },
    {
      _id: "66f64ba516298ff630625c22",
      user: "66f527080578d6f9ddaaf73e",
      title: "This is The title of notes",
      description: "descriptio of notes",
      tag: "General",
      date: "2024-09-27T06:07:33.183Z",
      __v: 0
    },
    {
      _id: "66f64ba516298ff630625c24",
      user: "66f527080578d6f9ddaaf73e",
      title: "This is The title of notes",
      description: "descriptio of notes",
      tag: "General",
      date: "2024-09-27T06:07:33.768Z",
      __v: 0
    },
    {
      _id: "66f64ba616298ff630625c26",
      user: "66f527080578d6f9ddaaf73e",
      title: "This is The title of notes",
      description: "descriptio of notes",
      tag: "General",
      date: "2024-09-27T06:07:34.080Z",
      __v: 0
    },
    {
      _id: "66f64ba616298ff630625c28",
      user: "66f527080578d6f9ddaaf73e",
      title: "This is The title of notes",
      description: "descriptio of notes",
      tag: "General",
      date: "2024-09-27T06:07:34.499Z",
      __v: 0
    },
    {
      _id: "66f64ba716298ff630625c2a",
      user: "66f527080578d6f9ddaaf73e",
      title: "This is The title of notes",
      description: "descriptio of notes",
      tag: "General",
      date: "2024-09-27T06:07:35.064Z",
      __v: 0
    },
    {
      _id: "66f64ba716298ff630625c2c",
      user: "66f527080578d6f9ddaaf73e",
      title: "This is The title of notes",
      description: "descriptio of notes",
      tag: "General",
      date: "2024-09-27T06:07:35.331Z",
      __v: 0
    }
  ];
  const [notes, setNotes] = useState(allNotes);
  return (
    <>
      <NotesContext.Provider value={{ Notes: notes, Setter: setNotes }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </NotesContext.Provider>
    </>
  );
}

export default App;
