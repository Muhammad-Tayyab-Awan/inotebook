import express from "express";
const router = express.Router();
import Notes from "../models/Notes.js"; // * importing note model
const dailyLimit = 50; // * setting daily limit to add notes for each user
import getUser from "../middleware/getUser.js"; // * imported getUser Middleware
import { body, validationResult } from "express-validator";
// * route to get all notes of a particular user
router.get("/getallnotes", getUser, async (req, res) => {
  try {
    // * wrapped into trycatch() block to handle errors
    const notes = await Notes.find({ user: req.user.id });
    // * fetching all notes of a particular user
    res.status(200).json({ success: true, notes: notes }); // * sending reponse with array of fetched notes
  } catch (error) {
    // * in case when error occurs on server side
    res.status(500).json({
      success: false,
      error: "Error Occured on Server Side",
      message: error.message
    }); // ! sending error
  }
});
// * route to add a new note
router.post(
  "/addnote",
  [
    body("title", "Title must contain 10 chars").isLength({ min: 10 }), // * validating title by setting the min-length of title to 10 chars
    body("description", "Description must contain 25 chars").isLength({
      min: 25
    }) // * validating description by setting the min-length of description to 25 chars
  ],
  getUser,
  async (req, res) => {
    try {
      // * wrapped into trycatch() block to handle errors
      const result = validationResult(req); // * validating request using express-validator
      if (result.isEmpty()) {
        // * in case when request is validated successfully
        let todaysDate = new Date(); // * defined today's date
        let allNotes = await Notes.find({ user: req.user.id });
        // * fetching all notes of a particular user
        let notesAddedToday = allNotes.filter((note) => {
          let noteDate = new Date(note.date);
          return (
            noteDate.toLocaleString(noteDate).split(",")[0] ===
            todaysDate.toLocaleString(todaysDate).split(",")[0]
          );
        }); // * getting all notes that are added today
        if (notesAddedToday.length < dailyLimit) {
          // * in case when the length of notes added today is less than the daily limit
          const { title, description, tag } = req.body; // * destructuring req.body
          const newNote = await Notes.create({
            user: req.user.id,
            title: title,
            description: description,
            tag: tag
          }); // * creating new note
          res.status(200).json({ success: true, newNote }); // * sending response along with new note
        } else {
          // * in case when the length of notes added today is not less than the daily limit
          return res.status(403).json({
            success: false,
            error: "You Have Exceeded The Daily Limit of 50 notes"
          }); // * sending error
        }
      } else {
        // * in case when request is not validated successfully
        return res.status(400).json({ success: false, errors: result.errors }); // ! sending error(s)
      }
    } catch (error) {
      // * in case when error occurs on server side
      res.status(500).json({
        success: false,
        error: "Error Occured on Server Side",
        message: error.message
      }); // ! sending error
    }
  }
);
// * route to update a specific note of a particular user
router.put(
  "/update/:id",
  [
    body("title", "Title must contain 10 chars").isLength({ min: 10 }), // * validating title by setting the min-length of title to 10 chars
    body("description", "Description must contain 25 chars").isLength({
      min: 25
    }) // * validating description by setting the min-length of description to 25 chars
  ],
  getUser,
  async (req, res) => {
    try {
      // * wrapped into trycatch() block to handle errors
      const result = validationResult(req); // * validating request using express-validator
      if (result.isEmpty()) {
        // * in case when request is validated successfully
        let noteToUpdate = await Notes.findById(req.params.id); // * searching note in Database from the note id found in params
        if (noteToUpdate) {
          // * in case when note with the id found in params present in Database
          if (noteToUpdate.user.toString() === req.user.id) {
            // * in case when user id of the author of note with the id found in params is equal to the user id found in token
            let updatedNote = {
              _id: noteToUpdate._id,
              user: noteToUpdate.user,
              title: req.body.title || noteToUpdate.title,
              description: req.body.description || noteToUpdate.description,
              tag: req.body.tag || noteToUpdate.tag,
              date: noteToUpdate.date
            }; // * defining updated note
            noteToUpdate = await Notes.findByIdAndUpdate(
              req.params.id,
              updatedNote
            ); // * updating note
            res.status(200).json({
              success: true,
              message: "Note updated successfully!"
            }); // * sedning response
          } else {
            // * in case when user id of the author of note with the id found in params is not equal to the user id found in token
            res.status(401).json({ success: false, error: "Acces Denied!" }); // ! sending error
          }
        } else {
          // * in case when note with the id found in params not present in Database
          req.status(404).json({ success: false, error: "Not Found" }); // ! sending error
        }
      } else {
        // * in case when request is not validated successfully
        return res.status(400).json({ success: false, error: result.errors }); // ! sending error(s)
      }
    } catch (error) {
      // * in case when error occurs on server side
      res.status(500).json({
        success: false,
        error: "Error Occured on Server Side",
        message: error.message
      }); // ! sending error
    }
  }
);
// * route to delete a specific note of a particular user
router.delete("/delete/:id", getUser, async (req, res) => {
  try {
    // * wrapped into trycatch() block to handle errors
    let noteToDelete = await Notes.findById(req.params.id); // * searching note in Database from the note id found in params
    if (noteToDelete) {
      // * in case when note with the id found in params present in Database
      if (noteToDelete.user.toString() === req.user.id) {
        // * in case when user id of the author of note with the id found in params is equal to the user id found in token
        await Notes.findByIdAndDelete(req.params.id); // * deleteing note
        res.json({ success: true, message: "Note Deleted Successfully!" }); // * sending response
      } else {
        // * in case when user id of the author of note with the id found in params is not equal to the user id found in token
        res.status(401).json({ success: false, error: "Acces Denied!" }); // ! sending error
      }
    } else {
      // * in case when note with the id found in params not present in Database
      res.status(404).json({ success: false, error: "Not Found" }); // ! sending response
    }
  } catch (error) {
    // * in case when error occurs on server side
    res.status(500).json({
      success: false,
      error: "Error Occured on Server Side",
      message: error.message
    }); // ! sending error
  }
});
export default router;
