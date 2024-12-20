import mongoose from "mongoose";
const { Schema } = mongoose; // * imported Schema class from "mongoose"
const usersSchema = Schema({
  // * defining schema for user collection
  name: {
    // * name of the user is required
    type: String,
    required: true
  },
  email: {
    // * email is also required and must be unique
    type: String,
    required: true,
    unique: true
  },
  emailVerified: { type: Boolean, default: false },
  password: {
    // * password is also required
    type: String,
    required: true
  },
  date: {
    // * date is note taken from the user it is set by default
    type: Date,
    default: Date.now
  }
});
const Users = mongoose.model("user", usersSchema); // * creating model from schema
export default Users;
