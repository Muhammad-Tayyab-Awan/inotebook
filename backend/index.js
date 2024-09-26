import "dotenv/config";
import express from "express";
const app = express();
const port = 3000;
import dbConnection from "./dbConnection.js";
import Users from "./models/Users.js";
import Notes from "./models/Notes.js";
import authRoute from "./routes/auth.js";
import notesRoute from "./routes/notes.js";
dbConnection();
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/notes", notesRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
