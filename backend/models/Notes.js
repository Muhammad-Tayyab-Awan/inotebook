import mongoose from "mongoose";
const { Schema } = mongoose;
const notesSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: "General"
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Notes = mongoose.model("note", notesSchema);
export default Notes;
