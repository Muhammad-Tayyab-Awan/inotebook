import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import { useState } from "react";
import NotesContext from "./context/notes/NotesContext.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Logout from "./components/Logout.jsx";
const URL = "http://localhost:8080/api/";
function App() {
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIN] = useState(
    localStorage.getItem("auth-token")
  );
  async function fetchNotes() {
    let token = localStorage.getItem("auth-token");
    let response = await fetch(`${URL}notes/getallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      }
    });
    let JsonResponse = await response.json();
    setNotes(JsonResponse.notes);
  }
  async function addNote(note) {
    let token = localStorage.getItem("auth-token");
    let newNotes = {};
    let { title, description, tag } = note;
    if (title) {
      newNotes.title = title;
    }
    if (description) {
      newNotes.description = description;
    }
    if (tag) {
      newNotes.tag = tag;
    }
    await fetch(`${URL}notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ ...newNotes })
    });
    fetchNotes();
  }
  async function deleteNote(id) {
    let token = localStorage.getItem("auth-token");
    await fetch(`${URL}notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      }
    });
    fetchNotes();
  }
  async function updateNote(id, note) {
    let token = localStorage.getItem("auth-token");
    let { title, description, tag } = note;
    let updateNote = notes.filter((note) => {
      return note._id === id;
    });
    if (updateNote.length > 0) {
      if (title) {
        updateNote[0].title = title;
      }
      if (description) {
        updateNote[0].description = description;
      }
      if (tag) {
        updateNote[0].tag = tag;
      }
    }
    await fetch(`${URL}notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ ...updateNote[0] })
    });
    fetchNotes();
  }
  async function loginUser(credentials) {
    let response = await fetch(`${URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...credentials })
    });
    let JsonResponse = await response.json();
    if (JsonResponse.success) {
      localStorage.setItem("auth-token", JsonResponse.authToken);
      setIsLoggedIN(JsonResponse.authToken);
    }
    return JsonResponse.success;
  }
  function logoutUser() {
    localStorage.removeItem("auth-token");
    setIsLoggedIN(localStorage.getItem("auth-token"));
  }
  async function signUp(credentials) {
    let response = await fetch(`${URL}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...credentials })
    });
    let JsonResponse = await response.json();
    if (JsonResponse.success) {
      localStorage.setItem("auth-token", JsonResponse.authToken);
      setIsLoggedIN(JsonResponse.authToken);
    }
    console.log(JsonResponse);
    return JsonResponse.success;
  }
  return (
    <>
      <NotesContext.Provider
        value={{
          Notes: notes,
          setNotes: setNotes,
          addNote: addNote,
          deleteNote: deleteNote,
          fetchNotes: fetchNotes,
          updateNote: updateNote,
          loginUser: loginUser,
          logoutUser: logoutUser,
          signUp: signUp,
          isLoggedIn: isLoggedIn
        }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </NotesContext.Provider>
    </>
  );
}

export default App;
