import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Logout from "./components/Logout.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import toast, { Toaster } from "react-hot-toast";
import Context from "./context/Context.jsx";
import Note from "./components/note/Note.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import NotFound from "./components/NotFound.jsx";
const URL = "https://inotebook-psi.vercel.app/api/";
function App() {
  const [filter, setFilter] = useState("All");
  const [progress, setProgress] = useState(10);
  const [notes, setNotes] = useState([]);
  const [sideBar, setSideBar] = useState(false);
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
    if (JsonResponse.success) {
      return JsonResponse;
    } else {
      localStorage.removeItem("auth-token");
      setIsLoggedIN(localStorage.getItem("auth-token"));
      setNotes([]);
      return JsonResponse;
    }
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
    let response = await fetch(`${URL}notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ ...newNotes })
    });
    let JsonResponse = await response.json();
    fetchNotes();
    return JsonResponse;
  }
  async function deleteNote(id) {
    let token = localStorage.getItem("auth-token");
    let response = await fetch(`${URL}notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      }
    });
    let JsonResponse = await response.json();
    fetchNotes();
    return JsonResponse;
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
    let response = await fetch(`${URL}notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ ...updateNote[0] })
    });
    let JsonResponse = await response.json();
    fetchNotes();
    return JsonResponse;
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
    return JsonResponse;
  }
  function logoutUser() {
    localStorage.removeItem("auth-token");
    setIsLoggedIN(localStorage.getItem("auth-token"));
    setNotes([]);
    setFilter("All");
    setSideBar(false);
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
    return JsonResponse;
  }
  async function getUserData() {
    let token = localStorage.getItem("auth-token");
    let response = await fetch(`${URL}auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      }
    });
    let JsonResponse = await response.json();
    if (JsonResponse.success) {
      return JsonResponse;
    } else {
      localStorage.removeItem("auth-token");
      setIsLoggedIN(localStorage.getItem("auth-token"));
      setNotes([]);
      return JsonResponse;
    }
  }
  async function updateUser(data) {
    let token = localStorage.getItem("auth-token");
    let response = await fetch(`${URL}auth/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ ...data })
    });
    let JsonResponse = await response.json();
    return JsonResponse;
  }
  return (
    <>
      <Context.Provider
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
          isLoggedIn: isLoggedIn,
          getUserData: getUserData,
          filter: filter,
          setFilter: setFilter,
          sideBar: sideBar,
          setSideBar: setSideBar,
          updateUser: updateUser
        }}
      >
        <BrowserRouter>
          <LoadingBar
            color="#a855f7"
            height={2}
            shadow={false}
            loaderSpeed={1000}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Navbar notify={toast} />
          <Toaster position="bottom-right" reverseOrder={false} />
          <Routes>
            <Route
              path="/"
              element={<Home setProgress={setProgress} notify={toast} />}
            />
            <Route
              path="/about"
              element={<About setProgress={setProgress} notify={toast} />}
            />
            <Route
              path="/login"
              element={<Login setProgress={setProgress} notify={toast} />}
            />
            <Route
              path="/signup"
              element={<Signup setProgress={setProgress} notify={toast} />}
            />
            <Route
              path="/logout"
              element={<Logout setProgress={setProgress} notify={toast} />}
            />
            <Route
              path="/updateuser"
              element={<UpdateUser setProgress={setProgress} notify={toast} />}
            />
            <Route
              path="/privacy-policy"
              element={
                <PrivacyPolicy setProgress={setProgress} notify={toast} />
              }
            />
            <Route
              path="note/:id"
              element={<Note setProgress={setProgress} notify={toast} />}
            />
            <Route path="*" element={<NotFound notify={toast} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
