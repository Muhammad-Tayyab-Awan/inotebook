import cors from "cors";
import "dotenv/config";
import express from "express";
const app = express();
const port = 8080; // * defined port for server
import dbConnection from "./dbConnection.js"; // * imported dbConnection function
import authRoute from "./routes/auth.js"; // * imported auth routes
import notesRoute from "./routes/notes.js"; // * imported notes routes
const connectionToDB = await dbConnection(); // * calling dbConnection for Database Connection
if (connectionToDB.success) {
  // * in case when connection to Database established
  console.log(connectionToDB.message); // * printing success message to console
} else {
  // * in case when connection to Database not established
  console.log(connectionToDB.error); // ! printing error message to console
}
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200
}; // * cors option in order to run backend and frontend on same server
app.use(cors(corsOptions)); // * using cor
app.use(express.json()); // * using json parsing to parse req.body for further manipulation

app.use("/api/auth", authRoute); // * using auth route
app.use("/api/notes", notesRoute); // * using notes route

app.get("/", (req, res) => {
  // * Welcome route of server api
  res
    .status(200)
    .json({ success: true, message: "Welcome to iNotebook Server!" }); // * sending response
});

app.all("*", (req, res) => {
  // * route for wrong routes requests
  res.sendStatus(404);
});

app.listen(port, (err) => {
  // * listening to server using defined port
  if (!err) {
    // * in case when server started with no errors
    console.log(`Server is Running on http://localhost:${port}`); // * printing success message to console
  } else {
    // * in case when error occurred while listening to server
    console.log(err.message); // ! printing error message to console
  }
});
