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
export default router;
