import express from "express";
const router = express.Router();
import Notes from "../models/Notes.js";
import getUser from "../middleware/getUser.js";
import { body, validationResult } from "express-validator";
router.get("/getallnotes", getUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.status(200).json(notes);
});

router.post(
  "/addnote",
  [
    body("title", "Title must contain 3 chars").isLength({ min: 3 }),
    body("description", "Title must contain 3 chars").isLength({ min: 3 })
  ],
  getUser,
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        const { title, description, tag } = req.body;
        const newNote = await Notes.create({
          user: req.user.id,
          title: title,
          description: description,
          tag: tag
        });
        res.status(200).json(newNote);
      } else {
        return res.status(400).json({ errors: result.array() });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error Occured on Server Side",
        message: error.message
      });
    }
  }
);

router.put("/update/:id", getUser, async (req, res) => {
  try {
    let updatedNote = {};
    if (req.body.title) {
      updatedNote.title = req.body.title;
    }
    if (req.body.description) {
      updatedNote.description = req.body.description;
    }
    if (req.body.tag) {
      updatedNote.tag = req.body.tag;
    }
    let noteToUpdate = await Notes.findById(req.params.id);
    if (noteToUpdate) {
      if (noteToUpdate.user.toString() === req.user.id) {
        noteToUpdate = await Notes.findByIdAndUpdate(
          req.params.id,
          { $set: updatedNote },
          { new: true }
        );
        res.status(200).json({
          Response: "Note updated successfully"
        });
      } else {
        res.status(401).json({ Error: "Acces Denied!" });
      }
    } else {
      req.status(404).json({ Error: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error Occured on Server Side",
      message: error.message
    });
  }
});

router.delete("/delete/:id", getUser, async (req, res) => {
  try {
    let noteToDelete = await Notes.findById(req.params.id);
    if (noteToDelete) {
      if (noteToDelete.user.toString() === req.user.id) {
        noteToDelete = await Notes.findByIdAndDelete(req.params.id);
        // res.status(200).json({
        //   Response: "Note deleted successfully"
        // });
        res.send(noteToDelete);
      } else {
        res.status(401).json({ Error: "Acces Denied!" });
      }
    } else {
      req.status(404).json({ Error: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error Occured on Server Side",
      message: error.message
    });
  }
});
export default router;
