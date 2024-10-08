/* eslint-disable no-undef */
import mongoose from "mongoose";
const mongo_URL = process.env.DB_URL; // * defined Database url using env variables
async function main() {
  // * created a function to connect to Database
  try {
    // * wrapped into trycatch() block to handle errors
    await mongoose.connect(mongo_URL); // * waiting for Database connection
    return {
      success: true,
      message: "Connection to Database Established Successfully"
    }; // * returning success message
  } catch (error) {
    // * in case when error occurs on server side
    return {
      success: false,
      error: error.message
    }; // ! returning error
  }
}
export default main;
