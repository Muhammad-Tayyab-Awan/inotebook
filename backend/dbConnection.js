import mongoose from "mongoose";
const mongo_URL = process.env.DB_URL;
async function main() {
  try {
    await mongoose.connect(mongo_URL);
    return {
      success: true,
      message: "Connection to Database Established Successfully"
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
export default main;
