import mongoose from "mongoose";
const mongo_URL = process.env.DB_URL;
function main() {
  mongoose.connect(mongo_URL).then(() => {
    console.log("Connected To DB");
  });
}
export default main;
