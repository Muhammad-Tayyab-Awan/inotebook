import mongoose from "mongoose";
const { Schema } = mongoose; // * imported Schema class from "mongoose"
const notesSchema = Schema({
  // * defining schema for note collection
  user: {
    // * user refers to the author of the note and it stores object id of the user referred to the user in user collection (foreign key)
    type: Schema.Types.ObjectId,
    ref: "user" // * referencing
  },
  title: {
    // * title must be present in the note
    type: String,
    required: true
  },
  description: {
    // * description must be present in the note
    type: String,
    required: true
  },
  tag: {
    // * tag is not mandatory but by default its value is "General"
    type: String,
    default: "General"
  },
  date: {
    // * date is note taken from the user it is set by default
    type: Date,
    default: Date.now
  }
});
const Notes = mongoose.model("note", notesSchema); // * creating model from schema
export default Notes;
